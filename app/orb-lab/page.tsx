"use client";

import dynamic from "next/dynamic";

const OrbScene = dynamic(() => import("./OrbScene"), { ssr: false });

export default function OrbLabPage() {
  return (
    <main>
      <OrbScene />

      <section id="hero" className="h-screen flex items-center justify-center">
        <h1>Hero</h1>
      </section>

      <section id="about" className="h-screen flex items-center justify-center">
        <h1>About</h1>
      </section>

      <section
        id="projects"
        className="h-screen flex items-center justify-center"
      >
        <h1>Projects</h1>
      </section>

      <section
        id="timeline"
        className="h-screen flex items-center justify-center"
      >
        <h1>Timeline</h1>
      </section>

      <section
        id="skills"
        className="h-screen flex items-center justify-center"
      >
        <h1>Skills</h1>
      </section>
    </main>
  );
}
