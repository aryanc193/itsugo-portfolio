"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarWrapper from "./NavbarWrapper";
import GlobalOrb from "./GlobalOrb";
import PortfolioFooter from "./PortfolioFooter";

export default function LayoutChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    // detect not-found page via marker
    const notFoundEl = document.querySelector('[data-page="not-found"]');
    setIsNotFound(!!notFoundEl);
  }, [pathname]);

  /**
   * Hide the GLOBAL orb on:
   * - blog routes
   * - project case study routes
   * - not-found page
   */
  const hideOrb =
    pathname.startsWith("/blog") ||
    pathname.startsWith("/projects") ||
    isNotFound;

  return (
    <>
      <NavbarWrapper />
      {!hideOrb && <GlobalOrb />}

      {children}

      {/* Footer stays everywhere */}
      <PortfolioFooter />
    </>
  );
}
