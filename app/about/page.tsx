import Nav from "@/components/Nav";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <div className="wrap" style={{ maxWidth: "720px" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px", paddingBottom: "24px",
          borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.35)", marginBottom: "8px" }}>
            About
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem",
            color: "var(--cream)", marginBottom: "8px" }}>
            Built on data. Not hunches.
          </h1>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)",
            lineHeight: "1.7", maxWidth: "540px" }}>
            PaceMap is a race shape analysis tool for UK and Irish horse racing. It models
            how each race is likely to be run — before it happens — and publishes that
            analysis the evening before racing.
          </p>
        </div>

        {/* What it is */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85", marginBottom: "12px" }}>
            No tips. No selections. No predictions about who will win. Just structured,
            data-driven context about how a race will unfold tactically, and which running
            style profiles that shape favours.
          </p>
        </div>

        {/* Who's behind it */}
        <div style={{ marginBottom: "36px", paddingBottom: "36px",
          borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
            color: "var(--gold)", letterSpacing: "0.06em", marginBottom: "16px" }}>
            Who&apos;s behind it
          </h2>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85", marginBottom: "12px" }}>
            PaceMap is built and run by Andy Jobber, based in Cheshire.
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85", marginBottom: "12px" }}>
            I&apos;ve followed horse racing since 2007, running my own form analysis and
            chasing the same question most serious followers end up asking — is there a
            systematic way to get ahead of what&apos;s going to happen, rather than
            reacting to it after the fact.
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85", marginBottom: "12px" }}>
            My professional background is in data and digital — over a decade working in
            paid search, SEO and commercial roles at digital agencies, where the job was
            always the same: find the signal in noisy data and turn it into something
            actionable.
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85" }}>
            PaceMap is where those two things meet. The pace analysis framework it runs on
            took a long time to build and test. The goal was always the same — a
            repeatable, data-driven way to understand race shape before the off, not a gut
            feel dressed up in numbers.
          </p>
        </div>

        {/* Footer links */}
        <div style={{ marginTop: "40px", paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            { label: "How It Works", href: "/how-it-works" },
            { label: "Pricing", href: "/pricing" },
            { label: "Contact", href: "/contact" },
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
