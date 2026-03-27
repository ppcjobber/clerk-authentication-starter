import Nav from "@/components/Nav";
import Link from "next/link";

async function TodaysMeetings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://pacemap.co.uk';
    const res = await fetch(`${baseUrl}/api/meeting-data-list`, { cache: 'no-store' });
    const meetings = res.ok ? await res.json() : [];

    if (!meetings.length) {
      return (
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "rgba(245,240,232,0.4)", lineHeight: "1.8" }}>
          No meetings published yet today — check back once racing is underway.
        </p>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {meetings.map((m: any) => (
          <Link key={m.slug} href={`/meetings/${m.slug}`}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>{m.course}</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: "rgba(245,240,232,0.38)" }}>{m.races} races</span>
            </div>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 9px", borderRadius: "2px", background: "rgba(39,174,96,0.18)", color: "#2ecc71", border: "1px solid rgba(39,174,96,0.35)" }}>
              View →
            </span>
          </Link>
        ))}
      </div>
    );
  } catch {
    return (
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "rgba(245,240,232,0.4)" }}>
        No meetings available right now.
      </p>
    );
  }
}

export default function Home() {
  return (
    <>
      <Nav />

      <section style={{ position: "relative", zIndex: 1, padding: "140px 40px 72px", maxWidth: "1100px", margin: "0 auto" }}>
        <p className="a0" style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ display: "block", width: "28px", height: "1px", background: "var(--gold)" }} />
          Horse Racing · Race Shape Analysis
        </p>
        <h1 className="a1" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3.5rem,8vw,7rem)", lineHeight: "0.92", letterSpacing: "0.02em", color: "var(--cream)", marginBottom: "20px" }}>
          Read the<br /><span style={{ color: "var(--gold)" }}>race before</span><br />it runs.
        </h1>
        <p className="a2" style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(1rem,2.2vw,1.35rem)", color: "rgba(245,240,232,0.5)", marginBottom: "20px", maxWidth: "520px", lineHeight: "1.55" }}>
          Pace maps for every UK &amp; Irish meeting, every day.
        </p>
        <p className="a3" style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.6)", maxWidth: "460px", lineHeight: "1.85", marginBottom: "44px" }}>
          PaceMap analyses each runner&apos;s historical running style to build a picture of how a race is likely to unfold — before the off. Who leads, who&apos;s covered up, where the traffic will be, and which horses the pace scenario favours.
        </p>
        <div className="a4" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/archive" className="btn btn-gold">View All Meetings →</Link>
          <Link href="/pricing" style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,240,232,0.45)" }}>See pricing →</Link>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.025)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "60px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "44px" }}>
          {[
            { n: "01", title: "Running Style Analysis", body: "Each runner's last 15 races are analysed to classify their typical position — front-runner, prominent, midfield or hold-up. Style is derived from in-running comments, not assumed." },
            { n: "02", title: "Race Shape Modelling", body: "With the full field mapped, we model the likely pace scenario — contested, slowly-run or collapse — and identify which running styles that scenario favours. Going and course bias included." },
            { n: "03", title: "No Tips. Just Context.", body: "PaceMap doesn't tell you who to back. It gives you the context to make better decisions yourself — where the traffic will be, which horses get a soft lead, which face an uphill task." },
          ].map(i => (
            <div key={i.n} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: "rgba(201,168,76,0.18)", lineHeight: 1 }}>{i.n}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.05rem", letterSpacing: "0.1em", color: "var(--gold)" }}>{i.title}</div>
              <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: "1.85" }}>{i.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "60px 40px" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "6px" }}>Today&apos;s Meetings</p>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.9rem", letterSpacing: "0.04em", color: "var(--cream)", marginBottom: "28px" }}>Live Pace Maps</h2>
        <TodaysMeetings />
      </section>

      <footer>
        <span className="footer-brand">PaceMap</span>
        <span className="footer-note">pacemap.co.uk · A Signalweight product<br />For informational purposes only · Not financial advice</span>
      </footer>
    </>
  );
}
