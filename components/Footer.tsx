import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.07)",
      padding: "48px 40px",
      marginTop: "80px",
    }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "40px",
        marginBottom: "40px",
      }}>

        {/* Brand */}
        <div>
          <div style={{
            fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem",
            color: "var(--gold)", letterSpacing: "0.06em", marginBottom: "8px",
          }}>
            PaceMap
          </div>
          <p style={{
            fontSize: "0.75rem", color: "rgba(245,240,232,0.4)",
            lineHeight: "1.7", maxWidth: "200px",
          }}>
            Race shape analysis for UK &amp; Irish horse racing. Published every evening.
          </p>
        </div>

        {/* Product */}
        <div>
          <p style={{
            fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.3)", marginBottom: "14px",
          }}>
            Product
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { href: "/archive",  label: "Meeting Archive" },
              { href: "/pricing",  label: "Pricing"         },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{
                fontSize: "0.8rem", color: "rgba(245,240,232,0.55)",
                textDecoration: "none",
              }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <p style={{
            fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.3)", marginBottom: "14px",
          }}>
            Legal
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { href: "/privacy",               label: "Privacy Policy"       },
              { href: "/terms",                 label: "Terms of Service"     },
              { href: "/responsible-gambling",  label: "Responsible Gambling" },
              { href: "/contact",               label: "Contact"              },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{
                fontSize: "0.8rem", color: "rgba(245,240,232,0.55)",
                textDecoration: "none",
              }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Responsible gambling */}
        <div>
          <p style={{
            fontFamily: "'DM Mono',monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "rgba(245,240,232,0.3)", marginBottom: "14px",
          }}>
            Gambling Support
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { href: "https://www.gamcare.org.uk",    label: "GamCare"        },
              { href: "https://www.begambleaware.org", label: "BeGambleAware"  },
              { href: "https://www.gamstop.co.uk",     label: "GamStop"        },
            ].map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{
                  fontSize: "0.8rem", color: "rgba(245,240,232,0.55)",
                  textDecoration: "none",
                }}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "24px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "12px",
      }}>
        <span style={{
          fontFamily: "'DM Mono',monospace", fontSize: "0.62rem",
          color: "rgba(245,240,232,0.25)",
        }}>
          pacemap.co.uk · A Signalweight product
        </span>
        <span style={{
          fontFamily: "'DM Mono',monospace", fontSize: "0.62rem",
          color: "rgba(245,240,232,0.25)",
        }}>
          For informational purposes only · Not financial advice · Must be 18+
        </span>
      </div>

    </footer>
  );
}
