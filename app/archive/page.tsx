"use client";

import Nav from "@/components/Nav";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useMemo, useState } from "react";

type Meeting = {
  slug: string;
  date: string;
  label: string;
  going: string;
  races: number;
  courseSlug: string;
  latest?: boolean;
};

const MEETINGS: Meeting[] = [
  // ⚠️ KEEP YOUR EXISTING MEETINGS ARRAY HERE — DO NOT REPLACE ⚠️
  // The cron pipeline writes to this array. Paste your current MEETINGS
  // contents in place of this comment block.
];

/* ─────────────────────────────────────────────────────────────
   Course surface classification
   ───────────────────────────────────────────────────────────── */

// Courses where the overwhelming majority of fixtures are National Hunt.
// Dual-purpose courses (Doncaster, Newbury, Ascot, Haydock, etc.) live in
// "Flat & Dual-Purpose" because that's where their bigger meetings sit.
const JUMPS_ONLY_COURSES = new Set([
  "aintree", "bangor-on-dee", "carlisle", "cheltenham", "clonmel",
  "downpatrick", "exeter", "fairyhouse", "fakenham", "fontwell",
  "hereford", "hexham", "huntingdon", "kelso", "kilbeggan",
  "ludlow", "market-rasen", "newton-abbot", "perth", "plumpton",
  "punchestown", "sedgefield", "stratford", "taunton", "tramore",
  "uttoxeter", "wetherby", "wexford", "wincanton", "bellewstown",
]);

type Surface = "all-weather" | "jumps" | "flat";

function classifySurface(m: Meeting): Surface {
  if (m.courseSlug.endsWith("-aw")) return "all-weather";
  if (JUMPS_ONLY_COURSES.has(m.courseSlug)) return "jumps";
  return "flat";
}

const SURFACE_LABELS: Record<Surface, string> = {
  "flat": "Flat & Dual-Purpose Turf",
  "jumps": "Jumps",
  "all-weather": "All-Weather",
};

const SURFACE_ORDER: Surface[] = ["flat", "jumps", "all-weather"];

/* ─────────────────────────────────────────────────────────────
   Date helpers
   ───────────────────────────────────────────────────────────── */

function parseDateString(s: string): Date {
  // "15 May 2026" → Date
  return new Date(s.split(" ").reverse().join(" "));
}

function toISODate(s: string): string {
  // "15 May 2026" → "2026-05-15" for date picker comparison
  const d = parseDateString(s);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/* ─────────────────────────────────────────────────────────────
   Recent-days grouping (top section)
   ───────────────────────────────────────────────────────────── */

function groupRecent(meetings: Meeting[], days = 7) {
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - (days - 1));

  const recent = meetings.filter(m => parseDateString(m.date) >= cutoff);

  const now = new Date();
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const today     = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const yd        = new Date(now); yd.setDate(now.getDate() - 1);
  const yesterday = `${yd.getDate()} ${months[yd.getMonth()]} ${yd.getFullYear()}`;
  const tm        = new Date(now); tm.setDate(now.getDate() + 1);
  const tomorrow  = `${tm.getDate()} ${months[tm.getMonth()]} ${tm.getFullYear()}`;

  const groups: Record<string, Meeting[]> = {};
  for (const m of recent) {
    const key = m.date === tomorrow ? "__tomorrow__"
              : m.date === today ? "__today__"
              : m.date === yesterday ? "__yesterday__"
              : m.date;
    if (!groups[key]) groups[key] = [];
    groups[key].push(m);
  }

  const order = Object.keys(groups).sort((a, b) => {
    const rank = (k: string) =>
      k === "__tomorrow__" ? -3
      : k === "__today__" ? -2
      : k === "__yesterday__" ? -1
      : parseDateString(k).getTime() * -1;
    return rank(a) - rank(b);
  });

  return order.map(key => ({
    label: key === "__tomorrow__"  ? "Tomorrow"
         : key === "__today__"     ? "Today"
         : key === "__yesterday__" ? "Yesterday"
         : key,
    meetings: groups[key],
  }));
}

