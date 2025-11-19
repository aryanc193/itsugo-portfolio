"use client";

import { useState, useMemo } from "react";
import BlogSidebar from "./components/BlogSidebar";
import BlogTable from "./components/BlogTable";
import type { BlogPost } from "@/app/lib/getBlogPosts";

type BlogClientProps = {
  posts: BlogPost[];
};

export default function BlogClient({ posts }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "date" | null>(null);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const categories = ["all", ...new Set(posts.map((p) => p.category))];

  const filtered = useMemo(() => {
    let result =
      activeCategory === "all"
        ? posts
        : posts.filter((p) => p.category === activeCategory);

    if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        direction === "asc"
          ? a.slug.localeCompare(b.slug)
          : b.slug.localeCompare(a.slug)
      );
    }

    if (sortBy === "date") {
      const parse = (d: string) => new Date(d).getTime();

      result = [...result].sort((a, b) =>
        direction === "asc"
          ? parse(a.date) - parse(b.date)
          : parse(b.date) - parse(a.date)
      );
    }

    return result;
  }, [posts, activeCategory, sortBy, direction]);

  function handleSort(field: "name" | "date") {
    if (sortBy === field) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setDirection("asc");
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
      <BlogSidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="col-span-12 md:col-span-9">
        <BlogTable
          posts={filtered}
          onSort={handleSort}
          sortBy={sortBy}
          direction={direction}
        />
      </div>
    </div>
  );
}
