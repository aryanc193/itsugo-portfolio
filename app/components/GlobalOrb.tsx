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

    if (!orb || !skillsSection) return;

    // Clean slate
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(orb);

    // Base state (Hero)
    gsap.set(orb, {
      x: 0,
      y: 0,
      scale: 1,
    });

    // SINGLE ScrollTrigger
    ScrollTrigger.create({
      trigger: document.body,

      // 🔑 IMPORTANT PART
      // Scroll range = top of page → top of Skills
      start: "top top",
      endTrigger: skillsSection,
      end: "top top",

      scrub: true,

      onUpdate: (self) => {
        // progress is now CLAMPED between [0, 1]
        const p = self.progress;

        // HERO → ABOUT (0.0 → 0.25)
        if (p <= 0.25) {
          const t = p / 0.25;
          gsap.set(orb, {
            x: gsap.utils.interpolate(0, -60, t) + "vw",
            y: "0vh",
            scale: gsap.utils.interpolate(1, 0.75, t),
          });
          return;
        }

        // ABOUT → PROJECTS (0.25 → 0.5)
        if (p <= 0.5) {
          const t = (p - 0.25) / 0.25;
          gsap.set(orb, {
            x: gsap.utils.interpolate(-60, 0, t) + "vw",
            y: "0vh",
            scale: 0.75,
          });
          return;
        }

        // PROJECTS → TIMELINE (0.5 → 0.75)
        if (p <= 0.75) {
          const t = (p - 0.5) / 0.25;
          gsap.set(orb, {
            x: gsap.utils.interpolate(0, -48, t) + "vw",
            y: "0vh",
            scale: gsap.utils.interpolate(0.75, 0.55, t),
          });
          return;
        }

        // TIMELINE → SKILLS (0.75 → 1.0)
        const t = (p - 0.75) / 0.25;
        gsap.set(orb, {
          x: gsap.utils.interpolate(-48, 0, t) + "vw",
          y: gsap.utils.interpolate(0, 22, t) + "vh",
          scale: 0.55,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(orb);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      style={{
        position: "fixed",
        right: "6vw",
        top: "28%",
        width: "240px",
        height: "240px",
        borderRadius: "50%",
        background: "red", // debug orb
        zIndex: 30,
        pointerEvents: "none",
      }}
      aria-hidden
    />
  );
}
