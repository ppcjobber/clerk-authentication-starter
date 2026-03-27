import Nav from "@/components/Nav";
import Link from "next/link";

type Meeting = {
  slug: string;
  date: string;
  label: string;
  going: string;
  races: number;
  latest?: boolean;
};

const MEETINGS: any[] = [
  {
    slug:   "dundalk_aw_27-march-2026",
    date:   "27 March 2026",
    label:  "Dundalk (AW) — 27 March 2026",
    going:  "Good",
    races:  7,
    latest: true,
  },];

// ── Group by date ─────────────────────────────────────────────

function groupByDate(meetings: Meeting[]) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  const groups: Record<string, Meeting[]> = {};
  for (const m of meetings) {
    const key = m.date === today
      ? "__today__"
      : m.date === yesterday
      ? "__yesterday__"
      : m.date;
    if (!groups[key]) groups[key] = [];
    groups[key].push(m);
  }

  // Sort groups: today first, yesterday second, then reverse-chrono
  const order = Object.keys(groups).sort((a, b) => {
    if (a === "__today__") return -1;
    if (b === "__today__") return 1;
    if (a === "__yesterday__") return -1;
    if (b === "__yesterday__") return 1;
    // Parse dates for comparison
    const da = new Date(a.split(" ").reverse().join(" "));
    const db = new Date(b.split(" ").reverse().join(" "));
    return db.getTime() - da.getTime();
  });

  return order.map(key => ({
    label: key === "__today__" ? "Today" : key === "__yesterday__" ? "Yesterday" : key,
    meetings: groups[key],
  }));
}

export default function ArchivePage() {
  const grouped = groupByDate(MEETINGS);
  const totalMeetings = MEETINGS.length;

  return (
    <>
      <Nav />
      <div className="wrap">

        {/* Page header */}
        <div style={{ marginBottom: "40px", paddingBottom: "24px",
          borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.35)", marginBottom: "8px" }}>
            Meeting Archive
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem",
            color: "var(--cream)", marginBottom: "8px" }}>
            All Pace Maps
          </h1>
          <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.4)",
            lineHeight: "1.7", maxWidth: "480px" }}>
            Every meeting published on PaceMap — permanently accessible for reference and research.
          </p>
          {totalMeetings > 0 && (
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
              color: "rgba(245,240,232,0.25)", marginTop: "10px" }}>
              {totalMeetings} meeting{totalMeetings !== 1 ? "s" : ""} published
            </p>
          )}
        </div>

        {/* Empty state */}
        {grouped.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem",
              color: "rgba(245,240,232,0.3)" }}>
              No meetings published yet — check back on a race day.
            </p>
          </div>
        )}

        {/* Date groups */}
        {grouped.map(group => (
          <div key={group.label} style={{ marginBottom: "36px" }}>

            {/* Date header */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px",
              marginBottom: "14px" }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
                letterSpacing: "0.06em",
                color: group.label === "Today" ? "var(--gold)" : "rgba(245,240,232,0.55)" }}>
                {group.label}
              </span>
              <div style={{ flex: 1, height: "1px",
                background: group.label === "Today"
                  ? "rgba(201,168,76,0.2)"
                  : "rgba(255,255,255,0.06)" }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
                color: "rgba(245,240,232,0.25)" }}>
                {group.meetings.length} meeting{group.meetings.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Meeting cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {group.meetings.map(m => {
                const course = m.label.split(" \u2014 ")[0];
                return (
                  <Link key={m.slug} href={`/meetings/${m.slug}`}
                    style={{ display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      padding: "13px 18px",
                      background: m.latest
                        ? "rgba(201,168,76,0.055)"
                        : "rgba(255,255,255,0.025)",
                      border: m.latest
                        ? "1px solid rgba(201,168,76,0.2)"
                        : "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "7px",
                      flexWrap: "wrap", gap: "8px",
                      textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center",
                      gap: "14px", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.88rem",
                        color: "var(--cream)" }}>
                        {course}
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
                );
              })}
            </div>

          </div>
        ))}

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
