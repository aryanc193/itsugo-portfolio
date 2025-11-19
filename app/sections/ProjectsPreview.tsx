"use client";

import { useLanguage } from "../context/LanguageContext";
import { projects } from "@/data/projects";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Orb from "../components/Orb";

export default function ProjectsPreview() {
  const { lang } = useLanguage();
  const isJP = lang === "jp";

  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section
      id="projects"
      className="relative font-main z-21 w-full py-28 px-6 text-foreground"
      data-orb-zone="projects"
    >
      <Orb
        top="53%"
        right="3%"
        size="clamp(220px, 10vw, 440px)"
        float={true}
        mobileOpacity={0}
      />

      <div className="max-w-5xl mx-auto ">
        <h1 className="text-4xl font-bold mb-12">
          {isJP ? "プロジェクト" : "Projects"}
        </h1>

        <div className="space-y-24">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className={`flex flex-col gap-10 ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* IMAGE */}
              <div className="w-full md:w-1/2 relative h-48 sm:h-64 rounded-xl overflow-hidden bg-card-bg">
                <Image
                  src={p.img}
                  fill
                  alt={isJP ? p.titleJP : p.titleEN}
                  className="object-cover"
                />
              </div>

              {/* TEXT */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-3">
                  {isJP ? p.titleJP : p.titleEN}
                </h3>

                <p className="text-muted leading-relaxed mb-6">
                  {isJP ? p.descJP : p.descEN}
                </p>

                <div className="flex gap-4">
                  <a
                    href={p.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-lg bg-accent text-black font-medium hover:bg-accent-hover transition"
                  >
                    {isJP ? "ケーススタディ" : "Case Study"}
                  </a>

                  <a
                    href={p.live ?? p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-lg border border-accent text-accent hover:bg-accent/20 transition flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    {isJP ? "ギットハブ / ライブ" : "GitHub / Live"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
