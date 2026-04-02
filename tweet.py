#!/usr/bin/env python3
"""
PaceMap Tweet Automation
Uses Playwright to schedule tweets on X without the Twitter API.

Reads tweets_queue.json (written by pipeline.py) and schedules them
on X using saved session cookies.

Cookie setup (run once manually):
    python tweet.py --save-cookies

Then add TWITTER_COOKIES_JSON to GitHub Secrets.
"""

import json
import os
import sys
import time
import argparse
import random
from datetime import datetime, timedelta
import pytz

# ── Constants ─────────────────────────────────────────────────

TWEETS_QUEUE_FILE    = 'tweets_queue.json'
FALLBACK_TWEETS_FILE = 'fallback_tweets.json'
FALLBACK_INDEX_FILE  = 'fallback_index.txt'
COOKIES_FILE         = 'twitter_cookies.json'
X_COMPOSE_URL        = 'https://x.com/compose/tweet'
X_HOME_URL           = 'https://x.com/home'
UK_TZ                = pytz.timezone('Europe/London')

# Minimum tweet text length to be considered race-specific (not thin/generic)
MIN_RACE_TWEET_LENGTH = 120


def load_cookies():
    """Load cookies from env var (GitHub Actions) or local file."""
    cookies_json = os.environ.get('TWITTER_COOKIES_JSON')
    if cookies_json:
        return json.loads(cookies_json)
    if os.path.exists(COOKIES_FILE):
        with open(COOKIES_FILE) as f:
            return json.load(f)
    raise FileNotFoundError(
        'No cookies found. Run: python tweet.py --save-cookies\n'
        'Then add TWITTER_COOKIES_JSON to GitHub Secrets.'
    )


