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

// ── Six layers visual ─────────────────────────────────────────

const LAYERS = [
  {
    n: "01",
    label: "Anchored Rating",
    tagline: "Built run by run from the horses each runner actually met.",
    href: "/method/a-rating-is-a-sentence",
  },
  {
    n: "02",
    label: "Form Signal",
    tagline: "The in-running prose, parsed for what figures cannot carry.",
    href: "/method/what-the-figures-dont-say",
  },
  {
    n: "03",
    label: "Preference",
    tagline: "Going, trip, course shape against each horse's evidence.",
    href: "/method/when-form-is-information",
  },
  {
    n: "04",
    label: "Pace Shape",
    tagline: "Race shape modelled before the runners leave the stalls.",
    href: "/method/race-shape-before-runners",
  },
  {
    n: "05",
    label: "Dampening",
    tagline: "Confidence in proportion to the evidence underneath.",
    href: "/method/the-part-you-do-by-feel",
  },
  {
    n: "06",
    label: "Structural",
    tagline: "Draw bias and other track-level factors, measured properly.",
    href: "/method/what-the-draw-is-worth",
  },
];

function LayerBlock({ layer }: { layer: typeof LAYERS[number] }) {
  return (
    <Link href={layer.href} style={{
      display: "flex", flexDirection: "column", gap: "10px",
      padding: "22px 20px",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(201,168,76,0.18)",
      borderRadius: "8px",
      textDecoration: "none",
      transition: "background 0.15s, border-color 0.15s",
    }}
    className="layer-block">
      <div style={{
        fontFamily: "'DM Mono',monospace", fontSize: "0.62rem",
        letterSpacing: "0.14em", color: "rgba(201,168,76,0.6)",
      }}>
        {layer.n}
      </div>
      <div style={{
        fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.15rem",
        letterSpacing: "0.06em", color: "var(--gold)",
      }}>
        {layer.label}
      </div>
      <p style={{
        fontSize: "0.78rem", color: "rgba(245,240,232,0.58)",
        lineHeight: "1.7", margin: 0,
      }}>
        {layer.tagline}
      </p>
      <div style={{
        marginTop: "4px",
        fontFamily: "'DM Mono',monospace", fontSize: "0.58rem",
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "rgba(245,240,232,0.4)",
      }}>
        Read →
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────

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
          Horse Racing · The ANCHOR Engine
        </p>
        <h1 className="a1" style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(2.6rem,7vw,5.8rem)",
          lineHeight: "0.96", letterSpacing: "0.02em",
          color: "var(--cream)", marginBottom: "22px",
        }}>
          Race shape,<br />
          <span style={{ color: "var(--gold)" }}>draw bias,</span><br />
          dampening<br />
          — all measured.
        </h1>
        <p className="a2" style={{
          fontFamily: "'Playfair Display',serif", fontStyle: "italic",
          fontSize: "clamp(0.95rem,2.2vw,1.3rem)",
          color: "rgba(245,240,232,0.5)", marginBottom: "20px",
          maxWidth: "560px", lineHeight: "1.55",
        }}>
          ANCHOR reads six layers — and tells you how confident it is in the read.
        </p>
        <p className="a3" style={{
          fontSize: "0.88rem", color: "rgba(245,240,232,0.6)",
          maxWidth: "520px", lineHeight: "1.85", marginBottom: "44px",
        }}>
          PaceMap publishes race shape analysis for British and Irish racing, generated by
          the ANCHOR engine. Anchored private ratings, parsed form, preference, pace,
          draw bias and measured uncertainty — every race, every meeting, published the
          evening before.
        </p>
        <div className="a4" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/archive" className="btn btn-gold">View All Meetings →</Link>
          <Link href="/method" style={{
            fontFamily: "'DM Mono',monospace", fontSize: "0.68rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: "var(--gold)",
          }}>The Method →</Link>
          <Link href="/pricing" style={{
            fontFamily: "'DM Mono',monospace", fontSize: "0.68rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: "rgba(245,240,232,0.45)",
          }}>Pricing →</Link>
        </div>
      </section>

      {/* Six Layers Visual */}
      <section style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "70px clamp(20px,5vw,40px)",
        maxWidth: "1100px", margin: "0 auto",
      }}>
        <div style={{ marginBottom: "32px" }}>
          <p style={{
            fontFamily: "'DM Mono',monospace", fontSize: "0.62rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--gold)", marginBottom: "6px",
          }}>The Engine</p>
          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.7rem,4vw,2.4rem)",
            letterSpacing: "0.03em", color: "var(--cream)", marginBottom: "10px",
          }}>How PaceMap Reads A Race</h2>
          <p style={{
            fontSize: "0.85rem", color: "rgba(245,240,232,0.55)",
            maxWidth: "640px", lineHeight: "1.8",
          }}>
            Six analytical layers, applied in order, every race, every meeting. Each
            layer corrects the read of the one before. Click any layer to read the
            method behind it.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "14px",
        }}>
          {LAYERS.map(layer => <LayerBlock key={layer.n} layer={layer} />)}
        </div>

        <style>{`
          .layer-block:hover {
            background: rgba(201,168,76,0.06) !important;
            border-color: rgba(201,168,76,0.4) !important;
          }
        `}</style>
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
              title: "A Private Rating",
              body: "Each horse's rating is rebuilt run by run from the horses it has actually met, with chain depth, recency and run quality all weighted. The figure carries its working, not just its number.",
            },
            {
              n: "02",
              title: "Race Shape As Input",
              body: "Pace is not commentary written after the race. It is a rating factor applied before. Race shape is classified from the runners declared, and each runner's rating moves with the shape.",
            },
            {
              n: "03",
              title: "Confidence, Not Just Numbers",
              body: "Every projected rating carries a band. A narrow band is a rating that earns its number. A wide band is the engine being honest about evidence it does not have.",
            },
            {
              n: "04",
              title: "Published Evening Before · No Tips",
              body: "The full analysis goes live the night before racing, so you arrive informed rather than guessing. PaceMap does not publish selections. What the engine produces is context, not advice.",
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

        {/* Method link */}
        <div style={{
          maxWidth: "1100px", margin: "32px auto 0",
          textAlign: "center",
        }}>
          <Link href="/method" style={{
            fontFamily: "'DM Mono',monospace", fontSize: "0.68rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: "var(--gold)",
          }}>
            Read The Method →
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
