"use client";

import { useEffect, useState } from "react";
import styles from "./darkmode.module.css";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [joyJump, setJoyJump] = useState(false);

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("theme-preference");

    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  if (!mounted) return null; // 🚀 prevents hydration mismatch

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;

      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme-preference", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme-preference", "light");
      }

      if (!next) {
        setJoyJump(false);
        requestAnimationFrame(() => setJoyJump(true));
      }

      return next;
    });
  };

  return (
    <div className={styles.wrapper} onClick={toggle}>
      <div className={`${styles.moon} ${isDark ? styles.moonVisible : ""}`} />
      <div
        className={`${styles.knob} ${
          isDark ? styles.knobDark : styles.knobLight
        }`}
      >
        <img
          src="/darkmode/joyboy.png"
          className={`${styles.joy} ${isDark ? styles.joyHidden : ""} ${
            joyJump && !isDark ? styles.joyJump : ""
          }`}
        />
      </div>
    </div>
  );
}
