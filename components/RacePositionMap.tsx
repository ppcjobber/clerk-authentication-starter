"use client";

import { useMemo } from "react";

type Runner = {
  name: string;
  or: number;
  style_code: string;
  last_run?: number | null;
  rpr?: number | null;
  headgear?: string;
  form?: string;
};

type Scenario = {
  label: string;
  title: string;
  prob: number;
  winners: string[];
  others: string[];
};

type RacePositionMapProps = {
  leads: string[];
  prominent: string[];
  midfield: string[];
  holdup: string[];
  runners_data: Runner[];
  scenarios: Scenario[];
  paceDynamic: string;
};

const STYLE_COLORS: Record<string, { stroke: string; fill: string }> = {
  lead:      { stroke: "#e74c3c", fill: "#e74c3c" },
  prominent: { stroke: "#f39c12", fill: "#f39c12" },
  midfield:  { stroke: "#3498db", fill: "#3498db" },
  holdup:    { stroke: "#a569bd", fill: "#a569bd" },
};

const SCENARIO_COLORS = ["#2980b9", "#8e44ad", "#27ae60", "#c0392b"];

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

export default function RacePositionMap({
  leads, prominent, midfield, holdup,
  runners_data, scenarios,
}: RacePositionMapProps) {

  const allHorses = useMemo(() => {
    const list: { name: string; group: string; color: typeof STYLE_COLORS[string] }[] = [];
    leads.forEach(n =>     list.push({ name: n, group: "lead",      color: STYLE_COLORS.lead }));
    prominent.forEach(n => list.push({ name: n, group: "prominent", color: STYLE_COLORS.prominent }));
    midfield.forEach(n =>  list.push({ name: n, group: "midfield",  color: STYLE_COLORS.midfield }));
    holdup.forEach(n =>    list.push({ name: n, group: "holdup",    color: STYLE_COLORS.holdup }));
    return list;
  }, [leads, prominent, midfield, holdup]);

  const dominantScenario = scenarios[0] || null;
  const n = allHorses.length;

  // Build complete finish order from scenario winners + others + rest
  const finishOrder = useMemo(() => {
    if (!dominantScenario || n === 0) return allHorses.map((_, i) => i);

    const ordered: string[] = [];
    dominantScenario.winners.forEach(w => {
      if (allHorses.find(h => h.name === w)) ordered.push(w);
    });
    dominantScenario.others.forEach(o => {
      if (allHorses.find(h => h.name === o) && !ordered.includes(o)) ordered.push(o);
    });
    allHorses.forEach(h => {
      if (!ordered.includes(h.name)) ordered.push(h.name);
    });

    return allHorses.map(h => ordered.indexOf(h.name));
  }, [allHorses, dominantScenario, n]);

  if (n === 0) return null;

  // Layout constants
  const W        = 660;
  const X_LABEL  = 125;
  const X_START  = 140;
  const X_MID    = 300;
  const X_3OUT   = 460;
  const X_FINISH = 580;
  const X_RLABEL = 595;
  const TOP      = 44;
  const rowH     = Math.min(48, Math.max(32, Math.floor(380 / n)));
  const trackH   = n * rowH;
  const BAR_Y    = TOP + trackH + 20;
  const BAR_H    = 38;
  const svgH     = BAR_Y + BAR_H + 16;

  const startY  = (i: number) => TOP + i * rowH + rowH / 2;
  const finishY = (i: number) => TOP + finishOrder[i] * rowH + rowH / 2;

  // Key function: realistic mid and 3-out positions per running style
  const getPathY = (i: number): { mid: number; threeOut: number } => {
    const sy     = startY(i);
    const fy     = finishY(i);
    const group  = allHorses[i].group;
    const isWin  = dominantScenario?.winners.includes(allHorses[i].name) ?? false;
    const moveDist = fy - sy; // negative = moving up (finishing higher), positive = dropping back

    switch (group) {
      case "lead":
        // Leaders stay on the pace throughout — only shift happens at 3 out
        // If fading: stays flat until 3 out then drops sharply
        // If holding: barely moves all race
        return {
          mid:      sy,                                    // locked on lead mid-race
          threeOut: sy + moveDist * 0.50,                 // challenge point
        };

      case "prominent":
        // Prominent horses track close to leader, begin pressing from mid-race
        return {
          mid:      sy + moveDist * 0.35,                 // tracking move building
          threeOut: sy + moveDist * 0.75,                 // pressing hard
        };

      case "midfield":
        // Midfield hold steady then make their move from 3 out
        return {
          mid:      sy + moveDist * 0.12,                 // barely moving
          threeOut: sy + moveDist * 0.62,                 // starting to motor
        };

      case "holdup":
        if (isWin) {
          // Winning hold-up: deliberate hold, sweeping run from 3 out
          return {
            mid:      sy + rowH * 0.12,                  // anchored at rear
            threeOut: sy + moveDist * 0.52,              // big move launching
          };
        } else {
          // Losing hold-up: stays back, never gets competitive
          return {
            mid:      sy + rowH * 0.05,                  // barely moves
            threeOut: sy + moveDist * 0.30,              // half-hearted move
          };
        }

      default:
        return {
          mid:      sy + moveDist * 0.20,
          threeOut: sy + moveDist * 0.60,
        };
    }
  };

  const isWinner = (name: string) => dominantScenario?.winners.includes(name) ?? false;
  const isOther  = (name: string) => dominantScenario?.others.includes(name) ?? false;

  return (
    <div style={{ marginBottom: "20px" }}>
      <svg
        viewBox={`0 0 ${W} ${svgH}`}
        style={{ width: "100%", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="rpmArr" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>

        {/* Phase headers */}
        {([
          { x: X_START,  label: "START"    },
          { x: X_MID,    label: "MID-RACE" },
          { x: X_3OUT,   label: "3 OUT"    },
          { x: X_FINISH, label: "FINISH"   },
        ] as { x: number; label: string }[]).map(({ x, label }) => (
          <text key={label} x={x} y={TOP - 12}
            textAnchor="middle" fontSize={8}
            fill="rgba(245,240,232,0.3)"
            fontFamily="'DM Mono',monospace" letterSpacing="0.08em">
            {label}
          </text>
        ))}

        {/* Phase dividers */}
        {[X_MID, X_3OUT].map(x => (
          <line key={x}
            x1={x} y1={TOP - 4} x2={x} y2={TOP + trackH + 4}
            stroke="rgba(255,255,255,0.07)" strokeWidth={0.5}
            strokeDasharray="3,4"
          />
        ))}

        {/* Finish line */}
        <line
          x1={X_FINISH} y1={TOP - 4}
          x2={X_FINISH} y2={TOP + trackH + 4}
          stroke="rgba(46,204,113,0.6)" strokeWidth={1.5}
        />

        {/* Background row bands */}
        {allHorses.map((h, i) => (
          <rect key={i}
            x={X_START - 8} y={TOP + i * rowH}
            width={X_FINISH - X_START + 16} height={rowH}
            fill={h.color.fill} fillOpacity={0.03}
          />
        ))}

        {/* Horse name labels — left side */}
        {allHorses.map((h, i) => {
          const winner = isWinner(h.name);
          const other  = isOther(h.name);
          const runner = runners_data.find(r => r.name === h.name);
          const rpr    = runner?.rpr;
          const hg     = runner?.headgear;
          const hasExtra = !!(hg || rpr);

          return (
            <g key={`label-${i}`}>
              <text
                x={X_LABEL} y={startY(i) + (hasExtra ? -4 : 3)}
                textAnchor="end"
                fontSize={winner ? 9.5 : 8.5}
                fill={
                  winner ? h.color.fill :
                  other  ? "rgba(245,240,232,0.65)" :
                           "rgba(245,240,232,0.4)"
                }
                fontFamily="'DM Mono',monospace"
                fontWeight={winner ? "600" : "400"}>
                {truncate(h.name, 17)}
              </text>
              {hasExtra && (
                <text
                  x={X_LABEL} y={startY(i) + 8}
                  textAnchor="end" fontSize={7}
                  fill={h.color.fill} fillOpacity={0.55}
                  fontFamily="'DM Mono',monospace">
                  {[hg, rpr ? `RPR${rpr}` : null].filter(Boolean).join(" · ")}
                </text>
              )}
            </g>
          );
        })}

        {/* Horse paths — drawn back-to-front so winners render on top */}
        {[...allHorses].reverse().map((h, ri) => {
          const i      = n - 1 - ri;
          const sy     = startY(i);
          const fy     = finishY(i);
          const { mid: my, threeOut: ty } = getPathY(i);
          const winner = isWinner(h.name);
          const other  = isOther(h.name);
          const isMid  = h.group === "midfield";

          const opacity   = winner ? 1 : other ? 0.65 : 0.30;
          const sw        = winner ? 2.2 : other ? 1.5 : 1.0;
          const dashArray = isMid && !winner ? "4,3" : "none";

          return (
            <g key={`path-${i}`}>
              <polyline
                points={`${X_START},${sy} ${X_MID},${my} ${X_3OUT},${ty} ${X_FINISH},${fy}`}
                fill="none"
                stroke={h.color.stroke}
                strokeWidth={sw}
                strokeOpacity={opacity}
                strokeDasharray={dashArray}
                strokeLinecap="round"
                strokeLinejoin="round"
                markerEnd="url(#rpmArr)"
              />
              <circle
                cx={X_START} cy={sy}
                r={winner ? 5 : other ? 3.5 : 2.5}
                fill={h.color.fill}
                fillOpacity={winner ? 1 : other ? 0.65 : 0.35}
              />
            </g>
          );
        })}

        {/* Finish position labels — right side */}
        {allHorses.map((h, i) => {
          const fy     = finishY(i);
          const rank   = finishOrder[i];
          const winner = isWinner(h.name);
          const other  = isOther(h.name);

          return (
            <text key={`rlabel-${i}`}
              x={X_RLABEL} y={fy + 3}
              fontSize={winner ? 9 : 7.5}
              fill={
                winner ? h.color.fill :
                other  ? "rgba(245,240,232,0.5)" :
                         "rgba(245,240,232,0.22)"
              }
              fontFamily="'DM Mono',monospace"
              fontWeight={winner ? "600" : "400"}>
              {rank + 1}. {truncate(h.name, 13)}
            </text>
          );
        })}

        {/* Legend */}
        {([
          { label: "Lead",      col: STYLE_COLORS.lead },
          { label: "Prominent", col: STYLE_COLORS.prominent },
          { label: "Midfield",  col: STYLE_COLORS.midfield },
          { label: "Hold Up",   col: STYLE_COLORS.holdup },
        ] as { label: string; col: typeof STYLE_COLORS[string] }[]).map(({ label, col }, i) => (
          <g key={`leg-${i}`}
            transform={`translate(${X_START + i * 115}, ${TOP + trackH + 6})`}>
            <circle cx={0} cy={0} r={3.5} fill={col.fill} fillOpacity={0.75}/>
            <text x={7} y={4} fontSize={7.5}
              fill="rgba(245,240,232,0.35)"
              fontFamily="'DM Mono',monospace">
              {label}
            </text>
          </g>
        ))}

        {/* Scenario probability bar */}
        {scenarios.length > 0 && (() => {
          const barW = X_FINISH - X_START + 16;
          const barX = X_START - 8;
          let cumW   = 0;
          return (
            <g>
              {scenarios.map((sc, i) => {
                const sw = (sc.prob / 100) * barW;
                const sx = barX + cumW;
                cumW += sw;
                return (
                  <g key={sc.label}>
                    <rect x={sx} y={BAR_Y} width={sw} height={BAR_H}
                      fill={SCENARIO_COLORS[i]}
                      fillOpacity={i === 0 ? 0.22 : 0.10}
                      rx={i === 0 ? 3 : 0}
                    />
                    {sw > 70 && (
                      <>
                        <text x={sx + 6} y={BAR_Y + 14} fontSize={8.5}
                          fill={SCENARIO_COLORS[i]}
                          fontFamily="'DM Mono',monospace" fontWeight="600">
                          {sc.label}: {sc.prob}%
                        </text>
                        <text x={sx + 6} y={BAR_Y + 27} fontSize={7.5}
                          fill="rgba(245,240,232,0.4)"
                          fontFamily="'DM Mono',monospace">
                          {truncate(sc.title, 22)}
                        </text>
                      </>
                    )}
                    {sw <= 70 && sw > 28 && (
                      <text x={sx + 5} y={BAR_Y + 14} fontSize={8}
                        fill={SCENARIO_COLORS[i]}
                        fontFamily="'DM Mono',monospace" fontWeight="600">
                        {sc.label} {sc.prob}%
                      </text>
                    )}
                  </g>
                );
              })}
              <rect x={barX} y={BAR_Y} width={barW} height={BAR_H}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.5} rx={3}
              />
            </g>
          );
        })()}

      </svg>
    </div>
  );
}
