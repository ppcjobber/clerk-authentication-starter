"use client";

import Nav from "@/components/Nav";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

// ── Types ─────────────────────────────────────────────────────

type Runner = {
  name: string; or: number; projected: number;
  model_price: string; mkt_price: string;
  win_pct: number; edge: number | null; ev: number | null;
  kelly: number | null; action: string; confidence: string;
  proxied: boolean; draw: number | null; draw_adv: string | null;
};

type Race = {
  id: number; time: string; name: string; grade: string;
  dist: string; going: string; runners: number; free: boolean;
  type: string; pace: string; paceConf: number;
  leads: string[]; prominent: string[]; midfield: string[]; holdup: string[];
  runners_data: Runner[]; narrative: string;
  drawBias?: { favoured: string; magnitude: string } | null;
};

type MeetingData = {
  course: string; date: string; slug: string; races: Race[];
};

// ── Helpers ───────────────────────────────────────────────────

function fmtEdge(edge: number | null): string {
  if (edge === null || edge === undefined) return "—";
  return (edge >= 0 ? "+" : "") + edge + "lb";
}

function fmtEv(ev: number | null): string {
  if (ev === null || ev === undefined) return "—";
  return ev + "x";
}

// ── Race Map ──────────────────────────────────────────────────

function RaceMap({ race, hasAccess }: { race: Race; hasAccess: boolean }) {
  const ranked = race.runners_data || [];
  const sels   = ranked.filter(r => ["EW","BET","BASKET"].includes(r.action || ""));
  const isFlat = race.type === "flat";

  if (!race.free && !hasAccess) {
    return (
      <div style={{ position:"relative", borderRadius:"10px", overflow:"hidden", marginBottom:"28px" }}>
        <div style={{ filter:"blur(5px)", pointerEvents:"none", opacity:0.35, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", padding:"22px" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.35rem", color:"var(--gold)", marginBottom:"12px" }}>{race.time} — {race.name}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px" }}>
            {["Lead","Prominent","Midfield","Hold Up"].map(l => (
              <div key={l} style={{ height:"72px", background:"rgba(255,255,255,0.04)", borderRadius:"6px" }} />
            ))}
          </div>
        </div>
        <div style={{ position:"absolute", inset:0, background:"rgba(10,61,31,0.82)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"12px", textAlign:"center", padding:"28px" }}>
          <div style={{ fontSize:"1.8rem" }}>🔒</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem", color:"var(--gold)" }}>{race.time} — {race.name}</div>
          <p style={{ fontSize:"0.78rem", color:"rgba(245,240,232,0.55)", maxWidth:"320px", lineHeight:"1.65" }}>
            {race.grade} · {race.dist} · {race.runners} runners
          </p>
          <p style={{ fontSize:"0.75rem", color:"rgba(245,240,232,0.45)", maxWidth:"320px", lineHeight:"1.65" }}>
            Unlock all races with a Day Pass (£2.99) or Monthly subscription (£9.99/mo)
          </p>
          <Link href="/pricing" className="btn btn-gold" style={{ marginTop:"4px" }}>Unlock Full Card →</Link>
        </div>
      </div>
    );
  }

  const paceGroups = [
    { key:"leads",    label:"Lead",     color:"var(--lead)",      bg:"rgba(192,57,43,0.07)",  border:"rgba(192,57,43,0.3)"  },
    { key:"prominent",label:"Prominent",color:"var(--prominent)", bg:"rgba(230,126,34,0.06)", border:"rgba(230,126,34,0.3)" },
    { key:"midfield", label:"Midfield", color:"var(--midfield)",  bg:"rgba(41,128,185,0.06)", border:"rgba(41,128,185,0.3)" },
    { key:"holdup",   label:"Hold Up",  color:"var(--holdup)",    bg:"rgba(142,68,173,0.06)", border:"rgba(142,68,173,0.3)" },
  ];

  return (
    <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", overflow:"hidden", marginBottom:"28px" }}>
      {/* Header */}
      <div style={{ padding:"18px 22px", background:"rgba(201,168,76,0.07)", borderBottom:"1px solid rgba(201,168,76,0.14)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"8px" }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.35rem", color:"var(--gold)" }}>{race.time} — {race.name}</div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:"rgba(245,240,232,0.42)", marginTop:"3px" }}>
            {race.dist} · {race.going} · {race.grade} · {race.runners} runners
          </div>
        </div>
        <div style={{ display:"flex", gap:"8px", alignItems:"center", flexWrap:"wrap" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", padding:"3px 9px", borderRadius:"2px", background:"rgba(255,255,255,0.05)", color:"rgba(245,240,232,0.45)" }}>
            {race.pace} · {race.paceConf}% confidence
          </span>
          {race.free && (
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.58rem", padding:"3px 8px", borderRadius:"2px", background:"rgba(39,174,96,0.18)", color:"#2ecc71", border:"1px solid rgba(39,174,96,0.35)" }}>FREE</span>
          )}
          {isFlat && race.drawBias && (
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.58rem", padding:"3px 8px", borderRadius:"2px", background:"rgba(41,128,185,0.18)", color:"#5dade2", border:"1px solid rgba(41,128,185,0.35)" }}>
              Draw: {race.drawBias.favoured} favoured · {race.drawBias.magnitude}
            </span>
          )}
        </div>
      </div>

      <div style={{ padding:"22px" }}>
        {/* Pace distribution */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"22px" }}>
          {paceGroups.map(g => {
            const horses: string[] = (race as any)[g.key] || [];
            return (
              <div key={g.key} style={{ padding:"12px", borderRadius:"6px", border:"1px solid " + g.border, background:g.bg, textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.82rem", color:g.color, marginBottom:"4px" }}>{g.label}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.9rem", color:g.color, lineHeight:1, marginBottom:"4px" }}>{horses.length}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.54rem", color:"rgba(245,240,232,0.42)", lineHeight:1.65 }}>
                  {horses.slice(0,3).join(" · ")}{horses.length > 3 ? ` +${horses.length-3}` : ""}
                </div>
              </div>
            );
          })}
        </div>

        {/* Runner table */}
        <div style={{ overflowX:"auto", borderRadius:"6px", border:"1px solid rgba(255,255,255,0.07)", marginBottom:"18px" }}>
          <table className="pm-table">
            <thead>
              <tr>
                {isFlat && <th>Draw</th>}
                <th>Horse</th>
                <th>OR</th>
                <th>Model</th>
                <th>Market</th>
                <th>Win%</th>
                <th>Edge</th>
                <th>EV</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((r, i) => {
                const isSel    = ["EW","BET","BASKET"].includes(r.action || "");
                const isFancy  = r.confidence === "HIGH" && (r.kelly || 0) >= 0.5 && !isSel && r.action !== "AVOID";
                const rowBg    = isSel ? "rgba(39,174,96,0.04)" : isFancy ? "rgba(201,168,76,0.04)" : "transparent";
                const actColor = isSel ? "#2ecc71" : isFancy ? "var(--gold)" : "rgba(245,240,232,0.45)";
                const actPrefix = isSel ? "⭐ " : isFancy ? "👀 " : "";
                return (
                  <tr key={i} style={{ background:rowBg }}>
                    {isFlat && (
                      <td style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", color:"var(--gold)" }}>
                        {r.draw || "—"}
                        {r.draw_adv === "FAVOURED" && <span style={{ marginLeft:"4px", fontSize:"0.55rem", color:"#2ecc71" }}>✓</span>}
                        {r.draw_adv === "AGAINST"  && <span style={{ marginLeft:"4px", fontSize:"0.55rem", color:"#e74c3c" }}>✗</span>}
                      </td>
                    )}
                    <td>
                      <div style={{ fontWeight:600, color:"var(--cream)", fontSize:"0.84rem" }}>{r.name}</div>
                      {r.proxied && <div style={{ fontSize:"0.56rem", color:"rgba(245,240,232,0.35)" }}>OR proxied</div>}
                    </td>
                    <td style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem", color:"rgba(245,240,232,0.6)" }}>{r.or || "—"}</td>
                    <td style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem", color:"var(--gold)" }}>{r.model_price || "n/a"}</td>
                    <td style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem" }}>{r.mkt_price || "n/a"}</td>
                    <td style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem" }}>{r.win_pct}%</td>
                    <td style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem", color:(r.edge||0) >= 0 ? "#2ecc71" : "#e74c3c" }}>{fmtEdge(r.edge)}</td>
                    <td style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem", color:(r.ev||0) >= 1.25 ? "#2ecc71" : "rgba(245,240,232,0.5)" }}>{fmtEv(r.ev)}</td>
                    <td style={{ fontSize:"0.7rem", fontWeight:isSel?700:400, color:actColor }}>{actPrefix}{r.action}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selections */}
        {sels.length > 0 && (
          <div style={{ background:"rgba(39,174,96,0.07)", border:"1px solid rgba(39,174,96,0.2)", borderRadius:"7px", padding:"14px 18px", marginBottom:"16px" }}>
            <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.85rem", color:"#2ecc71", marginBottom:"8px" }}>⭐ SELECTIONS</p>
            {sels.map((r, i) => (
              <p key={i} style={{ fontSize:"0.78rem", color:"var(--cream)", marginBottom:"4px" }}>
                <strong>{r.name}</strong> · {r.mkt_price || "n/a"} · EV {fmtEv(r.ev)} · JOBY {r.kelly || 0}% · {r.action}
              </p>
            ))}
          </div>
        )}

        {/* Narrative */}
        {race.narrative && (
          <div style={{ background:"rgba(201,168,76,0.055)", border:"1px solid rgba(201,168,76,0.18)", borderRadius:"7px", padding:"16px 20px" }}>
            <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.88rem", color:"var(--gold)", marginBottom:"10px" }}>⚡ Pace Analysis</p>
            {race.narrative.split("\n\n").map((para, i) => (
              para.startsWith("## ") ? (
                <p key={i} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"0.82rem", color:"var(--gold-light)", marginTop:"12px", marginBottom:"4px" }}>
                  {para.replace("## ", "")}
                </p>
              ) : (
                <p key={i} style={{ fontSize:"0.77rem", lineHeight:"1.78", color:"rgba(245,240,232,0.72)", marginBottom:"6px" }}>
                  {para}
                </p>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function MeetingPage({ params }: { params: { slug: string } }) {
  const { isSignedIn } = useUser();
  const [hasAccess, setHasAccess]   = useState(false);
  const [checking, setChecking]     = useState(true);
  const [data, setData]             = useState<MeetingData | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(false);

  // Fetch race data from JSON
  useEffect(() => {
    fetch(`/api/meeting-data?slug=${params.slug}`)
      .then(r => { if (!r.ok) throw new Error("Not found"); return r.json(); })
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [params.slug]);

  // Check subscription
  useEffect(() => {
    if (!isSignedIn) { setChecking(false); return; }
    fetch("/api/check-subscription")
      .then(r => r.json())
      .then(d => { setHasAccess(d.active); setChecking(false); })
      .catch(() => setChecking(false));
  }, [isSignedIn]);

  if (loading) return (
    <>
      <Nav />
      <div className="wrap" style={{ paddingTop:"140px", textAlign:"center" }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem", color:"rgba(245,240,232,0.4)" }}>Loading race data…</p>
      </div>
    </>
  );

  if (error || !data) return (
    <>
      <Nav />
      <div className="wrap" style={{ paddingTop:"140px", textAlign:"center" }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem", color:"rgba(245,240,232,0.4)" }}>Meeting not found.</p>
        <Link href="/archive" style={{ color:"var(--gold)", fontFamily:"'DM Mono',monospace", fontSize:"0.7rem" }}>← Back to archive</Link>
      </div>
    </>
  );

  return (
    <>
      <Nav />
      <div className="wrap">
        <div style={{ marginBottom:"28px", paddingBottom:"18px", borderBottom:"1px solid rgba(201,168,76,0.18)", display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"10px" }}>
          <div>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", textTransform:"uppercase", color:"rgba(245,240,232,0.35)", marginBottom:"6px" }}>
              <Link href="/archive" style={{ color:"rgba(245,240,232,0.35)" }}>Archive</Link>
              <span style={{ margin:"0 6px" }}>›</span>
              {data.course} · {data.date}
            </p>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem", color:"var(--cream)" }}>{data.course}</h1>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.64rem", color:"rgba(245,240,232,0.38)", marginTop:"3px" }}>
              {data.date} · {data.races.length} races
            </p>
          </div>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:"rgba(245,240,232,0.3)", textAlign:"right", lineHeight:"1.7" }}>
            {checking ? "Checking access…" : hasAccess ? "✓ Full access" : "Race 1 free · Rest locked"}
          </p>
        </div>

        {data.races.map((race, i) => (
          <RaceMap key={i} race={race} hasAccess={hasAccess} />
        ))}
      </div>

      <footer>
        <span className="footer-brand">PaceMap</span>
        <span className="footer-note">pacemap.co.uk · A Signalweight product<br />For informational purposes only · Not financial advice</span>
      </footer>
    </>
  );
}
