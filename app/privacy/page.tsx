
export default function PrivacyPage() {
  return (
    <>
      <div className="wrap" style={{ maxWidth: "720px" }}>

        <div style={{ marginBottom: "40px", paddingBottom: "24px",
          borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.35)", marginBottom: "8px" }}>
            Legal
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem",
            color: "var(--cream)", marginBottom: "8px" }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            color: "rgba(245,240,232,0.3)" }}>
            Last updated: 27 March 2026
          </p>
        </div>

        <div style={{ fontSize: "0.82rem", lineHeight: "1.85",
          color: "rgba(245,240,232,0.65)", display: "flex",
          flexDirection: "column", gap: "28px" }}>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Who we are
            </h2>
            <p>PaceMap is a horse racing pace analysis service operated by Signalweight, based in Cheshire, United Kingdom. We can be contacted at enquire@pacemap.co.uk.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              What data we collect
            </h2>
            <p style={{ marginBottom: "10px" }}>We collect the minimum data necessary to operate the service:</p>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li><strong style={{ color: "var(--cream)" }}>Account data</strong> — email address and name, collected when you create an account via Clerk.</li>
              <li><strong style={{ color: "var(--cream)" }}>Payment data</strong> — billing information processed by Stripe. We do not store card details directly.</li>
              <li><strong style={{ color: "var(--cream)" }}>Usage data</strong> — pages visited and features used, collected anonymously to improve the service.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              How we use your data
            </h2>
            <p>We use your data solely to provide and improve PaceMap. We do not sell your data to third parties, use it for advertising, or share it with anyone except the processors listed below who are necessary to operate the service (Clerk for authentication, Stripe for payments).</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Your rights
            </h2>
            <p>Under UK GDPR you have the right to access, correct, or delete your personal data at any time. To exercise any of these rights, contact us at enquire@pacemap.co.uk. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Cookies
            </h2>
            <p>We use only essential cookies required for authentication and session management. We do not use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Data retention
            </h2>
            <p>We retain your account data for as long as your account is active. If you delete your account, your personal data is removed within 30 days. Anonymous usage data may be retained indefinitely.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Contact
            </h2>
            <p>For any privacy-related queries, contact us at <a href="mailto:enquire@pacemap.co.uk" style={{ color: "var(--gold)" }}>enquire@pacemap.co.uk</a>.</p>
          </section>

        </div>
      </div>
    </>
  );
}
