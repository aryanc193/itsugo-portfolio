import About from "./sections/About";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import ProjectsPreview from "./sections/ProjectsPreview";
import TimelineSection from "./sections/Timeline";
import WritingWrapper from "./components/WritingWrapper";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <ProjectsPreview />
      <TimelineSection />
      <Skills />
      <WritingWrapper />
      <Contact />
    </main>
  );
}
