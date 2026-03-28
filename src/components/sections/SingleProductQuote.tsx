"use client";

import { useState } from "react";
import Image from "next/image";
import type { CollectionItem } from "@/data/collection";

const filterButtons = ["Size chart", "Available color", "Logo Location"];
const filterImages: Record<string, string> = {
  "Size chart":
    "https://img.freepik.com/free-photo/beautiful-lake-mountains_395237-44.jpg?semt=ais_rp_50_assets&w=740&q=80",
  "Available color":
    "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
  "Logo Location":
    "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
};

export default function SingleProductQuote({ item }: { item: CollectionItem }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <section
      className="bg-neutral-900 px-6 py-12 text-white"
      aria-label="Get a Quote"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-8 sm:flex-row sm:items-center">
        {/* Left — heading, filters, input */}
        <div className="flex flex-1 flex-col gap-4">
          <h2 className="text-3xl font-extrabold uppercase tracking-widest">
            Get a Quote
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFilter(label)}
                className="rounded-full border border-white/30 px-4 py-1 text-xs font-medium text-white transition hover:bg-white/10"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Quote action */}
          <button
            type="button"
            className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 outline-none transition hover:bg-gray-100 focus:ring-2 focus:ring-brand-red"
            aria-label="Quote details"
          >
            Quote Details
          </button>
        </div>

        {/* Right — image */}
        <div className="relative h-40 w-full max-w-xs shrink-0 overflow-hidden rounded-2xl bg-gray-600 sm:h-44 sm:w-64">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {activeFilter ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
          onClick={() => setActiveFilter(null)}
          role="presentation"
        >
          <div
            className="relative h-[70vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeFilter} preview`}
          >
            <Image
              src={filterImages[activeFilter] ?? item.image}
              alt={`${activeFilter} preview`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white transition hover:bg-black/80"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
