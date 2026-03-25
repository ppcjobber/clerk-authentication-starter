import Nav from "@/components/Nav";
import Link from "next/link";

export default function Success() {
  return (
    <>
      <Nav />
      <div className="wrap" style={{ maxWidth:"600px", textAlign:"center", paddingTop:"140px" }}>
        <div style={{ fontSize:"3rem", marginBottom:"20px" }}>✅</div>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2.6rem", letterSpacing:"0.04em", color:"var(--gold)", marginBottom:"14px" }}>You&apos;re In</h1>
        <p style={{ fontSize:"0.88rem", color:"rgba(245,240,232,0.6)", lineHeight:"1.8", marginBottom:"32px" }}>
          Payment confirmed. You now have full access to all pace maps for today&apos;s meetings.
        </p>
        <Link href="/archive" className="btn btn-gold">View Today&apos;s Meetings →</Link>
      </div>
      <footer>
        <span className="footer-brand">PaceMap</span>
        <span className="footer-note">pacemap.co.uk · A Signalweight product</span>
      </footer>
    </>
  );
}
