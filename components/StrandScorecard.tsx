'use client';

/**
 * Strand scorecard: nine-strand runner assessment published by pipeline.py
 * (strands.py) in each race's `strands` field of public/data/{slug}.json.
 *
 * Usage, beside the pace map inside the same paywall gate:
 *   {race.strands && <StrandScorecard data={race.strands} />}
 * Pass hideTitle when the page supplies its own section label.
 */

import { useId, useState } from 'react';
import styles from './StrandScorecard.module.css';

export type StrandScore = number | null;

export interface StrandRunner {
  name: string;
  draw: number | null;
  total: number;
  known: number;
  negatives: number;
  scores: StrandScore[];
  notes: string[];
}

export interface StrandBlock {
  version: number;
  strands: { key: string; label: string }[];
  weights: Record<string, number>;
  going_group: string;
  runners: StrandRunner[];
  pick: string;
  dangers: string[];
  confidence: 'High' | 'Medium' | 'Low';
  summary: string;
}

function tone(v: StrandScore): string {
  if (v === null || v === undefined) return styles.unknown;
  if (v >= 2) return styles.pos2;
  if (v >= 1) return styles.pos1;
  if (v <= -2) return styles.neg2;
  if (v <= -1) return styles.neg1;
  return styles.zero;
}

function fmt(v: StrandScore): string {
  if (v === null || v === undefined) return '?';
  if (v > 0) return `+${v}`;
  if (v < 0) return `\u2212${Math.abs(v)}`;
  return '0';
}

function fmtTotal(t: number): string {
  return Number.isInteger(t) ? String(t) : t.toFixed(1);
}

export default function StrandScorecard({
  data,
  hideTitle = false,
}: {
  data?: StrandBlock | null;
  /** Set when the page already provides a section label. */
  hideTitle?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();
  if (!data || !data.runners?.length) return null;

  const labels = data.strands.map((s) => s.label);
  const cols = { gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr)) 44px` };
  const dangers = data.dangers.length ? data.dangers.join(', ') : 'none';

  return (
    <section className={styles.card} aria-label="Strand scorecard">
      {!hideTitle && <h3 className={styles.title}>Strand scorecard</h3>}

      <div className={styles.pick}>
        <span className={styles.pickName}>{data.pick}</span>
        <span className={styles.pickMeta}>
          Dangers: {dangers}. Confidence: {data.confidence.toLowerCase()}.
        </span>
      </div>
      <p className={styles.summary}>{data.summary}</p>

      <div className={styles.head} style={cols} aria-hidden="true">
        {labels.map((l) => (
          <span key={l} className={styles.headLabel}>{l}</span>
        ))}
        <span className={styles.headTotal}>Total</span>
      </div>

      <ol className={styles.list}>
        {data.runners.map((r, i) => {
          const isOpen = open === i;
          const detId = `${uid}-d${i}`;
          return (
            <li key={r.name} className={styles.item}>
              <button
                type="button"
                className={styles.row}
                style={cols}
                aria-expanded={isOpen}
                aria-controls={detId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className={styles.name}>
                  {r.name}
                  {r.draw ? <span className={styles.draw}> ({r.draw})</span> : null}
                </span>
                {r.scores.map((v, k) => (
                  <span
                    key={k}
                    className={`${styles.cell} ${tone(v)}`}
                    aria-label={`${labels[k]} ${v === null ? 'no evidence' : fmt(v)}`}
                  >
                    {fmt(v)}
                  </span>
                ))}
                <span className={styles.total}>{fmtTotal(r.total)}</span>
              </button>
              {isOpen && (
                <dl id={detId} className={styles.detail}>
                  {r.notes.map((n, k) => (
                    <div key={k} className={styles.detailRow}>
                      <dt>{labels[k]}</dt>
                      <dd>{n}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </li>
          );
        })}
      </ol>

      <details className={styles.how}>
        <summary>How the scores work</summary>
        <p>
          Each runner is scored from &minus;2 to +2 on nine strands. Form counts one and a half
          times, the rest once each. A dashed cell means no evidence and scores zero, so lightly
          raced horses are ranked on less. Tap a runner to see the evidence behind each score.
        </p>
        <p>
          Going is the record on similar ground. Trainer and jockey combine the last 21 days with
          their record at this course. Draw uses the measured draw effect for this course and trip.
          Track is the record here and on tracks of the same shape and direction. Finish is how
          often the horse stayed on or weakened late. Position compares the horse&rsquo;s usual
          running style with how that style has fared at this course over this trip.
        </p>
      </details>
    </section>
  );
}
