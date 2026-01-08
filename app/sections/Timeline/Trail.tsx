"use client";
import { forwardRef } from "react";

const Trail = forwardRef<SVGPathElement>((_, ref) => {
  const d = `
    M -150 50
    C 400 20,   350 180,    300 200
    C -450 350, -500 600,   300 650
  `;

  return (
    <>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="12"
            floodColor="var(--accent)"
            floodOpacity="1"
          />
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="22"
            floodColor="var(--accent)"
            floodOpacity="0.5"
          />
        </filter>
      </defs>

      <path
        id="timeline-path"
        ref={ref}
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glow)"
      />
    </>
  );
});

Trail.displayName = "Trail";
export default Trail;
