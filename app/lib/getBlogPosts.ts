import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** exported type so other files can import BlogPost */
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  cover: string | null;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  const postsDir = path.join(process.cwd(), "app/blog/posts");

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace(".mdx", ""),
      title: (data.title as string) || "Untitled",
      date: (data.date as string) || "",
      category: (data.category as string) || "misc",
      description: (data.description as string) || "",
      cover: (data.cover as string) || null,
      content: String(content || ""),
    };
  });
}
