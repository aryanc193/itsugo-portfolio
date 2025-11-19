"use client";

import { useEffect, useRef, useState } from "react";
import timeline from "@/data/timeline.json";
import type { TimelineNode } from "@/types/timeline";
import Node from "./Node";
import Trail from "./Trail";
import { links } from "@/data/links";
import { useLanguage } from "@/app/context/LanguageContext";
import Orb from "@/app/components/Orb";

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
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [selected, setSelected] = useState<TimelineNode | null>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    const pts = data.map((_, i) => {
      const pct = i / (data.length - 1);
      const pt = path.getPointAtLength(totalLength * pct);
      return { x: pt.x, y: pt.y };
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

        {/* SVG Timeline */}
        <div className="relative w-full -ml-5 mt-10 aspect-[800/1000]">
          <svg
            className="w-full h-full pointer-events-none"
            viewBox="-400 0 800 1000"
            preserveAspectRatio="xMidYMid meet"
          >
            <Trail ref={pathRef} />

            {positions.length === data.length &&
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
              ))}
          </svg>
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
    </section>
  );
}
