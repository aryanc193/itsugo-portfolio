"use client";

import { useEffect, useRef } from "react";
import styles from "./footerGlow.module.css";

export default function FooterGlowOrb() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const contact = document.querySelector("#contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wrapper.classList.add(styles.active);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper} aria-hidden>
      <div className={styles.footerGlow} />
      <div className={styles.footerOrb} />
    </div>
  );
}
