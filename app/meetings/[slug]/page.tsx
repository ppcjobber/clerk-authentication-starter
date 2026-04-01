"use client";

import Nav from "@/components/Nav";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

// ── Types ─────────────────────────────────────────────────────

type Runner = {
  name: string;
  or: number;
  style_code: string;
  finish_type: string;
  dist_code: string;
  going_flag: string;
  note: string;
  draw: number | null;
  draw_adv: string | null;
  jockey: string;
  trainer: string;
  trainer_rtf: string;
  trainer_14: string;
  last_run: number | null;
  age: string;
  form: string;
  lbs: string;
  headgear: string;
  rpr: number | null;
  ts: number | null;
};

type Scenario = {
  label: string;
  title: string;
  prob: number;
  trigger: string;
  body: string;
  winners: string[];
  others: string[];
};

type WatchPoint = {
  severity: "danger" | "warn" | "info";
  text: string;
};

type Race = {
  id: number;
  time: string;
  name: string;
  grade: string;
  dist: string;
  going: string;
  runners: number;
  free: boolean;
  type: string;
  pace: string;
  paceConf: number;
  leads: string[];
  prominent: string[];
  midfield: string[];
  holdup: string[];
  drawBias?: { favoured: string; magnitude: string } | null;
  runners_data: Runner[];
  paceDynamic: string;
  scenarios: Scenario[];
  watchPoints: WatchPoint[];
};

type MeetingData = {
  course: string;
  date: string;
  slug: string;
  races: Race[];
};

// ── Helpers ───────────────────────────────────────────────────

function isPastMeeting(dateStr: string): boolean {
  const months: Record<string, number> = {
    January:0, February:1, March:2, April:3, May:4, June:5,
    July:6, August:7, September:8, October:9, November:10, December:11,
  };
  const parts = dateStr.split(" ");
  if (parts.length !== 3) return false;
  const [day, month, year] = parts;
  const meetingDate = new Date(parseInt(year), months[month], parseInt(day));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return meetingDate < today;
}

// ── Colour palette ────────────────────────────────────────────
// Brightened for legibility on dark green background

const STYLE_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  L: { bg: "rgba(231,76,60,0.18)",   text: "#e74c3c", label: "Lead"      },
  P: { bg: "rgba(243,156,18,0.18)",  text: "#f39c12", label: "Prominent" },
  M: { bg: "rgba(52,152,219,0.18)",  text: "#3498db", label: "Midfield"  },
  H: { bg: "rgba(165,105,189,0.18)", text: "#a569bd", label: "Hold Up"   },
  U: { bg: "rgba(149,165,166,0.18)", text: "#95a5a6", label: "Unknown"   },
};

const SCENARIO_COLORS = [
  { bg: "rgba(52,152,219,0.07)",  letter: { bg: "rgba(52,152,219,0.2)",  color: "#3498db" }, bar: "#3498db" },
  { bg: "rgba(165,105,189,0.07)", letter: { bg: "rgba(165,105,189,0.2)", color: "#a569bd" }, bar: "#a569bd" },
  { bg: "rgba(46,204,113,0.07)",  letter: { bg: "rgba(46,204,113,0.2)",  color: "#2ecc71" }, bar: "#2ecc71" },
  { bg: "rgba(231,76,60,0.07)",   letter: { bg: "rgba(231,76,60,0.2)",   color: "#e74c3c" }, bar: "#e74c3c" },
];

const WATCH_COLORS: Record<string, string> = {
  danger: "#e74c3c",
  warn:   "#f39c12",
  info:   "#3498db",
};

const LANE_STYLES = [
  { key: "leads",     label: "Lead",      bg: "rgba(231,76,60,0.1)",   head: "#e74c3c", pill: { bg: "rgba(231,76,60,0.2)",   text: "#e74c3c" } },
  { key: "prominent", label: "Prominent", bg: "rgba(243,156,18,0.1)",  head: "#f39c12", pill: { bg: "rgba(243,156,18,0.2)",  text: "#f39c12" } },
  { key: "midfield",  label: "Midfield",  bg: "rgba(52,152,219,0.1)",  head: "#3498db", pill: { bg: "rgba(52,152,219,0.2)",  text: "#3498db" } },
  { key: "holdup",    label: "Hold Up",   bg: "rgba(165,105,189,0.1)", head: "#a569bd", pill: { bg: "rgba(165,105,189,0.2)", text: "#a569bd" } },
];

const thStyle: React.CSSProperties = {
  fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", textTransform: "uppercase",
  letterSpacing: "0.07em", color: "rgba(201,168,76,0.7)", padding: "8px 10px",
  textAlign: "left", fontWeight: 500,
};
const tdStyle: React.CSSProperties = { padding: "8px 10px", verticalAlign: "middle" };

