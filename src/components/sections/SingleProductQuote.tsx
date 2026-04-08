"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CollectionItem } from "@/data/collection";

const filterButtons = ["Size chart", "Available color", "Logo Location"];

const SHIRTS_AND_JACKETS_SIZE_CHART = "/shirts_and_jacket_size_chart.png";
const SHORTS_SIZE_CHART = "/shorts_size_chart.png";

const SIZE_CHART_BY_PRODUCT_TYPE: Partial<
  Record<NonNullable<CollectionItem["productType"]>, string>
> = {
  "t-shirt": SHIRTS_AND_JACKETS_SIZE_CHART,
  "polo-shirt": SHIRTS_AND_JACKETS_SIZE_CHART,
  trousers: SHORTS_SIZE_CHART,
  "basketball-shorts": SHORTS_SIZE_CHART,
  "football-shorts": SHORTS_SIZE_CHART,
  "rugby-shorts": SHORTS_SIZE_CHART,
  "netball-shorts": SHORTS_SIZE_CHART,
  "hooded-sweatshirt": SHIRTS_AND_JACKETS_SIZE_CHART,
  "puffer-jacket": SHIRTS_AND_JACKETS_SIZE_CHART,
  "track-jacket": SHIRTS_AND_JACKETS_SIZE_CHART,
  "reversible-jacket": SHIRTS_AND_JACKETS_SIZE_CHART,
};

const LOGO_LOCATION_BY_PRODUCT_TYPE: Partial<
  Record<NonNullable<CollectionItem["productType"]>, string>
> = {
  "t-shirt": "/shirt_logo_position.png",
  "polo-shirt": "/shirt_logo_position.png",
  trousers: "/shorts_logo_position.png",
  "basketball-shorts": "/shorts_logo_position.png",
  "football-shorts": "/shorts_logo_position.png",
  "rugby-shorts": "/shorts_logo_position.png",
  "netball-shorts": "/shorts_logo_position.png",
  "hooded-sweatshirt": "/sweatshirt_logo_position.png",
  "puffer-jacket": "/puffer_logo_position.png",
  "track-jacket": "/ziptop_logo_position.png",
};

function resolveLogoLocationImage(item: CollectionItem): string {
  const title = item.title.toLowerCase();

  // Title checks first for product types that share the same backend key.
  if (title.includes("zip")) return "/ziptop_logo_position.png";
  if (title.includes("sleeveless")) return "/sleevless_logo_position.png";
  if (title.includes("puffer")) return "/puffer_logo_position.png";
  if (title.includes("hoodie") || title.includes("sweatshirt")) {
    return "/sweatshirt_logo_position.png";
  }
  if (title.includes("singlet") || title.includes("jumper")) {
    return "/singlet_logo_position.png";
  }
  if (title.includes("short") || title.includes("trouser")) {
    return "/shorts_logo_position.png";
  }
  if (
    title.includes("shirt") ||
    title.includes("tee") ||
    title.includes("jersey") ||
    title.includes("polo")
  ) {
    return "/shirt_logo_position.png";
  }

  const mappedByType = item.productType
    ? LOGO_LOCATION_BY_PRODUCT_TYPE[item.productType]
    : undefined;

  // Last resort: related default image so modal never shows unrelated placeholders.
  return mappedByType ?? "/shirt_logo_position.png";
}

function resolveSizeChartImage(item: CollectionItem): string {
  const title = item.title.toLowerCase();

  if (title.includes("short") || title.includes("trouser")) {
    return SHORTS_SIZE_CHART;
  }

  if (
    title.includes("shirt") ||
    title.includes("tee") ||
    title.includes("jersey") ||
    title.includes("polo") ||
    title.includes("hoodie") ||
    title.includes("sweatshirt") ||
    title.includes("puffer") ||
    title.includes("jacket") ||
    title.includes("zip") ||
    title.includes("singlet") ||
    title.includes("jumper")
  ) {
    return SHIRTS_AND_JACKETS_SIZE_CHART;
  }

  const mappedByType = item.productType
    ? SIZE_CHART_BY_PRODUCT_TYPE[item.productType]
    : undefined;

  // Default to the broader tops/jackets chart when uncertain.
  return mappedByType ?? SHIRTS_AND_JACKETS_SIZE_CHART;
}

function resolveFilterImage(filterLabel: string, item: CollectionItem): string {
  if (filterLabel === "Size chart") {
    return resolveSizeChartImage(item);
  }

  if (filterLabel === "Logo Location") {
    return resolveLogoLocationImage(item);
  }

  // Size chart and Available color assets can vary per product; fallback to product image.
  return item.image;
}

export default function SingleProductQuote({ item }: { item: CollectionItem }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <section
      className="bg-[#f3f6fc] px-6 py-12 text-[#143d59]"
      aria-label="Get a Quote"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-8 sm:flex-row sm:items-center">
        {/* Left — heading, filters, input */}
        <div className="flex flex-1 flex-col gap-4">
          <h2 className="text-3xl font-extrabold uppercase tracking-widest sm:text-5xl lg:text-7xl">
            Get a Quote
          </h2>
          <p className="text-sm leading-relaxed text-[#143d59]">
            Send your customization brief and our team will provide pricing,
            production details, and delivery timelines for your product.
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
          <Link
            href={`/customize/single/${item.id}`}
            className="site-btn inline-flex w-fit rounded-full px-4 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#143D59] sm:text-sm"
            aria-label="Quote details"
          >
            Quote Details
          </Link>
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
              src={resolveFilterImage(activeFilter, item)}
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
