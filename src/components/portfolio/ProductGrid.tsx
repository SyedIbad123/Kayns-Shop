"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FilterBar from "@/components/portfolio/FilterBar";
import ProductCard from "@/components/portfolio/ProductCard";
import type { Product } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
}

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
    <section className="bg-white px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="h-full"
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.28,
                  delay: 0.06 + index * 0.025,
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
