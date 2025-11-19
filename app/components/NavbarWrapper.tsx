"use client";

import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hide = pathname.startsWith("/blog");

  if (hide) return null;

  return <Navbar />;
}
