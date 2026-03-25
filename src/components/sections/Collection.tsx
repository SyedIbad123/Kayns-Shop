"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  collectionRow1,
  collectionRow2,
  CollectionItem,
} from "@/data/collection";

function ExpandCard({
  item,
  baseFlex,
  activeId,
  onHover,
  height,
}: {
  item: CollectionItem;
  baseFlex: number;
  activeId: number | null;
  onHover: (id: number | null) => void;
  height: string;
}) {
  const isActive = activeId === item.id;
  const someActive = activeId !== null;
  const flexGrow = isActive
    ? baseFlex * 2
    : someActive
      ? baseFlex * 0.75
      : baseFlex;

  return (
    <Link
      href={`/collection/${item.id}`}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        flexGrow,
        flexShrink: 1,
        flexBasis: 0,
        minWidth: 0,
        transition: "flex-grow 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className={`relative overflow-hidden rounded-2xl bg-rose-50 cursor-pointer ${height}`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-500"
      />
    </Link>
  );
}

export default function Collection() {
  const [activeRow1, setActiveRow1] = useState<number | null>(null);
  const [activeRow2, setActiveRow2] = useState<number | null>(null);

  const allItems = [...collectionRow1, ...collectionRow2];

  return (
    <section className="bg-brand-red py-10" aria-label="XYZ Collection">
      <Container>
        <SectionTitle title="XYZ  COLLECTION" light className="mb-10" />

        {/* Mobile grid — 2 columns, shown below md */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {allItems.map((item) => (
            <Link
              key={item.id}
              href={`/collection/${item.id}`}
              className="relative h-40 overflow-hidden rounded-2xl bg-rose-50"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </Link>
          ))}
        </div>

        {/* Desktop accordion rows — shown at md+ */}
        {/* Row 1: 1 large + 3 portrait */}
        <div className="hidden gap-4 md:flex">
          {collectionRow1.map((item, i) => (
            <ExpandCard
              key={item.id}
              item={item}
              baseFlex={i === 0 ? 2 : 1}
              activeId={activeRow1}
              onHover={setActiveRow1}
              height="h-56"
            />
          ))}
        </div>

        {/* Row 2: 5 equal */}
        <div className="mt-4 hidden gap-4 md:flex">
          {collectionRow2.map((item) => (
            <ExpandCard
              key={item.id}
              item={item}
              baseFlex={1}
              activeId={activeRow2}
              onHover={setActiveRow2}
              height="h-48"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
