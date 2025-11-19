"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";
import LanguageToggle from "./LanguageToggle";
import logo from "../../public/logo.png";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const isJP = lang === "jp";

  return (
    <>
      {/* === TRUE FROSTED GLASS LAYER (Chrome-safe) === */}
      {open && (
        <div
          className="
            fixed inset-0 z-30
            before:content-['']
            before:absolute before:inset-0
            before:backdrop-blur-[10px]
            before:bg-white/10
            dark:before:bg-black/20
          "
        ></div>
      )}

      <nav
        className={`w-full fixed top-0 z-50 border-b border-white/10 backdrop-blur-md
          ${open ? "bg-hero2/10" : "bg-main/20"}
        `}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="bg-black/42 backdrop-blur-sm rounded-3xl p-1">
            <Link href="/" onClick={() => setOpen(false)}>
              <Image src={logo} alt="Aryan-Logo" width={120} height={40} />
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-main">
            <Link href="/#about" className="hover:text-hero2 transition">
              {isJP ? "紹介" : "About"}
            </Link>
            <Link href="/#projects" className="hover:text-hero2 transition">
              {isJP ? "プロジェクト" : "Projects"}
            </Link>
            <Link href="/#skills" className="hover:text-hero2 transition">
              {isJP ? "スキル" : "Skills"}
            </Link>
            <Link href="/#blog" className="hover:text-hero2 transition">
              {isJP ? "ブログ" : "Blog"}
            </Link>
            <Link href="/#contact" className="hover:text-hero2 transition">
              {isJP ? "連絡先" : "Contact"}
            </Link>

            <LanguageToggle />
            <DarkModeToggle />
          </div>

          {/* Burger toggle */}
          <button
            className="md:hidden p-3 text-3xl text-foreground z-[60]"
            onClick={() => setOpen(!open)}
          >
            {open ? "▲" : "▼"}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`
            md:hidden fixed left-0 -top-20 w-full h-screen z-40
            transition-transform duration-300
            ${open ? "translate-y-20" : "-translate-y-full"}
          `}
        >
          <div className="relative z-50 flex flex-col items-center gap-10 pt-28 text-center">
            <Link
              href="/#about"
              onClick={() => setOpen(false)}
              className="text-main text-2xl hover:text-hero2"
            >
              {isJP ? "紹介" : "About"}
            </Link>
            <Link
              href="/#projects"
              onClick={() => setOpen(false)}
              className="text-main text-2xl hover:text-hero2"
            >
              {isJP ? "プロジェクト" : "Projects"}
            </Link>
            <Link
              href="/#skills"
              onClick={() => setOpen(false)}
              className="text-main text-2xl hover:text-hero2"
            >
              {isJP ? "スキル" : "Skills"}
            </Link>
            <Link
              href="/#blog"
              onClick={() => setOpen(false)}
              className="text-main text-2xl hover:text-hero2"
            >
              {isJP ? "ブログ" : "Blog"}
            </Link>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="text-main text-2xl hover:text-hero2"
            >
              {isJP ? "連絡先" : "Contact"}
            </Link>

            <LanguageToggle />
            <DarkModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
