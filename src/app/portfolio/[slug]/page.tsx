import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPortfolioProductBySlug,
  getPortfolioProducts,
} from "@/lib/portfolio-products.server";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPortfolioProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getPortfolioProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | Kayns Collections" };
  }

  return {
    title: `${product.name} | Kayns Collections`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getPortfolioProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main
      className="min-h-screen bg-white px-4 pb-20 pt-14 sm:px-6 lg:px-8"
      style={{ color: "#111827" }}
    >
      <div className="mx-auto max-w-5xl">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm font-medium text-[#143D59] transition-colors hover:text-[#143D59]"
        >
          &larr; Back to Collections
        </Link>

        <div className="mt-8 grid gap-8 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-[0_20px_42px_-28px_rgba(15,43,76,0.35)] md:grid-cols-2 md:p-6">
          <div className="relative min-h-80 overflow-hidden rounded-2xl md:min-h-125">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#143D59]">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#143D59] md:text-5xl lg:text-7xl">
              {product.name}
            </h1>
            <p className="mt-4 text-[#6B7280]">{product.description}</p>
            <p className="mt-6 text-sm text-[#6B7280]">
              Detailed product pages are coming soon. This route is now ready
              for your future collection detail content.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