/* ─────────────────────────────────────────────────────────────
   Course grouping (main section)
   ───────────────────────────────────────────────────────────── */

type CourseGroup = {
  courseSlug: string;
  courseName: string;
  surface: Surface;
  meetings: Meeting[];
};

function groupByCourse(meetings: Meeting[]): Record<Surface, CourseGroup[]> {
  const byCourse: Record<string, CourseGroup> = {};

  for (const m of meetings) {
    const courseName = m.label.split(" \u2014 ")[0];
    if (!byCourse[m.courseSlug]) {
      byCourse[m.courseSlug] = {
        courseSlug: m.courseSlug,
        courseName,
        surface: classifySurface(m),
        meetings: [],
      };
    }
    byCourse[m.courseSlug].meetings.push(m);
  }

  // Sort meetings within each course (newest first)
  for (const slug in byCourse) {
    byCourse[slug].meetings.sort(
      (a, b) => parseDateString(b.date).getTime() - parseDateString(a.date).getTime()
    );
  }

  const bySurface: Record<Surface, CourseGroup[]> = {
    "flat": [],
    "jumps": [],
    "all-weather": [],
  };

  for (const slug in byCourse) {
    bySurface[byCourse[slug].surface].push(byCourse[slug]);
  }

  // Sort courses alphabetically within each surface
  for (const surface of SURFACE_ORDER) {
    bySurface[surface].sort((a, b) => a.courseName.localeCompare(b.courseName));
  }

  return bySurface;
}

/* ─────────────────────────────────────────────────────────────
   Inline styles (matched to existing aesthetic)
   ───────────────────────────────────────────────────────────── */

const styles = {
  mono: { fontFamily: "'DM Mono',monospace" },
  bebas: { fontFamily: "'Bebas Neue',sans-serif" },
  input: {
    fontFamily: "'DM Mono',monospace",
    fontSize: "0.72rem",
    padding: "9px 12px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "5px",
    color: "var(--cream)",
    outline: "none",
    minWidth: "0",
  } as React.CSSProperties,
  card: (latest?: boolean) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 18px",
    background: latest ? "rgba(201,168,76,0.055)" : "rgba(255,255,255,0.025)",
    border: latest ? "1px solid rgba(201,168,76,0.2)" : "1px solid rgba(255,255,255,0.07)",
    borderRadius: "7px",
    flexWrap: "wrap" as const,
    gap: "8px",
  }),
};

/* ─────────────────────────────────────────────────────────────
   Meeting row (shared between recent + course sections)
   ───────────────────────────────────────────────────────────── */

