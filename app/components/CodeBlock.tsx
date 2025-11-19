"use client";

import { useState } from "react";

export function CodeBlock({ children }: { children: any }) {
  const code =
    typeof children === "string" ? children : children.props.children;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="relative group">
      <button
        onClick={copy}
        className="
          absolute top-2 right-3 px-2 py-1 text-xs
          bg-white/10 hover:bg-white/20
          rounded-md transition
          opacity-0 group-hover:opacity-100
          font-blog-body
        "
      >
        {copied ? "Copied" : "Copy"}
      </button>

      <pre
        className="
          my-6 p-4 rounded-xl overflow-x-auto
          bg-black/30 border border-white/10 shadow-lg
          font-blog-code text-sm leading-relaxed
        "
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
