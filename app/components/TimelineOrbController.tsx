"use client";

import { useEffect } from "react";

export default function TimelineFollowerController() {
  useEffect(() => {
    const timeline = document.querySelector("#timeline") as HTMLElement | null;
    const path = document.querySelector(
      "#timeline-path"
    ) as SVGPathElement | null;
    const follower = document.querySelector(
      "#timeline-follower"
    ) as HTMLElement | null;

    if (!timeline || !path || !follower) return;

    const svg = path.ownerSVGElement!;
    const vb = svg.viewBox.baseVal;
    const totalLength = path.getTotalLength();

    // --- TUNING CONTROLS ---
    const SPEED = 1.35; // how fast it moves vs scroll
    const OFFSET = -0.25; // where it starts on the path
    const SMOOTHNESS = 0.15; // 0.08–0.15 sweet spot

    // cinematic easing
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

    let smoothT = 0;
    let rafId: number;

    const update = () => {
      const tlRect = timeline.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();

      // Only active while timeline is visible
      const inView = tlRect.top < window.innerHeight && tlRect.bottom > 0;

      if (!inView) {
        follower.style.opacity = "0";
        rafId = requestAnimationFrame(update);
        return;
      }

      follower.style.opacity = "1";

      // Scroll → progress (scroll down = forward)
      const viewportBottom = window.innerHeight;
      const rawProgress =
        (viewportBottom - tlRect.top) / (tlRect.height + viewportBottom);

      // Speed + offset
      let targetT = rawProgress * SPEED + OFFSET;
      targetT = Math.min(1, Math.max(0, targetT));

      // Ease the motion
      targetT = easeOutCubic(targetT);

      // Temporal smoothing (cinematic feel)
      smoothT += (targetT - smoothT) * SMOOTHNESS;

      // Path position
      const length = totalLength * smoothT;
      const point = path.getPointAtLength(length);

      // SVG → viewport space (handles negative viewBox.x)
      const x = svgRect.left + ((point.x - vb.x) / vb.width) * svgRect.width;

      const y = svgRect.top + ((point.y - vb.y) / vb.height) * svgRect.height;

      follower.style.left = `${x}px`;
      follower.style.top = `${y}px`;

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
