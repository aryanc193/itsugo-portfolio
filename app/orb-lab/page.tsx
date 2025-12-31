"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const OrbScene = dynamic(() => import("./OrbScene"), {
  ssr: false,
});

export default function OrbLabPage() {
  const scrollRef = useRef<HTMLElement | null>(null);

  return (
    <main
      ref={scrollRef}
      className="relative min-h-screen overflow-y-auto"
    >
      <OrbScene scrollRef={scrollRef} />

      <section className="h-screen flex items-center justify-center">
        <h1>Hero</h1>
      </section>

      <section className="h-screen flex items-center justify-center">
        <h1>About</h1>
      </section>

      <section className="h-screen flex items-center justify-center">
        <h1>Projects</h1>
      </section>

      <section className="h-screen flex items-center justify-center">
        <h1>Timeline</h1>
      </section>

      <section className="h-screen flex items-center justify-center">
        <h1>Skills</h1>
      </section>
    </main>
  );
}
