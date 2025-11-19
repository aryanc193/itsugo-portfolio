"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="inline-flex items-center bg-zinc-900/40 border border-zinc-700 
      rounded-full p-1 select-none backdrop-blur-sm"
    >
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full text-sm transition-all
          ${
            lang === "en"
              ? "bg-zinc-800 text-white font-medium shadow-sm"
              : "text-zinc-200 hover:text-white"
          }`}
      >
        EN
      </button>

      <button
        onClick={() => setLang("jp")}
        className={`px-3 py-1 rounded-full text-sm transition-all
          ${
            lang === "jp"
              ? "bg-zinc-800 text-white font-medium shadow-sm"
              : "text-zinc-200 hover:text-white"
          }`}
      >
        JP
      </button>
    </div>
  );
}