function MeetingRow({ m, showCourse = true }: { m: Meeting; showCourse?: boolean }) {
  const course = m.label.split(" \u2014 ")[0];
  return (
    <div style={styles.card(m.latest)}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", flex: 1 }}>
        {showCourse ? (
          <Link href={`/courses/${m.courseSlug}`}
            style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--gold)", textDecoration: "none" }}>
            {course}
          </Link>
        ) : (
          <span style={{ ...styles.mono, fontSize: "0.72rem", color: "rgba(245,240,232,0.7)", minWidth: "110px" }}>
            {m.date}
          </span>
        )}
        <span style={{ ...styles.mono, fontSize: "0.6rem", color: "rgba(245,240,232,0.35)" }}>
          {m.going}
        </span>
        <span style={{ ...styles.mono, fontSize: "0.6rem", color: "rgba(245,240,232,0.35)" }}>
          {m.races} races
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {m.latest && (
          <span style={{ ...styles.mono, fontSize: "0.56rem", padding: "2px 7px", borderRadius: "3px",
            background: "rgba(201,168,76,0.15)", color: "var(--gold)",
            border: "0.5px solid rgba(201,168,76,0.3)" }}>
            Latest
          </span>
        )}
        <Link href={`/meetings/${m.slug}`}
          style={{ ...styles.mono, fontSize: "0.58rem", letterSpacing: "0.07em", textTransform: "uppercase",
            padding: "3px 9px", borderRadius: "3px",
            background: "rgba(255,255,255,0.05)", color: "rgba(245,240,232,0.45)", textDecoration: "none" }}>
          View →
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Course block with internal pagination
   ───────────────────────────────────────────────────────────── */

const PER_PAGE = 10;

function CourseBlock({ group }: { group: CourseGroup }) {
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(group.meetings.length / PER_PAGE));
  const pageStart = (page - 1) * PER_PAGE;
  const pageMeetings = group.meetings.slice(pageStart, pageStart + PER_PAGE);
  const mostRecent = group.meetings[0]?.date;

  return (
    <div style={{ marginBottom: "12px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "7px",
      overflow: "hidden" }}>

      <button
        onClick={() => setExpanded(v => !v)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px", background: "transparent", border: "none",
          cursor: "pointer", textAlign: "left", color: "var(--cream)" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--gold)" }}>
            {group.courseName}
          </span>
          <span style={{ ...styles.mono, fontSize: "0.58rem", color: "rgba(245,240,232,0.35)" }}>
            {group.meetings.length} meeting{group.meetings.length !== 1 ? "s" : ""}
          </span>
          {mostRecent && (
            <span style={{ ...styles.mono, fontSize: "0.58rem", color: "rgba(245,240,232,0.25)" }}>
              last: {mostRecent}
            </span>
          )}
        </div>
        <span style={{ ...styles.mono, fontSize: "0.7rem", color: "rgba(245,240,232,0.4)" }}>
          {expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <div style={{ padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {pageMeetings.map(m => (
            <MeetingRow key={m.slug} m={m} showCourse={false} />
          ))}

          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px",
              marginTop: "8px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ ...styles.mono, fontSize: "0.6rem", padding: "4px 10px", borderRadius: "3px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: page === 1 ? "rgba(245,240,232,0.15)" : "rgba(245,240,232,0.5)",
                  cursor: page === 1 ? "not-allowed" : "pointer" }}>
                ← Prev
              </button>
              <span style={{ ...styles.mono, fontSize: "0.6rem", color: "rgba(245,240,232,0.4)" }}>
                {page} / {totalPages}
              </span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                style={{ ...styles.mono, fontSize: "0.6rem", padding: "4px 10px", borderRadius: "3px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: page === totalPages ? "rgba(245,240,232,0.15)" : "rgba(245,240,232,0.5)",
                  cursor: page === totalPages ? "not-allowed" : "pointer" }}>
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */

export default function ArchivePage() {
  const [courseFilter, setCourseFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const courseOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const m of MEETINGS) {
      const name = m.label.split(" \u2014 ")[0];
      if (!seen.has(m.courseSlug)) seen.set(m.courseSlug, name);
    }
    return Array.from(seen.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filtered = useMemo(() => {
    return MEETINGS.filter(m => {
      if (courseFilter && m.courseSlug !== courseFilter) return false;
      if (dateFilter && toISODate(m.date) !== dateFilter) return false;
      return true;
    });
  }, [courseFilter, dateFilter]);

  const isFiltering = courseFilter !== "" || dateFilter !== "";
  const recent = useMemo(() => groupRecent(filtered, 7), [filtered]);
  const bySurface = useMemo(() => groupByCourse(filtered), [filtered]);

  return (
    <>
      <Nav />
      <div className="wrap">

        {/* Header */}
        <div style={{ marginBottom: "32px", paddingBottom: "24px",
          borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
          <p style={{ ...styles.mono, fontSize: "0.6rem", textTransform: "uppercase",
            letterSpacing: "0.12em", color: "rgba(245,240,232,0.35)", marginBottom: "8px" }}>
            Meeting Archive
          </p>
          <h1 style={{ ...styles.bebas, fontSize: "2.2rem", color: "var(--cream)", marginBottom: "8px" }}>
            All Pace Maps
          </h1>
          <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.4)",
            lineHeight: 1.7, maxWidth: "480px" }}>
            Every meeting published on PaceMap — permanently accessible for reference and research.
          </p>
          <p style={{ ...styles.mono, fontSize: "0.6rem", color: "rgba(245,240,232,0.25)", marginTop: "10px" }}>
            {MEETINGS.length} meeting{MEETINGS.length !== 1 ? "s" : ""} published
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
          <select
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
            style={{ ...styles.input, flex: "1 1 200px" }}
          >
            <option value="">All courses</option>
            {courseOptions.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            style={{ ...styles.input, flex: "1 1 180px" }}
          />
          {isFiltering && (
            <button
              onClick={() => { setCourseFilter(""); setDateFilter(""); }}
              style={{ ...styles.mono, fontSize: "0.6rem", letterSpacing: "0.07em",
                textTransform: "uppercase", padding: "9px 14px", borderRadius: "5px",
                background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)",
                color: "var(--gold)", cursor: "pointer" }}>
              Clear
            </button>
          )}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ ...styles.mono, fontSize: "0.72rem", color: "rgba(245,240,232,0.3)" }}>
              {isFiltering
                ? "No meetings match those filters."
                : "No meetings published yet — check back on a race day."}
            </p>
          </div>
        )}

        {/* Recent days (only when not filtering) */}
        {!isFiltering && recent.length > 0 && (
          <section style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <h2 style={{ ...styles.bebas, fontSize: "1.3rem", letterSpacing: "0.06em",
                color: "var(--cream)", margin: 0 }}>
                Recent Days
              </h2>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            </div>

            {recent.map(group => (
              <div key={group.label} style={{ marginBottom: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                  <span style={{ ...styles.bebas, fontSize: "1rem", letterSpacing: "0.06em",
                    color: (group.label === "Today" || group.label === "Tomorrow")
                      ? "var(--gold)" : "rgba(245,240,232,0.55)" }}>
                    {group.label}
                  </span>
                  <div style={{ flex: 1, height: "1px",
                    background: (group.label === "Today" || group.label === "Tomorrow")
                      ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.06)" }} />
                  <span style={{ ...styles.mono, fontSize: "0.58rem", color: "rgba(245,240,232,0.25)" }}>
                    {group.meetings.length} meeting{group.meetings.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {group.meetings.map(m => <MeetingRow key={m.slug} m={m} showCourse={true} />)}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* By course (always shown, surface-grouped) */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
            <h2 style={{ ...styles.bebas, fontSize: "1.3rem", letterSpacing: "0.06em",
              color: "var(--cream)", margin: 0 }}>
              {isFiltering ? "Results" : "Browse by Course"}
            </h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            {isFiltering && (
              <span style={{ ...styles.mono, fontSize: "0.58rem", color: "rgba(245,240,232,0.35)" }}>
                {filtered.length} meeting{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {SURFACE_ORDER.map(surface => {
            const groups = bySurface[surface];
            if (groups.length === 0) return null;
            const count = groups.reduce((sum, g) => sum + g.meetings.length, 0);

            return (
              <div key={surface} style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <span style={{ ...styles.mono, fontSize: "0.62rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "rgba(245,240,232,0.55)" }}>
                    {SURFACE_LABELS[surface]}
                  </span>
                  <span style={{ ...styles.mono, fontSize: "0.55rem", color: "rgba(245,240,232,0.25)" }}>
                    {groups.length} course{groups.length !== 1 ? "s" : ""} · {count} meeting{count !== 1 ? "s" : ""}
                  </span>
                </div>

                {groups.map(g => <CourseBlock key={g.courseSlug} group={g} />)}
              </div>
            );
          })}
        </section>

      </div>
      <Footer />
    </>
  );
}
