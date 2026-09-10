"""
strands.py: nine-strand runner scorecard, published alongside the pace map.

Each runner is scored from -2 to +2 on:
    form, going, trip, trainer, jockey, draw, track, finish, position
Missing evidence is None (shown as '?'), never a silent zero penalty.
Form counts 1.5x in the total; the rest count once.

Everything is computed from the pipeline's ResultsCache (12 months of GB/IRE
results), the racecard, and the DRAW_BIAS table, so it works on any course.
Course-specific evidence (pace profile, trainer and jockey course records)
comes from the cache for the meeting's own course.

Usage from pipeline.py:
    ctx = StrandContext(cache, today, course_name, helpers)
    block = score_race(ctx, racecard, dist_f, is_flat)
"""

import re
import math
from collections import defaultdict
import datetime as _dt

STRANDS = [
    ('form', 'Form'), ('going', 'Going'), ('trip', 'Trip'), ('trainer', 'Trainer'),
    ('jockey', 'Jockey'), ('draw', 'Draw'), ('track', 'Track'), ('finish', 'Finish'),
    ('position', 'Position'),
]
WEIGHTS = {'form': 1.5}
EP_VALUE = {'FRONT_RUNNER': 3, 'PROMINENT': 2, 'MIDFIELD': 1, 'HOLD_UP': 0}
STYLE_SHORT = {'FRONT_RUNNER': 'L', 'PROMINENT': 'P', 'MIDFIELD': 'M', 'HOLD_UP': 'H'}
STYLE_WORD = {'L': 'Leader', 'P': 'Prominent', 'M': 'Midfield', 'H': 'Held up'}
TRAINER_DAYS = 21


# ── small helpers ────────────────────────────────────────────────────────
def _num(x):
    try:
        v = float(str(x).strip())
        return v if v == v else None
    except (TypeError, ValueError):
        return None

def _pos(x):
    v = _num(x)
    return int(v) if v else None

def _dist_f(x):
    if x is None:
        return None
    s = str(x).strip().lower()
    v = _num(s.replace('f', ''))
    if v:
        return v
    m = re.search(r'(\d+)m', s); f = re.search(r'(\d+\.?\d*)f', s); y = re.search(r'(\d+)y', s)
    tot = (float(m.group(1)) * 8 if m else 0) + (float(f.group(1)) if f else 0) + (float(y.group(1)) / 220 if y else 0)
    return round(tot, 2) if tot else None

def going_group(g):
    """soft / good / fast / aw from the main going description (ignores '(... in places)').
    'soft' means good to soft or softer (incl. yielding): strict soft/heavy is too
    rare to measure a course's pace bias (10 of Chester's 110 races last year)."""
    main = (g or '').lower().split('(')[0].strip()
    if main.startswith('standard') or main.startswith('slow'):
        return 'aw'
    if 'soft' in main or 'heavy' in main or 'yielding' in main:
        return 'soft'
    if 'firm' in main or 'hard' in main:
        return 'fast'
    return 'good'

GOING_WORD = {'soft': 'good to soft or softer', 'fast': 'good to firm or faster', 'good': 'good', 'aw': 'all-weather'}

def dist_band(d):
    if d is None: return 'unknown'
    if d <= 6.5: return 'sprint'
    if d <= 9.5: return 'mile'
    if d <= 12.5: return 'middle'
    return 'staying'

def norm_jockey(j):
    return re.sub(r'\(\d+\)', '', j or '').strip().lower()

def claim_lbs(j):
    m = re.search(r'\((\d+)\)', j or '')
    return int(m.group(1)) if m else 0

def _clip(x):
    return None if x is None else float(max(-2, min(2, x)))

def _shrunk_ae(wins, expected):
    return (wins + 1.0) / (expected + 1.0)

def _market_probs(race):
    """Normalised SP probabilities for a race's runners (None where no SP)."""
    inv = []
    for rn in race['runners']:
        sp = _num(rn.get('sp_dec'))
        inv.append(1.0 / sp if sp and sp > 1 else None)
    tot = sum(v for v in inv if v)
    return [(v / tot if (v and tot) else None) for v in inv]


