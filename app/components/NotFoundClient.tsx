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
    // If there's a history entry, go back. Otherwise fallback to home.
    // window.history.length > 1 is a heuristic for "there's something to go back to"
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[260px]
                      bg-[radial-gradient(circle_at_center,rgba(0,255,220,0.12),rgba(0,150,255,0.10)_40%,transparent_80%)]
                      blur-3xl opacity-80 pointer-events-none"
      />

      <h1 className="text-2xl sm:text-2xl font-semibold tracking-wide text-accent mb-2">
        404
      </h1>

      <p className="text-accent text-sm mb-10">
        {isJP ? (
          "「お前ゾロかよ？道が迷ったな」"
        ) : (
          <>
            <span className="italic">“NPCs never question directions…”</span>{" "}
            but you can.
          </>
        )}
      </p>

      {/* CHARACTERS + ORB */}
      <div className="flex gap-12 items-center justify-center mb-12">
        <div className="-mt-15 samurai-walk pixelated scale-[2]" />
        <div className="mt-25 dog-walk pixelated scale-[2]" />

        {/* ORB - increase mobile visibility by passing mobileOpacity (optional) */}
        <div className="scale-[0.2] opacity-100">
          <Orb mobileOpacity={1} />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="px-6 py-2 rounded-xl border border-white/10 
             text-foreground bg-background/20 backdrop-blur-sm
             hover:border-accent hover:text-accent transition cursor-pointer"
        >
          {isJP ? "戻る" : "Go back"}
        </button>

        <a
          href="/"
          className="px-6 py-2 rounded-xl border border-white/10 
             text-foreground bg-background/10
             hover:border-accent hover:text-accent transition"
        >
          {isJP ? "ホームへ" : "Home"}
        </a>
      </div>
    </div>
  );
}
