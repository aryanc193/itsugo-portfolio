"use client";

import "./skills.css";
import { useLanguage } from "../context/LanguageContext";
import Orb from "../components/Orb";

export default function Skills() {
  const { lang } = useLanguage();
  const isJP = lang === "jp";

  return (
    <section
      id="skills"
      className="py-32 font-main relative text-foreground"
      data-orb-zone="skills"
    >
      <Orb
        size="clamp(50px, 3vw, 100px)"
        top="85%"
        right="8%"
        float={true}
        mobileOpacity={0}
      />

      <div className="max-w-5xl mx-auto px-6 -mb-30">
        <h2 className="text-center text-accent text-xl tracking-widest mb-10">
          {isJP ? "スキル & トゥール" : "SKILLS & TOOLS"}
        </h2>

        {[
          {
            labelEN: "Frontend",
            labelJP: "フロントエンド",
            itemsEN: [
              "ReactJS",
              "React Native",
              "Next.js",
              "Tailwind",
              "HTML5",
              "CSS3",
              "JavaScript",
            ],
            itemsJP: [
              "ReactJS",
              "React Native",
              "Next.js",
              "Tailwind",
              "HTML5",
              "CSS3",
              "JavaScript",
            ],
          },
          {
            labelEN: "Backend",
            labelJP: "バックエンド",
            itemsEN: ["Node.js", "PostgreSQL", "Express"],
            itemsJP: ["Node.js", "PostgreSQL", "Express"],
          },
          {
            labelEN: "Languages",
            labelJP: "言語",
            itemsEN: ["English", "Japanese", "Hindi"],
            itemsJP: ["英語", "日本語", "ヒンディー語"],
          },
        ].map((cat) => (
          <div
            key={cat.labelEN}
            className="
    skill-card
    group relative overflow-hidden rounded-xl 
    p-4 sm:p-6 md:p-8 lg:p-10
    transition-all -mb-3
  "
          >
            {/* Slash effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="slash-fill"></div>
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10">
              {/* Title (full width always) */}
              <span
                className="
                  text-hero1 font-semibold block mb-4
                  group-hover:text-hero2 transition-colors
                "
              >
                {isJP ? cat.labelJP : cat.labelEN}
              </span>

              {/* Tags Grid */}
              <div
                className="
                  grid grid-cols-2 gap-3
                  sm:flex sm:flex-wrap sm:gap-6
                "
              >
                {(isJP ? cat.itemsJP : cat.itemsEN).map((item) => (
                  <span
                    key={item}
                    className="
                      px-4 py-1.5 text-xs rounded-full border border-accent text-foreground
                      transition-all
                      group-hover:bg-white/10
                      group-hover:scale-[1.05]
                      group-hover:shadow-[0_0_10px_var(--color-accent)]
                      group-active:bg-white/10
                      group-active:scale-[1.08]
                      "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Samurai sprite */}
      <div
        className="
    samurai-idle 
    absolute right-12 bottom-10 opacity-90 scale-[1.5]
    hidden sm:block
    pointer-events-none 
  "
      ></div>
    </section>
  );
}
