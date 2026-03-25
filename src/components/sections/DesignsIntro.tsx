"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function DesignsIntro() {
  return (
    <section className="bg-white py-16" aria-label="About our designs">
      <Container className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-wide text-[#0F2B4C] md:text-4xl"
        >
          Our Design Philosophy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-4 max-w-2xl text-gray-600"
        >
          We believe great design speaks for itself. Our team blends creativity
          and precision to deliver unique visual experiences that elevate brands
          and inspire audiences.
        </motion.p>
      </Container>
    </section>
  );
}
