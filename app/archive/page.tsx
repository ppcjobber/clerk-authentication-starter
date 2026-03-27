import Nav from "@/components/Nav";
import Link from "next/link";

const MEETINGS: any[] = [
  {
    slug:   "fontwell_27-march-2026",
    date:   "27 March 2026",
    label:  "Fontwell — 27 March 2026",
    going:  "Good",
    races:  6,
    latest: true,
  },
  {
    slug:   "dundalk_aw_27-march-2026",
    date:   "27 March 2026",
    label:  "Dundalk (AW) — 27 March 2026",
    going:  "Good",
    races:  7,
    latest: false,
  },
  {
    slug:   "wetherby_27-march-2026",
    date:   "27 March 2026",
    label:  "Wetherby — 27 March 2026",
    going:  "Good",
    races:  7,
    latest: false,
  },
  {
    slug:   "newcastle_aw_27-march-2026",
    date:   "27 March 2026",
    label:  "Newcastle (AW) — 27 March 2026",
    going:  "Good",
    races:  9,
    latest: false,
  },
  {
    slug:   "lingfield_aw_27-march-2026",
    date:   "27 March 2026",
    label:  "Lingfield (AW) — 27 March 2026",
    going:  "Good",
    races:  7,
    latest: false,
  },
  {
    slug:   "fontwell_27-march-2026",
    date:   "27 March 2026",
    label:  "Fontwell — 27 March 2026",
    going:  "Good",
    races:  6,
    latest: false,
  },
  {
    slug:   "dundalk_aw_27-march-2026",
    date:   "27 March 2026",
    label:  "Dundalk (AW) — 27 March 2026",
    going:  "Good",
    races:  7,
    latest: false,
  },
  {
    slug:   "wetherby_27-march-2026",
    date:   "27 March 2026",
    label:  "Wetherby — 27 March 2026",
    going:  "Good",
    races:  7,
    latest: false,
  },
  {
    slug:   "newcastle_aw_27-march-2026",
    date:   "27 March 2026",
    label:  "Newcastle (AW) — 27 March 2026",
    going:  "Good",
    races:  9,
    latest: false,
  },
  {
    slug:   "lingfield_aw_27-march-2026",
    date:   "27 March 2026",
    label:  "Lingfield (AW) — 27 March 2026",
    going:  "Good",
    races:  7,
    latest: false,
  },
  {
    slug:   "fontwell_27-march-2026",
    date:   "27 March 2026",
    label:  "Fontwell — 27 March 2026",
    going:  "Good",
    races:  6,
    latest: false,
  },
  {
    slug:   "dundalk_aw_27-march-2026",
    date:   "27 March 2026",
    label:  "Dundalk (AW) — 27 March 2026",
    going:  "Good",
    races:  7,
    latest: false,
  },
  {
    slug:   "wetherby_27-march-2026",
    date:   "27 March 2026",
    label:  "Wetherby — 27 March 2026",
    going:  "Good",
    races:  7,
    latest: false,
  },
];

export default function Archive() {
  return (
    <>
      <Nav />
      <div className="wrap">
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"8px" }}>Meeting Archive</p>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2.2rem", letterSpacing:"0.04em", color:"var(--cream)", marginBottom:"10px" }}>All Pace Maps</h1>
        <p style={{ fontSize:"0.82rem", color:"rgba(245,240,232,0.48)", lineHeight:"1.75", maxWidth:"500px", marginBottom:"36px" }}>
          Every meeting published on PaceMap — permanently accessible for reference and research.
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {MEETINGS.map(m => (
            <Link key={m.slug} href={`/meetings/${m.slug}`}
              style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 22px", background:m.latest?"rgba(201,168,76,0.055)":"rgba(255,255,255,0.02)", border:`1px solid ${m.latest?"rgba(201,168,76,0.22)":"rgba(255,255,255,0.07)"}`, borderRadius:"8px", flexWrap:"wrap", gap:"10px" }}>
              <div>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:"rgba(245,240,232,0.38)", marginBottom:"4px" }}>{m.date}</p>
                <p style={{ fontWeight:600, fontSize:"0.92rem", color:"var(--cream)" }}>{m.label}</p>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", color:"rgba(245,240,232,0.38)", marginTop:"3px" }}>{m.going} · {m.races} races</p>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                {m.latest && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.58rem", padding:"3px 8px", borderRadius:"2px", background:"rgba(201,168,76,0.14)", color:"var(--gold)", border:"1px solid rgba(201,168,76,0.28)" }}>Latest</span>}
                <span style={{ color:"var(--gold)", fontSize:"0.9rem" }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer>
        <span className="footer-brand">PaceMap</span>
        <span className="footer-note">pacemap.co.uk · A Signalweight product<br />For informational purposes only · Not financial advice</span>
      </footer>
    </>
  );
}
