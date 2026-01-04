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

    // =====================================================
    // HARD RESET
    // =====================================================
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(orb);

    // =====================================================
    // BASE STATE — HERO
    // =====================================================
    gsap.set(orb, {
      x: 0,
      y: 0,
      scale: 1,
    });

    // =====================================================
    // HERO → ABOUT
    // =====================================================
    gsap.fromTo(
      orb,
      { x: "0vw", scale: 1 },
      {
        x: "-60vw",
        scale: 0.75,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top center",
          end: "top top",
          scrub: 2.0,
          // markers: true,
        },
      }
    );

    // =====================================================
    // ABOUT → PROJECTS
    // =====================================================
    gsap.fromTo(
      orb,
      { x: "-60vw", scale: 0.75 },
      {
        x: "0vw",
        scale: 0.75,
        ease: "none",
        scrollTrigger: {
          trigger: "#projects",
          start: "top center",
          end: "top top",
          scrub: 2.0,
        },
      }
    );

    // =====================================================
    // PROJECTS → TIMELINE
    // =====================================================
    gsap.fromTo(
      orb,
      { x: "0vw", scale: 0.75 },
      {
        x: "-48vw",
        scale: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: "#timeline",
          start: "top center",
          end: "top top",
          scrub: 2.0,
        },
      }
    );

    // =====================================================
    // TIMELINE → SKILLS
    // =====================================================
    gsap.fromTo(
      orb,
      { x: "-48vw", y: "0vh", scale: 0.55 },
      {
        x: "0vw",
        y: "22vh",
        scale: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
          end: "top top",
          scrub: 1.0, // unchanged as requested
        },
      }
    );

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
        right: "6vw",
        top: "28%",
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
