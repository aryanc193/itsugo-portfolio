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

  const hideOrb = pathname.startsWith("/blog") || isNotFound;

  return (
    <>
      {!hideOrb && <NavbarWrapper />}
      {!hideOrb && <GlobalOrb />}

      {children}

      {/* FOOTER IS NOW EVERYWHERE */}
      <PortfolioFooter />
    </>
  );
}
