import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import CollectionsHero from "@/components/portfolio/CollectionsHero";
import ProductGrid from "@/components/portfolio/ProductGrid";
import { getPortfolioProducts } from "@/lib/portfolio-products.server";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Kayns Collections | XYZ Designs",
  description:
    "Explore our full Kayns portfolio of custom sportswear, mockups, and production samples.",
};

export default function PortfolioPage() {
  const products = getPortfolioProducts();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <CollectionsHero headingClassName={playfairDisplay.className} />
      <ProductGrid products={products} />
    </main>
  );
}
