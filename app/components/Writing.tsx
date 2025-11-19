"use client";
import BlogCard from "./BlogCard";

import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import type { BlogPost } from "../lib/getBlogPosts";

interface DevToPost {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  readable_publish_date: string;
}

export default function Writing({
  personalPosts,
}: {
  personalPosts: BlogPost[];
}) {
  const { lang } = useLanguage();
  const isJP = lang === "jp";

  const [devto, setDevto] = useState<DevToPost[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("https://dev.to/api/articles?username=itsugo");
        const data = await res.json();
        setDevto(data.slice(0, 3));
      } catch (e) {
        console.error("Dev.to fetch failed:", e);
      }
    }
    loadPosts();
  }, []);

  return (
    <section
      id="blog"
      className="w-full font-main py-28 px-6 bg-background text-foreground"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADING */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
          {isJP ? "執筆" : "Writing"}
        </h2>

        <p className="text-muted text-sm sm:text-base mb-16 text-center">
          {isJP
            ? "最新の記事と個人的なブログ"
            : "Latest articles & personal writings"}
        </p>

        {/* TWO COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT — DEV.TO */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              {isJP ? "Dev.to 投稿" : "Dev.to Posts"}
            </h3>

            <div className="flex flex-col gap-6">
              {devto.length === 0 &&
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[120px] rounded-xl bg-white/5 border border-accent/20 animate-pulse"
                  />
                ))}

              {devto.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  date={post.readable_publish_date}
                  href={post.url}
                  cover={post.cover_image}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — PERSONAL BLOG */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              {isJP ? "個人ブログ" : "Personal Posts"}
            </h3>

            <div className="flex flex-col gap-6">
              {personalPosts.length === 0 && (
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-muted text-sm">
                  {isJP
                    ? "まだ記事がありません。"
                    : "Nothing written here yet."}
                </div>
              )}

              {personalPosts.slice(0, 3).map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  href={`/blog/${post.slug}`}
                  cover={post.cover}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
