"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import LoadingAnimation from "./LoadingAnimation";

export default function GlobalRouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const prevPathRef = useRef<string | null>(null);

  // Strip hash + search so /#about does NOT trigger loader
  const normalize = (p: string | null) =>
    p ? p.split("#")[0].split("?")[0] : p;

  // When the real pathname changes ⇒ hide loader
  useEffect(() => {
    const prev = normalize(prevPathRef.current);
    const curr = normalize(pathname);

    // navigation completed
    if (prev !== null && prev !== curr) {
      setLoading(false);
    }

    prevPathRef.current = pathname;
  }, [pathname]);

  // Detect INTERNAL navigation start (clicks, back/forward)
  useEffect(() => {
    function isInternalLink(a: HTMLAnchorElement) {
      const href = a.getAttribute("href");
      if (!href) return false;
      if (href.startsWith("#")) return false; // ignore hash
      if (a.target === "_blank") return false;

      try {
        const url = new URL(href, window.location.href);
        return url.origin === window.location.origin;
      } catch {
        return false;
      }
    }

    function onClick(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      const a = t?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      if (!isInternalLink(a)) return;

      // Ignore hash-only navigation
      const href = a.getAttribute("href")!;
      const next = new URL(href, window.location.href);

      if (
        normalize(next.pathname) === normalize(window.location.pathname) &&
        next.hash
      ) {
        return; // hash only → no loader
      }

      setLoading(true);
    }

    function onPopState() {
      // Back/forward used
      setLoading(true);
    }

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative z-50 max-w-4xl w-full p-4">
        <LoadingAnimation />
      </div>
    </div>
  );
}
