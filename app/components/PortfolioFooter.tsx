"use client";

import { useLanguage } from "../context/LanguageContext";

export default function PortfolioFooter() {
  const { lang } = useLanguage();
  const isJP = lang === "jp";

  return (
    <footer
      className="relative z-50 pointer-events-auto
        w-full py-4
        text-center text-sm
        text-muted
        bg-transparent
        border-t border-white/5
      "
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-1">
        {isJP ? "好奇心で作られた" : "Built with curiosity by"}{" "}
        <a
          href="/"
          className="
            text-teal-300
            underline-offset-4
            hover:underline
            transition
          "
        >
          Aryan
        </a>
        <span className="mx-1">•</span>
        <a
          href="https://github.com/aryanc193/itsugo-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-subtle
            underline-offset-4
            hover:underline
            transition
          "
        >
          GitHub
        </a>
      </span>
    </footer>
  );
}
