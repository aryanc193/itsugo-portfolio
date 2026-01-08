"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    const skillsSection = document.querySelector("#skills");
    const contactSection = document.querySelector("#contact");
    const timelineSection = document.querySelector("#timeline");
    const timelinePath = document.querySelector(
      "#timeline-path"
    ) as SVGPathElement | null;

    if (!orb || !skillsSection || !contactSection || !timelineSection) return;

    const easeOut = gsap.parseEase("power2.out");

    // CLEAN SLATE
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(orb);
    gsap.ticker.lagSmoothing(0);

    // BASE STATE
    gsap.set(orb, {
      position: "fixed",
      top: "28%",
      right: "6vw",
      left: "auto",
      x: 0,
      y: 0,
      scale: 1,
      willChange: "transform",
    });

    /* ----------------------------------------------------
       1️⃣ PRIMARY NARRATIVE CONTROLLER (unchanged logic)
    ---------------------------------------------------- */
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      endTrigger: skillsSection,
      end: "top top",
      scrub: 2,

      onUpdate: (self) => {
        const p = self.progress;

        if (p <= 0.25) {
          const t = easeOut(p / 0.25);
          gsap.set(orb, {
            x: gsap.utils.interpolate(0, -60, t) + "vw",
            y: "0vh",
            scale: gsap.utils.interpolate(1, 0.75, t),
          });
          return;
        }

        if (p <= 0.5) {
          const t = easeOut((p - 0.25) / 0.25);
          gsap.set(orb, {
            x: gsap.utils.interpolate(-60, 0, t) + "vw",
            y: "0vh",
            scale: 0.75,
          });
          return;
        }

        if (p <= 0.75) {
          const t = easeOut((p - 0.5) / 0.25);
          gsap.set(orb, {
            x: gsap.utils.interpolate(0, -48, t) + "vw",
            y: "0vh",
            scale: gsap.utils.interpolate(0.75, 0.55, t),
          });
          return;
        }

        const t = easeOut((p - 0.75) / 0.25);
        gsap.set(orb, {
          x: gsap.utils.interpolate(-48, 0, t) + "vw",
          y: gsap.utils.interpolate(0, 22, t) + "vh",
          scale: 0.55,
        });
      },
    });

    /* ----------------------------------------------------
       2️⃣ SVG HORIZONTAL GUIDE — TIMELINE ONLY
       
       DESIGN PRINCIPLE: The SVG path provides X-axis guidance only.
       The orb remains vertically centered (50vh) for cinematic stability.
       This prevents vertical clipping and maintains viewport presence.
    ---------------------------------------------------- */
    const ORB_RADIUS = 120; // half of 240px
    const HORIZONTAL_OFFSET = 220; // tune this to adjust distance from path
    const VERTICAL_CENTER = window.innerHeight * 0.5; // locked Y position

    if (timelinePath) {
      const svg = timelinePath.ownerSVGElement!;
      const totalLength = timelinePath.getTotalLength();

      const getHorizontalGuidance = (progress: number) => {
        // Sample the SVG path for X coordinate only
        const svgPoint = timelinePath.getPointAtLength(totalLength * progress);

        // Get SVG's viewport position and scaling
        const svgRect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;

        // Convert SVG X coordinate to viewport pixels
        const scaleX = svgRect.width / viewBox.width;
        const viewportX = svgRect.left + (svgPoint.x - viewBox.x) * scaleX;

        // Apply horizontal offset with safety margin
        const finalX = Math.max(
          viewportX + HORIZONTAL_OFFSET,
          ORB_RADIUS + 30 // minimum distance from left edge
        );

        // Y position is LOCKED to viewport center for cinematic stability
        return { x: finalX, y: VERTICAL_CENTER };
      };

      // Timeline entrance: smooth transition from narrative to SVG guidance
      ScrollTrigger.create({
        trigger: timelineSection,
        start: "top bottom", // start transition early
        end: "top center",
        scrub: 1.5,

        onEnter: () => {
          // Switch to absolute positioning for SVG guidance
          gsap.set(orb, {
            left: 0,
            right: "auto",
            top: 0,
          });
        },

        onUpdate: (self) => {
          // Blend into SVG-guided X position
          const { x, y } = getHorizontalGuidance(0);
          const currentX = gsap.getProperty(orb, "x");
          const blendedX = gsap.utils.interpolate(currentX, x, self.progress);

          gsap.set(orb, {
            x: blendedX,
            y: y,
            scale: 0.55,
          });
        },
      });

      // Main timeline phase: follow SVG horizontally
      ScrollTrigger.create({
        trigger: timelineSection,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,

        onUpdate: (self) => {
          const { x, y } = getHorizontalGuidance(self.progress);
          gsap.set(orb, {
            left: 0,
            right: "auto",
            top: 0,
            x: x,
            y: y,
            scale: 0.55,
          });
        },
      });

      // Timeline exit: smooth transition back to narrative system
      ScrollTrigger.create({
        trigger: timelineSection,
        start: "bottom center",
        end: "bottom top",
        scrub: 1.5,

        onLeave: () => {
          // Restore narrative positioning system
          gsap.set(orb, {
            left: "auto",
            right: "6vw",
            top: "28%",
          });
        },

        onLeaveBack: () => {
          // When scrolling back up past timeline, restore narrative system
          gsap.set(orb, {
            left: "auto",
            right: "6vw",
            top: "28%",
          });
        },

        onEnterBack: () => {
          // Re-entering timeline from below, switch to SVG guidance
          gsap.set(orb, {
            left: 0,
            right: "auto",
            top: 0,
          });
        },
      });
    }

    /* ----------------------------------------------------
       3️⃣ CONTACT LANDING (unchanged)
    ---------------------------------------------------- */
    gsap.to(orb, {
      scrollTrigger: {
        trigger: contactSection,
        start: "top bottom",
        end: "top center",
        scrub: 2,
      },
      left: "50%",
      right: "auto",
      x: "-50%",
      y: "12vh",
      scale: 0.95,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(orb);
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
