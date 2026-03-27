import Nav from "@/components/Nav";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <div className="wrap" style={{ maxWidth: "720px" }}>

        <div style={{ marginBottom: "40px", paddingBottom: "24px",
          borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.35)", marginBottom: "8px" }}>
            Get in touch
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem",
            color: "var(--cream)", marginBottom: "8px" }}>
            Contact
          </h1>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)",
            lineHeight: "1.7", maxWidth: "480px" }}>
            Questions, feedback, or issues with the site — we read everything and aim to respond within one working day.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px",
          marginBottom: "40px" }}>

          <a href="mailto:enquire@pacemap.co.uk"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 22px", background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px",
              textDecoration: "none", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.9rem",
                color: "var(--gold)", letterSpacing: "0.06em", marginBottom: "4px" }}>
                General enquiries
              </div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.75rem",
                color: "var(--cream)" }}>
                enquire@pacemap.co.uk
              </div>
            </div>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
              color: "rgba(245,240,232,0.35)", textTransform: "uppercase",
              letterSpacing: "0.08em" }}>
              Email →
            </span>
          </a>

        </div>

        <div style={{ fontSize: "0.8rem", lineHeight: "1.85",
          color: "rgba(245,240,232,0.45)", display: "flex",
          flexDirection: "column", gap: "10px" }}>
          <p>
            <strong style={{ color: "rgba(245,240,232,0.6)" }}>Billing issues</strong> — include your account email and a description of the problem. Stripe payment receipts are also helpful.
          </p>
          <p>
            <strong style={{ color: "rgba(245,240,232,0.6)" }}>Missing race data</strong> — let us know the course, date, and race time. The pipeline runs each morning so some meetings may not yet be published.
          </p>
          <p>
            <strong style={{ color: "rgba(245,240,232,0.6)" }}>Data removal requests</strong> — under UK GDPR you have the right to request deletion of your personal data. Email us and we will process your request within 30 days.
          </p>
        </div>

        <div style={{ marginTop: "40px", paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Responsible Gambling", href: "/responsible-gambling" },
          ].map(l => (
            <Link key={l.href} href={l.href}
              style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem",
                color: "rgba(245,240,232,0.35)", textTransform: "uppercase",
                letterSpacing: "0.08em" }}>
              {l.label}
            </Link>
          ))}
        </div>

      </div>
      <Footer />
    </>
  );
}