// ── Sub-components ────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
      textTransform: "uppercase", letterSpacing: "0.1em",
      color: "rgba(245,240,232,0.35)", marginBottom: "8px", fontWeight: 500 }}>
      {children}
    </p>
  );
}

function PaceStrip({ race }: { race: Race }) {
  return (
    <div style={{ display: "flex", borderRadius: "8px", overflow: "hidden",
      border: "0.5px solid rgba(255,255,255,0.08)", marginBottom: "20px" }}>
      {LANE_STYLES.map(lane => {
        const horses: string[] = (race as any)[lane.key] || [];
        return (
          <div key={lane.key} style={{ flex: 1, background: lane.bg, padding: "10px 8px",
            borderRight: "0.5px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.7rem",
              color: lane.head, letterSpacing: "0.06em", marginBottom: "6px" }}>
              {lane.label} · {horses.length}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
              {horses.length === 0
                ? <span style={{ fontSize: "0.6rem", color: "rgba(245,240,232,0.25)", fontStyle: "italic" }}>None</span>
                : horses.map(h => (
                    <span key={h} style={{ fontSize: "0.58rem", padding: "2px 5px", borderRadius: "3px",
                      background: lane.pill.bg, color: lane.pill.text }}>
                      {h}
                    </span>
                  ))
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PaceDynamic({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "7px",
      padding: "12px 16px", marginBottom: "20px",
      borderLeft: "3px solid rgba(201,168,76,0.35)",
      fontSize: "0.78rem", lineHeight: "1.75", color: "rgba(245,240,232,0.7)" }}>
      {text}
    </div>
  );
}

function RunnerTable({ runners, isFlat }: { runners: Runner[]; isFlat: boolean }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: "7px",
      border: "0.5px solid rgba(255,255,255,0.08)", marginBottom: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.72rem" }}>
        <thead>
          <tr style={{ background: "rgba(201,168,76,0.08)",
            borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
            {isFlat && <th style={thStyle}>#</th>}
            <th style={thStyle}>Horse</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>OR</th>
            <th style={thStyle}>RPR</th>
            <th style={thStyle}>Form</th>
            <th style={thStyle}>Style</th>
            <th style={thStyle}>Jockey</th>
            <th style={thStyle}>Trainer</th>
            <th style={thStyle}>Last Run</th>
            <th style={{ ...thStyle, width: "30%" }}>Note</th>
          </tr>
        </thead>
        <tbody>
          {runners.map((r, i) => {
            const sc = STYLE_COLORS[r.style_code] || STYLE_COLORS["U"];
            return (
              <tr key={i} style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                {isFlat && (
                  <td style={tdStyle}>
                    <span style={{ color: "rgba(245,240,232,0.35)", fontSize: "0.65rem" }}>
                      {r.draw || "—"}
                    </span>
                  </td>
                )}
                <td style={tdStyle}>
                  <div style={{ fontWeight: 600, color: "var(--cream)", fontSize: "0.78rem" }}>
                    {r.name}
                  </div>
                  {r.headgear && (
                    <div style={{ fontSize: "0.6rem", color: "#f39c12", marginTop: "1px" }}>
                      {r.headgear}
                    </div>
                  )}
                </td>
                <td style={{ ...tdStyle, color: "rgba(245,240,232,0.5)", fontSize: "0.68rem" }}>
                  {r.age || "—"}
                </td>
                <td style={{ ...tdStyle, color: "rgba(245,240,232,0.5)" }}>
                  {r.or || "—"}
                </td>
                <td style={{ ...tdStyle, color: "rgba(245,240,232,0.5)" }}>
                  {r.rpr || "—"}
                </td>
                <td style={{ ...tdStyle, color: "rgba(245,240,232,0.5)", fontSize: "0.68rem",
                  fontFamily: "'DM Mono',monospace", letterSpacing: "0.05em" }}>
                  {r.form || "—"}
                </td>
                <td style={tdStyle}>
                  <span style={{ background: sc.bg, color: sc.text, fontSize: "0.65rem",
                    padding: "2px 5px", borderRadius: "3px", fontWeight: 500 }}>
                    {r.style_code}
                  </span>
                </td>
                <td style={{ ...tdStyle, color: "rgba(245,240,232,0.7)", fontSize: "0.68rem" }}>
                  {r.jockey || "—"}
                </td>
                <td style={{ ...tdStyle, fontSize: "0.65rem", lineHeight: "1.4" }}>
                  <div style={{ color: "rgba(245,240,232,0.6)" }}>{r.trainer || "—"}</div>
                  {r.trainer_14 && (
                    <div style={{ color: "rgba(201,168,76,0.7)", fontSize: "0.6rem",
                      fontFamily: "'DM Mono',monospace" }}>
                      {r.trainer_14} 14d
                    </div>
                  )}
                </td>
                <td style={{ ...tdStyle, color: "rgba(245,240,232,0.45)",
                  fontSize: "0.65rem", fontFamily: "'DM Mono',monospace" }}>
                  {r.last_run != null ? `${r.last_run}d` : "—"}
                </td>
                <td style={{ ...tdStyle, color: "rgba(245,240,232,0.55)",
                  fontSize: "0.68rem", lineHeight: "1.5" }}>
                  {r.note || "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ScenarioCards({ scenarios }: { scenarios: Scenario[] }) {
  if (!scenarios.length) return null;
  return (
    <>
      <style>{`@media(max-width:600px){.scenario-grid{grid-template-columns:1fr!important}}`}</style>
      <div className="scenario-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "10px", marginBottom: "20px",
      }}>
        {scenarios.map((sc, i) => {
          const col = SCENARIO_COLORS[i % SCENARIO_COLORS.length];
          return (
            <div key={sc.label} style={{ background: col.bg, borderRadius: "8px",
              border: "0.5px solid rgba(255,255,255,0.08)", padding: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0,
                  background: col.letter.bg, color: col.letter.color, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "0.78rem", fontWeight: 600 }}>
                  {sc.label}
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--cream)" }}>
                    {sc.title}
                  </div>
                  <div style={{ fontSize: "0.6rem", color: "rgba(245,240,232,0.35)",
                    fontFamily: "'DM Mono',monospace" }}>
                    {sc.prob}% probability
                  </div>
                </div>
              </div>
              <div style={{ height: "3px", borderRadius: "2px",
                background: "rgba(255,255,255,0.1)", marginBottom: "9px", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: "2px",
                  background: col.bar, width: `${sc.prob}%` }} />
              </div>
              <div style={{ fontSize: "0.68rem", fontWeight: 500, color: "rgba(245,240,232,0.8)",
                marginBottom: "5px", lineHeight: "1.4" }}>
                {sc.trigger}
              </div>
              <div style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.5)",
                lineHeight: "1.55", marginBottom: "9px" }}>
                {sc.body}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {sc.winners.map(h => (
                  <span key={h} style={{ fontSize: "0.6rem", padding: "2px 6px", borderRadius: "3px",
                    background: "rgba(46,204,113,0.2)", color: "#2ecc71",
                    border: "0.5px solid rgba(46,204,113,0.4)", fontWeight: 500 }}>
                    {h}
                  </span>
                ))}
                {sc.others.map(h => (
                  <span key={h} style={{ fontSize: "0.6rem", padding: "2px 6px", borderRadius: "3px",
                    background: "rgba(255,255,255,0.06)", color: "rgba(245,240,232,0.45)",
                    border: "0.5px solid rgba(255,255,255,0.1)" }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function WatchPoints({ points }: { points: WatchPoint[] }) {
  if (!points.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      {points.map((wp, i) => (
        <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
            background: WATCH_COLORS[wp.severity] || WATCH_COLORS.info, marginTop: "5px" }} />
          <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.6)", lineHeight: "1.6" }}
            dangerouslySetInnerHTML={{ __html: wp.text.replace(
              /\*\*(.+?)\*\*/g, '<strong style="color:var(--cream);font-weight:500">$1</strong>'
            )}} />
        </div>
      ))}
    </div>
  );
}

// ── Race card ─────────────────────────────────────────────────

function RaceCard({ race, hasAccess, meetingDate }: {
  race: Race;
  hasAccess: boolean;
  meetingDate: string;
}) {
  const isFlat   = race.type === "flat";
  const historic = isPastMeeting(meetingDate);

  if (!race.free && !hasAccess && !historic) {
    return (
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "10px", marginBottom: "16px", padding: "20px",
      }}>
        <div style={{ marginBottom: "14px" }}>
          <div style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(1rem,3vw,1.3rem)",
            color: "var(--gold)", marginBottom: "4px",
          }}>
            {race.time} — {race.name}
          </div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            color: "rgba(245,240,232,0.4)" }}>
            {race.dist} · {race.going} · {race.grade} · {race.runners} runners
          </div>
        </div>
        <div style={{
          background: "rgba(10,61,31,0.7)",
          border: "1px solid rgba(201,168,76,0.15)",
          borderRadius: "8px", padding: "24px 20px",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "10px", textAlign: "center",
        }}>
          <div style={{ fontSize: "1.4rem" }}>🔒</div>
          <p style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.5)",
            maxWidth: "280px", lineHeight: "1.65", margin: 0 }}>
            Unlock all races with a Day Pass (£2.99) or Monthly (£9.99/mo)
          </p>
          <Link href="/pricing" className="btn btn-gold">
            Unlock Full Card →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "10px", overflow: "hidden", marginBottom: "28px" }}>

      <div style={{ padding: "16px 20px", background: "rgba(201,168,76,0.07)",
        borderBottom: "1px solid rgba(201,168,76,0.14)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "8px" }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(1rem,3vw,1.3rem)", color: "var(--gold)" }}>
            {race.time} — {race.name}
          </div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            color: "rgba(245,240,232,0.4)", marginTop: "3px" }}>
            {race.dist} · {race.going} · {race.grade} · {race.runners} runners
          </div>
        </div>
        <div style={{ display: "flex", gap: "7px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
            padding: "3px 8px", borderRadius: "3px",
            background: "rgba(255,255,255,0.05)", color: "rgba(245,240,232,0.4)" }}>
            {race.pace} · {race.paceConf}% conf
          </span>
          {race.free && (
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem",
              padding: "3px 8px", borderRadius: "3px",
              background: "rgba(46,204,113,0.18)", color: "#2ecc71",
              border: "0.5px solid rgba(46,204,113,0.35)" }}>FREE</span>
          )}
          {historic && (
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem",
              padding: "3px 8px", borderRadius: "3px",
              background: "rgba(201,168,76,0.12)", color: "var(--gold)",
              border: "0.5px solid rgba(201,168,76,0.3)" }}>HISTORIC</span>
          )}
          {isFlat && race.drawBias && (
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem",
              padding: "3px 8px", borderRadius: "3px",
              background: "rgba(52,152,219,0.14)", color: "#5dade2",
              border: "0.5px solid rgba(52,152,219,0.3)" }}>
              Draw: {race.drawBias.favoured} · {race.drawBias.magnitude}
            </span>
          )}
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <SectionLabel>Race shape</SectionLabel>
        <PaceStrip race={race} />
        {race.paceDynamic && <PaceDynamic text={race.paceDynamic} />}
        <SectionLabel>Runner profiles</SectionLabel>
        <RunnerTable runners={race.runners_data} isFlat={isFlat} />
        {race.scenarios?.length > 0 && (
          <>
            <SectionLabel>Race scenarios</SectionLabel>
            <ScenarioCards scenarios={race.scenarios} />
          </>
        )}
        {race.watchPoints?.length > 0 && (
          <>
            <SectionLabel>Watch points</SectionLabel>
            <WatchPoints points={race.watchPoints} />
          </>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function MeetingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { isSignedIn } = useUser();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking]   = useState(true);
  const [data, setData]           = useState<MeetingData | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);

  useEffect(() => {
    params.then(p => {
      fetch(`/api/meeting-data?slug=${p.slug}`)
        .then(r => { if (!r.ok) throw new Error("Not found"); return r.json(); })
        .then(d => { setData(d); setLoading(false); })
        .catch(() => { setError(true); setLoading(false); });
    });
  }, [params]);

  useEffect(() => {
    if (!isSignedIn) { setChecking(false); return; }
    fetch("/api/check-subscription")
      .then(r => r.json())
      .then(d => { setHasAccess(d.active); setChecking(false); })
      .catch(() => setChecking(false));
  }, [isSignedIn]);

  if (loading) return (
    <>
      <Nav />
      <div className="wrap" style={{ paddingTop: "140px", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem",
          color: "rgba(245,240,232,0.4)" }}>Loading race data…</p>
      </div>
    </>
  );

  if (error || !data) return (
    <>
      <Nav />
      <div className="wrap" style={{ paddingTop: "140px", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem",
          color: "rgba(245,240,232,0.4)" }}>Meeting not found.</p>
        <Link href="/archive" style={{ color: "var(--gold)",
          fontFamily: "'DM Mono',monospace", fontSize: "0.7rem" }}>
          ← Back to archive
        </Link>
      </div>
    </>
  );

  const historic = isPastMeeting(data.date);

  return (
    <>
      <Nav />
      <div className="wrap">
        <div style={{ marginBottom: "28px", paddingBottom: "18px",
          borderBottom: "1px solid rgba(201,168,76,0.18)",
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
              textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "6px" }}>
              <Link href="/archive" style={{ color: "rgba(245,240,232,0.3)" }}>Archive</Link>
              <span style={{ margin: "0 6px" }}>›</span>
              {data.course} · {data.date}
            </p>
            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(1.5rem,5vw,2rem)", color: "var(--cream)" }}>
              {data.course}
            </h1>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem",
              color: "rgba(245,240,232,0.35)", marginTop: "3px" }}>
              {data.date} · {data.races.length} races
            </p>
          </div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            color: "rgba(245,240,232,0.28)", textAlign: "right", lineHeight: "1.7" }}>
            {historic
              ? "✓ Historic — full access"
              : checking
              ? "Checking access…"
              : hasAccess
              ? "✓ Full access"
              : "Race 1 free · Rest locked"
            }
          </p>
        </div>

        {data.races.map((race, i) => (
          <RaceCard key={i} race={race} hasAccess={hasAccess} meetingDate={data.date} />
        ))}
      </div>
      <Footer />
    </>
  );
}
