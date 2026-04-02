import type { ClothingProductType } from "@/data/clothingFormConfig";

const PLACEHOLDER_IMG =
  "https://img.freepik.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg?semt=ais_hybrid&w=740&q=80";

export interface CollectionProduct {
  id: number;
  name: string;
  image: string;
  icon: string;
  category?: string;
  productType?: ClothingProductType;
}

export interface CollectionItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  products?: CollectionProduct[];
  productType?: ClothingProductType;
}

export const collectionRow1: CollectionItem[] = [
  {
    id: 1,
    title: "Sports T-Shirt Collection",
    description:
      "Custom sports t-shirts with tailored sleeve, collar, logo, and print options.",
    image: PLACEHOLDER_IMG,
    productType: "t-shirt",
    products: [
      {
        id: 1001,
        name: "Elite Sports T-Shirt",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "T-Shirt",
        productType: "t-shirt",
      },
    ],
  },
  {
    id: 2,
    title: "Polo Shirt Collection",
    description:
      "Team and corporate polo shirts with premium collar and logo application options.",
    image: PLACEHOLDER_IMG,
    productType: "polo-shirt",
    products: [
      {
        id: 1002,
        name: "Classic Team Polo",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "Polo Shirt",
        productType: "polo-shirt",
      },
    ],
  },
  {
    id: 3,
    title: "Hooded Sweatshirt Collection",
    description:
      "Modern hooded sweatshirts for clubs, teams, and premium casual wear.",
    image: PLACEHOLDER_IMG,
    productType: "hooded-sweatshirt",
    products: [
      {
        id: 1003,
        name: "Urban Hooded Sweatshirt",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "Hooded Sweatshirt",
        productType: "hooded-sweatshirt",
      },
    ],
  },
  {
    id: 4,
    title: "Track Jacket Collection",
    description:
      "Performance track jackets with flexible branding and optional matching trousers.",
    image: PLACEHOLDER_IMG,
    productType: "track-jacket",
    products: [
      {
        id: 1004,
        name: "Pro Track Jacket",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "Track Jacket",
        productType: "track-jacket",
      },
    ],
  },
  {
    id: 5,
    title: "Puffer Jacket Collection",
    description:
      "Warm, lightweight puffer jackets with custom collar, cuff, and branding options.",
    image: PLACEHOLDER_IMG,
    productType: "puffer-jacket",
    products: [
      {
        id: 1005,
        name: "All-Weather Puffer Jacket",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "Puffer Jacket",
        productType: "puffer-jacket",
      },
    ],
  },
  {
    id: 6,
    title: "Reversible Jacket Collection",
    description:
      "Dual-look reversible jackets designed for training, travel, and teamwear.",
    image: PLACEHOLDER_IMG,
    productType: "reversible-jacket",
    products: [
      {
        id: 1006,
        name: "Dual-Side Reversible Jacket",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "Reversible Jacket",
        productType: "reversible-jacket",
      },
    ],
  },
];

export const collectionRow2: CollectionItem[] = [
  {
    id: 7,
    title: "Trousers Collection",
    description:
      "Custom trousers with pocket and bottom finish options for teams and staff uniforms.",
    image: PLACEHOLDER_IMG,
    productType: "trousers",
    products: [
      {
        id: 1007,
        name: "Performance Team Trousers",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "Trousers",
        productType: "trousers",
      },
    ],
  },
  {
    id: 8,
    title: "Football Shorts Collection",
    description:
      "Football shorts built for movement with customizable pocket and logo options.",
    image: PLACEHOLDER_IMG,
    productType: "football-shorts",
    products: [
      {
        id: 1008,
        name: "Matchday Football Shorts",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "Football Shorts",
        productType: "football-shorts",
      },
    ],
  },
  {
    id: 9,
    title: "Basketball Shorts Collection",
    description:
      "Lightweight basketball shorts with premium fit and custom branding support.",
    image: PLACEHOLDER_IMG,
    productType: "basketball-shorts",
    products: [
      {
        id: 1009,
        name: "Court Performance Shorts",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "Basketball Shorts",
        productType: "basketball-shorts",
      },
    ],
  },
  {
    id: 10,
    title: "Netball Shorts Collection",
    description:
      "Netball shorts and skort-ready options designed for comfort and play-day confidence.",
    image: PLACEHOLDER_IMG,
    productType: "netball-shorts",
    products: [
      {
        id: 1010,
        name: "Netball Match Shorts",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "Netball Shorts",
        productType: "netball-shorts",
      },
    ],
  },
  {
    id: 11,
    title: "Rugby Shorts Collection",
    description:
      "Durable rugby shorts built for high-impact play and full kit customization.",
    image: PLACEHOLDER_IMG,
    productType: "rugby-shorts",
    products: [
      {
        id: 1011,
        name: "Impact Rugby Shorts",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
        category: "Rugby Shorts",
        productType: "rugby-shorts",
      },
    ],
  },
];

/** Flat lookup: get any CollectionItem by id */
export const allCollections: CollectionItem[] = [
  ...collectionRow1,
  ...collectionRow2,
];

export function getCollectionById(id: number): CollectionItem | undefined {
  return allCollections.find((c) => c.id === id);
}
