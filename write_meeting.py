f = open("app/meetings/cheltenham-13-march-2026/page.tsx", "w")
f.write('"use client";

import Nav from "@/components/Nav";
import Link from "next/link";
import { useUser, SignUpButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type Runner = {
  no: number; name: string; jockey: string; trainer: string;
  pos: "L"|"P"|"M"|"H"; finish: "S"|"E"|"F";
  ground: string; groundOk: boolean|null; rpr: number;
  tier: "1"|"2"|"pace"|null;
};

type Race = {
  id: number; time: string; name: string; grade: string;
  dist: string; going: string; runners: number; free: boolean;
  pace: string; paceConf: number;
  leads: string[]; prominent: string[]; midfield: string[]; holdup: string[];
  table: Runner[];
  analysis: { title: string; body: string }[];
};

const RACES: Race[] = [
  {
    id: 1, time: "1:20", name: "JCB Triumph Hurdle", grade: "G1",
    dist: "2m1f", going: "Good to Soft", runners: 20, free: true,
    pace: "CONTESTED", paceConf: 85,
    leads:     ["Kai Lung", "Minella Academy", "One Horse Town"],
    prominent: ["Highland Crystal", "Minella Study", "Proactif", "Selma De Vary", "Macho Man", "Mon Creuset", "Fantasy World", "Noemie De La Vis"],
    midfield:  ["Maestro Conti", "Indian River", "Lord Byron", "Tenter Le Tout"],
    holdup:    ["Apolon De Charnie", "Berto Ramirez", "Forty Fifty", "North Shore", "Wolf Rayet"],
    table: [
      { no:6,  name:"Kai Lung",          jockey:"Sean O\'Keeffe",  trainer:"W P Mullins",    pos:"L", finish:"E", ground:"Soft",  groundOk:true,  rpr:118, tier:"pace" },
      { no:10, name:"Minella Academy",   jockey:"Danny Mullins",  trainer:"W P Mullins",    pos:"L", finish:"E", ground:"Soft",  groundOk:true,  rpr:109, tier:null },
      { no:14, name:"One Horse Town",    jockey:"Paul O\'Brien",   trainer:"Harry Derham",   pos:"L", finish:"E", ground:"Good",  groundOk:null,  rpr:122, tier:null },
      { no:17, name:"Highland Crystal",  jockey:"Jack Kennedy",   trainer:"Gordon Elliott", pos:"P", finish:"S", ground:"Soft",  groundOk:true,  rpr:129, tier:"1" },
      { no:11, name:"Minella Study",     jockey:"Ryan Mania",     trainer:"Adam Nicol",     pos:"P", finish:"S", ground:"GtoS",  groundOk:true,  rpr:131, tier:"1" },
      { no:15, name:"Proactif",          jockey:"Mark Walsh",     trainer:"W P Mullins",    pos:"P", finish:"S", ground:"Soft",  groundOk:true,  rpr:127, tier:"2" },
      { no:19, name:"Selma De Vary",     jockey:"Paul Townend",   trainer:"W P Mullins",    pos:"P", finish:"S", ground:"Heavy", groundOk:false, rpr:129, tier:"2" },
      { no:8,  name:"Macho Man",         jockey:"Brian Hayes",    trainer:"W P Mullins",    pos:"P", finish:"E", ground:"Soft",  groundOk:true,  rpr:122, tier:null },
      { no:9,  name:"Maestro Conti",     jockey:"Harry Skelton",  trainer:"Dan Skelton",    pos:"M", finish:"S", ground:"GtoS",  groundOk:true,  rpr:123, tier:"1" },
      { no:5,  name:"Indian River",      jockey:"Kielan Woods",   trainer:"A P Keatley",    pos:"M", finish:"E", ground:"GtoS",  groundOk:true,  rpr:113, tier:null },
      { no:7,  name:"Lord Byron",        jockey:"Ben Jones",      trainer:"Faye Bramley",   pos:"M", finish:"E", ground:"Soft",  groundOk:true,  rpr:115, tier:null },
      { no:20, name:"Tenter Le Tout",    jockey:"Gavin Sheehan",  trainer:"Chester Williams", pos:"M", finish:"E", ground:"Good", groundOk:null, rpr:115, tier:null },
      { no:1,  name:"Apolon De Charnie", jockey:"Mr P W Mullins", trainer:"W P Mullins",    pos:"H", finish:"S", ground:"Soft",  groundOk:true,  rpr:93,  tier:null },
      { no:4,  name:"Forty Fifty",       jockey:"Jonathan Burke", trainer:"W P Mullins",    pos:"H", finish:"S", ground:"—",     groundOk:null,  rpr:102, tier:null },
      { no:13, name:"North Shore",       jockey:"Keith Donoghue", trainer:"G Cromwell",     pos:"H", finish:"F", ground:"Soft",  groundOk:true,  rpr:128, tier:null },
    ],
    analysis: [
      { title:"Contested early pace", body:"Three horses are rated as leaders — Kai Lung, Minella Academy and One Horse Town. This means genuine, honest early fractions — not a crawl." },
      { title:"Prominent group congested (8 horses)", body:"In a field of 20 with strong early pace, there will be traffic and jostling for position from 3–4 out. Horses that handle the hurly-burly and find a gap late are at a premium." },
      { title:"Strong finishers at the top", body:"The Tier 1 horses — Highland Crystal, Minella Study and Maestro Conti — are all rated as strong finishers. In a genuinely-run race with a stiff Cheltenham finish, this is the optimal profile." },
      { title:"Hold-up horses face a tough task", body:"With 3 confirmed leaders and a large prominent group, getting a clear run late at Cheltenham from off the pace is difficult. The winner Apolon De Charnie (50/1) defied this — a reminder that pace maps inform, not predict." },
    ],
  },
  { id:2, time:"2:00", name:"William Hill County Hurdle",     grade:"HCAP", dist:"2m1f",  going:"Soft",         runners:24, free:false, pace:"SLOWLY_RUN", paceConf:70, leads:[], prominent:[], midfield:[], holdup:[], table:[], analysis:[] },
  { id:3, time:"2:40", name:"Mrs Paddy Power Mares\' Chase",  grade:"G2",   dist:"2m4½f", going:"Good to Soft",  runners:9,  free:false, pace:"CONTESTED",  paceConf:60, leads:[], prominent:[], midfield:[], holdup:[], table:[], analysis:[] },
  { id:4, time:"3:20", name:"Albert Bartlett Novices Hurdle",grade:"G1",   dist:"3m",    going:"Soft",         runners:22, free:false, pace:"CONTESTED",  paceConf:55, leads:[], prominent:[], midfield:[], holdup:[], table:[], analysis:[] },
  { id:5, time:"4:00", name:"Cheltenham Gold Cup",           grade:"G1",   dist:"3m2½f", going:"Good to Soft",  runners:11, free:false, pace:"SLOWLY_RUN", paceConf:80, leads:[], prominent:[], midfield:[], holdup:[], table:[], analysis:[] },
];

function posStyle(pos: string) {
  const map: Record<string,{bg:string;color:string;border:string;label:string}> = {
    L: { bg:"rgba(192,57,43,0.2)",  color:"#e74c3c", border:"rgba(192,57,43,0.4)",  label:"LEAD" },
    P: { bg:"rgba(230,126,34,0.2)", color:"#f39c12", border:"rgba(230,126,34,0.4)", label:"PROM" },
    M: { bg:"rgba(41,128,185,0.2)", color:"#5dade2", border:"rgba(41,128,185,0.4)", label:"MID"  },
    H: { bg:"rgba(142,68,173,0.2)", color:"#a569bd", border:"rgba(142,68,173,0.4)", label:"HOLD" },
  };
  return map[pos] || map.H;
}

function RaceMap({ race }: { race: Race }) {
  const paceColors = { L:"var(--lead)", P:"var(--prominent)", M:"var(--midfield)", H:"var(--holdup)" };
  const paceBg     = { L:"rgba(192,57,43,0.07)", P:"rgba(230,126,34,0.06)", M:"rgba(41,128,185,0.06)", H:"rgba(142,68,173,0.06)" };
  const paceBorder = { L:"rgba(192,57,43,0.3)",  P:"rgba(230,126,34,0.3)",  M:"rgba(41,128,185,0.3)",  H:"rgba(142,68,173,0.3)" };
  const paceLabels = { L:"Lead", P:"Prominent", M:"Midfield", H:"Hold Up" };
  const paceGroups = { L:race.leads, P:race.prominent, M:race.midfield, H:race.holdup };

  return (
    <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", overflow:"hidden", marginBottom:"28px" }}>
      <div style={{ padding:"18px 22px", background:"rgba(201,168,76,0.07)", borderBottom:"1px solid rgba(201,168,76,0.14)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"8px" }}>
        <div>
          <div style={{ fontFamily:"\'Bebas Neue\',sans-serif", fontSize:"1.35rem", letterSpacing:"0.04em", color:"var(--gold)" }}>{race.time} — {race.name}</div>
          <div style={{ fontFamily:"\'DM Mono\',monospace", fontSize:"0.62rem", color:"rgba(245,240,232,0.42)", marginTop:"3px" }}>{race.dist} · {race.going} · {race.grade} · {race.runners} runners</div>
        </div>
        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          <span style={{ fontFamily:"\'DM Mono\',monospace", fontSize:"0.6rem", padding:"3px 9px", borderRadius:"2px", background:"rgba(255,255,255,0.05)", color:"rgba(245,240,232,0.45)" }}>
            {race.pace} · {race.paceConf}% confidence
          </span>
          {race.free && <span style={{ fontFamily:"\'DM Mono\',monospace", fontSize:"0.58rem", padding:"3px 8px", borderRadius:"2px", background:"rgba(39,174,96,0.18)", color:"#2ecc71", border:"1px solid rgba(39,174,96,0.35)" }}>FREE</span>}
        </div>
      </div>

      <div style={{ padding:"22px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"22px" }}>
          {(["L","P","M","H"] as const).map(k => (
            <div key={k} style={{ padding:"12px", borderRadius:"6px", border:`1px solid ${paceBorder[k]}`, background:paceBg[k], textAlign:"center" }}>
              <div style={{ fontFamily:"\'Bebas Neue\',sans-serif", fontSize:"0.82rem", letterSpacing:"0.1em", color:paceColors[k], marginBottom:"4px" }}>{paceLabels[k]}</div>
              <div style={{ fontFamily:"\'Bebas Neue\',sans-serif", fontSize:"1.9rem", color:paceColors[k], lineHeight:1, marginBottom:"4px" }}>{paceGroups[k].length}</div>
              <div style={{ fontFamily:"\'DM Mono\',monospace", fontSize:"0.54rem", color:"rgba(245,240,232,0.42)", lineHeight:1.65 }}>
                {paceGroups[k].slice(0,3).join(" · ")}{paceGroups[k].length > 3 ? ` +${paceGroups[k].length-3}` : ""}
              </div>
            </div>
          ))}
        </div>

        {race.table.length > 0 && (
          <div style={{ overflowX:"auto", borderRadius:"6px", border:"1px solid rgba(255,255,255,0.07)", marginBottom:"18px" }}>
            <table className="pm-table">
              <thead>
                <tr><th>#</th><th>Horse</th><th>Trainer</th><th>Position</th><th>Finish</th><th>Ground</th><th>RPR</th><th>Tier</th></tr>
              </thead>
              <tbody>
                {race.table.map(r => {
                  const ps = posStyle(r.pos);
                  return (
                    <tr key={r.no} className={r.tier === "1" ? "row-tier1" : r.tier === "pace" ? "row-pace" : ""}>
                      <td style={{ fontFamily:"\'DM Mono\',monospace", fontSize:"0.67rem", color:"var(--gold)", fontWeight:500 }}>{r.no}</td>
                      <td>
                        <div style={{ fontWeight:600, color:"var(--cream)", fontSize:"0.84rem" }}>{r.name}</div>
                        <div style={{ fontSize:"0.6rem", color:"rgba(245,240,232,0.42)" }}>{r.jockey}</div>
                      </td>
                      <td style={{ fontSize:"0.68rem", color:"rgba(245,240,232,0.55)" }}>{r.trainer}</td>
                      <td><span className="pos-badge" style={{ background:ps.bg, color:ps.color, border:`1px solid ${ps.border}` }}>{ps.label}</span></td>
                      <td style={{ fontSize:"0.76rem", color:r.finish==="S"?"#27ae60":r.finish==="F"?"#e74c3c":"#7f8c8d", fontWeight:r.finish==="S"?600:400 }}>
                        {r.finish==="S"?"Strong ↑":r.finish==="F"?"Fades ↓":"Even"}
                      </td>
                      <td style={{ fontSize:"0.73rem" }}>
                        {r.ground}
                        <span className={`ground-tag ${r.groundOk===true?"ground-ok":r.groundOk===false?"ground-warn":"ground-neutral"}`}>
                          {r.groundOk===true?"✓":r.groundOk===false?"⚠":"~"}
                        </span>
                      </td>
                      <td style={{ fontFamily:"\'DM Mono\',monospace", fontSize:"0.72rem", color:r.rpr>=126?"#2ecc71":r.rpr>=114?"#f39c12":"rgba(245,240,232,0.32)", fontWeight:r.rpr>=126?600:400 }}>{r.rpr}</td>
                      <td>
                        {r.tier==="1"    && <span className="tier-badge tier-1">T1</span>}
                        {r.tier==="2"    && <span className="tier-badge tier-2">T2</span>}
                        {r.tier==="pace" && <span className="tier-badge tier-pace">PM</span>}
                        {!r.tier && <span style={{ color:"rgba(245,240,232,0.2)" }}>—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {race.analysis.length > 0 && (
          <div style={{ background:"rgba(201,168,76,0.055)", border:"1px solid rgba(201,168,76,0.18)", borderRadius:"7px", padding:"16px 20px" }}>
            <p style={{ fontFamily:"\'Bebas Neue\',sans-serif", fontSize:"0.88rem", letterSpacing:"0.12em", color:"var(--gold)", marginBottom:"10px" }}>⚡ Pace Scenario — What This Map Tells Us</p>
            {race.analysis.map((a,i) => (
              <p key={i} style={{ fontSize:"0.77rem", lineHeight:"1.78", color:"rgba(245,240,232,0.72)", marginBottom:i<race.analysis.length-1?"7px":0 }}>
                <strong style={{ color:"var(--gold-light)" }}>{a.title}: </strong>{a.body}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LockedRace({ race }: { race: Race }) {
  return (
    <div style={{ position:"relative", borderRadius:"10px", overflow:"hidden", marginBottom:"28px" }}>
      <div style={{ filter:"blur(5px)", pointerEvents:"none", opacity:0.35, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", padding:"22px" }}>
        <div style={{ fontFamily:"\'Bebas Neue\',sans-serif", fontSize:"1.35rem", color:"var(--gold)", marginBottom:"12px" }}>{race.time} — {race.name}</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px" }}>
          {["Lead","Prominent","Midfield","Hold Up"].map(l => <div key={l} style={{ height:"72px", background:"rgba(255,255,255,0.04)", borderRadius:"6px" }} />)}
        </div>
      </div>
      <div style={{ position:"absolute", inset:0, background:"rgba(10,61,31,0.78)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"10px", textAlign:"center", padding:"28px" }}>
        <div style={{ fontSize:"1.6rem" }}>🔒</div>
        <div style={{ fontFamily:"\'Bebas Neue\',sans-serif", fontSize:"1.2rem", letterSpacing:"0.05em", color:"var(--gold)" }}>{race.time} — {race.name}</div>
        <p style={{ fontSize:"0.76rem", color:"rgba(245,240,232,0.5)", maxWidth:"300px", lineHeight:"1.6" }}>{race.grade} · {race.dist} · {race.runners} runners</p>
        <p style={{ fontSize:"0.74rem", color:"rgba(245,240,232,0.45)", maxWidth:"300px", lineHeight:"1.6" }}>Unlock all races with a Day Pass (£2.99) or Monthly subscription (£9.99/mo)</p>
        <Link href="/pricing" className="btn btn-gold" style={{ marginTop:"6px" }}>Unlock Full Card →</Link>
      </div>
    </div>
  );
}

export default function CheltenhamMeeting() {
  const { isSignedIn } = useUser();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isSignedIn) { setChecking(false); return; }
    fetch("/api/check-subscription")
      .then(r => r.json())
      .then(d => { setHasAccess(d.active); setChecking(false); })
      .catch(() => setChecking(false));
  }, [isSignedIn]);

  return (
    <>
      <Nav />
      <div className="wrap">
        <div style={{ marginBottom:"28px", paddingBottom:"18px", borderBottom:"1px solid rgba(201,168,76,0.18)", display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"10px" }}>
          <div>
            <p style={{ fontFamily:"\'DM Mono\',monospace", fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(245,240,232,0.35)", marginBottom:"6px" }}>
              <Link href="/archive" style={{ color:"rgba(245,240,232,0.35)" }}>Archive</Link>
              <span style={{ margin:"0 6px" }}>›</span>
              Cheltenham · 13 March 2026
            </p>
            <h1 style={{ fontFamily:"\'Bebas Neue\',sans-serif", fontSize:"2rem", letterSpacing:"0.04em", color:"var(--cream)" }}>Cheltenham Festival — Day 4</h1>
            <p style={{ fontFamily:"\'DM Mono\',monospace", fontSize:"0.64rem", color:"rgba(245,240,232,0.38)", marginTop:"3px" }}>Friday 13 March 2026 · Good to Soft / Soft · 5 races</p>
          </div>
          <p style={{ fontFamily:"\'DM Mono\',monospace", fontSize:"0.62rem", color:"rgba(245,240,232,0.3)", textAlign:"right", lineHeight:"1.7" }}>
            {checking ? "Checking access…" : hasAccess ? "✓ Full access active" : "Race 1 free · Races 2–5 locked"}
          </p>
        </div>

        {RACES.map(race =>
          (race.free || hasAccess)
            ? <RaceMap key={race.id} race={race} />
            : <LockedRace key={race.id} race={race} />
        )}
      </div>

      <footer>
        <span className="footer-brand">PaceMap</span>
        <span className="footer-note">pacemap.co.uk · A Signalweight product<br />For informational purposes only · Not financial advice</span>
      </footer>
    </>
  );
}
')
f.close()
print("Done")
