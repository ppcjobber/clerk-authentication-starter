"use client";

import Nav from "@/components/Nav";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Success() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "purchase",
        currency: "GBP",
        value: 9.99,
        transaction_id: sessionId || Date.now().toString(),
      });
    }
  }, [searchParams]);

  return (
    <>
      <Nav />
      <div className="wrap" style={{ maxWidth: "600px", textAlign: "center", paddingTop: "140px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🎉</div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.6rem", color: "var(--gold)", marginBottom: "14px" }}>
          You&apos;re In
        </h1>
        <p style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.6)", lineHeight: "1.8", marginBottom: "32px" }}>
          Payment confirmed. You now have full access.
        </p>
        <Link href="/archive" className="btn btn-gold">
          View Meetings →
        </Link>
      </div>
      <Footer />
    </>
  );
}
