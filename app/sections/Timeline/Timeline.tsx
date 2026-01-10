"use client";

import { useEffect, useRef, useState } from "react";
import timeline from "@/data/timeline.json";
import type { TimelineNode } from "@/types/timeline";
import Node from "./Node";
import Trail from "./Trail";
import { links } from "@/data/links";
import { useLanguage } from "@/app/context/LanguageContext";
import TimelineOrbController from "@/app/components/TimelineOrbController";
import SVGNode from "./SVGNode";
import "./timeline.css";

const username = "aryanc193";

const getProjectURL = (name: string) => {
  const key = name.trim().toLowerCase();

  // 1) If in links.ts → use overrides
  if (links[key]) {
    const { live, github } = links[key];
    return live ?? github ?? null;
  } else {
    // 2) Otherwise → auto-generate github link
    const slug = key.replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");
    return `https://github.com/${username}/${slug}`;
  }
};

export default function TimelineSection() {
  const { lang } = useLanguage();
  const isJP = lang === "jp";
  const data = timeline as TimelineNode[];
  const pathRef = useRef<SVGPathElement | null>(null);
  const [positions, setPositions] = useState<
    { x: number; y: number; nx: number; ny: number }[]
  >([]);
  const [selected, setSelected] = useState<TimelineNode | null>(null);

  // inside TimelineSection (replace the useEffect that sets positions and the mapping)
  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    // sample points and small tangents to compute normals
    const pts = data.map((_, i) => {
      const pct = i / (data.length - 1);
      const len = totalLength * pct;

      const pt = path.getPointAtLength(len);

      const delta = Math.max(1, totalLength * 0.001);

      const pBefore = path.getPointAtLength(Math.max(0, len - delta));
      const pAfter = path.getPointAtLength(Math.min(totalLength, len + delta));

      const tx = pAfter.x - pBefore.x;
      const ty = pAfter.y - pBefore.y;

      const tlen = Math.sqrt(tx * tx + ty * ty) || 1;

      const nx = -ty / tlen; // normal vector x
      const ny = tx / tlen; // normal vector y

      return { x: pt.x, y: pt.y, nx, ny };
    });
    setPositions(pts);
  }, [data]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const FO_SIZE = 160;

  return (
    <section
      id="timeline"
      className=" font-main
    w-full py-8 px-6 text-foreground 
    -mb-32 
    sm:-mb-24 
    md:-mb-16 
    lg:-mb-100
  "
      data-orb-zone="timeline"
    >
      <div className="max-w-full mx-auto">
        <h2 className="text-4xl font-bold text-center">
          {isJP ? "ジャーニー" : "Journey"}
        </h2>
        <p className="text-center text-subtle text-sm mt-2">
          {isJP
            ? "ノードをタップして詳細を見る"
            : "Tap the nodes to explore each milestone"}
        </p>

        {/* SVG Timeline */}
        <div className="relative w-full -ml-5 mt-20 aspect-[800/1000]">
          <svg
            className="w-full h-full timeline-svg"
            viewBox="-400 0 800 1000"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="accentGradient" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#00ffd6" />
                <stop offset="100%" stopColor="#00aaff" />
              </linearGradient>

              <radialGradient id="dotFill" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#6fffe8" />
                <stop offset="100%" stopColor="#00aaff" />
              </radialGradient>

              <filter
                id="glow-large"
                x="-150%"
                y="-150%"
                width="400%"
                height="400%"
                filterUnits="userSpaceOnUse"
              >
                <feGaussianBlur stdDeviation="14" />
              </filter>

              <filter
                id="soft-blur"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feGaussianBlur stdDeviation="5" />
              </filter>

              <linearGradient
                id="glassHighlight"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
              </linearGradient>
            </defs>

            <Trail ref={pathRef} />
            {/* {positions.length === data.length &&
              positions.map((pos, i) => (
                <foreignObject
                  key={i}
                  x={pos.x - FO_SIZE / 2}
                  y={pos.y - FO_SIZE / 2}
                  width={FO_SIZE}
                  height={FO_SIZE}
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{ overflow: "visible", pointerEvents: "auto" }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      pointerEvents: "auto",
                    }}
                  >
                    <Node
                      entry={data[i]}
                      index={i}
                      onClick={(entry) => setSelected(entry)}
                    />
                  </div>
                </foreignObject>

              ))} */}
            {positions.length === data.length &&
              positions.map((pos, i) => {
                // staggered nudge magnitude — tune 'BASE_NUDGE'
                const BASE_NUDGE = 6; // px, tune smaller/larger
                // alternate sign and add a mild growth per group to spread tightly packed labels
                const sign = i % 2 === 0 ? 1 : -1;
                const step = Math.floor(i / 2); // increases every two nodes
                const magnitude = BASE_NUDGE + step * 6;
                const nx = pos.nx * magnitude * sign;
                const ny = pos.ny * magnitude * sign;

                return (
                  <SVGNode
                    key={i}
                    entry={data[i]}
                    index={i}
                    cx={pos.x}
                    cy={pos.y}
                    nudge={{ x: nx, y: ny }}
                    onClick={(entry) => setSelected(entry)}
                  />
                );
              })}
          </svg>

          <div id="timeline-follower" className="timeline-follower" />
        </div>

        {/* SIMPLE MODAL */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />

            {/* Card */}
            <div className="relative z-10 max-w-lg w-full bg-background/95 backdrop-blur-xl rounded-2xl shadow-xl p-6 modal-animate max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold">
                {isJP ? selected.labelJP : selected.labelEN}
              </h3>

              <p className="text-muted text-sm">{selected.year}</p>

              <p className="mt-4 text-sm leading-relaxed">
                {isJP ? selected.descriptionJP : selected.descriptionEN}
              </p>

              {/* Project List */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">
                  {isJP ? "制作物 / 成果物" : "Work"}
                </h4>

                {selected.projects.length === 0 && (
                  <p className="text-xs text-muted">
                    {isJP ? "関連する制作物はありません。" : "No work listed."}
                  </p>
                )}

                {/* SCROLLABLE LIST */}
                <div className="max-h-[200px] overflow-y-auto pr-1 custom-scroll flex flex-col gap-2">
                  {selected.projects.map((proj, i) => {
                    const url = getProjectURL(proj);
                    return (
                      <button
                        key={i}
                        onClick={() => url && window.open(url, "_blank")}
                        className="
            text-left p-2 rounded-md border border-white/10 
            bg-background/5 hover:bg-accent/20 transition-all duration-150
            hover:shadow-[0_0_6px_var(--accent)] cursor-pointer text-sm
          "
                      >
                        {proj}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                className="mt-6 w-full py-3 rounded-lg bg-accent text-background font-semibold text-center text-lg cursor-pointer"
                onClick={() => setSelected(null)}
              >
                {isJP ? "閉じる" : "Close"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div id="timeline-follower" className="timeline-follower" />
      <TimelineOrbController />
    </section>
  );
}
