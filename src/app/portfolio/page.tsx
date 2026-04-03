import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import CollectionsHero from "@/components/portfolio/CollectionsHero";
import ProductGrid from "@/components/portfolio/ProductGrid";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Kayns Collections | XYZ Designs",
  description:
    "Explore 20 premium Kayns collection pieces in a bold editorial showcase.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <CollectionsHero headingClassName={playfairDisplay.className} />
      <ProductGrid />
    </main>
  );
}
