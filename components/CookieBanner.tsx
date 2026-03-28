"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("pacemap_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("pacemap_cookie_consent", "accepted");
    setVisible(false);
    // Signal GTM consent granted
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "cookie_consent_accepted",
      });
    }
  };

  const decline = () => {
    localStorage.setItem("pacemap_cookie_consent", "declined");
    setVisible(false);
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "cookie_consent_declined",
      });
    }
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      zIndex: 9999,
      background: "rgba(10,30,15,0.97)",
      borderTop: "1px solid rgba(201,168,76,0.25)",
      padding: "16px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "14px",
    }}>
      <p style={{
        fontFamily: "'DM Mono',monospace", fontSize: "0.65rem",
        color: "rgba(245,240,232,0.55)", lineHeight: "1.7",
        maxWidth: "680px", margin: 0,
      }}>
        We use cookies for authentication and analytics to improve the service.{" "}
        <Link href="/privacy" style={{ color: "var(--gold)", textDecoration: "none" }}>
          Privacy Policy
        </Link>
      </p>
      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <button onClick={decline} style={{
          fontFamily: "'DM Mono',monospace", fontSize: "0.62rem",
          textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "8px 16px", borderRadius: "3px", cursor: "pointer",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(245,240,232,0.45)",
        }}>
          Decline
        </button>
        <button onClick={accept} style={{
          fontFamily: "'DM Mono',monospace", fontSize: "0.62rem",
          textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "8px 16px", borderRadius: "3px", cursor: "pointer",
          background: "var(--gold)",
          border: "none",
          color: "#0a3d1f", fontWeight: 600,
        }}>
          Accept
        </button>
      </div>
    </div>
  );
}
