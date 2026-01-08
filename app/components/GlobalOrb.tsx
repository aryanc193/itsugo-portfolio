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

    if (!orb || !skillsSection || !contactSection) return;

    const easeOut = gsap.parseEase("power2.out");

    // CLEAN SLATE
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(orb);

    // BASE STATE (HERO)
    gsap.set(orb, {
      x: 0,
      y: 0,
      scale: 1,
      right: "6vw",
      left: "auto",
    });

    // MAIN NARRATIVE SCROLL (Hero → Skills)
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      endTrigger: skillsSection,
      end: "top top",
      scrub: 2.0, // 🎬 cinematic inertia

      onUpdate: (self) => {
        const p = self.progress;

        // HERO → ABOUT
        if (p <= 0.25) {
          const rawT = p / 0.25;
          const t = easeOut(rawT);
          gsap.set(orb, {
            x: gsap.utils.interpolate(0, -60, t) + "vw",
            y: "0vh",
            scale: gsap.utils.interpolate(1, 0.75, t),
          });
          return;
        }

        // ABOUT → PROJECTS
        if (p <= 0.5) {
          const rawT = (p - 0.25) / 0.25;
          const t = easeOut(rawT);
          gsap.set(orb, {
            x: gsap.utils.interpolate(-60, 0, t) + "vw",
            y: "0vh",
            scale: 0.75,
          });
          return;
        }

        // PROJECTS → TIMELINE
        if (p <= 0.75) {
          const rawT = (p - 0.5) / 0.25;
          const t = easeOut(rawT);
          gsap.set(orb, {
            x: gsap.utils.interpolate(0, -48, t) + "vw",
            y: "0vh",
            scale: gsap.utils.interpolate(0.75, 0.55, t),
          });
          return;
        }

        // TIMELINE → SKILLS
        const rawT = (p - 0.75) / 0.25;
        const t = easeOut(rawT);
        gsap.set(orb, {
          x: gsap.utils.interpolate(-48, 0, t) + "vw",
          y: gsap.utils.interpolate(0, 22, t) + "vh",
          scale: 0.55,
        });
      },
    });

    // CONTACT → CENTER (cinematic landing)
    gsap.to(orb, {
      scrollTrigger: {
        trigger: contactSection,
        start: "top bottom",
        end: "top center",
        scrub: 2.2, // slower, heavier
      },

      right: "auto",
      left: "50%",
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
      style={{
        position: "fixed",
        right: "6vw",
        top: "28%",
        width: "240px",
        height: "240px",
        borderRadius: "50%",
        background: "red",
        zIndex: 30,
        pointerEvents: "none",
      }}
      aria-hidden
    />
  );
}
