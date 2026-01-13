import { getBlogPosts } from "@/app/lib/getBlogPosts";
import BlogClient from "./BlogClient";
import Orb from "../components/Orb";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="w-full relative z-0 isolate">
      {/* TOP BAR */}
      <div
        className="
          sticky z-20
          flex justify-between items-center 
          px-4 sm:px-6 py-4 
          border-b border-white/10
          bg-black/40 backdrop-blur-xl rounded-t-2xl
        "
      >
        <h1 className="text-base sm:text-lg font-main text-white/90">Blogs</h1>

        <div className="flex gap-1.5 sm:gap-2 text-white/70">
          <a
            href="/"
            className="px-6 py-2 rounded-xl border border-white/10 bg-gradient-to-r from-white to-hero1
             backdrop-blur-sm bg-clip-text text-transparent
             hover:border-accent hover:text-accent transition"
          >
            {"Go back to the portfolio"}
          </a>
          <Orb
            left="95%"
            mobileLeft="90%"
            size="clamp(20px, 2vw, 34px)"
            float={true}
            mobileSize="clamp(20px, 2vw, 34px)"
            mobileOpacity={1}
            mobileFloat={true}
            className="-z-10"
          />
        </div>
      </div>

      <div className="px-3 sm:px-6 py-6">
        <BlogClient posts={posts} />
      </div>
    </div>
  );
}
