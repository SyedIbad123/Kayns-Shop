import type { Metadata } from "next";
import CollectionsHero from "@/components/portfolio/CollectionsHero";
import ProductGrid from "@/components/portfolio/ProductGrid";
import { getPortfolioProducts } from "@/lib/portfolio-products.server";

export const metadata: Metadata = {
  title: "Kayns Collections | KAYNS",
  description:
    "Explore our full Kayns portfolio of custom sportswear, mockups, and production samples.",
};

export default function PortfolioPage() {
  const products = getPortfolioProducts();

  return (
    <main className="min-h-screen bg-white text-[#111827]">
      <CollectionsHero />
      <ProductGrid products={products} />
    </main>
  );
}
