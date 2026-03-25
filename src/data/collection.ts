const PLACEHOLDER_IMG =
  "https://img.freepik.com/free-photo/lavender-field-sunset-near-valensole_268835-3910.jpg?semt=ais_hybrid&w=740&q=80";

export interface CollectionProduct {
  id: number;
  name: string;
  image: string;
  icon: string;
}

export interface CollectionItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  products?: CollectionProduct[];
}

export const collectionRow1: CollectionItem[] = [
  {
    id: 1,
    title: "Design Alpha",
    description:
      "Explore our Alpha collection — a curated set of bold, layered designs built for those who stand out.",
    image: PLACEHOLDER_IMG,
    products: [
      {
        id: 101,
        name: "Alpha Cap I",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 102,
        name: "Alpha Cap II",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 103,
        name: "Alpha Cap III",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 104,
        name: "Alpha Cap IV",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 105,
        name: "Alpha Cap V",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 106,
        name: "Alpha Cap VI",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 107,
        name: "Alpha Cap VII",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
    ],
  },
  {
    id: 2,
    title: "Design Beta",
    description:
      "The Beta collection redefines everyday style with clean lines and vibrant expression.",
    image: PLACEHOLDER_IMG,
    products: [
      {
        id: 201,
        name: "Beta Cap I",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 202,
        name: "Beta Cap II",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 203,
        name: "Beta Cap III",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 204,
        name: "Beta Cap IV",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 205,
        name: "Beta Cap V",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
    ],
  },
  {
    id: 3,
    title: "Design Gamma",
    description:
      "Gamma blends art and utility — each piece crafted with intention and love for the craft.",
    image: PLACEHOLDER_IMG,
    products: [
      {
        id: 301,
        name: "Gamma Cap I",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 302,
        name: "Gamma Cap II",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 303,
        name: "Gamma Cap III",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 304,
        name: "Gamma Cap IV",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
    ],
  },
  {
    id: 4,
    title: "Design Delta",
    description:
      "Delta is luxury streetwear — premium fabrics meet boundary-pushing design.",
    image: PLACEHOLDER_IMG,
    products: [
      {
        id: 401,
        name: "Delta Cap I",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 402,
        name: "Delta Cap II",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 403,
        name: "Delta Cap III",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 404,
        name: "Delta Cap IV",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 405,
        name: "Delta Cap V",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
    ],
  },
];

export const collectionRow2: CollectionItem[] = [
  {
    id: 5,
    title: "Design Epsilon",
    description:
      "Epsilon brings a fresh energy to the collection with bold prints and structured fits.",
    image: PLACEHOLDER_IMG,
    products: [
      {
        id: 501,
        name: "Epsilon Cap I",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 502,
        name: "Epsilon Cap II",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 503,
        name: "Epsilon Cap III",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
    ],
  },
  {
    id: 6,
    title: "Design Zeta",
    description:
      "Zeta is where minimalism meets craftsmanship. Clean, classic, timeless.",
    image: PLACEHOLDER_IMG,
    products: [
      {
        id: 601,
        name: "Zeta Cap I",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 602,
        name: "Zeta Cap II",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 603,
        name: "Zeta Cap III",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
      {
        id: 604,
        name: "Zeta Cap IV",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
    ],
  },
  {
    id: 7,
    title: "Design Eta",
    description:
      "Eta captures the spirit of adventure with its rugged aesthetic and premium materials.",
    image: PLACEHOLDER_IMG,
    products: [
      {
        id: 701,
        name: "Eta Cap I",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
    ],
  },
  {
    id: 8,
    title: "Design Theta",
    description:
      "Theta represents the pinnacle of the XYZ design language — refined, bold, and iconic.",
    image: PLACEHOLDER_IMG,
    products: [
      {
        id: 801,
        name: "Theta Cap I",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
      },
    ],
  },
  {
    id: 9,
    title: "Design Iota",
    description:
      "Iota is the finishing touch — subtle details that make a big statement.",
    image: PLACEHOLDER_IMG,
    products: [
      {
        id: 901,
        name: "Iota Cap I",
        image: PLACEHOLDER_IMG,
        icon: PLACEHOLDER_IMG,
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
