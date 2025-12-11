"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { TimelineNode } from "@/types/timeline";

function splitTitleIntoTwo(title: string) {
  if (title.length <= 28) return [title];
  const mid = Math.floor(title.length / 2);
  const before = title.slice(0, mid);
  const after = title.slice(mid);
  const idx = Math.max(before.lastIndexOf(" "), title.indexOf(" ", mid));
  if (idx > 0 && idx < title.length - 1) {
    return [title.slice(0, idx).trim(), title.slice(idx).trim()];
  }
  return [title.slice(0, 26).trim() + "…", title.slice(26).trim()];
}

export default function SVGNode({
  entry,
  index,
  onClick,
  cx = 0,
  cy = 0,
  nudge = { x: 0, y: 0 },
}: {
  entry: TimelineNode;
  index: number;
  onClick?: (entry: TimelineNode) => void;
  cx: number;
  cy: number;
  nudge?: { x: number; y: number };
}) {
  const { lang } = useLanguage();
  const isJP = lang === "jp";
  const title = isJP ? entry.labelJP : entry.labelEN;

  const fallback = ["top", "left", "bottom", "right"] as const;
  const side =
    (entry.labelSide as (typeof fallback)[number]) ?? fallback[index % 4];

  // base numeric values (used for position math)
  const DOT_R = 6;
  const CLICK_R = 16;
  const GAP = 16;
  const rx = 12;

  // compute side offsets (base only, we'll add nudge later)
  let dx = 0;
  let dy = 0;
  // default box size — will be replaced by measured values
  const DEFAULT_BOX_W = 160;
  const DEFAULT_BOX_H = 48;

  if (side === "top") {
    dx = 0;
    dy = -(DEFAULT_BOX_H / 2 + DOT_R + GAP);
  } else if (side === "bottom") {
    dx = 0;
    dy = DEFAULT_BOX_H / 2 + DOT_R + GAP;
  } else if (side === "left") {
    dx = -(DEFAULT_BOX_W / 2 + DOT_R + GAP);
    dy = 0;
  } else {
    dx = DEFAULT_BOX_W / 2 + DOT_R + GAP;
    dy = 0;
  }

  // measure text width/height and update box size
  const titleRef = useRef<SVGTextElement | null>(null);
  const yearRef = useRef<SVGTextElement | null>(null);
  const [boxW, setBoxW] = useState<number>(DEFAULT_BOX_W);
  const [boxH, setBoxH] = useState<number>(DEFAULT_BOX_H);

  useEffect(() => {
    // measure after render
    const tEl = titleRef.current;
    const yEl = yearRef.current;
    if (!tEl || !yEl) return;

    // getBBox can throw in SSR environments; guard it
    try {
      const tb = tEl.getBBox();
      const yb = yEl.getBBox();

      const paddingX = 24; // left+right padding (12 each)
      const paddingY = 18; // top+bottom padding

      // width is max of title and year
      const measuredW = Math.max(tb.width, yb.width) + paddingX;
      const measuredH = tb.height + yb.height + paddingY;

      // clamp min/max
      const finalW = Math.max(120, Math.min(300, measuredW));
      const finalH = Math.max(40, Math.min(86, measuredH));

      setBoxW(finalW);
      setBoxH(finalH);
    } catch (e) {
      // ignore measurement error; keep defaults
    }
    // re-measure on window resize for responsive behavior
    const onResize = () => {
      try {
        const tb = titleRef.current?.getBBox();
        const yb = yearRef.current?.getBBox();
        if (!tb || !yb) return;
        const paddingX = 24;
        const paddingY = 18;
        const measuredW = Math.max(tb.width, yb.width) + paddingX;
        const measuredH = tb.height + yb.height + paddingY;
        setBoxW(Math.max(120, Math.min(300, measuredW)));
        setBoxH(Math.max(40, Math.min(86, measuredH)));
      } catch {}
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [title, entry.year]);

  // recompute dx/dy using measured box size
  if (side === "top") {
    dx = 0;
    dy = -(boxH / 2 + DOT_R + GAP);
  } else if (side === "bottom") {
    dx = 0;
    dy = boxH / 2 + DOT_R + GAP;
  } else if (side === "left") {
    dx = -(boxW / 2 + DOT_R + GAP);
    dy = 0;
  } else {
    dx = boxW / 2 + DOT_R + GAP;
    dy = 0;
  }

  // safety clamp so top labels don't go out of SVG top (optional)
  const topOverflow = cy + dy - boxH / 2;
  if (topOverflow < 8) {
    dy += Math.abs(topOverflow) + 8;
  }

  // split title for tspan multi-line small support
  const parts = splitTitleIntoTwo(title);

  // apply nudge offset (from parent normal vector)
  const totalDx = dx + (nudge?.x ?? 0);
  const totalDy = dy + (nudge?.y ?? 0);

  // glow radius: choose visually appropriate value based on entry.glow
  const glowR =
    entry.glow === "prime"
      ? 22
      : entry.glow === "high"
      ? 16
      : entry.glow === "medium"
      ? 10
      : 8;

  return (
    <g
      transform={`translate(${cx + (nudge?.x ?? 0) * 0}, ${
        cy + (nudge?.y ?? 0) * 0
      })`}
      className={`timeline-node node-${entry.glow} side-${side}`}
      style={{ cursor: "pointer", pointerEvents: "auto" }}
      onClick={() => onClick?.(entry)}
      role="button"
      aria-label={title}
    >
      {/* glow - big blurred fill so looks like a soft pulse; pointer-events none */}
      <circle
        cx={0}
        cy={0}
        r={glowR}
        fill="url(#accentGradient)"
        className="node-glow-pulse"
        filter="url(#glow-large)"
        opacity={0.6}
        style={{ pointerEvents: "none" }}
      />

      {/* clickable hit area */}
      <circle cx={0} cy={0} r={CLICK_R} fill="transparent" />

      {/* center dot */}
      <circle
        cx={0}
        cy={0}
        r={DOT_R}
        fill="url(#dotFill)"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth={1.2}
      />

      {/* label group positioned with dx/dy plus the parent-provided nudge */}
      <g
        transform={`translate(${totalDx}, ${totalDy})`}
        className="label-group"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <g className="label-offset">
          <g>
            {/* Slight frosted fill */}
            <rect
              x={-(boxW / 2)}
              y={-(boxH / 2)}
              width={boxW}
              height={boxH}
              rx={rx}
              fill="rgba(255,255,255,0.06)"
              filter="url(#soft-blur)"
            />

            {/* Subtle highlight */}
            <rect
              x={-(boxW / 2)}
              y={-(boxH / 2)}
              width={boxW}
              height={boxH}
              rx={rx}
              fill="url(#glassHighlight)"
            />

            {/* Thin neon border */}
            <rect
              x={-(boxW / 2)}
              y={-(boxH / 2)}
              width={boxW}
              height={boxH}
              rx={rx}
              fill="none"
              stroke="url(#accentGradient)"
              strokeWidth="1.1"
              opacity="0.8"
            />
          </g>

          <text
            ref={yearRef as any}
            x={-(boxW / 2) + 12}
            y={-(boxH / 2) + 15}
            style={{
              fontSize: 9,
              fill: "rgba(255,255,255,0.75)",
              fontFamily: "Inter, ui-sans-serif, system-ui",
              pointerEvents: "none",
            }}
          >
            {entry.year}
          </text>

          <text
            ref={titleRef as any}
            x={-(boxW / 2) + 12}
            y={-(boxH / 2) + 34}
            style={{
              fontSize: 12,
              fontWeight: 700,
              fill: "#ffffff",
              fontFamily: "Inter, ui-sans-serif, system-ui",
              pointerEvents: "none",
            }}
          >
            {parts.length === 1 ? (
              <tspan>{parts[0]}</tspan>
            ) : (
              <>
                <tspan x={-(boxW / 2) + 12} dy={0}>
                  {parts[0]}
                </tspan>
                <tspan x={-(boxW / 2) + 12} dy={16}>
                  {parts[1]}
                </tspan>
              </>
            )}
          </text>
        </g>
      </g>
    </g>
  );
}
