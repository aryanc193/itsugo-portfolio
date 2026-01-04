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
      x: 0,     // RIGHTMOST (relative to CSS right: 6vw)
      y: 0,     // fixed row
      scale: 1, // LARGE
    });

    // =====================================================
    // HERO → ABOUT
    // Right → Left
    // Large → Medium
    // =====================================================
    gsap.fromTo(
      orb,
      {
        x: "0vw",
        scale: 1,
      },
      {
        x: "-60vw",
        scale: 0.75,
        ease: "none", // scrub controls timing, not easing
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "top center",
          scrub: 2.0, // 🎬 cinematic inertia
          // markers: true,
        },
      }
    );

    // =====================================================
    // ABOUT → PROJECTS
    // Left → Right
    // Scale stays Medium
    // =====================================================
    gsap.fromTo(
      orb,
      {
        x: "-60vw",
        scale: 0.75,
      },
      {
        x: "0vw",
        scale: 0.75,
        ease: "none",
        scrollTrigger: {
          trigger: "#projects",
          start: "top bottom",
          end: "top center",
          scrub: 2.0,
        },
      }
    );

    // =====================================================
    // PROJECTS → TIMELINE
    // Right → Timeline anchor (NOT full left)
    // Medium → Small (final size)
    // =====================================================
    gsap.fromTo(
      orb,
      {
        x: "0vw",
        scale: 0.75,
      },
      {
        x: "-48vw",
        scale: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: "#timeline",
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );

    // =====================================================
    // TIMELINE → SKILLS
    // Left → Right
    // Vertical movement begins ONLY here
    // Size stays Small
    // =====================================================
    gsap.fromTo(
      orb,
      {
        x: "-48vw",
        y: "0vh",
        scale: 0.55,
      },
      {
        x: "0vw",
        y: "22vh",
        scale: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: "#skills",
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(orb);
    };
  }, []);

  // =====================================================
  // ORB ELEMENT
  // =====================================================
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
