"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "../ui/Button";

export default function DesignsIntro() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="about"
      className="bg-[#f3f6fc] py-16"
      aria-label="About our designs"
    >
      <Container className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-wide text-[#143D59] md:text-4xl"
        >
          Where Sport Meets Street And Quality Never Compromises
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-4 max-w-2xl text-gray-600"
          style={
            isExpanded
              ? undefined
              : {
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
          }
        >
          KAYNS is where performance meets street culture and every piece is
          built with purpose. From cricket pitches to basketball courts, from
          intense training sessions to casual everyday life — we craft premium
          sport and streetwear that moves with you, fits like it was made for
          you, and looks sharp in every setting. Quality stitched into every
          seam, style woven into every thread, confidence worn every single day.
        </motion.p>

        <div className="mt-8 text-center">
          <div className="mt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "View Less \u2191" : "Read More \u2193"}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
