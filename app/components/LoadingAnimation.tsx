"use client";

import Orb from "@/app/components/Orb";
import "./notfound.css";
import "@/app/sections/contact.css";
import { useLanguage } from "@/app/context/LanguageContext";

export default function LoadingAnimation() {
  const { lang } = useLanguage();
  const isJP = lang === "jp";

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[260px]
                    bg-[radial-gradient(circle_at_center,rgba(0,255,220,0.12),rgba(0,150,255,0.10)_40%,transparent_80%)]
                    blur-3xl opacity-80 pointer-events-none"
      />
      <div className="flex items-center justify-center mb-12 w-full mt-40">
        <div className="relative flex items-center justify-center">
          <Orb
            opacity={1}
            mobileOpacity={1}
            className="relative"
            top={undefined}
            left={undefined}
            right={undefined}
            bottom={undefined}
          />
        </div>
      </div>
    </div>
  );
}
