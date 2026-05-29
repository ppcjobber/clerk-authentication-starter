import Link from 'next/link';

export const metadata = {
  title: 'Method — How PaceMap Reads a Race',
  description: 'A series of articles explaining the ANCHOR engine: the analytical layers behind PaceMap, one at a time.',
};

const ARTICLES = [
  {
    slug: 'the-part-you-do-by-feel',
    title: 'The part you do by feel',
    tagline: 'Most of the layered read is craft. One part of it is genuinely hard to do by hand, and that is what the machine is for.',
    part: 'Part One',
  },
  {
    slug: 'what-the-draw-is-worth',
    title: 'What the draw is actually worth',
    tagline: 'The standard draw guides conflate the stall with the quality of horse drawn there. Held quality constant, the picture changes.',
    part: 'Part Two',
  },
];

export default function MethodIndex() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0D1B2A',
      color: '#EFF3F6',
      fontFamily: 'Raleway, -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '80px 24px 120px',
      }}>
        <div style={{
          fontSize: 13,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8AACBE',
          marginBottom: 24,
        }}>
          The Method
        </div>

        <h1 style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(36px, 6vw, 56px)',
          fontWeight: 600,
          lineHeight: 1.1,
          margin: '0 0 32px',
          letterSpacing: '-0.02em',
        }}>
          How PaceMap Reads a Race
        </h1>

        <p style={{
          fontSize: 19,
          lineHeight: 1.6,
          color: '#EFF3F6',
          marginBottom: 16,
          maxWidth: 640,
        }}>
          A series of articles describing the ANCHOR engine — the analytical method behind PaceMap — one layer at a time.
        </p>

        <p style={{
          fontSize: 17,
          lineHeight: 1.6,
          color: '#8AACBE',
          marginBottom: 64,
          maxWidth: 640,
        }}>
          New articles are added as the underlying analysis is done to the same evidence standard. This is a growing library, not a manifesto.
        </p>

        <div style={{
          borderTop: '1px solid rgba(138, 172, 190, 0.2)',
          paddingTop: 8,
        }}>
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/method/${article.slug}`}
              style={{
                display: 'block',
                padding: '32px 0',
                borderBottom: '1px solid rgba(138, 172, 190, 0.2)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'opacity 0.2s',
              }}
            >
              <div style={{
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#E8601C',
                marginBottom: 10,
                fontWeight: 600,
              }}>
                {article.part}
              </div>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(24px, 3.5vw, 30px)',
                fontWeight: 600,
                lineHeight: 1.2,
                margin: '0 0 12px',
                color: '#EFF3F6',
                letterSpacing: '-0.01em',
              }}>
                {article.title}
              </h2>
              <p style={{
                fontSize: 17,
                lineHeight: 1.55,
                color: '#8AACBE',
                margin: 0,
                maxWidth: 600,
              }}>
                {article.tagline}
              </p>
              <div style={{
                fontSize: 14,
                color: '#E8601C',
                marginTop: 16,
                fontWeight: 500,
              }}>
                Read →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