# ── context: everything that is per-meeting rather than per-race ─────────
class StrandContext:
    """Pre-computes trainer/jockey form, course records and the course pace
    profile once per meeting. `helpers` supplies functions from pipeline.py:
        irc(comment) -> 'FRONT_RUNNER'|'PROMINENT'|'MIDFIELD'|'HOLD_UP'|'UNKNOWN'
        finish(comment) -> +1 / 0 / -1 / None
        course_code(name) -> 3-letter code
        course_match(code_a, code_b) -> 0..4 (COURSE_DATA similarity)
        draw_bias (dict), course_slug(name) -> slug
    """

    def __init__(self, cache, today, course_name, helpers):
        self.cache = cache
        self.today = today
        self.course = course_name
        self.h = helpers
        self.code = helpers['course_code'](course_name)
        if cache.index is None:
            cache._build_index()
        self._races = self._all_races()
        self._trainer_recent, self._jockey_recent = self._recent_stats()
        self._trainer_course, self._jockey_course = self._course_people()
        self._pace = self._pace_profiles()

    def _all_races(self):
        seen, out = set(), []
        for month in self.cache.months.values():
            for r in month.values():
                if r['race_id'] not in seen:
                    seen.add(r['race_id']); out.append(r)
        for r in getattr(self.cache, 'today_races', []) or []:
            if r['race_id'] not in seen:
                seen.add(r['race_id']); out.append(r)
        return out

    def _recent_stats(self):
        cutoff = str(self.today - _dt.timedelta(days=TRAINER_DAYS))
        tr = defaultdict(lambda: [0, 0, 0.0, 0]); jk = defaultdict(lambda: [0, 0, 0.0, 0])
        for r in self._races:
            if str(r.get('date', '')) < cutoff: continue
            probs = _market_probs(r)
            for rn, p in zip(r['runners'], probs):
                pos = _pos(rn.get('position'))
                for key, store in ((rn.get('trainer_id'), tr), (norm_jockey(rn.get('jockey')), jk)):
                    if not key: continue
                    s = store[key]; s[0] += 1
                    if pos == 1: s[1] += 1
                    if p: s[2] += p
                    if pos and pos <= 3: s[3] += 1
        return tr, jk

    def _course_people(self):
        tr = defaultdict(lambda: [0, 0, 0.0]); jk = defaultdict(lambda: [0, 0, 0.0])
        for r in self._races:
            if r.get('course') != self.course: continue
            probs = _market_probs(r)
            for rn, p in zip(r['runners'], probs):
                pos = _pos(rn.get('position'))
                for key, store in ((rn.get('trainer_id'), tr), (norm_jockey(rn.get('jockey')), jk)):
                    if not key: continue
                    s = store[key]; s[0] += 1
                    if pos == 1: s[1] += 1
                    if p: s[2] += p
        return tr, jk

    def _pace_profiles(self):
        """Win A/E by running style, keyed (scope, code, band, going_group).
        scope 'course' uses this course only; 'all' uses every course."""
        irc = self.h['irc']
        acc = defaultdict(lambda: [0, 0, 0.0])      # runs, wins, expected
        for r in self._races:
            code = 'flat' if str(r.get('type', '')).lower() == 'flat' else 'jumps'
            band = dist_band(_dist_f(r.get('dist_f') or r.get('dist')))
            gg = 'soft' if going_group(r.get('going')) == 'soft' else 'other'
            probs = _market_probs(r)
            here = r.get('course') == self.course
            for rn, p in zip(r['runners'], probs):
                st = STYLE_SHORT.get(irc(rn.get('comment')))
                if not st or not p: continue
                win = 1 if _pos(rn.get('position')) == 1 else 0
                for scope in (('course', 'all') if here else ('all',)):
                    for key in ((scope, code, band, gg, st), (scope, code, band, 'any', st)):
                        a = acc[key]; a[0] += 1; a[1] += win; a[2] += p
        return acc

    def pace_ae(self, code, band, soft, style):
        """Most specific cell with enough data. Returns (ae, runs, wins, scope_desc)."""
        gg = 'soft' if soft else 'other'
        # small cells are shrunk towards 1.0 by _shrunk_ae, so a modest minimum is safe
        for scope, g, min_runs in (('course', gg, 15), ('course', 'any', 30), ('all', gg, 60), ('all', 'any', 60)):
            a = self._pace.get((scope, code, band, g, style))
            if a and a[0] >= min_runs and a[2] > 0:
                return _shrunk_ae(a[1], a[2]), a[0], a[1], (scope, g)
        return None, 0, 0, None

    def similar(self, course_name):
        """Same handedness, same type (sharp/galloping) and 3+ of 4 COURSE_DATA attributes."""
        cd = self.h.get('course_data', {})
        a = cd.get(self.h['course_code'](course_name)); b = cd.get(self.code)
        if not a or not b or a['handed'] != b['handed'] or a['type'] != b['type']:
            return False
        return self.h['course_match'](self.h['course_code'](course_name), self.code) >= 3

    def trainer(self, tid):
        return self._trainer_recent.get(tid), self._trainer_course.get(tid)

    def jockey(self, name):
        k = norm_jockey(name)
        return self._jockey_recent.get(k), self._jockey_course.get(k)

    def draw_cell(self, dist_f):
        slug = self.h['course_slug'](self.course).replace('-ire', '')
        return self.h['draw_bias'].get(slug, {}).get(dist_band(dist_f))


