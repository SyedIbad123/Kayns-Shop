"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
    <section className="bg-[#f3f6fc] py-16" aria-label="Steps to book">
      <Container className="text-center">
        <SectionTitle
          title="4 STEPS TO COMPLETE ORDER"
          light
          className="mb-10"
        />

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-5 gap-y-10 lg:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#143d59] text-lg font-bold text-[#143d59] sm:h-16 sm:w-16 sm:text-xl">
                {step.id}
              </div>
              <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.07em] text-[#143d59] sm:text-sm">
                {step.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto hidden max-w-6xl grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3 lg:grid">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="contents"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-18 w-18 items-center justify-center rounded-full border-2 border-[#143d59] text-xl font-bold text-[#143d59]">
                  {step.id}
                </div>
                <p className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.08em] text-[#143d59]">
                  {step.label}
                </p>
              </div>

              {i < steps.length - 1 ? (
                <Image
                  src="/right-arrow.png"
                  alt=""
                  aria-hidden
                  width={64}
                  height={40}
                  className="h-10 w-16 object-contain"
                />
              ) : null}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
