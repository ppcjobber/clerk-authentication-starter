#!/usr/bin/env python3
"""
PaceMap pipeline.py patcher.
Applies all fixes in one shot against your existing pipeline.py.

Usage:
    python3 patch_pipeline.py pipeline.py

Output:
    pipeline_fixed.py  — review this, then copy over pipeline.py

Fixes applied:
    1. _norm_going: STANDARD -> STANDARD (was GOOD)
    2. AW_COURSES constant added
    3. AW going override in Cell 8 loop
    4. STANDARD added to GOING_SIMILAR in _narrative_prompt
    5a. _send_tweet_email() function added
    5b. _send_tweet_email() called inside _write_tweet_queue()

New GitHub Actions secrets required (for tweet email):
    GMAIL_APP_PASSWORD  -- Gmail app password (NOT your account password)
                           Create at: myaccount.google.com/apppasswords
    GMAIL_FROM          -- your Gmail address, e.g. ppcjobber@gmail.com
"""
import sys

if len(sys.argv) < 2:
    print("Usage: python3 patch_pipeline.py pipeline.py")
    sys.exit(1)

with open(sys.argv[1], "r", encoding="utf-8") as f:
    src = f.read()

applied = []
skipped = []
failed  = []


def apply(name, old, new):
    global src
    if old not in src:
        failed.append(f"{name}: pattern not found")
        return False
    if new in src:
        skipped.append(f"{name}: already applied")
        return True
    src = src.replace(old, new, 1)
    applied.append(name)
    return True


# ── PATCH 1: _norm_going STANDARD -> STANDARD ────────────────
apply(
    "PATCH 1 -- _norm_going STANDARD mapping",
    "'STANDARD TO FAST':'GOOD_TO_FIRM', 'STANDARD':'GOOD',",
    "'STANDARD TO FAST':'STANDARD', 'STANDARD':'STANDARD',",
)


# ── PATCH 2: AW_COURSES constant before _build_form_run ──────
AW_BLOCK = (
    "\n"
    "# -- AW course set (PATCH 2) ---------------------------------\n"
    "# Forces going='STANDARD' on all-weather tracks regardless\n"
    "# of what the Racing API returns.\n"
    "AW_COURSES = {\n"
    "    'Chelmsford', 'Chelmsford (AW)', 'Chelmsford City',\n"
    "    'Lingfield',  'Lingfield (AW)',  'Lingfield Park',\n"
    "    'Kempton',    'Kempton (AW)',    'Kempton Park',\n"
    "    'Wolverhampton', 'Wolverhampton (AW)',\n"
    "    'Newcastle',  'Newcastle (AW)',\n"
    "    'Southwell',  'Southwell (AW)',\n"
    "    'Dundalk',\n"
    "}\n"
    "\n"
    "\n"
)
apply(
    "PATCH 2 -- AW_COURSES constant",
    "def _build_form_run(result_race, our_horse_id):",
    AW_BLOCK + "def _build_form_run(result_race, our_horse_id):",
)


# ── PATCH 3: Force STANDARD going for AW courses in Cell 8 ───
apply(
    "PATCH 3 -- AW going override in Cell 8 loop",
    (
        "        today_going = _norm_going(going_str)\n"
        "        race_grade  = _extract_grade(racecard)"
    ),
    (
        "        today_going = _norm_going(going_str)\n"
        "        if course in AW_COURSES:  # PATCH 3 -- force Standard for AW\n"
        "            today_going = 'STANDARD'\n"
        "        race_grade  = _extract_grade(racecard)"
    ),
)


# ── PATCH 4: STANDARD in GOING_SIMILAR in _narrative_prompt ──
# Match the version inside _narrative_prompt (has 'similar =' on next line)
apply(
    "PATCH 4 -- STANDARD in _narrative_prompt GOING_SIMILAR",
    (
        "        'FIRM':         {'GOOD_TO_FIRM','FIRM'},\n"
        "    }\n"
        "    similar = GOING_SIMILAR.get(today_going_key, {today_going_key})"
    ),
    (
        "        'FIRM':         {'GOOD_TO_FIRM','FIRM'},\n"
        "        'STANDARD':     {'STANDARD'},  # PATCH 4 -- AW going\n"
        "    }\n"
        "    similar = GOING_SIMILAR.get(today_going_key, {today_going_key})"
    ),
)


