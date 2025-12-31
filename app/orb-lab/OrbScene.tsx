"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../components/orb.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function OrbScene() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    // --- RESET (important during hot reloads)
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(orb);

    // --- Initial idle motion (time-based, not scroll)
    gsap.to(orb, {
      rotation: 360,
      duration: 24,
      repeat: -1,
      ease: "linear",
    });

    gsap.to(orb, {
      yPercent: -6,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // --- MASTER TIMELINE (scroll-driven)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    /*
      Timeline structure (relative durations):
      0–1   : Hero → About
      1–2   : About → Projects
      2–3   : Projects → Timeline start
      3–6   : Follow timeline path (placeholder)
      6–6.6 : End behavior
    */

    // Hero → About
    tl.to(orb, {
      x: "-10vw",
      y: "-6vh",
      scale: 0.9,
      ease: "none",
      duration: 1,
    });

    // About → Projects
    tl.to(orb, {
      x: "-18vw",
      y: "-10vh",
      scale: 0.75,
      ease: "none",
      duration: 1,
    });

    // Projects → Timeline start (final size)
    tl.to(orb, {
      x: "-26vw",
      y: "-14vh",
      scale: 0.6,
      ease: "none",
      duration: 1,
    });

    // Placeholder: timeline-follow region
    tl.to(orb, {
      x: "-30vw",
      y: "8vh",
      ease: "none",
      duration: 2,
    });

    // End behavior (skills → stop/drop)
    tl.to(orb, {
      y: "14vh",
      scale: 0.55,
      ease: "power2.in",
      duration: 0.6,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(orb);
    };
  }, []);

  return (
    <>
      {/* FIXED ORB LAYER */}
      <div
        ref={orbRef}
        className={`
          fixed
          right-[0vw]
          top-1/2
          -translate-y-1/2
          z-50
          ${styles.orbGlow}
          ${styles.float}
        `}
        style={{
          width: 320,
          height: 320,
          pointerEvents: "none",
        }}
      />

      {/* Debug */}
      <div className="fixed bottom-4 left-4 text-xs text-white/60 z-50">
        Orb Lab – Scroll to test
      </div>
    </>
  );
}
