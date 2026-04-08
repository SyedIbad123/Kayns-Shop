"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { portfolioItems } from "@/data/portfolio";
import { getCapImageDimensions } from "@/lib/utils";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
};

export default function Portfolio() {
  const renderPortfolioImage = (index: number) => {
    const portfolioItem = portfolioItems[index];
    const capDimensions = getCapImageDimensions(portfolioItem.image);

    if (capDimensions) {
      return (
        <div className="flex h-full w-full items-center justify-center p-3">
          <Image
            src={portfolioItem.image}
            alt={portfolioItem.title}
            width={capDimensions.width}
            height={capDimensions.height}
            className="h-auto w-auto max-h-full max-w-full object-contain"
          />
        </div>
      );
    }

    return (
      <Image
        src={portfolioItem.image}
        alt={portfolioItem.title}
        fill
        className="object-cover"
      />
    );
  };

  return (
    <section
      id="portfolio"
      className="bg-[#F3F6FC] py-16"
      aria-label="Portfolio"
    >
      <Container>
        <SectionTitle title="KAYNS PORTFOLIO" className="mb-10 text-center" />

        {/* Portfolio grid — 1 col mobile, 2 col tablet, 3 col desktop with explicit placement */}
        <div className="grid grid-cols-1 gap-4 auto-rows-[200px] sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-auto lg:grid-rows-[200px_220px_200px]">
          {/* Item 1 — col 1, row 1 */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
            className="relative overflow-hidden rounded-2xl bg-[#143D59] p-6 lg:col-start-1 lg:row-start-1"
          >
            <div className="flex h-full flex-col justify-center  items-center text-white">
              {" "}
              <p className="text-xs uppercase tracking-[0.18em] opacity-85">
                {/* {portfolioItems[0].category} */}
              </p>
              <h3 className="mt-2 text-4xl font-semibold leading-tight">
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
            {renderPortfolioImage(1)}
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
            {renderPortfolioImage(2)}
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
            {renderPortfolioImage(3)}
          </motion.div>

          {/* Item 5 — col 2, row 2 */}
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
            className="relative overflow-hidden rounded-2xl bg-[#143D59] p-6 lg:col-start-2 lg:row-start-2"
          >
            <div className="flex h-full flex-col justify-center  items-center text-white">
              {" "}
              {/* <p className="text-xs uppercase tracking-[0.18em] opacity-85">
                {portfolioItems[4].category}
              </p> */}
              <h3 className="mt-2 text-4xl font-semibold leading-tight">
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
            {renderPortfolioImage(5)}
          </motion.div>

          {/* Item 7 — col 3, row 3 */}
          <motion.div
            custom={6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariant}
            className="relative overflow-hidden rounded-2xl bg-[#143D59] p-6 lg:col-start-3 lg:row-start-3"
          >
            <div className="flex h-full flex-col justify-center  items-center text-white">
              {/* <p className="text-xs uppercase tracking-[0.18em] opacity-85">
                {portfolioItems[6].category}
              </p> */}
              <h3 className="mt-2 text-4xl font-semibold leading-tight">
                {portfolioItems[6].title}
              </h3>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/portfolio"
            className="site-btn inline-flex items-center justify-center rounded-full px-8 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#143D59]/30"
          >
            View All Products
          </Link>
        </div>
      </Container>
    </section>
  );
}
