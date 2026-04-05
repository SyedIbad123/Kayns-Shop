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

  const isLocalPortfolioImage = product.image.startsWith("/portfolio_Images/");

  return (
    <main className="min-h-screen bg-zinc-950 px-4 pb-20 pt-14 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm text-zinc-300 transition-colors hover:text-white"
        >
          &larr; Back to Collections
        </Link>

        <div className="mt-8 grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 p-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)] md:grid-cols-2 md:p-6">
          <div className="relative min-h-80 overflow-hidden rounded-2xl md:min-h-125">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              unoptimized={isLocalPortfolioImage}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-zinc-300">{product.description}</p>
            <p className="mt-6 text-sm text-zinc-400">
              Detailed product pages are coming soon. This route is now ready
              for your future collection detail content.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
