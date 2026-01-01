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

    // HARD RESET
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(orb);

    // ===== BASE STATE (HERO) =====
    gsap.set(orb, {
      x: 0,
      y: 0,
      scale: 1,
    });

    // HERO → ABOUT (right → left, big → medium)
    gsap.to(orb, {
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
      x: "-60vw",
      scale: 0.75,
    });

    // ABOUT → PROJECTS (left → right, size stable)
    gsap.to(orb, {
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
      x: "0vw",
      scale: 0.75,
    });

    // PROJECTS → TIMELINE (right → left, final size)
    gsap.to(orb, {
      scrollTrigger: {
        trigger: "#timeline",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
      x: "-48vw",
      scale: 0.55,
    });

    // TIMELINE → SKILLS (vertical drop only)
    gsap.to(orb, {
      scrollTrigger: {
        trigger: "#skills",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
      y: "22vh",
      scale: 0.55,
    });

    ScrollTrigger.refresh();

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
        right: "6vw", // RIGHTMOST anchor
        top: "28%", // SAME ROW until Skills
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
