import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { useMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "app/blog/posts", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const compiled = await compile(content, {
    outputFormat: "function-body",
  });

  const mdxModule = new Function(
    "runtime",
    `${compiled.value}; return { default: MDXContent };`
  )(runtime);

  const MDXContent = mdxModule.default;

  return (
    <div className="relative min-h-screen w-full">
      {/* ------------------------- */}
      {/* FIXED TOP BAR */}
      {/* ------------------------- */}
      <div
        className="
    sticky top-0 left-0 right-0
    z-50
    h-14 px-6
    flex items-center justify-between
    backdrop-blur-xl bg-[#222]/90
    border-b rounded-2xl border-white/10
  "
      >
        {/* LEFT: BACK BUTTON */}
        <a
          href="/blog"
          className="text-white/80 hover:text-accent transition font-main text-xl"
        >
          ←
        </a>

        {/* CENTER: FILE TITLE */}
        <div className="text-white/70 text-sm font-main tracking-wide">
          {data.title}.mdx
        </div>

        {/* RIGHT: EMPTY FOR BALANCE */}
        <div className="w-6" />
      </div>

      {/* ------------------------- */}
      {/* CONTENT AREA */}
      {/* ------------------------- */}
      <div
        className="
          max-w-4xl mx-auto pt-24 pb-20 px-6  
          font-blog-body text-white/90
        "
      >
        {/* META */}
        <p className="text-white/60 mb-10 text-sm tracking-wide">
          {data.date} — {data.category}
        </p>

        {/* MDX CONTENT */}
        <article className="prose prose-invert font-blog-body leading-relaxed">
          <MDXContent components={useMDXComponents({})} />
        </article>
      </div>
    </div>
  );
}
