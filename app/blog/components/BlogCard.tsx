"use client";

export default function BlogCard({
  title,
  description,
  date,
  href,
  cover,
}: {
  title: string;
  description: string;
  date: string;
  href: string;
  cover?: string | null;
}) {
  const placeholder = "/edward.jpg";

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      className="
        group flex gap-4 p-3 rounded-xl w-full
        bg-white/5 border border-accent/20
        hover:border-accent hover:shadow-[0_0_15px_var(--color-accent)]
        transition-all
      "
    >
      {/* THUMBNAIL */}
      <div className="relative w-24 h-24 rounded-md overflow-hidden shrink-0 bg-black/20">
        <img
          src={cover || placeholder}
          alt={title}
          className="
            w-full h-full object-cover opacity-40
            group-hover:opacity-90 transition-opacity duration-300
          "
        />
      </div>

      {/* TEXT CONTENT */}
      <div className="flex flex-col flex-1 min-w-0">
        <h4 className="font-semibold text-lg line-clamp-1">{title}</h4>
        <p className="text-muted text-sm line-clamp-2 mt-0.5">
          {description}
        </p>
        <span className="text-xs text-subtle mt-auto">{date}</span>
      </div>
    </a>
  );
}
