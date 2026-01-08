"use client";

import { useEffect, useRef } from "react";

export default function GlobalOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    const timelineSection = document.querySelector("#timeline") as HTMLElement;
    const timelinePath = document.querySelector(
      "#timeline-path"
    ) as SVGPathElement;

    let rafId = 0;

    // ═══════════════════════════════════════════════════════════
    // SCROLL-TO-TRANSFORM: Single Source of Truth
    // ═══════════════════════════════════════════════════════════

    const updateOrb = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // ─────────────────────────────────────────────────────────
      // TIMELINE MODE: Check if timeline is in active viewport zone
      // ─────────────────────────────────────────────────────────
      if (timelineSection && timelinePath) {
        const rect = timelineSection.getBoundingClientRect();
        const centerY = vh * 0.5;

        // Active when timeline section spans the vertical center
        const isActive = rect.top < centerY && rect.bottom > centerY;

        if (isActive) {
          // Calculate progress through timeline section
          const sectionProgress = Math.max(
            0,
            Math.min(1, (centerY - rect.top) / rect.height)
          );

          // Sample SVG path for X coordinate only
          const pathLength = timelinePath.getTotalLength();
          const point = timelinePath.getPointAtLength(
            pathLength * sectionProgress
          );

          // Convert SVG coordinates to viewport pixels
          const svg = timelinePath.ownerSVGElement!;
          const svgRect = svg.getBoundingClientRect();
          const viewBox = svg.viewBox.baseVal;
          const scaleX = svgRect.width / viewBox.width;

          const xViewport = svgRect.left + (point.x - viewBox.x) * scaleX;

          // Apply offset and safety margin
          const OFFSET = 220;
          const MIN_MARGIN = 140;
          const finalX = Math.max(xViewport + OFFSET, MIN_MARGIN);

          // Lock Y to viewport center (cinematic stability)
          const finalY = centerY;

          orb.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            transform: translate(${finalX}px, ${finalY}px) scale(0.55);
            width: 240px;
            height: 240px;
            border-radius: 50%;
            background: red;
            z-index: 30;
            pointer-events: none;
            will-change: transform;
          `;
          return;
        }
      }

      // ─────────────────────────────────────────────────────────
      // NARRATIVE MODE: Default scroll-driven behavior
      // ─────────────────────────────────────────────────────────

      // Scroll milestones (tune these to match your page layout)
      const HERO_END = vh * 1.5;
      const ABOUT_END = vh * 2.5;
      const PROJECTS_END = vh * 3.5;
      const SKILLS_START = vh * 4.5;

      let xVw = 0;
      let yVh = 0;
      let scale = 1;

      // Phase 1: Hero → About (sweep left)
      if (scrollY < HERO_END) {
        const t = scrollY / HERO_END;
        xVw = -60 * t;
        yVh = 0;
        scale = 1 - 0.25 * t;
      }
      // Phase 2: About → Projects (return right)
      else if (scrollY < ABOUT_END) {
        const t = (scrollY - HERO_END) / (ABOUT_END - HERO_END);
        xVw = -60 + 60 * t;
        yVh = 0;
        scale = 0.75;
      }
      // Phase 3: Projects → Timeline (sweep left again)
      else if (scrollY < PROJECTS_END) {
        const t = (scrollY - ABOUT_END) / (PROJECTS_END - ABOUT_END);
        xVw = -48 * t;
        yVh = 0;
        scale = 0.75 - 0.2 * t;
      }
      // Phase 4: After Timeline → Skills (descend)
      else if (scrollY < SKILLS_START) {
        const t = (scrollY - PROJECTS_END) / (SKILLS_START - PROJECTS_END);
        xVw = -48 + 48 * t;
        yVh = 22 * t;
        scale = 0.55;
      }
      // Phase 5: Skills and beyond (stable)
      else {
        xVw = 0;
        yVh = 22;
        scale = 0.55;
      }

      orb.style.cssText = `
        position: fixed;
        top: 28%;
        right: 6vw;
        left: auto;
        transform: translate(${xVw}vw, ${yVh}vh) scale(${scale});
        width: 240px;
        height: 240px;
        border-radius: 50%;
        background: red;
        z-index: 30;
        pointer-events: none;
        will-change: transform;
      `;
    };

    // ═══════════════════════════════════════════════════════════
    // SCROLL HANDLER: RAF-throttled for 60fps
    // ═══════════════════════════════════════════════════════════

    const onScroll = () => {
      if (rafId) return; // Already scheduled

      rafId = requestAnimationFrame(() => {
        updateOrb();
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateOrb(); // Initial position

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      aria-hidden
      style={{
        width: "240px",
        height: "240px",
        borderRadius: "50%",
        background: "red",
        zIndex: 30,
        pointerEvents: "none",
      }}
    />
  );
}
