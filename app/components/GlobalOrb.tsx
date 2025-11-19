"use client";

import { useEffect, useRef } from "react";
import styles from "./orb.module.css";

export default function GlobalOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const footer = document.querySelector("#contact");
    if (!footer) return;

    let anchored = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !anchored) {
          anchored = true;
          container.classList.add(styles.footerMode);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.orbContainer} aria-hidden>
      <div className={styles.orbGlow} />
    </div>
  );
}
