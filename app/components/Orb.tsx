"use client";

import styles from "./orb.module.css";

interface OrbProps {
  // Desktop
  size?: number | string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  centerX?: boolean;
  centerY?: boolean;
  float?: boolean;
  opacity?: number;
  className?: string;

  // Mobile overrides
  mobileSize?: number | string;
  mobileTop?: string;
  mobileBottom?: string;
  mobileLeft?: string;
  mobileRight?: string;
  mobileCenterX?: boolean;
  mobileCenterY?: boolean;
  mobileFloat?: boolean;
  mobileOpacity?: number;
  mobileHidden?: boolean;
}

export default function Orb({
  size = "clamp(260px, 18vw, 420px)",
  top,
  bottom,
  left,
  right,
  centerX = false,
  centerY = false,
  float = true,
  opacity = 1,
  className = "",

  mobileSize = "clamp(150px, 28vw, 320px)", // slightly smaller on mobile by default
  mobileTop,
  mobileBottom,
  mobileLeft,
  mobileRight,
  mobileCenterX,
  mobileCenterY,
  mobileFloat,
  mobileOpacity = 1, // <-- increased default mobile visibility
  mobileHidden = false,
}: OrbProps) {
  /** DESKTOP INLINE STYLES */
  const desktopStyle: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    top,
    bottom,
    left,
    right,
    opacity,
    transform: `${centerX ? "translateX(-50%)" : ""} ${
      centerY ? "translateY(-50%)" : ""
    }`,
    // expose mobile values as CSS custom properties so your CSS module can read them
    ["--m-size" as any]: mobileSize,
    ["--m-top" as any]: mobileTop ?? "unset",
    ["--m-bottom" as any]: mobileBottom ?? "unset",
    ["--m-left" as any]: mobileLeft ?? "unset",
    ["--m-right" as any]: mobileRight ?? "unset",
    ["--m-opacity" as any]: mobileOpacity,
    ["--m-center-x" as any]: mobileCenterX ? 1 : 0,
    ["--m-center-y" as any]: mobileCenterY ? 1 : 0,
    ["--m-hide" as any]: mobileHidden ? 1 : 0,
  };

  const isMobileFloat = mobileFloat ?? float;

  return (
    <div
      className={`${styles.orbGlow} ${isMobileFloat ? styles.float : ""} ${
        styles.mobileOrb
      } ${className}`}
      style={desktopStyle}
      aria-hidden
    />
  );
}
