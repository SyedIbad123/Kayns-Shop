"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";

const iconBoxes = [
  {
    icon: "https://img.freepik.com/free-photo/beautiful-lake-mountains_395237-44.jpg?semt=ais_rp_50_assets&w=740&q=80",
    label: "Layered Design",
  },
  {
    icon: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
    label: "Creative Art",
  },
  {
    icon: "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
    label: "Custom Craft",
  },
];

const slides = [
  {
    id: 1,
    alt: "Design showcase 1",
    src: "https://img.freepik.com/free-photo/beautiful-lake-mountains_395237-44.jpg?semt=ais_rp_50_assets&w=740&q=80",
  },
  {
    id: 2,
    alt: "Design showcase 2",
    src: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
  },
  {
    id: 3,
    alt: "Design showcase 3",
    src: "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
  },
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
    <section className="bg-dark-blue text-white" aria-label="Hero">
      {/* Marquee-style tagline */}
      <div className="overflow-hidden bg-brand-red py-2">
        <div className="marquee-track-right flex w-max items-center gap-10 pr-10">
          <p className="whitespace-nowrap text-md font-bold uppercase tracking-[0.35em]">
            KAYNS HERE WE DESIGN YOUR IMAGINATION
          </p>
          <p className="whitespace-nowrap text-md font-bold uppercase tracking-[0.35em]">
            KAYNS HERE WE DESIGN YOUR IMAGINATION
          </p>
        </div>
      </div>

      <Container className="pb-8 px-0">
        {/* Slider */}
        <div className="relative max-w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide) => (
                <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                  <div className="relative aspect-video">
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

        {/* Heading & text */}
        <div className="mt-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-wide md:text-5xl"
          >
            XYZ&ensp;DESIGNS
          </motion.h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-300">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s.
          </p>
          <div className="mt-6">
            <Button variant="primary" size="md">
              Read More &darr;
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
