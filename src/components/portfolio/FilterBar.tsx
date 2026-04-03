"use client";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function FilterBar({
  categories,
  activeCategory,
  onChange,
}: FilterBarProps) {
  return (
    <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2 md:mb-10 md:justify-center">
      {categories.map((category) => {
        const active = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-all sm:text-sm ${
              active
                ? "border-white bg-white text-zinc-950 shadow-[0_8px_20px_-12px_rgba(255,255,255,0.8)]"
                : "border-white/20 bg-zinc-900/80 text-zinc-300 hover:border-white/40 hover:text-white"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
