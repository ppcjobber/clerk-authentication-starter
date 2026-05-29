import Link from "next/link";

type Meeting = {
  slug: string;
  course: string;
  going: string;
  races: number;
  courseSlug: string;
};

type MeetingsResponse = {
  today: Meeting[];
  tomorrow: Meeting[];
};

async function getUpcomingMeetings(): Promise<MeetingsResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://pacemap.co.uk';
    const res = await fetch(`${baseUrl}/api/meeting-data-list`, { cache: 'no-store' });
    if (!res.ok) return { today: [], tomorrow: [] };
    return await res.json();
  } catch {
    return { today: [], tomorrow: [] };
  }
}

function MeetingCard({ m }: { m: Meeting }) {
  return (
    <Link href={`/meetings/${m.slug}`}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 18px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "6px", flexWrap: "wrap", gap: "8px",
        textDecoration: "none",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
        <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--cream)" }}>
          {m.course}
        </span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
          color: "rgba(245,240,232,0.38)" }}>
          {m.going}
        </span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
          color: "rgba(245,240,232,0.38)" }}>
          {m.races} races
        </span>
      </div>
      <span style={{
        fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
        letterSpacing: "0.07em", textTransform: "uppercase",
        padding: "3px 9px", borderRadius: "2px",
        background: "rgba(39,174,96,0.18)", color: "#2ecc71",
        border: "1px solid rgba(39,174,96,0.35)",
      }}>
        View →
      </span>
    </Link>
  );
}

function MeetingSection({ title, meetings, emptyText }: {
  title: string;
  meetings: Meeting[];
  emptyText: string;
}) {
  return (
    <div style={{ marginBottom: "36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
        <span style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
          letterSpacing: "0.06em",
          color: title === "Today" ? "var(--gold)" : "rgba(245,240,232,0.55)",
        }}>
          {title}
        </span>
        <div style={{ flex: 1, height: "1px",
          background: title === "Today"
            ? "rgba(201,168,76,0.2)"
            : "rgba(255,255,255,0.06)" }} />
        {meetings.length > 0 && (
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
            color: "rgba(245,240,232,0.25)" }}>
            {meetings.length} meeting{meetings.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {meetings.length === 0 ? (
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem",
          color: "rgba(245,240,232,0.3)", lineHeight: "1.8" }}>
          {emptyText}
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {meetings.map(m => <MeetingCard key={m.slug} m={m} />)}
        </div>
      )}
    </div>
  );
}

export default async function Home() {
  const { today, tomorrow } = await getUpcomingMeetings();

  return (
    <>

      {/* Hero */}
      <section style={{
        position: "relative", zIndex: 1,
        padding: "clamp(100px, 12vw, 140px) clamp(20px, 5vw, 40px) 72px",
        maxWidth: "1100px", margin: "0 auto",
      }}>
        <p className="a0" style={{
          fontFamily: "'DM Mono',monospace", fontSize: "0.68rem",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "var(--gold)", marginBottom: "18px",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <span style={{ display: "block", width: "28px", height: "1px", background: "var(--gold)" }} />
          Horse Racing · Race Shape Analysis
        </p>
        <h1 className="a1" style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(3rem,8vw,7rem)",
          lineHeight: "0.92", letterSpacing: "0.02em",
          color: "var(--cream)", marginBottom: "20px",
        }}>
          Read the<br /><span style={{ color: "var(--gold)" }}>race before</span><br />it runs.
        </h1>
        <p className="a2" style={{
          fontFamily: "'Playfair Display',serif", fontStyle: "italic",
          fontSize: "clamp(0.95rem,2.2vw,1.35rem)",
          color: "rgba(245,240,232,0.5)", marginBottom: "20px",
          maxWidth: "520px", lineHeight: "1.55",
        }}>
          Published the evening before — so you arrive informed, not guessing.
        </p>
        <p className="a3" style={{
          fontSize: "0.88rem", color: "rgba(245,240,232,0.6)",
          maxWidth: "460px", lineHeight: "1.85", marginBottom: "44px",
        }}>
          PaceMap models how each race will be run before it happens. Field composition,
          running styles, pace scenarios and tactical watch points — built from historical
          form data and published every evening for the following day&apos;s racing.
        </p>
        <div className="a4" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/archive" className="btn btn-gold">View All Meetings →</Link>
          <Link href="/pricing" style={{
            fontFamily: "'DM Mono',monospace", fontSize: "0.68rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: "rgba(245,240,232,0.45)",
          }}>See pricing →</Link>
        </div>
      </section>

      {/* Features strip */}
      <section style={{
        position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.025)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "60px clamp(20px,5vw,40px)",
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "44px",
        }}>
          {[
            {
              n: "01",
              title: "Running Style Analysis",
              body: "Every declared runner's recent form is analysed to classify their typical race position — front-runner, prominent, midfield or hold-up. Classification is derived from actual race data, not assumed.",
            },
            {
              n: "02",
              title: "Four Scenario Modelling",
              body: "Each race is modelled into four scenarios — A through D — with probability weightings, named triggers, and the horses each scenario suits. Structured analysis of how the race could unfold, not a tip.",
            },
            {
              n: "03",
              title: "No Tips. Just Context.",
              body: "PaceMap tells you where the traffic will be, which horses have a soft lead, where the pace will collapse, and which runners face an uphill task. What you do with that is up to you.",
            },
            {
              n: "04",
              title: "AI-Written. Data-Grounded.",
              body: "The analysis is written by AI, based entirely on the structured output of the data engine. The language is generated — the analysis behind it is not.",
            },
          ].map(i => (
            <div key={i.n} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem",
                color: "rgba(201,168,76,0.18)", lineHeight: 1 }}>{i.n}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.05rem",
                letterSpacing: "0.1em", color: "var(--gold)" }}>{i.title}</div>
              <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: "1.85" }}>
                {i.body}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works link */}
        <div style={{
          maxWidth: "1100px", margin: "32px auto 0",
          textAlign: "center",
        }}>
          <Link href="/how-it-works" style={{
            fontFamily: "'DM Mono',monospace", fontSize: "0.68rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: "rgba(245,240,232,0.45)",
          }}>
            How it works in detail →
          </Link>
        </div>
      </section>

      {/* Meetings section */}
      <section style={{
        position: "relative", zIndex: 1,
        maxWidth: "1100px", margin: "0 auto",
        padding: "60px clamp(20px,5vw,40px)",
      }}>
        <p style={{
          fontFamily: "'DM Mono',monospace", fontSize: "0.62rem",
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--gold)", marginBottom: "6px",
        }}>Race Cards</p>
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.9rem",
          letterSpacing: "0.04em", color: "var(--cream)", marginBottom: "32px",
        }}>Published Daily From 6pm</h2>

        <MeetingSection
          title="Today"
          meetings={today}
          emptyText="No meetings published for today yet — check back later."
        />
        <MeetingSection
          title="Tomorrow"
          meetings={tomorrow}
          emptyText="Tomorrow's cards not yet published — check back after 6pm."
        />
      </section>

    </>
  );
}
