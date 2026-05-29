"use client";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav>
        <Link href="/" className="nav-brand">PaceMap</Link>

        {/* Desktop links */}
        <ul className="nav-links">
          <li><Link href="/archive">Archive</Link></li>
          <li><Link href="/method">Method</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          {isSignedIn ? (
            <li><UserButton /></li>
          ) : (
            <>
              <li>
                <SignInButton mode="modal">
                  <button>Sign In</button>
                </SignInButton>
              </li>
              <li>
                <SignUpButton mode="modal">
                  <button className="nav-pill">Join Free</button>
                </SignUpButton>
              </li>
            </>
          )}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <span style={{ display: "block", width: "22px", height: "1.5px",
            background: "var(--cream)", transition: "transform 0.2s",
            transform: open ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "1.5px",
            background: "var(--cream)", opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
          <span style={{ display: "block", width: "22px", height: "1.5px",
            background: "var(--cream)", transition: "transform 0.2s",
            transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: "fixed", top: "56px", left: 0, right: 0, zIndex: 999,
          background: "#0a3d1f",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
          padding: "20px 24px 28px",
          display: "flex", flexDirection: "column", gap: "0",
        }}>
          {[
            { href: "/archive", label: "Archive" },
            { href: "/method", label: "Method" },
            { href: "/pricing", label: "Pricing" },
            { href: "/contact", label: "Contact" },
            { href: "/responsible-gambling", label: "Responsible Gambling" },
          ].map(item => (
            <Link key={item.href} href={item.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'DM Mono',monospace", fontSize: "0.75rem",
                textTransform: "uppercase", letterSpacing: "0.1em",
                color: "rgba(245,240,232,0.7)",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
              }}>
              {item.label}
            </Link>
          ))}

          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {isSignedIn ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <UserButton />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem",
                  color: "rgba(245,240,232,0.4)" }}>Your account</span>
              </div>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button onClick={() => setOpen(false)}
                    style={{
                      width: "100%", padding: "12px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "6px", cursor: "pointer",
                      fontFamily: "'DM Mono',monospace", fontSize: "0.72rem",
                      textTransform: "uppercase", letterSpacing: "0.08em",
                      color: "rgba(245,240,232,0.7)",
                    }}>
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button onClick={() => setOpen(false)}
                    style={{
                      width: "100%", padding: "12px",
                      background: "var(--gold)",
                      border: "none", borderRadius: "6px", cursor: "pointer",
                      fontFamily: "'DM Mono',monospace", fontSize: "0.72rem",
                      textTransform: "uppercase", letterSpacing: "0.08em",
                      color: "#0a3d1f", fontWeight: 600,
                    }}>
                    Join Free
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
