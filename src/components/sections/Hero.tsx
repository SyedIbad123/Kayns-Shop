"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Image from "next/image";

const iconBoxes = [
  {
    icon: "/Hero_Image_01.png",
    label: "Layered Design",
  },
  {
    icon: "/Hero_Image_02.png",
    label: "Creative Art",
  },
  {
    icon: "/Hero_Image_03.png",
    label: "Custom Craft",
  },
];

const slides = [
  {
    id: 1,
    alt: "Design showcase 1",
    src: "/Hero_Image_01.png",
  },
  {
    id: 2,
    alt: "Design showcase 2",
    src: "/Hero_Image_02.png",
  },
  {
    id: 3,
    alt: "Design showcase 3",
    src: "/Hero_Image_03.png",
  },
];

const marqueeItems = [
  "WHERE SPORT MEETS STREET AND QUALITY NEVER COMPROMISES",
  "WHERE SPORT MEETS STREET AND QUALITY NEVER COMPROMISES",
  "WHERE SPORT MEETS STREET AND QUALITY NEVER COMPROMISES",
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <section className="bg-[#143D59] text-white" aria-label="Hero">
      {/* Marquee-style tagline */}
      <div className="overflow-hidden bg-[#143D59] py-2">
        <div className="marquee-track-right flex w-max items-center">
          {[0, 1].map((set) => (
            <div
              key={set}
              className="marquee-content flex items-center gap-10 pr-10"
              aria-hidden={set === 1}
            >
              {marqueeItems.map((item) => (
                <p
                  key={`${set}-${item}`}
                  className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.28em] sm:text-base"
                >
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Container className="pb-8 px-0 max-w-full">
        {/* Slider */}
        <div className="relative max-w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide) => (
                <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                  <div className="relative aspect-3/2">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 transition hover:bg-black/60"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 transition hover:bg-black/60"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          {/* <div className="mt-4 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === selectedIndex ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div> */}
        </div>

        {/* Icon boxes */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-6">
          {iconBoxes.map((box) => (
            <motion.div
              key={box.label}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollTo(iconBoxes.indexOf(box))}
              className="flex h-14 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-lg sm:h-18 sm:w-36 md:w-40"
              aria-label={box.label}
            >
              <Image
                src={box.icon}
                alt="hero images"
                width={160}
                height={72}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