# ── per-horse evidence ───────────────────────────────────────────────────
def _horse_profile(ctx, horse_id, is_flat, dist_f, today_gg):
    races = ctx.cache.horse_results(horse_id, limit=40)   # all of the last 12 months, not just 15 runs
    runs = []
    for r in races:
        if (str(r.get('type', '')).lower() == 'flat') != is_flat:
            continue
        rn = next((x for x in r['runners'] if x.get('horse_id') == horse_id), None)
        if not rn: continue
        runs.append(dict(
            date=str(r.get('date', '')), course=r.get('course', ''), dist=_dist_f(r.get('dist_f') or r.get('dist')),
            gg=going_group(r.get('going')), pos=_pos(rn.get('position')), n=len(r['runners']),
            perf=_num(rn.get('performance_rating')), orr=_num(rn.get('or')),
            style=ctx.h['irc'](rn.get('comment')), fin=ctx.h['finish'](rn.get('comment'))))
    runs.sort(key=lambda x: x['date'], reverse=True)
    p = {'runs': runs}
    perfs = [r['perf'] for r in runs[:4] if r['perf']]
    p['FR'] = sum(sorted(perfs, reverse=True)[:2]) / len(sorted(perfs, reverse=True)[:2]) if perfs else None
    allp = [r['perf'] for r in runs if r['perf']]
    p['best'] = max(allp) if allp else None
    p['mean'] = sum(allp) / len(allp) if allp else None
    # running style, recency-weighted over last six
    st = [(EP_VALUE[r['style']], 0.9 ** i) for i, r in enumerate([r for r in runs[:6] if r['style'] in EP_VALUE])]
    p['EP'] = sum(v * w for v, w in st) / sum(w for _, w in st) if st else None
    p['n_style'] = len(st)
    # going group record
    g = [r for r in runs if r['gg'] == today_gg]
    p['g_runs'] = len(g); p['g_w'] = sum(1 for r in g if r['pos'] == 1)
    p['g_pl'] = sum(1 for r in g if r['pos'] and r['pos'] <= 3)
    gp = [r['perf'] for r in g if r['perf']]
    p['g_rel'] = (max(gp) - p['best']) if (gp and p['best']) else None
    # trip record
    win = 2.0 if (dist_f or 0) >= 12 else 1.0
    t = [r for r in runs if r['dist'] and dist_f and abs(r['dist'] - dist_f) <= win]
    p['t_runs'] = len(t); p['t_w'] = sum(1 for r in t if r['pos'] == 1)
    p['t_pl'] = sum(1 for r in t if r['pos'] and r['pos'] <= 3)
    tp = [r['perf'] for r in t if r['perf']]
    p['t_rel'] = (max(tp) - p['FR']) if (tp and p['FR']) else None
    p['max_dist'] = max([r['dist'] for r in runs if r['dist']], default=None)
    # track: this course, then similar courses
    here = [r for r in runs if r['course'] == ctx.course]
    p['c_runs'] = len(here); p['c_w'] = sum(1 for r in here if r['pos'] == 1)
    p['c_pl'] = sum(1 for r in here if r['pos'] and r['pos'] <= 3)
    sim = [r for r in runs if r['course'] != ctx.course and ctx.similar(r['course'])]
    p['s_runs'] = len(sim); p['s_w'] = sum(1 for r in sim if r['pos'] == 1)
    p['s_pl'] = sum(1 for r in sim if r['pos'] and r['pos'] <= 3)
    sp = [r['perf'] for r in sim if r['perf']]
    p['s_rel'] = (sum(sp) / len(sp) - p['mean']) if (sp and p['mean']) else None
    # finishing effort
    fins = [r['fin'] for r in runs[:6] if r['fin'] is not None]
    p['fin'] = sum(fins) / len(fins) if len(fins) >= 3 else None
    p['fin_up'] = sum(1 for f in fins if f > 0); p['fin_down'] = sum(1 for f in fins if f < 0); p['fin_n'] = len(fins)
    return p


