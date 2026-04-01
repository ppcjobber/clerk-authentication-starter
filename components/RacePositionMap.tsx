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

const STYLE_COLORS: Record<string, { stroke: string; fill: string; text: string }> = {
  lead:     { stroke: "#e74c3c", fill: "#e74c3c", text: "#922b21" },
  prominent:{ stroke: "#f39c12", fill: "#f39c12", text: "#935116" },
  midfield: { stroke: "#3498db", fill: "#3498db", text: "#1a5276" },
  holdup:   { stroke: "#a569bd", fill: "#a569bd", text: "#6c3483" },
};

const SCENARIO_COLORS = ["#2980b9","#8e44ad","#27ae60","#c0392b"];

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

export default function RacePositionMap({
  leads, prominent, midfield, holdup,
  runners_data, scenarios, paceDynamic,
}: RacePositionMapProps) {

  // Build ordered list of all horses with their group
  const allHorses = useMemo(() => {
    const list: { name: string; group: string; color: typeof STYLE_COLORS[string] }[] = [];
    leads.forEach(n =>     list.push({ name: n, group: "lead",      color: STYLE_COLORS.lead }));
    prominent.forEach(n => list.push({ name: n, group: "prominent", color: STYLE_COLORS.prominent }));
    midfield.forEach(n =>  list.push({ name: n, group: "midfield",  color: STYLE_COLORS.midfield }));
    holdup.forEach(n =>    list.push({ name: n, group: "holdup",    color: STYLE_COLORS.holdup }));
    return list;
  }, [leads, prominent, midfield, holdup]);

  const dominantScenario = scenarios[0] || null;

  // Compute finish positions based on dominant scenario
  // Winners move up, others stay or drop
  const finishPositions = useMemo(() => {
    if (!dominantScenario) return allHorses.map((h, i) => i);
    const winnerNames = dominantScenario.winners;
    const finishOrder: string[] = [];
    // Push winners first
    winnerNames.forEach(w => {
      if (allHorses.find(h => h.name === w)) finishOrder.push(w);
    });
    // Then rest in original order
    allHorses.forEach(h => {
      if (!finishOrder.includes(h.name)) finishOrder.push(h.name);
    });
    return allHorses.map(h => finishOrder.indexOf(h.name));
  }, [allHorses, dominantScenario]);

  const n = allHorses.length;
  if (n === 0) return null;

  // SVG dimensions
  const W = 660;
  const TOP = 50;
  const BOTTOM = 40;
  const rowH = Math.min(52, Math.max(36, Math.floor((480 - TOP - BOTTOM) / n)));
  const H = TOP + n * rowH + BOTTOM + 80; // extra for scenario bar

  // X positions for each phase
  const X_START  = 130;
  const X_MID    = 320;
  const X_3OUT   = 490;
  const X_FINISH = 600;

  // Y position for horse i at start
  const startY = (i: number) => TOP + i * rowH + rowH / 2;

  // Y position for horse i at finish (based on finishPositions)
  const finishY = (i: number) => {
    const finishRank = finishPositions[i];
    return TOP + finishRank * rowH + rowH / 2;
  };

  // Mid and 3out Y — interpolate with some realistic drift
  const midY = (i: number) => {
    const sy = startY(i);
    const fy = finishY(i);
    // Hold-up horses stay back mid-race, make move at 3out
    if (allHorses[i].group === "holdup") return sy + rowH * 0.1;
    return sy + (fy - sy) * 0.15;
  };

  const threeOutY = (i: number) => {
    const sy = startY(i);
    const fy = finishY(i);
    if (allHorses[i].group === "holdup") return sy + (fy - sy) * 0.6;
    return sy + (fy - sy) * 0.7;
  };

  // Is this horse in the dominant scenario winners?
  const isWinner = (name: string) =>
    dominantScenario?.winners.includes(name) ?? false;

  const scenarioBarH = 44;
  const svgH = H + scenarioBarH;

  return (
    <div style={{ marginBottom: "20px" }}>
      <svg
        viewBox={`0 0 ${W} ${svgH}`}
        style={{ width: "100%", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>

        {/* Background row bands */}
        {allHorses.map((h, i) => (
          <rect key={i}
            x={X_START - 10} y={TOP + i * rowH}
            width={X_FINISH - X_START + 20} height={rowH}
            fill={h.color.fill} fillOpacity={0.04} rx={0}
          />
        ))}

        {/* Gridlines */}
        {allHorses.map((_, i) => (
          <line key={i}
            x1={X_START - 10} y1={TOP + i * rowH}
            x2={X_FINISH + 10} y2={TOP + i * rowH}
            stroke="rgba(255,255,255,0.06)" strokeWidth={0.5}
          />
        ))}

        {/* Phase column headers */}
        {[
          { x: X_START,  label: "START" },
          { x: X_MID,    label: "MID-RACE" },
          { x: X_3OUT,   label: "3 OUT" },
          { x: X_FINISH, label: "FINISH" },
        ].map(({ x, label }) => (
          <text key={label} x={x} y={TOP - 10}
            textAnchor="middle" fontSize={9}
            fill="rgba(245,240,232,0.35)"
            fontFamily="'DM Mono',monospace" letterSpacing={1}>
            {label}
          </text>
        ))}

        {/* Phase dividers */}
        {[X_MID, X_3OUT].map(x => (
          <line key={x}
            x1={x} y1={TOP - 4} x2={x} y2={TOP + n * rowH + 4}
            stroke="rgba(255,255,255,0.08)" strokeWidth={0.5}
            strokeDasharray="3,4"
          />
        ))}

        {/* Finish line */}
        <line
          x1={X_FINISH} y1={TOP - 4}
          x2={X_FINISH} y2={TOP + n * rowH + 4}
          stroke="#27ae60" strokeWidth={1.5}
        />

        {/* Horse name labels — left side */}
        {allHorses.map((h, i) => {
          const runner = runners_data.find(r => r.name === h.name);
          const extras = [
            runner?.rpr   ? `RPR${runner.rpr}` : null,
            runner?.headgear ? runner.headgear : null,
            runner?.last_run != null ? `${runner.last_run}d` : null,
          ].filter(Boolean).join(" · ");

          return (
            <g key={i}>
              <text x={X_START - 14} y={startY(i) - 3}
                textAnchor="end" fontSize={9.5}
                fill={isWinner(h.name) ? h.color.fill : "rgba(245,240,232,0.7)"}
                fontFamily="'DM Mono',monospace"
                fontWeight={isWinner(h.name) ? "600" : "400"}>
                {truncate(h.name, 18)}
              </text>
              {extras && (
                <text x={X_START - 14} y={startY(i) + 8}
                  textAnchor="end" fontSize={7.5}
                  fill={h.color.text} fillOpacity={0.7}
                  fontFamily="'DM Mono',monospace">
                  {extras}
                </text>
              )}
            </g>
          );
        })}

        {/* Horse paths */}
        {allHorses.map((h, i) => {
          const sy = startY(i);
          const my = midY(i);
          const ty = threeOutY(i);
          const fy = finishY(i);
          const winner = isWinner(h.name);
          const isHoldup = h.group === "holdup";
          const isMid = h.group === "midfield";

          return (
            <g key={i}>
              <polyline
                points={`${X_START},${sy} ${X_MID},${my} ${X_3OUT},${ty} ${X_FINISH - 8},${fy}`}
                fill="none"
                stroke={h.color.stroke}
                strokeWidth={winner ? 2.5 : isMid || isHoldup ? 1.5 : 1.8}
                strokeDasharray={isMid ? "4,4" : isHoldup ? "none" : "none"}
                strokeOpacity={winner ? 1 : 0.55}
                markerEnd="url(#arr)"
              />
              {/* Start dot */}
              <circle cx={X_START} cy={sy} r={winner ? 5 : 3.5}
                fill={h.color.fill} fillOpacity={winner ? 1 : 0.6}/>
            </g>
          );
        })}

        {/* Finish position labels — right side */}
        {allHorses.map((h, i) => {
          const fy = finishY(i);
          const winner = isWinner(h.name);
          const finishRank = finishPositions[i];
          return (
            <text key={i}
              x={X_FINISH + 8} y={fy + 3}
              fontSize={winner ? 9 : 8}
              fill={winner ? h.color.fill : "rgba(245,240,232,0.4)"}
              fontFamily="'DM Mono',monospace"
              fontWeight={winner ? "600" : "400"}>
              {finishRank + 1}. {truncate(h.name, 14)}
            </text>
          );
        })}

        {/* Legend */}
        {[
          { label: "Lead",      col: STYLE_COLORS.lead },
          { label: "Prominent", col: STYLE_COLORS.prominent },
          { label: "Midfield",  col: STYLE_COLORS.midfield },
          { label: "Hold Up",   col: STYLE_COLORS.holdup },
        ].map(({ label, col }, i) => (
          <g key={i} transform={`translate(${X_START + i * 110}, ${TOP + n * rowH + 16})`}>
            <circle cx={0} cy={0} r={4} fill={col.fill} fillOpacity={0.8}/>
            <text x={8} y={4} fontSize={8} fill="rgba(245,240,232,0.4)"
              fontFamily="'DM Mono',monospace">{label}</text>
          </g>
        ))}

        {/* Scenario probability bar */}
        {scenarios.length > 0 && (() => {
          const barY = TOP + n * rowH + 36;
          const barW = X_FINISH - X_START + 20;
          const barX = X_START - 10;
          const barH = 36;
          let cumW = 0;
          return (
            <g>
              {scenarios.map((sc, i) => {
                const sw = (sc.prob / 100) * barW;
                const sx = barX + cumW;
                cumW += sw;
                return (
                  <g key={sc.label}>
                    <rect x={sx} y={barY} width={sw} height={barH}
                      fill={SCENARIO_COLORS[i]} fillOpacity={i === 0 ? 0.25 : 0.12} rx={i === 0 ? 3 : 0}/>
                    {sw > 60 && (
                      <>
                        <text x={sx + 6} y={barY + 13} fontSize={8.5}
                          fill={SCENARIO_COLORS[i]} fontFamily="'DM Mono',monospace"
                          fontWeight="600">
                          {sc.label}: {sc.prob}%
                        </text>
                        <text x={sx + 6} y={barY + 26} fontSize={7.5}
                          fill="rgba(245,240,232,0.45)" fontFamily="'DM Mono',monospace">
                          {truncate(sc.title, 20)}
                        </text>
                      </>
                    )}
                    {sw <= 60 && sw > 25 && (
                      <text x={sx + 4} y={barY + 13} fontSize={8}
                        fill={SCENARIO_COLORS[i]} fontFamily="'DM Mono',monospace"
                        fontWeight="600">
                        {sc.label} {sc.prob}%
                      </text>
                    )}
                  </g>
                );
              })}
              {/* Bar border */}
              <rect x={barX} y={barY} width={barW} height={barH}
                fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} rx={3}/>
            </g>
          );
        })()}

      </svg>
    </div>
  );
}
