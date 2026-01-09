"use client";
import { forwardRef } from "react";

const Trail = forwardRef<SVGPathElement>((_, ref) => {
  const visiblePath = `
    M -150 50
    C 400 20,   350 180,    300 200
    C -450 350, -500 600,   300 650
  `;

  const orbPath = `
    M -150 350
    C 400 350, 350 350, 300 350
    C -450 350, -500 350, 300 350
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

      {/* Visible decorative trail */}
      <path
        id="timeline-path"
        ref={ref}
        d={visiblePath}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glow)"
      />

      {/* Invisible motion rail for orb */}
      <path
        id="timeline-path-orb"
        d={orbPath}
        fill="none"
        stroke="none"
        pointerEvents="none"
      />
    </>
  );
});

Trail.displayName = "Trail";
export default Trail;
