import { Inter, Crimson_Pro, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Aryan's Blogs",
  description: "Blogs",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.variable} ${crimson.variable} ${jetbrains.variable}
      min-h-screen w-full relative`}
    >
      {/* Wallpaper */}
      <div className="fixed inset-0 bg-[url('/blog-bg.png')] bg-cover bg-center blur-sm opacity-50" />

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" />

      {/* Main responsive container */}
      <main className="relative z-10 w-full max-w-5xl backdrop-blur-xl bg-black/20 border border-white/20 rounded-3xl mx-auto px-1 sm:px-1 py-1">
        {children}
      </main>
    </div>
  );
}