def save_cookies_interactive():
    """
    Open a real browser for manual login, save session cookies.
    Run this once locally, then add the output to GitHub Secrets.
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print('Installing playwright...')
        os.system('pip install playwright && playwright install chromium')
        from playwright.sync_api import sync_playwright

    print('\nOpening browser for manual X login...')
    print('Log in to your @PacemapUK account, then press Enter here.\n')

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page    = context.new_page()
        page.goto('https://x.com/login')

        input('Press Enter after you have logged in successfully...')

        cookies = context.cookies()
        with open(COOKIES_FILE, 'w') as f:
            json.dump(cookies, f, indent=2)

        print(f'\nCookies saved to {COOKIES_FILE}')
        print('\nAdd to GitHub Secrets as TWITTER_COOKIES_JSON:')
        print(json.dumps(cookies))
        browser.close()


def get_next_fallback():
    """Get the next fallback tweet in rotation, cycling through all 15."""
    if not os.path.exists(FALLBACK_TWEETS_FILE):
        return None

    with open(FALLBACK_TWEETS_FILE) as f:
        fallbacks = json.load(f)

    if not fallbacks:
        return None

    # Read current index
    idx = 0
    if os.path.exists(FALLBACK_INDEX_FILE):
        try:
            with open(FALLBACK_INDEX_FILE) as f:
                idx = int(f.read().strip())
        except (ValueError, IOError):
            idx = 0

    tweet = fallbacks[idx % len(fallbacks)]

    # Write next index
    with open(FALLBACK_INDEX_FILE, 'w') as f:
        f.write(str((idx + 1) % len(fallbacks)))

    return tweet['text']


def build_tweet_schedule(queue_file):
    """
    Build list of (tweet_text, scheduled_time) tuples from queue.
    Falls back to fallback tweets where race content is thin.
    Also injects fallback tweets into gaps throughout the day.
    """
    tweets_to_send = []
    now_uk = datetime.now(UK_TZ)

    # Load race-specific queue if it exists
    race_tweets = []
    if os.path.exists(queue_file):
        with open(queue_file) as f:
            race_tweets = json.load(f)
        print(f'Loaded {len(race_tweets)} race-specific tweets from queue')
    else:
        print('No tweets_queue.json found — using fallback tweets only')

    # Process race tweets
    used_times = set()
    for item in race_tweets:
        text       = item.get('text', '')
        sched_time = item.get('scheduled_time')  # ISO format UK time string

        # Quality check — if too short/thin, swap for fallback
        if len(text) < MIN_RACE_TWEET_LENGTH:
            print(f'  Thin tweet detected ({len(text)} chars) — using fallback')
            text = get_next_fallback()
            if not text:
                continue

        if sched_time:
            try:
                dt = datetime.fromisoformat(sched_time)
                if dt.tzinfo is None:
                    dt = UK_TZ.localize(dt)
                # Skip if in the past
                if dt < now_uk:
                    print(f'  Skipping past tweet scheduled for {dt}')
                    continue
                tweets_to_send.append({'text': text, 'time': dt, 'type': 'race'})
                used_times.add(dt.strftime('%H:%M'))
            except ValueError:
                print(f'  Invalid scheduled_time: {sched_time}')

    # Always inject fallback tweets throughout the day
    # Spread across morning, midday, evening slots not used by race tweets
    fallback_slots = ['09:00', '11:30', '13:00', '15:30', '20:00', '21:30']
    tomorrow = now_uk.date() + timedelta(days=1)

    for slot in fallback_slots:
        if slot in used_times:
            continue
        hour, minute = map(int, slot.split(':'))
        dt = UK_TZ.localize(datetime(tomorrow.year, tomorrow.month, tomorrow.day, hour, minute))
        fallback_text = get_next_fallback()
        if fallback_text:
            tweets_to_send.append({'text': fallback_text, 'time': dt, 'type': 'fallback'})

    # Sort by scheduled time
    tweets_to_send.sort(key=lambda x: x['time'])

    print(f'\nScheduled {len(tweets_to_send)} tweets:')
    for t in tweets_to_send:
        print(f'  [{t["type"]}] {t["time"].strftime("%H:%M")} — {t["text"][:60]}...')

    return tweets_to_send


def schedule_tweet_on_x(page, text, scheduled_time):
    """
    Use Playwright to compose and schedule a single tweet on X.
    """
    try:
        # Navigate to compose
        page.goto(X_COMPOSE_URL, wait_until='networkidle', timeout=30000)
        time.sleep(2)

        # Click the tweet compose area
        compose_selectors = [
            '[data-testid="tweetTextarea_0"]',
            '[aria-label="Tweet text"]',
            '[aria-label="Post text"]',
            '.public-DraftEditor-content',
        ]
        compose_box = None
        for sel in compose_selectors:
            try:
                compose_box = page.wait_for_selector(sel, timeout=5000)
                if compose_box:
                    break
            except Exception:
                continue

        if not compose_box:
            print('  Could not find compose box')
            return False

        compose_box.click()
        time.sleep(0.5)
        compose_box.type(text, delay=30)
        time.sleep(1)

        # Click the schedule button (calendar icon near bottom of compose)
        schedule_selectors = [
            '[data-testid="scheduledTweets"]',
            '[aria-label="Schedule"]',
            '[data-testid="attachments"]',  # sometimes schedule is grouped here
        ]
        schedule_btn = None
        for sel in schedule_selectors:
            try:
                btn = page.query_selector(sel)
                if btn and btn.is_visible():
                    schedule_btn = btn
                    break
            except Exception:
                continue

        # If no dedicated schedule button found, look for the calendar icon
        if not schedule_btn:
            # Try clicking the ... more options area
            try:
                more_btn = page.query_selector('[aria-label="Add scheduling"]')
                if more_btn:
                    schedule_btn = more_btn
            except Exception:
                pass

        if not schedule_btn:
            print('  Could not find schedule button — posting immediately instead')
            # Fall back to immediate post
            post_btn = page.query_selector('[data-testid="tweetButtonInline"]')
            if post_btn:
                post_btn.click()
                time.sleep(2)
                return True
            return False

        schedule_btn.click()
        time.sleep(1.5)

        # Set the scheduled date and time
        # X shows date pickers — find month, day, year, hour, minute, am/pm fields
        uk_time = scheduled_time.astimezone(UK_TZ)

        # Month selector
        try:
            month_sel = page.query_selector('select[aria-label="Month"]') or \
                        page.query_selector('select[name="month"]')
            if month_sel:
                month_sel.select_option(str(uk_time.month))
        except Exception:
            pass

        # Day selector
        try:
            day_sel = page.query_selector('select[aria-label="Day"]') or \
                      page.query_selector('select[name="day"]')
            if day_sel:
                day_sel.select_option(str(uk_time.day))
        except Exception:
            pass

        # Year selector
        try:
            year_sel = page.query_selector('select[aria-label="Year"]') or \
                       page.query_selector('select[name="year"]')
            if year_sel:
                year_sel.select_option(str(uk_time.year))
        except Exception:
            pass

        # Hour selector
        hour_12 = uk_time.hour % 12 or 12
        try:
            hour_sel = page.query_selector('select[aria-label="Hour"]') or \
                       page.query_selector('select[name="hours"]')
            if hour_sel:
                hour_sel.select_option(str(hour_12))
        except Exception:
            pass

        # Minute selector
        try:
            min_sel = page.query_selector('select[aria-label="Minute"]') or \
                      page.query_selector('select[name="minutes"]')
            if min_sel:
                # X rounds to nearest 15 min — find closest
                rounded = round(uk_time.minute / 15) * 15
                if rounded == 60:
                    rounded = 45
                min_sel.select_option(str(rounded).zfill(2))
        except Exception:
            pass

        # AM/PM selector
        try:
            ampm_val = 'AM' if uk_time.hour < 12 else 'PM'
            ampm_sel = page.query_selector('select[aria-label="AM/PM"]') or \
                       page.query_selector('select[name="period"]')
            if ampm_sel:
                ampm_sel.select_option(ampm_val)
        except Exception:
            pass

        time.sleep(0.5)

        # Confirm the schedule
        confirm_selectors = [
            '[data-testid="scheduledTweetConfirmButton"]',
            'button:has-text("Confirm")',
            'button:has-text("Schedule")',
        ]
        for sel in confirm_selectors:
            try:
                btn = page.query_selector(sel)
                if btn and btn.is_visible():
                    btn.click()
                    time.sleep(1)
                    break
            except Exception:
                continue

        # Final post/schedule button
        final_selectors = [
            '[data-testid="tweetButtonInline"]',
            'button:has-text("Schedule")',
            '[data-testid="tweetButton"]',
        ]
        for sel in final_selectors:
            try:
                btn = page.query_selector(sel)
                if btn and btn.is_visible():
                    btn.click()
                    time.sleep(2)
                    print(f'  Scheduled for {uk_time.strftime("%d %b %H:%M")} UK')
                    return True
            except Exception:
                continue

        print('  Could not find final post button')
        return False

    except Exception as e:
        print(f'  Error scheduling tweet: {e}')
        return False


def run_scheduler():
    """Main function — load cookies, build schedule, post tweets."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print('Installing playwright...')
        os.system('pip install playwright && playwright install chromium')
        from playwright.sync_api import sync_playwright

    cookies = load_cookies()
    tweets  = build_tweet_schedule(TWEETS_QUEUE_FILE)

    if not tweets:
        print('No tweets to schedule.')
        return

    print(f'\nStarting Playwright — scheduling {len(tweets)} tweets...\n')

    success_count = 0
    fail_count    = 0

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 900},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )

        # Load saved cookies
        context.add_cookies(cookies)

        page = context.new_page()

        # Verify logged in
        page.goto(X_HOME_URL, wait_until='networkidle', timeout=30000)
        time.sleep(3)

        if 'login' in page.url or 'signin' in page.url:
            print('ERROR: Not logged in. Cookies may have expired.')
            print('Run: python tweet.py --save-cookies  and update GitHub Secret.')
            browser.close()
            sys.exit(1)

        print('Logged in successfully.\n')

        for tweet in tweets:
            text  = tweet['text']
            sched = tweet['time']
            ttype = tweet['type']

            print(f'Scheduling [{ttype}]: {text[:70]}...')

            # Add random delay between tweets to appear human
            delay = random.uniform(8, 20)
            time.sleep(delay)

            ok = schedule_tweet_on_x(page, text, sched)
            if ok:
                success_count += 1
            else:
                fail_count += 1

        browser.close()

    print(f'\nDone. {success_count} scheduled, {fail_count} failed.')


def main():
    parser = argparse.ArgumentParser(description='PaceMap tweet scheduler')
    parser.add_argument('--save-cookies', action='store_true',
                        help='Open browser for manual login and save cookies')
    parser.add_argument('--dry-run', action='store_true',
                        help='Show what would be tweeted without posting')
    args = parser.parse_args()

    if args.save_cookies:
        save_cookies_interactive()
        return

    if args.dry_run:
        tweets = build_tweet_schedule(TWEETS_QUEUE_FILE)
        print(f'\nDry run — {len(tweets)} tweets would be scheduled:')
        for t in tweets:
            print(f'  {t["time"].strftime("%d %b %H:%M")} [{t["type"]}]')
            print(f'  {t["text"]}\n')
        return

    run_scheduler()


if __name__ == '__main__':
    main()
