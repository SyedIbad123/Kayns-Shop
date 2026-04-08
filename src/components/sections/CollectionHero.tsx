"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CollectionItem } from "@/data/collection";

export default function CollectionHero({ item }: { item: CollectionItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const heroImage = "/Hero_Image_01.png";

  return (
    <>
      {/* Banner image */}
      <div className="relative h-64 w-full sm:h-125 flex justify-center items-center ">
        <Image
          src={heroImage}
          alt={item.title}
          width={700}
          height={700}
          className="object-contain"
          priority
        />
      </div>

      {/* Title + description bar */}
      <div className="bg-white text-center px-6 py-8 text-white">
        <h1 className="text-3xl text-[#143d59] font-extrabold uppercase tracking-widest sm:text-5xl lg:text-7xl">
          KAYNS
        </h1>
        <p
          className="mx-auto mt-3 max-w-5xl text-center text-base leading-relaxed text-[#143d59] sm:text-lg"
          style={
            isExpanded
              ? undefined
              : {
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
          }
        >
          {item.description ??
            "Where sport meets street and quality never compromises."}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#143D59] px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#143D59]/90 focus:outline-none focus:ring-2 focus:ring-[#143D59]/35 focus:ring-offset-2"
          >
            {isExpanded ? "View Less \u2191" : "Read More \u2193"}
          </button>
          <Link
            href={`/customize/${item.id}`}
            className="site-btn inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#143D59]/35 focus:ring-offset-2"
          >
            Customize
          </Link>
        </div>
      </div>
    </>
  );
}
