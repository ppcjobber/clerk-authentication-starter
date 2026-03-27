"use client";

import Nav from "@/components/Nav";
import Link from "next/link";
import { useEffect, useState } from "react";

type Meeting = {
  slug: string;
  date: string;
  label: string;
  going: string;
  races: number;
  courseSlug: string;
  latest?: boolean;
};

export default function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const [courseSlug, setCourseSlug] = useState('');
  const [meetings, setMeetings]     = useState<Meeting[]>([]);
  const [loading, setLoading]       = useState(true);
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    params.then(p => {
      setCourseSlug(p.course);
      fetch(`https://raw.githubusercontent.com/ppcjobber/clerk-authentication-starter/main/app/archive/page.tsx`, { cache: 'no-store' })
        .then(r => r.text())
        .then(text => {
          const arrayMatch = text.match(/const MEETINGS[^=]*=\s*\[([\s\S]*?)\];/);
          if (!arrayMatch) { setLoading(false); return; }

          const entries = arrayMatch[1].split(/\},\s*\{/);
          const found: Meeting[] = [];

          for (const entry of entries) {
            const slug       = (entry.match(/slug:\s*"([^"]+)"/)       || [])[1];
            const date       = (entry.match(/date:\s*"([^"]+)"/)       || [])[1];
            const label      = (entry.match(/label:\s*"([^"]+)"/)      || [])[1];
            const going      = (entry.match(/going:\s*"([^"]*)"/)      || [])[1] || '';
            const cs         = (entry.match(/courseSlug:\s*"([^"]+)"/) || [])[1] || '';
            const racesM     = entry.match(/races:\s*(\d+)/);
            const races      = racesM ? parseInt(racesM[1]) : 0;
            const latestM    = entry.match(/latest:\s*(true|false)/);
            const latest     = latestM ? latestM[1] === 'true' : false;

            if (!slug || !date || !label) continue;
            if (cs !== p.course) continue;

            found.push({ slug, date, label, going, races, courseSlug: cs, latest });
          }

          // Sort reverse chronological
          found.sort((a, b) => {
            const da = new Date(a.date.split(' ').reverse().join(' '));
            const db = new Date(b.date.split(' ').reverse().join(' '));
            return db.getTime() - da.getTime();
          });

          if (found.length > 0) {
            setCourseName(found[0].label.split(' \u2014 ')[0]);
          }
          setMeetings(found);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  }, [params]);

  if (loading) return (
    <>
      <Nav />
      <div className="wrap" style={{ paddingTop: "140px", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem",
          color: "rgba(245,240,232,0.4)" }}>Loading...</p>
      </div>
    </>
  );

  return (
    <>
      <Nav />
      <div className="wrap">

        <div style={{ marginBottom: "40px", paddingBottom: "24px",
          borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
            textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "6px" }}>
            <Link href="/archive" style={{ color: "rgba(245,240,232,0.3)" }}>Archive</Link>
            <span style={{ margin: "0 6px" }}>›</span>
            Courses
            <span style={{ margin: "0 6px" }}>›</span>
            {courseName || courseSlug}
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem",
            color: "var(--cream)", marginBottom: "6px" }}>
            {courseName || courseSlug}
          </h1>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem",
            color: "rgba(245,240,232,0.35)" }}>
            {meetings.length} pace map{meetings.length !== 1 ? 's' : ''} published
          </p>
        </div>

        {meetings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem",
              color: "rgba(245,240,232,0.3)" }}>
              No meetings published for this course yet.
            </p>
            <Link href="/archive" style={{ color: "var(--gold)",
              fontFamily: "'DM Mono',monospace", fontSize: "0.7rem" }}>
              ← Back to archive
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {meetings.map(m => (
              <Link key={m.slug} href={`/meetings/${m.slug}`}
                style={{ display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: "13px 18px",
                  background: m.latest ? "rgba(201,168,76,0.055)" : "rgba(255,255,255,0.025)",
                  border: m.latest ? "1px solid rgba(201,168,76,0.2)" : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "7px",
                  flexWrap: "wrap", gap: "8px",
                  textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--cream)" }}>
                    {m.date}
                  </span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
                    color: "rgba(245,240,232,0.35)" }}>
                    {m.going}
                  </span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
                    color: "rgba(245,240,232,0.35)" }}>
                    {m.races} races
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {m.latest && (
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.56rem",
                      padding: "2px 7px", borderRadius: "3px",
                      background: "rgba(201,168,76,0.15)", color: "var(--gold)",
                      border: "0.5px solid rgba(201,168,76,0.3)" }}>
                      Latest
                    </span>
                  )}
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
                    letterSpacing: "0.07em", textTransform: "uppercase",
                    padding: "3px 9px", borderRadius: "3px",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(245,240,232,0.45)" }}>
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
      <footer>
        <span className="footer-brand">PaceMap</span>
        <span className="footer-note">
          pacemap.co.uk · A Signalweight product<br />
          For informational purposes only · Not financial advice
        </span>
      </footer>
    </>
  );
}
