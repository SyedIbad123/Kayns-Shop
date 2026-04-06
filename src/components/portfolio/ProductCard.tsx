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
  const compact = product.size === "small";
  const isLocalPortfolioImage = product.image.startsWith("/portfolio_Images/");

  const imageSizes =
    product.size === "large" || product.size === "wide"
      ? "(max-width: 767px) 100vw, (max-width: 1279px) 100vw, 34vw"
      : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 17vw";

  return (
    <Link
      href={`/portfolio/${product.slug}`}
      className="group relative isolate block h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_12px_35px_-16px_rgba(0,0,0,0.75)] transition-all duration-400 ease-out hover:scale-[1.03] hover:shadow-[0_22px_55px_-18px_rgba(0,0,0,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      aria-label={`View details for ${product.name}`}
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes={imageSizes}
        priority={priority}
        unoptimized={isLocalPortfolioImage}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

      <div
        className={`absolute inset-x-0 bottom-0 z-10 text-white ${
          compact ? "p-4" : "p-5 md:p-6"
        }`}
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-200">
          {product.category}
        </p>
        <h3
          className={`mt-2 font-semibold leading-tight ${
            compact ? "text-base" : "text-lg md:text-xl"
          }`}
        >
          {product.name}
        </h3>
        <p className={`mt-2 text-zinc-200 ${compact ? "text-xs" : "text-sm"}`}>
          {product.description}
        </p>
        <span
          className={`mt-3 inline-flex items-center gap-1 font-medium ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          View Details <span aria-hidden="true">-&gt;</span>
        </span>
      </div>
    </Link>
  );
}
