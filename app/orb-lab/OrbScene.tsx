"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../components/orb.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function OrbScene({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLElement | null>;
}) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollRef.current ?? document.documentElement;

    const orb = orbRef.current;
    if (!orb) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf(orb);

    // Initial position
    gsap.set(orb, {
      x: 0,
      y: 0,
      scale: 1,
    });

    // Idle rotation (GSAP owns transform now)
    gsap.to(orb, {
      rotate: 360,
      duration: 24,
      repeat: -1,
      ease: "linear",
    });

    // Scroll-driven motion
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scroller,
        scroller,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true, // keep for now
      },
    });

    tl.to(orb, {
      x: "-10vw",
      y: "-6vh",
      scale: 0.9,
      duration: 1,
    });

    tl.to(orb, {
      x: "-20vw",
      y: "-12vh",
      scale: 0.75,
      duration: 1,
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <div
        ref={orbRef}
        className={styles.orbGlow}
        style={{
          position: "fixed",
          right: "20px",
          width: "300px",
          height: "300px",
          zIndex: 9999,
        }}
      />

      <div className="fixed bottom-4 left-4 text-xs text-white z-[9999]">
        Orb Lab – Scroll to test
      </div>
    </>
  );
}
