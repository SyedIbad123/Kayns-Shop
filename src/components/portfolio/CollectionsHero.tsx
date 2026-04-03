"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CollectionsHeroProps {
  headingClassName: string;
}

export default function CollectionsHero({
  headingClassName,
}: CollectionsHeroProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute -right-10 top-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0%,_rgba(24,24,27,0.92)_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-16 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
        >
          &larr; Home
        </Link>

        <div className="mt-8 text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-zinc-400">
            Kayns Shop Editorial Selection
          </p>
          <h1
            className={`${headingClassName} mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl`}
          >
            Kayns Collections
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-zinc-300 sm:text-base lg:text-lg">
            Crafted with precision. Worn with pride.
          </p>
        </div>
      </div>
    </motion.header>
  );
}
