"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FilterBar from "@/components/portfolio/FilterBar";
import ProductCard from "@/components/portfolio/ProductCard";
import type { Product, ProductSize } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
}

const gridSpanBySize: Record<ProductSize, string> = {
  large: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-2 md:row-span-1",
  tall: "md:col-span-1 md:row-span-2",
  medium: "md:col-span-1 md:row-span-1",
  small: "md:col-span-1 md:row-span-1",
};

const minHeightBySize: Record<ProductSize, string> = {
  large: "min-h-[360px]",
  wide: "min-h-[250px]",
  tall: "min-h-[330px]",
  medium: "min-h-[250px]",
  small: "min-h-[220px]",
};

export default function ProductGrid({ products }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((item) => item.category))],
    [products],
  );

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((item) => item.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <section className="bg-zinc-950 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="grid grid-cols-1 auto-rows-[170px] gap-4 md:grid-cols-2 md:auto-rows-[185px] md:gap-5 xl:grid-cols-6 xl:auto-rows-[145px]">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className={`${gridSpanBySize[product.size]} ${minHeightBySize[product.size]} md:min-h-0`}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: 0.2 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProductCard
                  product={product}
                  priority={activeCategory === "All" && index < 4}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
