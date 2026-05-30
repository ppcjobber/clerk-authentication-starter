import Link from "next/link";

export const metadata = {
  title: "Responsible Gambling — Support & Resources",
  description: "PaceMap publishes analysis, not tips. Resources for gambling support including GamCare, BeGambleAware and GamStop. Must be 18+.",
};

export default function ResponsibleGamblingPage() {
  return (
    <>
      <div className="wrap" style={{ maxWidth: "720px" }}>

        <div style={{ marginBottom: "40px", paddingBottom: "24px",
          borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.35)", marginBottom: "8px" }}>
            Responsible Gambling
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem",
            color: "var(--cream)", marginBottom: "8px" }}>
            Gamble Responsibly
          </h1>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)",
            lineHeight: "1.7", maxWidth: "560px" }}>
            PaceMap provides race analysis, not betting advice. If you choose to bet, please do so responsibly.
          </p>
        </div>

        <div style={{ background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.25)",
          borderRadius: "8px", padding: "18px 22px", marginBottom: "32px" }}>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.9rem",
            color: "#e74c3c", marginBottom: "8px", letterSpacing: "0.06em" }}>
            Important
          </p>
          <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.65)", lineHeight: "1.75" }}>
            You must be 18 or over to bet. Gambling involves risk — never bet more than you can afford to lose. PaceMap is an information service only and is not responsible for any betting decisions you make.
          </p>
        </div>

        <div style={{ fontSize: "0.82rem", lineHeight: "1.85",
          color: "rgba(245,240,232,0.65)", display: "flex",
          flexDirection: "column", gap: "28px" }}>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Signs of problem gambling
            </h2>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>Betting more than you can afford to lose</li>
              <li>Chasing losses with bigger bets</li>
              <li>Gambling affecting your relationships, work, or finances</li>
              <li>Feeling anxious or irritable when not gambling</li>
              <li>Hiding your gambling from friends or family</li>
              <li>Borrowing money to fund gambling</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Set your limits
            </h2>
            <p>All licensed UK bookmakers are required to offer deposit limits, loss limits, and self-exclusion tools. Use them. Set a budget before you bet and stick to it regardless of results.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Get help
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "GamCare", desc: "Free counselling and support for problem gamblers", url: "https://www.gamcare.org.uk", phone: "0808 8020 133" },
                { name: "BeGambleAware", desc: "Information, advice and support", url: "https://www.begambleaware.org", phone: "0808 8020 133" },
                { name: "Gamblers Anonymous UK", desc: "Peer support groups across the UK", url: "https://www.gamblersanonymous.org.uk", phone: "0330 094 0322" },
                { name: "GamStop", desc: "Self-exclusion from all UK licensed gambling sites", url: "https://www.gamstop.co.uk", phone: null },
              ].map(org => (
                <div key={org.name} style={{ background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)", borderRadius: "7px",
                  padding: "14px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", flexWrap: "wrap", gap: "6px",
                    marginBottom: "4px" }}>
                    <span style={{ fontWeight: 600, color: "var(--cream)",
                      fontSize: "0.85rem" }}>{org.name}</span>
                    {org.phone && (
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem",
                        color: "var(--gold)" }}>{org.phone}</span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.45)",
                    marginBottom: "6px" }}>{org.desc}</p>
                  <a href={org.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem",
                      color: "var(--gold)", opacity: 0.7 }}>
                    {org.url.replace('https://www.', '')} →
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Self-exclusion
            </h2>
            <p>If you feel you need a break from gambling, GamStop allows you to self-exclude from all UK licensed gambling websites in one step. Visit <a href="https://www.gamstop.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>gamstop.co.uk</a> to register.</p>
          </section>

        </div>
      </div>
    </>
  );
}
