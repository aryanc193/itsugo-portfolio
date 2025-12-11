"use client";

import Orb from "../components/Orb";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();
  const isJP = lang === "jp";
  const resumeHref = "/Aryan_Choudhary_Resume.pdf";

  return (
    <section
      className="relative font-main w-full min-h-screen text-main overflow-hidden -mb-20 z-10"
      data-orb-zone="hero"
    >
      <Orb
        top="50%"
        right="3%"
        size="clamp(300px, 20vw, 540px)"
        float={true}
        mobileSize="clamp(150px, 8vw, 310px)"
        mobileTop="25%"
        mobileRight="5%"
        mobileOpacity={1}
        mobileFloat={true}
        className="-z-10"
      />

      <div className="max-w-4xl mx-auto px-6 pt-32 md:pt-48 lg:pt-56 ">
        {/* ---------- HEADLINE ---------- */}
        <h1
          className="
          font-bold leading-tight text-main
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        "
        >
          {isJP ? (
            <>
              アプリ、ツール、そして新しいプロダクトを企画からリリースまで一貫して開発します。
            </>
          ) : (
            <>Builds apps, tools, and new ideas from concept to launch.</>
          )}
        </h1>

        {/* ---------- SUB TEXT ---------- */}
        <p
          className="
          mt-5 md:mt-6 
          text-muted 
          text-base sm:text-lg 
          max-w-xl 
          leading-relaxed
        "
        >
          {isJP
            ? "プロダクト体験に強いフルスタック開発者。Web3領域を探索中。現在、日本語（JLPT N3）を学習しています。"
            : "Full-stack developer focused on delivering product experiences. Exploring Web3. Currently studying Japanese (JLPT N3)."}
        </p>

        {/* ---------- BUTTONS ---------- */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href="#projects"
            className="
              px-6 py-3 
              bg-accent text-black 
              font-medium rounded-xl 
              hover:bg-accent-hover 
              transition
              text-center
            "
          >
            {isJP ? "プロジェクトを見る" : "View Projects"}
          </a>

          <a
            href="#contact"
            className="
              px-6 py-3
              border border-accent 
              text-accent 
              rounded-xl 
              hover:bg-accent/20 
              transition
              text-center
            "
          >
            {isJP ? "お問い合わせ" : "Get in Touch"}
          </a>

          <a
            href={resumeHref}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3
              border border-main 
              text-main 
              rounded-xl 
              hover:bg-accent/20
              hover:border-accent 
              hover:text-accent 
              transition
              text-center"
            aria-label={isJP ? "履歴書をダウンロード" : "Download resume"}
          >
            {isJP ? "履歴書をダウンロード" : "Download resume"}
          </a>
        </div>
      </div>
    </section>
  );
}
