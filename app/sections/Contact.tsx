"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "./contact.css";
import FooterGlowOrb from "../components/FooterGlowOrb";

export default function Contact() {
  const { lang } = useLanguage();
  const isJP = lang === "jp";

  return (
    <>
      <section
        id="contact"
        className="relative font-main z-5 w-full py-32 px-6 text-foreground"
      >
        {/* GLOW WRAPPER — behind everything */}
        <div className="footer-glow-wrapper">
          <FooterGlowOrb />
        </div>

        {/* CONTACT CONTENT */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-main text-2xl sm:text-3xl font-semibold tracking-widest mb-4 glow-dynamic">
            {isJP ? "ご連絡お待ちしております" : "LET'S CONNECT"}
          </h2>

          <p className="text-main text-sm sm:text-base mb-10">
            {isJP
              ? "コラボや機会について、どうぞお気軽にご連絡ください。"
              : "Open for collaborations & opportunities."}
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center justify-center gap-6 ">
            {[
              {
                icon: <Github size={22} />,
                href: "https://github.com/aryanc193",
              },
              {
                icon: <Linkedin size={22} />,
                href: "https://www.linkedin.com/in/aryan-choudhary-dev",
              },
              {
                icon: <Mail size={22} />,
                href: "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=aryanc1240@gmail.com",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                className="
                  p-3 rounded-xl border border-white/10
    text-foreground hover:text-main
    hover:border-foreground
    hover:scale-110 transition
    box-glow-hover
                "
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* DOGGO */}
        <div
          className="
            dog-idle 
            absolute left-4 bottom-4 
            opacity-90
            select-none
            scale-[2]
            z-10
          "
        />
      </section>

      {/* SEPARATE FOOTER — AT BOTTOM OF PAGE */}
      <footer className="w-full py-3 text-center bg-transparent text-muted text-sm">
        © 2025 Aryan Choudhary — All Rights Reserved
      </footer>
    </>
  );
}
