"use client";

import type { TimelineNode } from "@/types/timeline";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Node({
  entry,
  index,
  onClick,
}: {
  entry: TimelineNode;
  index: number;
  onClick?: (entry: TimelineNode) => void;
}) {
  const { lang } = useLanguage();
  const isJP = lang === "jp";

  const fallback = ["top", "left", "bottom", "right"] as const;
  const side =
    (entry.labelSide as (typeof fallback)[number]) ?? fallback[index % 4];

  const glowClass = {
    low: "timeline-glow-low",
    medium: "timeline-glow-medium",
    high: "timeline-glow-high",
    prime: "timeline-glow-prime",
  }[entry.glow];

  const layoutStyle = {
    top: {
      left: "50%",
      top: "42%",
      transform: "translate(-50%, -120%)",
      position: "absolute",
    },
    bottom: {
      left: "70%",
      top: "40%",
      transform: "translate(-50%, 20%)",
      position: "absolute",
    },
    left: {
      left: "65%",
      top: "40%",
      transform: "translate(-110%, -50%)",
      position: "absolute",
    },
    right: {
      left: "40%",
      top: "40%",
      transform: "translate(20%, -50%)",
      position: "absolute",
    },
  } as const;

  return (
    <div
      style={{
        width: "100%",
        height: "130%",
        position: "relative",
      }}
    >
      {/* DOT (clickable) */}
      <div
        className={`absolute w-4 h-4 rounded-full bg-gradient-to-b from-hero1 to-hero2 border-2 border-background ${glowClass}`}
        style={{
          left: "50%",
          top: "38%",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          cursor: "pointer",
        }}
        onClick={() => onClick?.(entry)}
      />

      {/* LABEL */}
      <div
        onClick={() => onClick?.(entry)}
        className="node-label-wrapper bg-background/5 backdrop-blur-xs p-3 rounded-xl shadow-lg text-sm w-max cursor-pointer"
        style={{
          ...layoutStyle[side],
          whiteSpace: "normal",
          overflowWrap: "break-word",
          maxWidth: "240px",
          transform: layoutStyle[side].transform,
          transformOrigin: "top left",
          pointerEvents: "auto",
        }}
      >
        <p className="text-muted text-[0.5rem]">{entry.year}</p>
        <h3 className="text-xs font-semibold">
          {isJP ? entry.labelJP : entry.labelEN}
        </h3>
      </div>
    </div>
  );
}
