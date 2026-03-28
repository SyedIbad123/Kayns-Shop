"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "../ui/Button";

export default function DesignsIntro() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-white py-16" aria-label="About our designs">
      <Container className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-wide text-dark-blue md:text-4xl"
        >
          Our Design Philosophy
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
          We believe great design speaks for itself. Our team blends creativity
          and precision to deliver unique visual experiences that elevate brands
          and inspire audiences.
        </motion.p>

        <div className="mt-16 text-center">
          <div className="mt-6">
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
