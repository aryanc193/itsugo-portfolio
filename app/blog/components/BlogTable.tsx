"use client";

import FileRow from "./FileRow";
import type { BlogPost } from "@/app/lib/getBlogPosts";

type BlogTableProps = {
  posts: BlogPost[];
  onSort: (field: "name" | "date") => void;
  sortBy: "name" | "date" | null;
  direction: "asc" | "desc";
};

export default function BlogTable({
  posts,
  onSort,
  sortBy,
  direction,
}: BlogTableProps) {
  return (
    <div className="space-y-1">
      <div className="hidden md:grid grid-cols-12 px-4 py-2 text-sm text-white/60 border-b border-white/10">
        <div className="col-span-1"></div>

        <button
          className="col-span-8 text-left hover:text-accent"
          onClick={() => onSort("name")}
        >
          Name {sortBy === "name" && (direction === "asc" ? "↑" : "↓")}
        </button>

        <button
          className="col-span-3 text-right hover:text-accent"
          onClick={() => onSort("date")}
        >
          Date {sortBy === "date" && (direction === "asc" ? "↑" : "↓")}
        </button>
      </div>

      {posts.map((post) => (
        <FileRow
          key={post.slug}
          title={`${post.slug}.mdx`}
          href={`/blog/${post.slug}`}
          date={post.date}
        />
      ))}
    </div>
  );
}
