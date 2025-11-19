"use client";

import { FileText } from "lucide-react"; // ← free icon library included in Shadcn stack

export default function FileRow({
  title,
  date,
  href,
}: {
  title: string;
  date: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="
        group grid grid-cols-12 items-center
        px-4 py-3 rounded-lg
        bg-white/0 hover:bg-white/5
        transition
        border border-transparent hover:border-white/10
      "
    >
      {/* ICON */}
      <div className="col-span-1 text-white/60 group-hover:text-accent">
        <FileText size={18} />
      </div>

      {/* TITLE */}
      <div className="col-span-8 text-white/90 truncate group-hover:text-accent">
        {title}
      </div>

      {/* DATE */}
      <div className="col-span-3 text-white/60 text-sm text-right">
        {date}
      </div>
    </a>
  );
}