# ── race scoring ─────────────────────────────────────────────────────────
def score_race(ctx, racecard, dist_f, is_flat):
    runners = [r for r in racecard.get('runners', []) if r.get('horse_id')]
    n = len(runners)
    if n == 0:
        return None
    today_gg = going_group(racecard.get('going'))
    soft = today_gg == 'soft'
    hcap = 'handicap' in (racecard.get('race_name') or '').lower()
    band = dist_band(dist_f)
    code = 'flat' if is_flat else 'jumps'
    lbs = {r['horse_id']: _num(r.get('lbs')) for r in runners}
    maxlbs = max([v for v in lbs.values() if v] or [0])

    profiles = {r['horse_id']: _horse_profile(ctx, r['horse_id'], is_flat, dist_f, today_gg) for r in runners}

    # handicap weight residuals -> penalties / out of the handicap
    oh = {r['horse_id']: 0.0 for r in runners}
    if hcap:
        rated = [(r, _num(r.get('ofr')), lbs[r['horse_id']], _num(r.get('age'))) for r in runners]
        older = [x for x in rated if x[1] and x[2] and (x[3] or 4) >= 4]
        if older:
            top = max(older, key=lambda x: x[1])
            res = {x[0]['horse_id']: x[2] - (top[2] - (top[1] - x[1])) for x in rated if x[1] and x[2]}
            three = [res[x[0]['horse_id']] for x in rated if x[3] == 3 and x[0]['horse_id'] in res]
            wfa = -sorted(three)[len(three) // 2] if three else 0
            for x in rated:
                hid = x[0]['horse_id']
                if hid in res:
                    oh[hid] = max(0.0, res[hid] + (wfa if x[3] == 3 else 0))

    # form base (lbs)
    base = {}
    for r in runners:
        hid = r['horse_id']; p = profiles[hid]; orr = _num(r.get('ofr')); cl = claim_lbs(r.get('jockey'))
        if p['FR'] is None:
            base[hid] = None
        elif hcap and orr:
            base[hid] = 0.6 * (p['FR'] - orr) + 0.6 * cl - oh[hid]
        else:
            blend = 0.6 * p['FR'] + 0.4 * orr if orr else p['FR']
            base[hid] = blend + (maxlbs - (lbs[hid] or maxlbs)) + 0.6 * cl
    vals = [v for v in base.values() if v is not None]
    mu = sum(vals) / len(vals) if vals else 0
    sd = math.sqrt(sum((v - mu) ** 2 for v in vals) / len(vals)) if len(vals) > 1 else 1
    sd = sd or 1

    leaders = sum(1 for p in profiles.values() if p['EP'] is not None and p['EP'] >= 2.3)
    cell = ctx.draw_cell(dist_f) if is_flat else None
    draws = sorted(_pos(r.get('draw')) for r in runners if _pos(r.get('draw')))

    out = []
    for r in runners:
        hid = r['horse_id']; p = profiles[hid]; s = {}; note = {}
        # form
        if base[hid] is None:
            s['form'] = None; note['form'] = 'No form in the last 12 months'
        else:
            z = (base[hid] - mu) / sd
            s['form'] = 2 if z > 1 else 1 if z > 0.4 else -2 if z < -1 else -1 if z < -0.4 else 0
            orr = _num(r.get('ofr'))
            note['form'] = (f"Best recent figures {p['FR']:.0f} against a mark of {orr:.0f}" if (hcap and orr)
                            else f"Best recent figures {p['FR']:.0f}")
            if oh[hid] >= 1:
                note['form'] += f"; carries {oh[hid]:.0f} lb over the mark"
        # going
        gw = GOING_WORD[today_gg]
        if p['g_runs'] == 0:
            s['going'] = None; note['going'] = f'Unraced on {gw}'
        else:
            if p['g_w'] >= 1: s['going'] = 2
            elif p['g_pl'] >= 1 and p['g_pl'] / p['g_runs'] >= 0.5: s['going'] = 1
            elif p['g_rel'] is not None and p['g_rel'] <= -15: s['going'] = -2
            elif p['g_rel'] is not None and p['g_rel'] <= -8: s['going'] = -1
            else: s['going'] = 0
            note['going'] = f"On {gw}: {p['g_w']} won, {p['g_pl'] - p['g_w']} placed from {p['g_runs']}"
        # trip
        if p['t_runs'] == 0:
            if p['max_dist'] and dist_f and dist_f > p['max_dist'] + 1:
                s['trip'] = -1; note['trip'] = f"Never raced this far (longest {p['max_dist']:g}f)"
            else:
                s['trip'] = None; note['trip'] = 'No runs around this trip'
        else:
            if p['t_w'] >= 1: s['trip'] = 2
            elif p['t_rel'] is not None and p['t_rel'] <= -15: s['trip'] = -2
            elif p['t_rel'] is not None and p['t_rel'] <= -8: s['trip'] = -1
            elif p['t_pl'] >= 1: s['trip'] = 1
            else: s['trip'] = 0
            note['trip'] = f"Around this trip: {p['t_w']} won, {p['t_pl'] - p['t_w']} placed from {p['t_runs']}"
        # trainer
        rec, crs = ctx.trainer(r.get('trainer_id'))
        if rec and rec[0] >= 5:
            sae = _shrunk_ae(rec[1], rec[2])
            t = 2 if sae >= 1.3 else 1 if sae >= 1.1 else -2 if sae <= 0.6 else -1 if sae <= 0.8 else 0
            txt = f"{r.get('trainer', '')}: {rec[1]} from {rec[0]} in {TRAINER_DAYS} days"
        else:
            t = 0; txt = f"{r.get('trainer', '')}: few runners in {TRAINER_DAYS} days"
        if crs and crs[0] >= 10 and crs[2] > 0:
            cae = crs[1] / crs[2]
            t += 1 if cae >= 1.5 else (-1 if cae <= 0.5 else 0)
            txt += f"; {ctx.course} {crs[1]} from {crs[0]}"
        s['trainer'] = _clip(t); note['trainer'] = txt
        # jockey
        jrec, jcrs = ctx.jockey(r.get('jockey'))
        j = 0; parts = []
        if jcrs and jcrs[0] >= 8 and jcrs[2] > 0:
            jae = jcrs[1] / jcrs[2]
            j += 1.5 if jae >= 1.4 else (-1.5 if jae <= 0.5 else 0)
            parts.append(f"{ctx.course} {jcrs[1]} from {jcrs[0]}")
        elif jcrs:
            parts.append(f"{ctx.course} {jcrs[1]} from {jcrs[0]}")
        else:
            parts.append(f'no {ctx.course} rides in 12 months')
        if jrec and jrec[0] >= 10:
            jsae = _shrunk_ae(jrec[1], jrec[2])
            j += 1 if jsae >= 1.3 else (-1 if jsae <= 0.7 else 0)
            parts.append(f"{jrec[1]} from {jrec[0]} in {TRAINER_DAYS} days")
        jname = re.sub(r'\(\d+\)', '', r.get('jockey', '') or '').strip()
        s['jockey'] = _clip(round(j)); note['jockey'] = jname + ': ' + '; '.join(parts)
        # draw
        dr = _pos(r.get('draw'))
        if not is_flat or not dr:
            s['draw'] = None; note['draw'] = 'No draw' if not is_flat else 'Draw not declared'
        else:
            rank = draws.index(dr) + 1 if dr in draws else dr
            third = 'L' if rank <= n / 3 else ('H' if rank > 2 * n / 3 else 'M')
            word = {'L': 'low', 'M': 'middle', 'H': 'high'}[third]
            if cell:
                v = cell[third]
                if not cell.get('sig') and abs(v) > 2.0: v = 0.0     # same noise rule as _draw_adjustment
                s['draw'] = _clip(round(v / 1.2)) if abs(v) >= 0.9 else 0
                note['draw'] = f"Stall {dr} of {n} ({word} third): {v:+.1f} lb here at this trip"
            else:
                s['draw'] = None; note['draw'] = f"Stall {dr} of {n} ({word} third): no draw data for this course and trip"
        # track
        if p['c_runs'] and p['c_w']:
            s['track'] = 2
        elif p['s_runs'] >= 2:
            rel = p['s_rel'] if p['s_rel'] is not None else 0
            s['track'] = (2 if (p['s_w'] >= 1 and rel >= 0) else 1 if rel >= 3
                          else -2 if (rel <= -6 and p['s_pl'] == 0) else -1 if rel <= -4 else 0)
        elif p['c_runs']:
            s['track'] = 1 if p['c_pl'] else 0
        else:
            s['track'] = None
        tparts = []
        if p['c_runs']: tparts.append(f"{ctx.course} {p['c_w']} won, {p['c_pl'] - p['c_w']} placed from {p['c_runs']}")
        if p['s_runs']: tparts.append(f"similar tracks {p['s_w']} won, {p['s_pl'] - p['s_w']} placed from {p['s_runs']}")
        note['track'] = '; '.join(tparts) if tparts else 'No runs here or on similar tracks'
        # finish
        if p['fin'] is None:
            s['finish'] = None; note['finish'] = 'Too few race comments'
        else:
            f = p['fin']
            s['finish'] = 2 if f >= 0.6 else 1 if f >= 0.3 else -2 if f <= -0.6 else -1 if f <= -0.3 else 0
            note['finish'] = f"Finished strongly in {p['fin_up']} and weakened in {p['fin_down']} of the last {p['fin_n']}"
        # position: horse's style against this course's pace profile
        if p['EP'] is None:
            s['position'] = None; note['position'] = 'Running style unknown'
        else:
            st = 'L' if p['EP'] >= 2.3 else 'P' if p['EP'] >= 1.5 else 'M' if p['EP'] >= 0.8 else 'H'
            ae, runs, wins, scope = ctx.pace_ae(code, band, soft, st)
            if ae is None:
                s['position'] = None; note['position'] = f"{STYLE_WORD[st]}; no pace data for this trip"
            else:
                # thresholds allow for shrinkage towards 1.0 in _shrunk_ae
                sc = 2 if ae >= 1.25 else 1 if ae >= 1.08 else -2 if ae <= 0.6 else -1 if ae <= 0.85 else 0
                if st == 'L' and leaders >= 3 and sc > 0: sc -= 1        # contested lead
                s['position'] = float(sc)
                where = ctx.course if scope[0] == 'course' else 'all courses'
                gtxt = ' on good to soft or softer' if scope[1] == 'soft' else ''
                note['position'] = f"{STYLE_WORD[st]}. {STYLE_WORD[st]} runners{gtxt} at {where} over this trip: {wins} won from {runs} (A/E {ae:.2f})"
                if st == 'L' and leaders >= 3: note['position'] += f"; {leaders} habitual leaders in this race"
        total = sum((s[k] or 0) * WEIGHTS.get(k, 1) for k, _ in STRANDS)
        out.append(dict(name=r.get('horse', ''), draw=dr, total=round(total, 1),
                        known=sum(1 for k, _ in STRANDS if s[k] is not None),
                        negatives=sum(1 for k, _ in STRANDS if (s[k] or 0) < 0),
                        scores=[s[k] for k, _ in STRANDS], notes=[note[k] for k, _ in STRANDS]))

    # ranking: total, then fewer negatives, then position
    pos_i = [k for k, _ in STRANDS].index('position')
    out.sort(key=lambda x: (-x['total'], x['negatives'], -(x['scores'][pos_i] or 0)))
    top = out[0]
    gap = top['total'] - (out[1]['total'] if len(out) > 1 else 0)
    conf = 'High' if gap >= 3 else 'Medium' if gap >= 1.5 else 'Low'
    if top['known'] < 6 and conf != 'Low':
        conf = {'High': 'Medium', 'Medium': 'Low'}[conf]
    dangers = [x['name'] for x in out[1:3] if top['total'] - x['total'] <= 2.5] or ([out[1]['name']] if len(out) > 1 else [])
    keys = [lab for k, lab in STRANDS]
    pos_list = [keys[i].lower() for i, v in enumerate(top['scores']) if (v or 0) >= 1]
    neg_list = [keys[i].lower() for i, v in enumerate(top['scores']) if (v or 0) <= -1]
    summary = (f"{top['name']} tops the strands on {top['total']:g}"
               + (f", positive on {', '.join(pos_list)}" if pos_list else '')
               + (f"; negatives: {', '.join(neg_list)}." if neg_list else '; no negative strand.'))
    return {
        'version': 1,
        'strands': [{'key': k, 'label': lab} for k, lab in STRANDS],
        'weights': WEIGHTS,
        'going_group': today_gg,
        'runners': out,
        'pick': top['name'],
        'dangers': dangers,
        'confidence': conf,
        'summary': summary,
    }
