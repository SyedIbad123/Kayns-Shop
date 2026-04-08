"use client";

import { motion } from "framer-motion";

export default function CollectionsHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate overflow-hidden border-b border-[#143D59]/20 bg-white"
    >
      <div className="pointer-events-none absolute -left-20 top-8 h-56 w-56 rounded-full bg-[#143D59]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-16 h-56 w-56 rounded-full bg-[#143D59]/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-[#F3F6FC] to-white" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <h1 className="text-5xl font-extrabold uppercase tracking-[0.14em] text-[#143D59] sm:text-6xl lg:text-8xl">
          Portfolio
        </h1>
      </div>
    </motion.section>
  );
}
