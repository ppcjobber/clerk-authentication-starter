import Nav from "@/components/Nav";

export default function TermsPage() {
  return (
    <>
      <Nav />
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
            Terms of Service
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
              The service
            </h2>
            <p>PaceMap is an information service providing pre-race pace analysis for UK and Irish horse racing. It is operated by Signalweight, based in Cheshire, United Kingdom. By using PaceMap you agree to these terms.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Not betting advice
            </h2>
            <p style={{ marginBottom: "10px" }}>PaceMap provides race shape analysis and contextual information only. Nothing on this site constitutes betting advice, a tip, a recommendation to bet, or a guarantee of any outcome. Specifically:</p>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>PaceMap is not regulated by the UK Gambling Commission.</li>
              <li>PaceMap does not hold a gambling operating licence.</li>
              <li>No information on this site should be construed as a recommendation to place any bet.</li>
              <li>Past pace analysis does not guarantee future accuracy.</li>
              <li>All betting decisions are made entirely at your own risk.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Age restriction
            </h2>
            <p>You must be 18 years of age or older to use PaceMap. By creating an account you confirm that you are at least 18 years old.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Subscriptions and payments
            </h2>
            <p>Day Pass purchases are non-refundable once access has been granted. Monthly subscriptions can be cancelled at any time and will remain active until the end of the current billing period. No partial refunds are issued for unused subscription time. Payments are processed by Stripe.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Accuracy and availability
            </h2>
            <p>We make reasonable efforts to ensure race analysis is published in a timely and accurate manner, but we make no guarantee of accuracy, completeness, or availability. PaceMap may be unavailable from time to time due to maintenance or technical issues. We accept no liability for any losses arising from inaccurate analysis or service unavailability.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Limitation of liability
            </h2>
            <p>To the fullest extent permitted by law, Signalweight accepts no liability for any direct, indirect, or consequential losses arising from your use of PaceMap, including but not limited to any betting losses incurred as a result of relying on information published on this site.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Governing law
            </h2>
            <p>These terms are governed by the laws of England and Wales.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
              color: "var(--gold)", marginBottom: "10px", letterSpacing: "0.06em" }}>
              Contact
            </h2>
            <p>For any queries regarding these terms, contact us at <a href="mailto:enquire@pacemap.co.uk" style={{ color: "var(--gold)" }}>enquire@pacemap.co.uk</a>.</p>
          </section>

        </div>
      </div>
      <footer>
        <span className="footer-brand">PaceMap</span>
        <span className="footer-note">pacemap.co.uk · A Signalweight product<br />For informational purposes only · Not financial advice</span>
      </footer>
    </>
  );
}
