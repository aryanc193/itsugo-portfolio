"use client";

export default function BlogSidebar({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: string[];
  activeCategory: string;
  onSelect: (c: string) => void;
}) {
  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:block col-span-3 border-r border-white/10 pr-6">
        <p className="text-sm text-white/60 mb-3 font-main">Categories</p>

        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`
                cursor-pointer capitalize transition-colors
                ${
                  activeCategory === cat
                    ? "text-accent"
                    : "text-white/70 hover:text-accent"
                }
              `}
              onClick={() => onSelect(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* MOBILE DROPDOWN */}
      <div className="md:hidden mb-4">
        <details className="bg-white/5 p-3 rounded-xl text-white/70 w-50">
          <summary className="cursor-pointer font-main text-sm">
            Categories
          </summary>

          <ul className="mt-2 space-y-1 text-sm">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer capitalize ${
                  activeCategory === cat ? "text-accent" : "hover:text-accent"
                }`}
                onClick={() => onSelect(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </>
  );
}
