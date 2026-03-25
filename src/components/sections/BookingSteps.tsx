"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

const steps = [1, 2, 3, 4];

export default function BookingSteps() {
  return (
    <section className="bg-dark-blue py-16" aria-label="Steps to book">
      <Container className="text-center">
        <SectionTitle title="STEPS TO BOOK" light className="mb-10" />

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="flex items-center gap-4 sm:gap-8"
            >
              {/* Circle badge */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-lg font-bold text-white sm:h-18 sm:w-18 sm:text-xl">
                {step}
              </div>

              {/* Arrow (not after last) */}
              {i < steps.length - 1 && (
                <ArrowRight size={24} className="text-white sm:w-9" />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
