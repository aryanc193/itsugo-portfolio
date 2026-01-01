"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

export default function OrbScene() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    // =====================================================
    // HARD RESET
    // Kill ALL existing ScrollTriggers and tweens
    // This prevents double-binding during hot reloads
    // =====================================================
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(orb);

    // =====================================================
    // BASE STATE (HERO)
    // This is the ONLY implicit state in the system
    // Everything else scrolls away from this
    //
    // right: 6vw (CSS) + x: 0 === RIGHTMOST
    // =====================================================
    gsap.set(orb, {
      x: 0,
      y: 0,
      scale: 1, // LARGE
    });

    // =====================================================
    // HERO → ABOUT
    // Right → Left
    // Large → Medium
    //
    // NOTE:
    // - scale changes here intentionally
    // - immediateRender:false prevents GSAP
    //   from snapping values before trigger starts
    // =====================================================
    gsap.to(orb, {
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top center",
        scrub: true,
        immediateRender: false,
        // markers: true, // enable when debugging
      },
      x: "-60vw", // move fully left
      scale: 0.75, // MEDIUM
    });

    // =====================================================
    // ABOUT → PROJECTS
    // Left → Right
    // Size STAYS the same
    //
    // IMPORTANT:
    // - scale is NOT redefined
    //   (prevents flickering / grow-shrink bug)
    // =====================================================
    gsap.to(orb, {
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "top center",
        scrub: true,
        immediateRender: false,
      },
      x: "0vw", // back to RIGHTMOST
    });

    // =====================================================
    // PROJECTS → TIMELINE
    // Right → Left
    // Medium → Small (final size)
    //
    // This is the LAST time scale ever changes
    // =====================================================
    gsap.to(orb, {
      scrollTrigger: {
        trigger: "#timeline",
        start: "top bottom",
        end: "top center",
        scrub: true,
        immediateRender: false,
      },
      x: "-48vw", // left-aligned for timeline
      scale: 0.55, // SMALL (locked after this)
    });

    // =====================================================
    // TIMELINE → SKILLS
    // Horizontal: Left → Right
    // Vertical: Drop DOWN
    // Size: unchanged
    //
    // This prepares the orb to later
    // follow an SVG timeline path
    // =====================================================
    gsap.to(orb, {
      scrollTrigger: {
        trigger: "#skills",
        start: "top bottom",
        end: "top center",
        scrub: true,
        immediateRender: false,
      },
      x: "0vw", // return to RIGHT side
      y: "22vh", // vertical movement STARTS here
    });

    // =====================================================
    // Force ScrollTrigger to recalc positions
    // =====================================================
    ScrollTrigger.refresh();

    // =====================================================
    // CLEANUP
    // =====================================================
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(orb);
    };
  }, []);

  // =====================================================
  // ORB ELEMENT
  // - fixed positioning
  // - GSAP owns transform entirely
  // - visuals intentionally minimal
  // =====================================================
  return (
    <div
      ref={orbRef}
      style={{
        position: "fixed",
        right: "6vw", // horizontal anchor (RIGHTMOST)
        top: "28%", // SAME ROW until Skills
        width: "240px",
        height: "240px",
        borderRadius: "50%",
        background: "red", // placeholder visual
        zIndex: 30,
        pointerEvents: "none",
      }}
    />
  );
}
