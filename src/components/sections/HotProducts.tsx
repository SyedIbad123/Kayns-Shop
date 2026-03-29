"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { hotProducts } from "@/data/products";

export default function HotProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 2000);
    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  return (
    <section className="bg-brand-red py-12" aria-label="Hot products">
      <Container className="mx-0 max-w-none px-0">
        <div className="mb-8 text-center text-3xl font-bold text-white sm:text-4xl lg:mb-12 lg:text-5xl">
          <h1>Hot Products</h1>
        </div>

        <div className="flex flex-col gap-4 px-4 md:flex-row md:items-stretch md:gap-1">
          {/* Fixed left panel — heading & description */}
          <div className="flex w-full flex-col justify-center rounded-2xl bg-white/10 p-5 text-white md:w-72 md:shrink-0 md:p-6">
            <h2 className="text-xl font-bold uppercase leading-tight tracking-wide sm:text-2xl">
              XYZ
              <br />
              Hot
              <br />
              Products
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Explore our latest and most loved designs. Crafted with passion
              and quality that speaks for itself.
            </p>
          </div>

          {/* Slider */}
          <div
            className="min-w-0 flex-1 overflow-hidden"
            ref={emblaRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex gap-4 px-4">
              {hotProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative min-w-0 flex-[0_0_70%] overflow-hidden rounded-2xl sm:flex-[0_0_45%] lg:flex-[0_0_30%]"
                  style={{ height: "300px" }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/60 to-transparent px-4 py-3">
                    <h3 className="truncate text-sm font-semibold uppercase tracking-[0.12em] text-white sm:text-base">
                      {product.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
