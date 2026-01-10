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
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
      scale: 1.35,
      pointerEvents: "none",
      willChange: "transform",
    });

    // initial hero placement (right side)
gsap.set(orb, { x: "35vw" });

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
      x: "-30vw",
      scale: 0.75,
      ease: "none",
    });

    tl.to(orb, {
      x: "80vw",
      scale: 0.75,
      ease: "none",
    });

    tl.to(orb, {
      x: "500vw",
      autoAlpha: 0,
      ease: "none",
    });

    /* =========================================================
       SKILLS — YOUR TUNED MOTION (UNCHANGED)
       ========================================================= */
    tl.to(orb, {
      x: "70vw",
      scale: 0.5,
      autoAlpha: 1,
      ease: "none",
    });

    /* =========================================================
       BLOG — PERFECT CENTER
       ========================================================= */
    tl.to(orb, {
      x: 0,
      y: 0,
      scale: 1.25,
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
    <div ref={orbRef} id="global-orb" aria-hidden>
      <div className={styles.orbCore} />
    </div>
  );
}
