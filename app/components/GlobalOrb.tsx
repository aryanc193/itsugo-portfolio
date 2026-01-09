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

    const hero = document.querySelector("#hero") as HTMLElement;
    const about = document.querySelector("#about") as HTMLElement;
    const projects = document.querySelector("#projects") as HTMLElement;

    if (!hero || !about || !projects) return;

    // Clean slate
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(orb);

    /* =========================================================
       BASE STATE
       ========================================================= */
    gsap.set(orb, {
      position: "fixed",
      left: 0,
      top: 0,
      x: "80vw",
      y: "35vh",
      scale: 1.35,
      willChange: "transform",
    });

    /* =========================================================
       MASTER TIMELINE (ONE SOURCE OF TRUTH)
       ========================================================= */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        endTrigger: projects,
        end: "bottom top",
        scrub: 2.0,
      },
    });

    /* -------------------------
       HERO → ABOUT
       right → left
    ------------------------- */
    tl.to(orb, {
      x: "15vw",
      scale: 0.75,
      ease: "none",
    });

    /* -------------------------
       ABOUT → PROJECTS
       left → right
    ------------------------- */
    tl.to(orb, {
      x: "85vw",
      scale: 0.75,
      ease: "none",
    });

    /* -------------------------
       PROJECTS EXIT
       right → off-screen
    ------------------------- */
    tl.to(orb, {
      x: "120vw",
      opacity: 0,
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
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 30,
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      {/* INNER ORB — CSS ONLY */}
      <div className={styles.orbCore} />
    </div>
  );
}
