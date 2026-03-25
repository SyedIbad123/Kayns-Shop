"use client";

import { useState } from "react";
import Image from "next/image";
import type { CollectionItem } from "@/data/collection";

const filterButtons = ["Size chart", "Available color", "Logo Location"];

export default function SingleProductQuote({ item }: { item: CollectionItem }) {
  const [input, setInput] = useState("");

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
                className="rounded-full border border-white/30 px-4 py-1 text-xs font-medium text-white transition hover:bg-white/10"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Your name or details..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-red"
            aria-label="Quote details"
          />
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
    </section>
  );
}
