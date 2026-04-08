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
    <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mb-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {categories.map((category) => {
        const active = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`w-full rounded-full border px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] transition-all sm:text-xs md:text-sm ${
              active
                ? "border-[#143D59] bg-[#143D59] text-white shadow-[0_10px_20px_-12px_rgba(20,61,89,0.55)]"
                : "border-[#143D59]/20 bg-white text-[#143D59] hover:border-[#143D59]/50 hover:text-[#143D59]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
