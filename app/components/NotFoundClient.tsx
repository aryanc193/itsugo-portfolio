"use client";
import "./notfound.css";
import { useLanguage } from "../context/LanguageContext";
import Orb from "@/app/components/Orb";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { lang } = useLanguage();
  const isJP = lang === "jp";
  const router = useRouter();

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <div
      data-page="not-found"
      className="
        min-h-screen w-full relative overflow-hidden
        flex flex-col justify-between items-center
        px-4 py-16
        text-center
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_50%_70%,rgba(0,255,220,0.12),rgba(0,120,255,0.08)_35%,transparent_70%)]
          blur-3xl
        "
      />

      {/* TOP MESSAGE */}
      <header className="relative z-10 max-w-xl mt-20">
        <p className="text-xs tracking-widest text-accent/70 mb-3">ERROR 404</p>

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-accent mb-4">
          {isJP ? "道に迷ったようだ" : "Looks like you wandered off"}
        </h1>

        <p className="text-sm sm:text-base text-accent/80 leading-relaxed">
          {isJP ? (
            "地図は完璧でも、時々道は外れる。"
          ) : (
            <>
              <span className="italic">“NPCs never question directions…”</span>{" "}
              but you can.
            </>
          )}
        </p>
      </header>

      {/* SCENE */}
      <div className="relative z-10 flex items-end justify-center gap-10 my-12">
        <div className="samurai-walk pixelated scale-[2]" />
        <div className="dog-walk pixelated scale-[2] my-[-43]" />
        <div className="scale-[0.2] opacity-100">
          <Orb mobileOpacity={1} />
        </div>
      </div>

      {/* ACTIONS */}
      <footer className="relative z-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleBack}
          className="
            px-6 py-2 rounded-xl
            border border-white/10
            bg-background/20 backdrop-blur-sm
            text-foreground
            hover:border-accent hover:text-accent
            transition
          "
        >
          {isJP ? "戻る" : "Go back"}
        </button>

        <a
          href="/"
          className="
            px-6 py-2 rounded-xl
            border border-white/10
            bg-background/10
            text-foreground
            hover:border-accent hover:text-accent
            transition
          "
        >
          {isJP ? "ホームへ" : "Home"}
        </a>
      </footer>
    </div>
  );
}
