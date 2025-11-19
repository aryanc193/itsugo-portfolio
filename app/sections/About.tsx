"use client";

import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { lang } = useLanguage();
  const isJP = lang === "jp";

  return (
    <section
      id="about"
      className="relative font-main w-full min-h-screen text-main overflow-hidden z-10"
      data-orb-zone="about"
    >
      <div className="max-w-4xl mx-auto px-6 pt-32 md:pt-48 lg:pt-50">
        {/* SECTION LABEL */}
        <p className="text-accent uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4">
          {isJP ? "概要" : "ABOUT"}
        </p>

        {/* HEADING */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10">
          {isJP ? "アリアンについて" : "Who is Aryan?"}
        </h2>

        {/* PARAGRAPHS */}
        <div
          className={`space-y-6 max-w-3xl text-muted ${
            isJP ? "leading-[1.9]" : "leading-relaxed"
          }`}
        >
          {isJP ? (
            <>
              <p>
                アリアンは、シンプルで信頼性の高い
                Web・モバイルプロダクトをつくることを得意とするフルスタック開発者。
                丁寧な UI
                設計と実践的なエンジニアリングを組み合わせ、アイデアをスケッチ段階からプロダクトとして形にしていく。
              </p>

              <p>
                最近は、Postgres
                を中心としたバックエンド領域を深めつつ、ゲーム体験や分散型システムが今後のデジタル体験をどう変えるのかに関心を持っている。
              </p>

              <p>
                日本語（JLPT
                N3）を学習しており、学習ログやメモ、日々のワークフローの一部でも日本語を使っている。
              </p>
            </>
          ) : (
            <>
              <p>
                Aryan is a full-stack developer who enjoys creating clean,
                reliable web and mobile products. He blends thoughtful UI with
                practical engineering, taking ideas from rough sketch to real,
                usable releases.
              </p>

              <p>
                Recently, he has been deepening his backend skills with Postgres
                while exploring how gaming and decentralized systems might shape
                future digital experiences.
              </p>

              <p>
                He is also studying Japanese (JLPT N3), a language he enjoys
                using in study logs, notes, and parts of his personal workflow.
              </p>
            </>
          )}
        </div>

        {/* TWO COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 mt-12 sm:mt-14">
          {/* LEFT */}
          <div>
            <h3 className="text-subtle tracking-wide text-xs sm:text-sm mb-3 sm:mb-4">
              {isJP ? "やっていること" : "What he does"}
            </h3>

            <ul className="space-y-2 text-foreground text-sm sm:text-base">
              {isJP ? (
                <>
                  <li>• Web・モバイルアプリの開発</li>
                  <li>• プロダクト機能の設計・実装</li>
                  <li>• プロトタイプから本番リリースまでの一貫開発</li>
                  <li>• 小規模チームでの協働</li>
                </>
              ) : (
                <>
                  <li>• Build web + mobile apps</li>
                  <li>• Ship product features</li>
                  <li>• Prototype → release</li>
                  <li>• Collaborate with small teams</li>
                </>
              )}
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="text-subtle tracking-wide text-xs sm:text-sm mb-3 sm:mb-4">
              {isJP ? "現在のフォーカス" : "Current Focus"}
            </h3>

            <ul className="space-y-2 text-foreground text-sm sm:text-base">
              {isJP ? (
                <>
                  <li>• Postgres とバックエンド領域の深化</li>
                  <li>• 日本のテックエコシステムの理解</li>
                  <li>• Web3・ゲーム体験の探究</li>
                </>
              ) : (
                <>
                  <li>• Postgres & backend depth</li>
                  <li>• Japan tech ecosystem</li>
                  <li>• Web3 & gaming concepts</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* BUTTON */}
        <a
          href="#projects"
          className="inline-block mt-12 sm:mt-14 px-6 py-3 sm:px-8 sm:py-3.5 
      bg-accent text-black font-medium rounded-xl 
      hover:bg-accent-hover transition 
      text-sm sm:text-base"
        >
          {isJP ? "プロジェクトを見る" : "View Projects"}
        </a>
      </div>
    </section>
  );
}
