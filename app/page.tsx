import Nav from "@/components/Nav";
import Link from "next/link";

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
          Pace maps for every UK & Irish meeting, every day.
        </p>
        <p className="a3" style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.6)", maxWidth: "460px", lineHeight: "1.85", marginBottom: "44px" }}>
          PaceMap analyses each runner&apos;s historical running style to build a picture of how a race is likely to unfold — before the off. Who leads, who&apos;s covered up, where the traffic will be, and which horses the pace scenario favours.
        </p>
        <div className="a4" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/meetings/cheltenham-13-march-2026" className="btn btn-gold">View Example Map →</Link>
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
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "6px" }}>Latest Meeting</p>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.9rem", letterSpacing: "0.04em", color: "var(--cream)", marginBottom: "28px" }}>Cheltenham Festival · 13 March 2026</h2>

        <div style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "7px", padding: "16px 20px", marginBottom: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>⚓</span>
          <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.7)", lineHeight: "1.65" }}>
            <strong style={{ color: "var(--gold)" }}>Example meeting —</strong> full daily meetings covering every UK & Irish race coming soon. Race 1 of each meeting is always free, no account required.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { time: "1:20", name: "JCB Triumph Hurdle",            grade: "G1",   dist: "2m1f",  runners: 20, free: true },
            { time: "2:00", name: "William Hill County Hurdle",     grade: "HCAP", dist: "2m1f",  runners: 24, free: false },
            { time: "2:40", name: "Mrs Paddy Power Mares' Chase",   grade: "G2",   dist: "2m4½f", runners: 9,  free: false },
            { time: "3:20", name: "Albert Bartlett Novices Hurdle", grade: "G1",   dist: "3m",    runners: 22, free: false },
            { time: "4:00", name: "Cheltenham Gold Cup",            grade: "G1",   dist: "3m2½f", runners: 11, free: false },
          ].map(r => (
            <Link key={r.time} href={r.free ? "/meetings/cheltenham-13-march-2026" : "/pricing"}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "var(--gold)", minWidth: "34px" }}>{r.time}</span>
                <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>{r.name}</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: "rgba(245,240,232,0.38)", background: "rgba(255,255,255,0.045)", padding: "2px 6px", borderRadius: "2px" }}>{r.grade}</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: "rgba(245,240,232,0.38)" }}>{r.dist} · {r.runners} runners</span>
              </div>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 9px", borderRadius: "2px", background: r.free ? "rgba(39,174,96,0.18)" : "rgba(201,168,76,0.09)", color: r.free ? "#2ecc71" : "var(--gold)", border: `1px solid ${r.free ? "rgba(39,174,96,0.35)" : "rgba(201,168,76,0.25)"}` }}>
                {r.free ? "Free" : "🔒 Premium"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer>
        <span className="footer-brand">PaceMap</span>
        <span className="footer-note">pacemap.co.uk · A Signalweight product<br />For informational purposes only · Not financial advice</span>
      </footer>
    </>
  );
}
