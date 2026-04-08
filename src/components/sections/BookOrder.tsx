"use client";

import Image from "next/image";
import Link from "next/link";
import type { CollectionItem } from "@/data/collection";
import { getCapImageDimensions } from "@/lib/utils";

export default function BookOrder({ item }: { item: CollectionItem }) {
  const bookOrderHref =
    (item.products?.length ?? 0) > 1
      ? `/customize/${item.id}`
      : `/customize/single/${item.id}`;
  const capDimensions = getCapImageDimensions(item.image);

  return (
    <section
      className="bg-white px-6 py-12 text-[#143D59]"
      aria-label="Book Your Order"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-8 sm:flex-row sm:items-center">
        {/* Left — heading + input */}
        <div className="flex flex-1 flex-col gap-5">
          <h2 className="text-3xl font-extrabold text-[#143D59] sm:text-5xl lg:text-7xl">
            Book Your Order
          </h2>
          <Link
            href={bookOrderHref}
            className="site-btn inline-flex w-fit rounded-full px-5 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#143D59]/35 sm:text-sm"
            aria-label="Book your order"
          >
            Book Your Order
          </Link>
        </div>

        {/* Right — image */}
        <div className="relative h-36 w-full max-w-xs shrink-0 overflow-hidden sm:h-72 sm:w-72">
          {capDimensions ? (
            <div className="flex h-full w-full items-center justify-center p-2 sm:p-3">
              <Image
                src={item.image}
                alt={item.title}
                width={capDimensions.width}
                height={capDimensions.height}
                className="h-auto w-auto max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
