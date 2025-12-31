"use client";

import dynamic from "next/dynamic";

const OrbScene = dynamic(() => import("./OrbScene"), {
  ssr: false,
});

export default function OrbLabPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <OrbScene />

      <section className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">Hero</h1>
      </section>

      <section className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">About</h1>
      </section>

      <section className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">Projects</h1>
      </section>

      <section className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">Timeline</h1>
      </section>

      <section className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">Skills</h1>
      </section>
    </main>
  );
}
