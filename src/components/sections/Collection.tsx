"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { collectionSections } from "@/data/collection";
import ExpandCard from "@/components/sections/collection/ExpandCard";

type SectionKey = (typeof collectionSections)[number]["key"];

const DESKTOP_HEIGHT_BY_SECTION: Record<SectionKey, string> = {
  caps: "h-80",
  "t-shirts": "h-80",
  bottom: "h-80",
  jackets: "h-80",
};

const DESKTOP_ITEMS_PER_ROW = 5;

function chunkItems<T>(items: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
}

export default function Collection() {
  const [activeByRow, setActiveByRow] = useState<Record<string, number | null>>(
    {},
  );

  const handleRowHover = (rowKey: string, id: number | null) => {
    setActiveByRow((current) => ({
      ...current,
      [rowKey]: id,
    }));
  };

  return (
    <section className="bg-brand-red py-10" aria-label="KAYNS Collection">
      <Container>
        <SectionTitle title="KAYNS COLLECTION" light className="mb-10" />

        <div className="space-y-8 md:space-y-10">
          {collectionSections.map((section) => (
            <div key={section.key}>
              <h3 className="mb-4 text-center text-xl font-bold uppercase tracking-[0.2em] text-white md:text-left md:text-2xl">
                {section.title}
              </h3>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:hidden">
                {section.items.map((item) => (
                  <div key={item.id} className="flex min-w-0 flex-col">
                    <Link
                      href={`/collection/${item.id}`}
                      className="relative h-48 overflow-hidden rounded-2xl"
                    >
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <Image
                          src="/Product_Bg.svg"
                          alt=""
                          width={540}
                          height={540}
                          aria-hidden
                          className="h-135 w-135 max-w-none object-contain"
                        />
                      </div>

                      <div className="absolute inset-2 overflow-hidden rounded-xl">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </Link>

                    <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-white">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>

              <div className="hidden md:block">
                <div className="space-y-4">
                  {chunkItems(section.items, DESKTOP_ITEMS_PER_ROW).map(
                    (rowItems, rowIndex) => {
                      const rowKey = `${section.key}-row-${rowIndex}`;
                      const rowActiveId = activeByRow[rowKey] ?? null;
                      const placeholdersNeeded =
                        DESKTOP_ITEMS_PER_ROW - rowItems.length;

                      return (
                        <div key={rowKey} className="flex gap-4">
                          {rowItems.map((item) => (
                            <ExpandCard
                              key={item.id}
                              item={item}
                              baseFlex={1}
                              activeId={rowActiveId}
                              onHover={(id) => handleRowHover(rowKey, id)}
                              height={DESKTOP_HEIGHT_BY_SECTION[section.key]}
                            />
                          ))}

                          {Array.from({ length: placeholdersNeeded }).map(
                            (_, placeholderIndex) => (
                              <div
                                key={`${rowKey}-placeholder-${placeholderIndex}`}
                                aria-hidden
                                style={{
                                  flexGrow: rowActiveId !== null ? 0.9 : 1,
                                  flexShrink: 1,
                                  flexBasis: 0,
                                  minWidth: 0,
                                  transition:
                                    "flex-grow 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                                className="pointer-events-none select-none"
                              />
                            ),
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
