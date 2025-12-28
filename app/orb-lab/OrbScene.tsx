"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      x: "14vw",
      y: "-6vh",
      scale: 0.88,
      ease: "none",
      duration: 1,
    });

    // About → Projects
    tl.to(orb, {
      x: "26vw",
      y: "-10vh",
      scale: 0.72,
      ease: "none",
      duration: 1,
    });

    // Projects → Timeline start (FINAL SIZE)
    tl.to(orb, {
      x: "38vw",
      y: "-14vh",
      scale: 0.6,
      ease: "none",
      duration: 1,
    });

    // Placeholder: timeline-follow section
    tl.to(orb, {
      x: "46vw",
      y: "10vh",
      ease: "none",
      duration: 3,
    });

    // End behavior (drop illusion)
    tl.to(orb, {
      y: "18vh",
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
        className="fixed left-[6vw] top-1/2 -translate-y-1/2 z-50"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 0% 100%, #00ffd6, #0088ff 100%, transparent 0%)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />

      {/* Optional debug guide */}
      <div className="fixed bottom-4 left-4 text-xs text-white/60 z-50">
        Orb Lab – Scroll to test
      </div>
    </>
  );
}
