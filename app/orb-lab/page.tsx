"use client";

import dynamic from "next/dynamic";

const OrbScene = dynamic(() => import("./OrbScene"), {
  ssr: false,
});

export default function OrbLabPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <OrbScene />

      {/* Scroll sections */}
      <section
        id="section1"
        className="h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl">Section 1</h1>
      </section>

      <section
        id="section2"
        className="h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl">Section 2</h1>
      </section>

      <section
        id="section3"
        className="h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl">Section 3</h1>
      </section>

      <section
        id="section4"
        className="h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl">Section 4</h1>
      </section>
    </main>
  );
}
