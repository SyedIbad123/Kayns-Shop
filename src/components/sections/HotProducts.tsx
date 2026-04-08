"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { hotProducts } from "@/data/products";
import { getCapImageDimensions } from "@/lib/utils";

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
    <section className="bg-[#143D59] pb-20 pt-12" aria-label="Hot products">
      <Container className="mx-0 max-w-none px-0">
        <div className="mb-8 text-center text-3xl font-bold text-white sm:text-4xl lg:mb-12 lg:text-7xl">
          <h1>Hot Products</h1>
        </div>

        <div className="flex flex-col gap-4 px-4 md:flex-row md:items-stretch md:gap-1">
          {/* Fixed left panel — heading & description */}
          <div className="flex w-full flex-col justify-center rounded-2xl bg-white/10 p-5 text-white md:w-72 md:shrink-0 md:p-6">
            <h2 className="text-xl font-bold uppercase leading-tight tracking-wide sm:text-2xl">
              KAYNS
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
              {hotProducts.map((product) => {
                const capDimensions = getCapImageDimensions(product.image);

                return (
                  <Link
                    key={product.id}
                    href={`/collection/${product.collectionId}`}
                    className="group relative min-w-0 flex-[0_0_70%] overflow-hidden rounded-3xl border border-white/45 bg-white/12 shadow-[0_16px_30px_-18px_rgba(0,0,0,0.9)] sm:flex-[0_0_45%] lg:flex-[0_0_30%]"
                    style={{ height: "370px" }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {capDimensions ? (
                      <div className="flex h-full w-full items-center justify-center p-4">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={capDimensions.width}
                          height={capDimensions.height}
                          className="h-auto w-auto max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/30" />

                    <div className="absolute inset-x-0 bottom-0  px-4 py-4">
                      <h3 className="truncate text-sm text-center font-semibold uppercase tracking-[0.12em] text-white sm:text-base">
                        {product.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Previous hot product"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Next hot product"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
