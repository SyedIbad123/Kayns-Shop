import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Product, ProductSize } from "@/lib/products";

const PORTFOLIO_ROOT = path.join(process.cwd(), "public", "portfolio_Images");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const CATEGORY_CONFIG = [
  { folder: "basketball", label: "Basketball" },
  { folder: "basketball_shorts", label: "Basketball Shorts" },
  { folder: "cricket_t_shirts", label: "Cricket T-Shirts" },
  { folder: "football_Scarf", label: "Football Scarves" },
  { folder: "hooded_sweatshirt", label: "Hooded Sweatshirts" },
  { folder: "netball_dress", label: "Netball Dresses" },
  { folder: "polo", label: "Polo Shirts" },
  { folder: "puffer_jacket", label: "Puffer Jackets" },
  { folder: "rugby_shirts", label: "Rugby Shirts" },
  { folder: "rugby_shorts", label: "Rugby Shorts" },
  { folder: "skirts_and_bummers", label: "Skirts and Bummers" },
  { folder: "soccer_shorts", label: "Soccer Shorts" },
  { folder: "t_shirts", label: "T-Shirts" },
  { folder: "track_jacket", label: "Track Jackets" },
  { folder: "trousers", label: "Trousers" },
  { folder: "ziptop", label: "Zip Tops" },
] as const;

const SIZE_PATTERN: ProductSize[] = [
  "large",
  "medium",
  "wide",
  "tall",
  "small",
  "medium",
  "wide",
  "small",
  "tall",
  "medium",
];

function isImageFile(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();
  return IMAGE_EXTENSIONS.has(extension);
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => {
      if (/^\d+$/.test(part)) {
        return part;
      }

      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(" ");
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "portfolio-item";
}

function createUniqueSlug(baseSlug: string, usageCounter: Map<string, number>) {
  const seen = usageCounter.get(baseSlug) ?? 0;
  usageCounter.set(baseSlug, seen + 1);

  if (seen === 0) {
    return baseSlug;
  }

  return `${baseSlug}-${seen + 1}`;
}

function toPublicImagePath(folder: string, fileName: string) {
  const encodedFolder = encodeURIComponent(folder);
  const encodedFileName = encodeURIComponent(fileName);
  return `/portfolio_Images/${encodedFolder}/${encodedFileName}`;
}

function makeDisplayName(
  fileName: string,
  categoryLabel: string,
  categoryIndex: number,
) {
  const fileStem = path.parse(fileName).name;
  const cleanedStem = fileStem
    .replace(/[._-]+/g, " ")
    .replace(/\s*\(\d+\)$/g, "")
    .replace(/\s*-\s*copy$/i, "")
    .replace(/\bcopy\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const shouldFallback =
    !cleanedStem ||
    /^whatsapp image/i.test(cleanedStem) ||
    /^adobestock/i.test(cleanedStem) ||
    /^\d+$/.test(cleanedStem);

  if (shouldFallback) {
    return `${categoryLabel} Design ${categoryIndex}`;
  }

  const titled = toTitleCase(cleanedStem);
  if (titled.length > 72) {
    return `${categoryLabel} Design ${categoryIndex}`;
  }

  return titled;
}

function makeDescription(categoryLabel: string) {
  return `Custom ${categoryLabel.toLowerCase()} sample from the Kayns Shop portfolio.`;
}

function getCategoryImageFiles(folder: string) {
  const folderPath = path.join(PORTFOLIO_ROOT, folder);
  if (!fs.existsSync(folderPath)) {
    return [];
  }

  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export const getPortfolioProducts = cache((): Product[] => {
  if (!fs.existsSync(PORTFOLIO_ROOT)) {
    return [];
  }

  const products: Product[] = [];
  const usageCounter = new Map<string, number>();
  let nextId = 1;

  CATEGORY_CONFIG.forEach(({ folder, label }) => {
    const imageFiles = getCategoryImageFiles(folder);

    imageFiles.forEach((fileName, categoryIndex) => {
      const baseSlug = slugify(`${folder}-${path.parse(fileName).name}`);
      const slug = createUniqueSlug(baseSlug, usageCounter);

      products.push({
        id: nextId,
        slug,
        name: makeDisplayName(fileName, label, categoryIndex + 1),
        category: label,
        description: makeDescription(label),
        image: toPublicImagePath(folder, fileName),
        size: SIZE_PATTERN[(nextId - 1) % SIZE_PATTERN.length],
      });

      nextId += 1;
    });
  });

  return products;
});

export function getPortfolioProductBySlug(slug: string) {
  return getPortfolioProducts().find((item) => item.slug === slug);
}
