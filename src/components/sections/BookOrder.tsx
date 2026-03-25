"use client";

import { useState } from "react";
import Image from "next/image";
import type { CollectionItem } from "@/data/collection";

export default function BookOrder({ item }: { item: CollectionItem }) {
  const [name, setName] = useState("");

  return (
    <section
      className="bg-neutral-800 px-6 py-12 text-white"
      aria-label="Book Your Order"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-8 sm:flex-row sm:items-center">
        {/* Left — heading + input */}
        <div className="flex flex-1 flex-col gap-5">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Book Your Order
          </h2>
          <input
            type="text"
            placeholder="Your name or order details..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full bg-brand-red px-6 py-3 text-sm text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Order details"
          />
        </div>

        {/* Right — image */}
        <div className="relative h-36 w-full max-w-xs shrink-0 overflow-hidden rounded-2xl bg-gray-500 sm:h-44 sm:w-72">
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
