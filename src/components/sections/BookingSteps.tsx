"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

const steps = [
  {
    id: 1,
    label: "Select Product and Customize",
  },
  {
    id: 2,
    label: "Submit Request",
  },
  {
    id: 3,
    label: "Finalize Payment",
  },
  {
    id: 4,
    label: "Delivery",
  },
];

export default function BookingSteps() {
  return (
    <section className="bg-dark-blue py-16" aria-label="Steps to book">
      <Container className="text-center">
        <SectionTitle
          title="4 STEPS TO COMPLETE ORDER"
          light
          className="mb-10"
        />

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="flex items-center gap-4 sm:gap-8"
            >
              {/* Step badge + label */}
              <div className="flex w-40 flex-col items-center gap-2 sm:w-44">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-lg font-bold text-white sm:h-18 sm:w-18 sm:text-xl">
                  {step.id}
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/90 sm:text-sm">
                  {step.label}
                </p>
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
