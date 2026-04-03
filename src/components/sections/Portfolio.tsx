"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { portfolioItems } from "@/data/portfolio";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
};

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="bg-dark-blue py-16"
      aria-label="Portfolio"
    >
      <Container>
        <SectionTitle
          title="XYZ PORTFOLIO"
          light
          className="mb-10 text-center"
        />

        {/* Portfolio grid — 1 col mobile, 2 col tablet, 3 col desktop with explicit placement */}
        <div className="grid grid-cols-1 gap-4 auto-rows-[200px] sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-auto lg:grid-rows-[200px_220px_200px]">
          {/* Item 1 — col 1, row 1 */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
            className="relative overflow-hidden rounded-2xl bg-[#0B3A75] p-6 lg:col-start-1 lg:row-start-1"
          >
            <div className="flex h-full flex-col justify-end text-white">
              <p className="text-xs uppercase tracking-[0.18em] opacity-85">
                {portfolioItems[0].category}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-tight">
                {portfolioItems[0].title}
              </h3>
            </div>
          </motion.div>

          {/* Item 2 — col 2, row 1 */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
            className="relative overflow-hidden rounded-2xl lg:col-start-2 lg:row-start-1"
          >
            <Image
              src={portfolioItems[1].image}
              alt={portfolioItems[1].title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Item 3 — col 3, rows 1–2 (tall right) */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
            className="relative overflow-hidden rounded-2xl sm:row-span-2 lg:col-start-3 lg:row-start-1 lg:row-span-2"
          >
            <Image
              src={portfolioItems[2].image}
              alt={portfolioItems[2].title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Item 4 — col 1, rows 2–3 (tall left) */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
            className="relative overflow-hidden rounded-2xl sm:row-span-2 lg:col-start-1 lg:row-start-2 lg:row-span-2"
          >
            <Image
              src={portfolioItems[3].image}
              alt={portfolioItems[3].title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Item 5 — col 2, row 2 */}
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
            className="relative overflow-hidden rounded-2xl bg-[#0E5A4B] p-6 lg:col-start-2 lg:row-start-2"
          >
            <div className="flex h-full flex-col justify-end text-white">
              <p className="text-xs uppercase tracking-[0.18em] opacity-85">
                {portfolioItems[4].category}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-tight">
                {portfolioItems[4].title}
              </h3>
            </div>
          </motion.div>

          {/* Item 6 — col 2, row 3 */}
          <motion.div
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
            className="relative overflow-hidden rounded-2xl lg:col-start-2 lg:row-start-3"
          >
            <Image
              src={portfolioItems[5].image}
              alt={portfolioItems[5].title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Item 7 — col 3, row 3 */}
          <motion.div
            custom={6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
            className="relative overflow-hidden rounded-2xl bg-[#7C2D12] p-6 lg:col-start-3 lg:row-start-3"
          >
            <div className="flex h-full flex-col justify-end text-white">
              <p className="text-xs uppercase tracking-[0.18em] opacity-85">
                {portfolioItems[6].category}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-tight">
                {portfolioItems[6].title}
              </h3>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-dark-blue transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            View All Products
          </Link>
        </div>
      </Container>
    </section>
  );
}
