import Link from "next/link";

export const metadata = {
  title: "About PaceMap — The Story Behind The ANCHOR Engine",
  description: "PaceMap is built by Andy Jobber, an analyst combining sixteen years of data work with horse racing form study. The ANCHOR engine is the result.",
  openGraph: {
    title: "About PaceMap — Built On Data, Not Hunches",
    description: "The story behind the ANCHOR engine — and the person who built it.",
  },
};

export default function AboutPage() {
  return (
    <>
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
            PaceMap is a race shape analysis tool for British and Irish horse racing,
            powered by an engine called ANCHOR. The analysis is published the evening
            before racing, every race, every meeting.
          </p>
        </div>

        {/* What PaceMap is and isn't */}
        <div style={{ marginBottom: "36px", paddingBottom: "36px",
          borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem",
            color: "var(--gold)", letterSpacing: "0.06em", marginBottom: "16px" }}>
            No tips. No selections. Deliberately.
          </h2>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85", marginBottom: "12px" }}>
            PaceMap publishes context, not advice. The engine reads each race, classifies
            running styles, models the likely shape, weighs the form against today&apos;s
            conditions, and produces a private rating for every horse alongside a measure
            of how confident it is in that rating.
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85", marginBottom: "12px" }}>
            What it does not do is turn that analysis into a selection. There is no
            tipping line, no nap of the day, no recommended stake. That is a choice, not
            an oversight. The job of the engine is to be honest about what it knows and
            transparent about what it does not. The job of the reader is to decide what
            to do with the analysis.
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85" }}>
            The most useful thing a tool like this can be is rigorous and unbiased. The
            moment it starts producing selections, it stops being either.
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
            PaceMap is built and run by Andy Jobber, based in Cheshire. Mathematics
            graduate from the University of Liverpool, sixteen years working in data and
            digital — most of it spent finding signal in noisy commercial data for
            clients who needed decisions made from it.
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85", marginBottom: "12px" }}>
            I&apos;ve followed horse racing since 2007. The question that drew me to it
            is the same one every serious follower ends up asking — is there a
            systematic way to get ahead of what is about to happen, rather than
            explaining it after the fact. For years I read form by hand. Eventually I
            started building tools to do the parts that did not need a human.
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85", marginBottom: "12px" }}>
            ANCHOR is what came out of that. It is a structured method for reading a
            race the way a sharp form student would, but at the scale a full afternoon
            of racing actually requires — every comment on every recent run for every
            runner, every preference axis, every plausible race shape, dampened by the
            confidence the evidence supports.
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.55)",
            lineHeight: "1.85" }}>
            The engine took a long time to build and test. The goal was always the same.
            A repeatable, data-driven way to understand race shape before the off — not
            a gut feel dressed up in numbers.
          </p>
        </div>

        {/* Read the method */}
        <div style={{ marginBottom: "40px", padding: "24px 28px",
          background: "rgba(201,168,76,0.05)",
          border: "1px solid rgba(201,168,76,0.18)",
          borderRadius: "10px" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--gold)", marginBottom: "10px" }}>
            Next
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)",
            lineHeight: "1.75", marginBottom: "14px", maxWidth: "560px" }}>
            The six analytical layers of the engine — anchored ratings, parsed form,
            preference, pace shape, dampening and structural factors — are explained in
            full at <Link href="/method" style={{ color: "var(--gold)",
              textDecoration: "none" }}>The Method</Link>. Each layer has a dedicated
            article describing what it does, why it matters and where the engine
            diverges from how a single-number rating would handle the same horse.
          </p>
          <Link href="/method"
            style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.7rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--gold)", textDecoration: "none", fontWeight: 500 }}>
            Read The Method →
          </Link>
        </div>

        {/* Footer links */}
        <div style={{ marginTop: "40px", paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            { label: "Method", href: "/method" },
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
    </>
  );
}
