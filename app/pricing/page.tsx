"use client";

import Nav from "@/components/Nav";
import { useUser, SignUpButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Pricing() {
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState<"dayPass" | "monthly" | null>(null);

  async function checkout(type: "dayPass" | "monthly") {
    if (!isSignedIn) return;
    setLoading(type);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  const features = {
    free:    ["Race 1 of every meeting", "Full pace map & table", "Pace scenario analysis", "No account required"],
    day:     ["All races for today", "Full pace maps & tables", "Pace scenario analysis", "Going & course context"],
    monthly: ["Every race, every meeting", "Full pace maps & tables", "Pace scenario analysis", "Going & course context", "Archive access", "Early access to new features"],
  };

  return (
    <>
      <Nav />
      <div className="wrap" style={{ maxWidth: "900px" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "10px" }}>Pricing</p>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", letterSpacing: "0.04em", color: "var(--cream)", marginBottom: "12px" }}>Simple, Transparent Pricing</h1>
          <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.5)", maxWidth: "440px", margin: "0 auto", lineHeight: "1.8" }}>
            Race 1 of every meeting is always free. Unlock the full card with a day pass or monthly subscription.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "12px", padding: "28px 22px", display: "flex", flexDirection: "column" }}>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", letterSpacing: "0.1em", color: "var(--cream)", marginBottom: "6px" }}>Free</p>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: "var(--cream)", lineHeight: 1, marginBottom: "3px" }}>£0</p>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: "rgba(245,240,232,0.35)", marginBottom: "24px" }}>Always free</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", marginBottom: "28px", flex: 1 }}>
              {features.free.map(f => <li key={f} style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.65)", display: "flex", gap: "8px" }}><span style={{ color: "#27ae60" }}>✓</span>{f}</li>)}
            </ul>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: "rgba(245,240,232,0.28)", textAlign: "center" }}>No sign-up needed</p>
          </div>

          <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.28)", borderRadius: "12px", padding: "28px 22px", display: "flex", flexDirection: "column" }}>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", letterSpacing: "0.1em", color: "var(--gold)", marginBottom: "6px" }}>Day Pass</p>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: "var(--cream)", lineHeight: 1, marginBottom: "3px" }}>£2.99</p>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: "rgba(245,240,232,0.35)", marginBottom: "24px" }}>One-off · today only</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", marginBottom: "28px", flex: 1 }}>
              {features.day.map(f => <li key={f} style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.65)", display: "flex", gap: "8px" }}><span style={{ color: "#27ae60" }}>✓</span>{f}</li>)}
            </ul>
            {isSignedIn ? (
              <button className="btn btn-gold" onClick={() => checkout("dayPass")} disabled={loading === "dayPass"} style={{ width: "100%" }}>
                {loading === "dayPass" ? "Loading…" : "Buy Day Pass"}
              </button>
            ) : (
              <SignUpButton mode="modal">
                <button className="btn btn-gold" style={{ width: "100%" }}>Sign Up to Buy</button>
              </SignUpButton>
            )}
          </div>

          <div style={{ background: "rgba(41,128,185,0.07)", border: "1px solid rgba(41,128,185,0.32)", borderRadius: "12px", padding: "28px 22px", display: "flex", flexDirection: "column", position: "relative" }}>
            <span style={{ position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%)", background: "#2980b9", color: "white", fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.09em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "2px", whiteSpace: "nowrap" }}>Best Value</span>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", letterSpacing: "0.1em", color: "#5dade2", marginBottom: "6px" }}>Monthly</p>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: "var(--cream)", lineHeight: 1, marginBottom: "3px" }}>£9.99</p>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: "rgba(245,240,232,0.35)", marginBottom: "24px" }}>Per month · cancel anytime</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", marginBottom: "28px", flex: 1 }}>
              {features.monthly.map(f => <li key={f} style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.65)", display: "flex", gap: "8px" }}><span style={{ color: "#27ae60" }}>✓</span>{f}</li>)}
            </ul>
            {isSignedIn ? (
              <button className="btn btn-blue" onClick={() => checkout("monthly")} disabled={loading === "monthly"} style={{ width: "100%" }}>
                {loading === "monthly" ? "Loading…" : "Subscribe Monthly"}
              </button>
            ) : (
              <SignUpButton mode="modal">
                <button className="btn btn-blue" style={{ width: "100%" }}>Sign Up to Subscribe</button>
              </SignUpButton>
            )}
          </div>
        </div>

        <p style={{ textAlign: "center", fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", color: "rgba(245,240,232,0.22)", marginTop: "28px", letterSpacing: "0.04em" }}>
          Payments processed securely by Stripe · Monthly subscription cancellable anytime
        </p>
      </div>

      <footer>
        <span className="footer-brand">PaceMap</span>
        <span className="footer-note">pacemap.co.uk · A Signalweight product<br />For informational purposes only · Not financial advice</span>
      </footer>
    </>
  );
}
