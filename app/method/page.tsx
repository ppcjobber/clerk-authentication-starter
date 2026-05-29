import Link from 'next/link';

export const metadata = {
  title: 'Method — PaceMap',
  description: 'How PaceMap Reads a Race — articles on the ANCHOR engine, the analytical method behind PaceMap.',
};

const ARTICLES = [
  {
    slug: 'the-part-you-do-by-feel',
    title: 'The part you do by feel',
    tagline: 'Most of the layered read is craft. One part of it is genuinely hard to do by hand. That is what the engine is for.',
    part: 'PART ONE',
  },
  {
    slug: 'what-the-draw-is-worth',
    title: 'What the draw is actually worth',
    tagline: 'The standard draw guides conflate the stall with the quality drawn there. Held quality constant, the picture changes.',
    part: 'PART TWO',
  },
  {
    slug: 'what-the-figures-dont-say',
    title: "What the figures don't say",
    tagline: 'A finishing position is the answer to a question, not a description of a run. The in-running prose carries information the figures cannot.',
    part: 'PART THREE',
  },
  {
    slug: 'when-form-is-information',
    title: 'When form is information',
    tagline: 'Going, trip and course preference are not yes-or-no. The honest read is when form is information about today and when it is not.',
    part: 'PART FOUR',
  },
  {
    slug: 'race-shape-before-runners',
    title: 'Race shape before runners',
    tagline: 'Race shape is not commentary written afterwards. It is a rating factor that can be modelled before the race runs.',
    part: 'PART FIVE',
  },
];

export default function MethodIndex() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0A3D1F',
      color: '#F5F0E8',
      fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '80px 24px 120px',
      }}>
        {/* Section label */}
        <div style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#C9A84C',
          marginBottom: 28,
        }}>
          The Method
        </div>

        {/* Page heading — Bebas Neue */}
        <h1 style={{
          fontFamily: '"Bebas Neue", "Arial Black", Impact, sans-serif',
          fontSize: 'clamp(56px, 9vw, 80px)',
          fontWeight: 400,
          lineHeight: 1.0,
          margin: '0 0 36px',
          letterSpacing: '0.01em',
          textTransform: 'uppercase',
          color: '#F5F0E8',
        }}>
          How PaceMap Reads a Race
        </h1>

        {/* Intro */}
        <p style={{
          fontSize: 19,
          lineHeight: 1.65,
          fontWeight: 400,
          color: '#F5F0E8',
          marginBottom: 18,
          maxWidth: 660,
        }}>
          A series of articles on the ANCHOR engine — the analytical
          method behind PaceMap — one layer at a time.
        </p>

        <p style={{
          fontSize: 16,
          lineHeight: 1.65,
          color: 'rgba(245, 240, 232, 0.7)',
          marginBottom: 72,
          maxWidth: 660,
        }}>
          New articles are added as the underlying analysis is done to
          the same evidence standard. A growing library, not a manifesto.
        </p>

        {/* Article list */}
        <div style={{
          borderTop: '1px solid rgba(201, 168, 76, 0.25)',
        }}>
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/method/${article.slug}`}
              className="method-card"
              style={{
                display: 'block',
                padding: '36px 0',
                borderBottom: '1px solid rgba(201, 168, 76, 0.25)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                marginBottom: 14,
              }}>
                {article.part}
              </div>

              <h2 style={{
                fontFamily: '"Bebas Neue", "Arial Black", Impact, sans-serif',
                fontSize: 'clamp(32px, 5vw, 42px)',
                fontWeight: 400,
                lineHeight: 1.05,
                margin: '0 0 14px',
                color: '#F5F0E8',
                letterSpacing: '0.015em',
                textTransform: 'uppercase',
              }}>
                {article.title}
              </h2>

              <p style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: 'rgba(245, 240, 232, 0.75)',
                margin: 0,
                maxWidth: 600,
              }}>
                {article.tagline}
              </p>

              <div style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                marginTop: 20,
                fontWeight: 400,
              }}>
                Read →
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .method-card:hover h2 {
          color: #E8CC7A !important;
        }
      `}</style>
    </main>
  );
}
