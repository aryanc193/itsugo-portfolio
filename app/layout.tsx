import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import Script from "next/script";
import NavbarWrapper from "./components/NavbarWrapper";
import {
  Inter,
  Crimson_Pro,
  JetBrains_Mono,
  Geist_Mono,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Aryan's Portfolio",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="">
      <head>
        <Script
          id="theme-loader"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    const key = 'theme-preference';
    const saved = localStorage.getItem(key);

    if (saved === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${crimson.variable} ${jetbrains.variable} ${geistMono.variable} font-sans`}
      >
        <LanguageProvider>
          <NavbarWrapper />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
