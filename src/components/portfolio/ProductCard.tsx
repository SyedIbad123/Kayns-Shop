"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const imageSizes =
    "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw";

  return (
    <Link
      href={`/portfolio/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_12px_28px_-18px_rgba(15,43,76,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#143D59]/35 hover:shadow-[0_20px_36px_-20px_rgba(20,61,89,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D59]/60"
      aria-label={`View details for ${product.name}`}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-[#F3F6FC]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={imageSizes}
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col border-t border-[#143D59]/15 px-4 py-4 sm:px-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#143D59] sm:text-[11px]">
          {product.category}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-tight text-[#143D59] sm:text-xl">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-[#6B7280]">
          {product.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#143D59] transition-colors group-hover:text-[#143D59]">
          View Details <span aria-hidden="true">-&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