# ── PATCH 5a: _send_tweet_email() function ────────────────────
SEND_EMAIL = (
    "\n"
    "def _send_tweet_email(queue, course, race_date_str):\n"
    "    \"\"\"\n"
    "    Email tweet copy to ppcjobber@gmail.com after each pipeline run.\n"
    "    Requires GitHub Actions secrets: GMAIL_APP_PASSWORD, GMAIL_FROM.\n"
    "    Create an app password at: myaccount.google.com/apppasswords\n"
    "    \"\"\"\n"
    "    import smtplib\n"
    "    from email.mime.text import MIMEText\n"
    "    from email.mime.multipart import MIMEMultipart\n"
    "\n"
    "    gmail_pass = os.environ.get('GMAIL_APP_PASSWORD', '')\n"
    "    gmail_from = os.environ.get('GMAIL_FROM', 'ppcjobber@gmail.com')\n"
    "\n"
    "    if not gmail_pass:\n"
    "        print('  GMAIL_APP_PASSWORD not set -- skipping tweet email')\n"
    "        return\n"
    "    if not queue:\n"
    "        print('  Tweet queue empty -- skipping email')\n"
    "        return\n"
    "\n"
    "    subject = 'PaceMap tweets -- {} {}'.format(course, race_date_str)\n"
    "\n"
    "    lines = [\n"
    "        'PaceMap tweet copy for {} -- {}'.format(course, race_date_str),\n"
    "        '=' * 60,\n"
    "        '',\n"
    "        'Copy each tweet into Buffer manually.',\n"
    "        '',\n"
    "    ]\n"
    "    for i, tweet in enumerate(queue, 1):\n"
    "        scheduled  = tweet.get('scheduled_time', '')\n"
    "        tweet_type = tweet.get('type', '')\n"
    "        text       = tweet.get('text', '')\n"
    "        lines.append('TWEET {} [{}]'.format(i, tweet_type))\n"
    "        lines.append('Scheduled: {}'.format(scheduled))\n"
    "        lines.append('-' * 40)\n"
    "        lines.append(text)\n"
    "        lines.append('')\n"
    "\n"
    "    body = '\\n'.join(lines)\n"
    "    msg = MIMEMultipart()\n"
    "    msg['From']    = gmail_from\n"
    "    msg['To']      = 'ppcjobber@gmail.com'\n"
    "    msg['Subject'] = subject\n"
    "    msg.attach(MIMEText(body, 'plain'))\n"
    "\n"
    "    try:\n"
    "        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:\n"
    "            server.login(gmail_from, gmail_pass)\n"
    "            server.send_message(msg)\n"
    "        print('  Tweet email sent -- {} tweets'.format(len(queue)))\n"
    "    except Exception as e:\n"
    "        print('  Tweet email failed: {}'.format(e))\n"
    "\n"
    "\n"
)
apply(
    "PATCH 5a -- _send_tweet_email function",
    "def _write_tweet_queue(slug, course, race_date_str, races_data):",
    SEND_EMAIL + "def _write_tweet_queue(slug, course, race_date_str, races_data):",
)


# ── PATCH 5b: Call _send_tweet_email at end of _write_tweet_queue ──
apply(
    "PATCH 5b -- call _send_tweet_email in _write_tweet_queue",
    "    print('  Tweet queue updated -- {} tweets queued'.format(len(queue)))",
    (
        "    print('  Tweet queue updated -- {} tweets queued'.format(len(queue)))\n"
        "    _send_tweet_email(queue, course, race_date_str)  # PATCH 5b"
    ),
)

# Fallback: the print line uses an em-dash in the original
apply(
    "PATCH 5b (em-dash variant) -- call _send_tweet_email",
    "    print('  Tweet queue updated \u2014 {} tweets queued'.format(len(queue)))",
    (
        "    print('  Tweet queue updated \u2014 {} tweets queued'.format(len(queue)))\n"
        "    _send_tweet_email(queue, course, race_date_str)  # PATCH 5b"
    ),
)


# ── Report ────────────────────────────────────────────────────
print()
print("=" * 55)
print("  PIPELINE PATCHER RESULTS")
print("=" * 55)
for msg in applied:  print("  [OK]     " + msg)
for msg in skipped:  print("  [SKIP]   " + msg)
for msg in failed:   print("  [FAIL]   " + msg)
print("=" * 55)
print("  Applied: {}  |  Skipped: {}  |  Failed: {}".format(
    len(applied), len(skipped), len(failed)))

out = sys.argv[1].replace(".py", "_fixed.py")
with open(out, "w", encoding="utf-8") as f:
    f.write(src)

if failed:
    print()
    print("  Some patches failed -- output written with successful patches only.")
    print("  Apply failed patches manually (see patterns above).")
else:
    print()
    print("  All patches applied. Output: " + out)

print()
print("  Next steps:")
print("    1. Diff:   diff pipeline.py " + out)
print("    2. Add secrets in GitHub repo settings:")
print("         GMAIL_APP_PASSWORD  (from myaccount.google.com/apppasswords)")
print("         GMAIL_FROM          (ppcjobber@gmail.com)")
print("    3. cp {} pipeline.py".format(out))
print("    4. git add pipeline.py")
print('    5. git commit -m "fix: AW going Standard label + tweet email"')
print("    6. git push")
print()
