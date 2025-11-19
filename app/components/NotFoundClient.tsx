"use client";
import "./notfound.css";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { lang } = useLanguage();
  const isJP = lang === "jp";

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[260px]
                      bg-[radial-gradient(circle_at_center,rgba(0,255,220,0.12),rgba(0,150,255,0.10)_40%,transparent_80%)]
                      blur-3xl opacity-80 pointer-events-none"
      />

      <h1 className="text-2xl sm:text-2xl font-semibold tracking-wide text-foreground mb-2">
        404
      </h1>

      <p className="text-muted text-sm mb-10">
        {isJP ? (
          "「お前ゾロかよ？道が迷ったな」"
        ) : (
          <>
            <span className="italic">“NPCs never question directions…”</span>{" "}
            but you can.
          </>
        )}
      </p>

      <div className="flex gap-12 items-center justify-center mb-12">
        <div className="-mt-15 samurai-walk pixelated scale-[2]" />
        <div className="mt-25 dog-walk pixelated scale-[2]" />
      </div>

      <a
        href="/"
        className="px-6 py-2 rounded-xl border border-white/10 
             text-foreground bg-background/20 backdrop-blur-sm
             hover:border-accent hover:text-accent transition"
      >
        {isJP ? "帰ろう" : "Go back"}
      </a>
    </div>
  );
}
