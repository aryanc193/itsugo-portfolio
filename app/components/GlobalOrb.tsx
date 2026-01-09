"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./globalOrb.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalOrb() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    const hero = document.querySelector("#hero");
    const about = document.querySelector("#about");
    const projects = document.querySelector("#projects");
    const skills = document.querySelector("#skills");
    const blog = document.querySelector("#blog");

    if (!hero || !about || !projects || !skills || !blog) return;

    /* =========================================================
       HARD RESET (cheat-sheet compliant)
       ========================================================= */
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(orb);
    gsap.set(orb, { clearProps: "all" });

    /* =========================================================
       BASE ORB STATE (HIDDEN BY DEFAULT)
       ========================================================= */
    gsap.set(orb, {
      position: "fixed",
      left: 0,
      top: 0,
      x: "75vw",
      y: "15vh",
      scale: 1.35,
      pointerEvents: "none",
      willChange: "transform",
    });

    /* =========================================================
       MASTER TIMELINE (MOVEMENT ONLY)
       ========================================================= */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        endTrigger: blog,
        end: "bottom bottom",
        scrub: 2.5,
        invalidateOnRefresh: true,
      },
    });

    /* =========================================================
       HERO → ABOUT → PROJECTS
       ========================================================= */
    tl.to(orb, {
      autoAlpha: 1,
      x: "15vw",
      scale: 0.75,
      ease: "none",
    });

    tl.to(orb, {
      x: "85vw",
      scale: 0.75,
      ease: "none",
    });

    tl.to(orb, {
      x: "300vw",
      autoAlpha: 0,
      ease: "none",
    });

    /* =========================================================
       SKILLS — YOUR TUNED MOTION (UNCHANGED)
       ========================================================= */
    tl.to(orb, {
      x: "110vw",
      scale: 0.5,
      autoAlpha: 1,
      ease: "none",
    });

    /* =========================================================
       BLOG — PERFECT CENTER
       ========================================================= */
    tl.to(orb, {
      x: "42vw",
      y: "40vh",
      scale: 1,
      ease: "none",
    });

    /* =========================================================
       VISIBILITY GATE — SKILLS HALF VP
       (THIS IS THE KEY FIX)
       ========================================================= */
    ScrollTrigger.create({
      trigger: skills,
      start: "top 100%", // Skills halfway into viewport
      end: "bottom top", // until Skills leaves
      onEnter: () => {
        gsap.set(orb, { autoAlpha: 1 });
      },
      onLeaveBack: () => {
        gsap.set(orb, { autoAlpha: 0 });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(orb);
    };
  }, []);

  return (
    <div ref={orbRef} aria-hidden>
      <div className={styles.orbCore} />
    </div>
  );
}
