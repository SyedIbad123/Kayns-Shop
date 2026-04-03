import type { ClothingProductType } from "@/data/clothingFormConfig";

const DEFAULT_COLLECTION_COPY =
  "Explore premium custom pieces designed for performance, comfort, and everyday team style.";

export interface CollectionProduct {
  id: number;
  name: string;
  image: string;
}

export interface CollectionItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  products?: CollectionProduct[];
  productType?: ClothingProductType;
}

export interface CollectionSection {
  key: "caps" | "t-shirts" | "bottom" | "jackets";
  title: string;
  items: CollectionItem[];
}

const capsCollection: CollectionItem[] = [
  {
    id: 1,
    title: "Beanie",
    description: DEFAULT_COLLECTION_COPY,
    image: "/beanies.png",
    products: [
      {
        id: 1,
        name: "Beanie",
        image: "/beanies.png",
      },
      {
        id: 2,
        name: "Baggy Cap",
        image: "/baggy_cap.png",
      },
      {
        id: 3,
        name: "Bucket Hat",
        image: "/bucket_hat.png",
      },
      {
        id: 4,
        name: "Flat Peak Cap",
        image: "/flat_peak_cap.png",
      },
      {
        id: 5,
        name: "Sun Hat",
        image: "/sun_hat.png",
      },
      {
        id: 6,
        name: "Trucker Cap",
        image: "/trucker_hat.png",
      },
      {
        id: 7,
        name: "Visor",
        image: "/visor.png",
      },
    ],
  },
  {
    id: 2,
    title: "Baggy Cap",
    description: DEFAULT_COLLECTION_COPY,
    image: "/baggy_cap.png",
    products: [
      {
        id: 1,
        name: "Beanie",
        image: "/beanies.png",
      },
      {
        id: 2,
        name: "Baggy Cap",
        image: "/baggy_cap.png",
      },
      {
        id: 3,
        name: "Bucket Hat",
        image: "/bucket_hat.png",
      },
      {
        id: 4,
        name: "Flat Peak Cap",
        image: "/flat_peak_cap.png",
      },
      {
        id: 5,
        name: "Sun Hat",
        image: "/sun_hat.png",
      },
      {
        id: 6,
        name: "Trucker Cap",
        image: "/trucker_hat.png",
      },
      {
        id: 7,
        name: "Visor",
        image: "/visor.png",
      },
    ],
  },
  {
    id: 3,
    title: "Bucket Hat",
    description: DEFAULT_COLLECTION_COPY,
    image: "/bucket_hat.png",
    products: [
      {
        id: 1,
        name: "Beanie",
        image: "/beanies.png",
      },
      {
        id: 2,
        name: "Baggy Cap",
        image: "/baggy_cap.png",
      },
      {
        id: 3,
        name: "Bucket Hat",
        image: "/bucket_hat.png",
      },
      {
        id: 4,
        name: "Flat Peak Cap",
        image: "/flat_peak_cap.png",
      },
      {
        id: 5,
        name: "Sun Hat",
        image: "/sun_hat.png",
      },
      {
        id: 6,
        name: "Trucker Cap",
        image: "/trucker_hat.png",
      },
      {
        id: 7,
        name: "Visor",
        image: "/visor.png",
      },
    ],
  },
  {
    id: 4,
    title: "Flat Peak Cap",
    description: DEFAULT_COLLECTION_COPY,
    image: "/flat_peak_cap.png",
    products: [
      {
        id: 1,
        name: "Beanie",
        image: "/beanies.png",
      },
      {
        id: 2,
        name: "Baggy Cap",
        image: "/baggy_cap.png",
      },
      {
        id: 3,
        name: "Bucket Hat",
        image: "/bucket_hat.png",
      },
      {
        id: 4,
        name: "Flat Peak Cap",
        image: "/flat_peak_cap.png",
      },
      {
        id: 5,
        name: "Sun Hat",
        image: "/sun_hat.png",
      },
      {
        id: 6,
        name: "Trucker Cap",
        image: "/trucker_hat.png",
      },
      {
        id: 7,
        name: "Visor",
        image: "/visor.png",
      },
    ],
  },
  {
    id: 5,
    title: "Sun Hat",
    description: DEFAULT_COLLECTION_COPY,
    image: "/sun_hat.png",
    products: [
      {
        id: 1,
        name: "Beanie",
        image: "/beanies.png",
      },
      {
        id: 2,
        name: "Baggy Cap",
        image: "/baggy_cap.png",
      },
      {
        id: 3,
        name: "Bucket Hat",
        image: "/bucket_hat.png",
      },
      {
        id: 4,
        name: "Flat Peak Cap",
        image: "/flat_peak_cap.png",
      },
      {
        id: 5,
        name: "Sun Hat",
        image: "/sun_hat.png",
      },
      {
        id: 6,
        name: "Trucker Cap",
        image: "/trucker_hat.png",
      },
      {
        id: 7,
        name: "Visor",
        image: "/visor.png",
      },
    ],
  },
  {
    id: 6,
    title: "Trucker Cap",
    description: DEFAULT_COLLECTION_COPY,
    image: "/trucker_hat.png",
    products: [
      {
        id: 1,
        name: "Beanie",
        image: "/beanies.png",
      },
      {
        id: 2,
        name: "Baggy Cap",
        image: "/baggy_cap.png",
      },
      {
        id: 3,
        name: "Bucket Hat",
        image: "/bucket_hat.png",
      },
      {
        id: 4,
        name: "Flat Peak Cap",
        image: "/flat_peak_cap.png",
      },
      {
        id: 5,
        name: "Sun Hat",
        image: "/sun_hat.png",
      },
      {
        id: 6,
        name: "Trucker Cap",
        image: "/trucker_hat.png",
      },
      {
        id: 7,
        name: "Visor",
        image: "/visor.png",
      },
    ],
  },
  {
    id: 7,
    title: "Visor",
    description: DEFAULT_COLLECTION_COPY,
    image: "/visor.png",
    products: [
      {
        id: 1,
        name: "Beanie",
        image: "/beanies.png",
      },
      {
        id: 2,
        name: "Baggy Cap",
        image: "/baggy_cap.png",
      },
      {
        id: 3,
        name: "Bucket Hat",
        image: "/bucket_hat.png",
      },
      {
        id: 4,
        name: "Flat Peak Cap",
        image: "/flat_peak_cap.png",
      },
      {
        id: 5,
        name: "Sun Hat",
        image: "/sun_hat.png",
      },
      {
        id: 6,
        name: "Trucker Cap",
        image: "/trucker_hat.png",
      },
      {
        id: 7,
        name: "Visor",
        image: "/visor.png",
      },
    ],
  },
];

const tshirtsCollection: CollectionItem[] = [
  {
    id: 8,
    title: "Sports T-Shirt",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_1.png",
    productType: "t-shirt",
  },
  {
    id: 9,
    title: "Performance Tee",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_2.png",
    productType: "t-shirt",
  },
  {
    id: 10,
    title: "Racer T-Shirt",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_3.png",
    productType: "t-shirt",
  },
  {
    id: 11,
    title: "Athletic Singlet",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_9.png",
    productType: "t-shirt",
  },
  {
    id: 12,
    title: "Polo Shirt",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_17.png",
    productType: "polo-shirt",
  },
  {
    id: 13,
    title: "Pro Jersey",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_10.png",
    productType: "t-shirt",
  },
];

const bottomCollection: CollectionItem[] = [
  {
    id: 14,
    title: "Performance Trouser",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_11.png",
    productType: "trousers",
  },
  {
    id: 15,
    title: "Training Shorts",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_13.png",
    productType: "basketball-shorts",
  },
  {
    id: 16,
    title: "Fleece Shorts",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_14.png",
    productType: "football-shorts",
  },
  {
    id: 17,
    title: "Match Shorts",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_15.png",
    productType: "rugby-shorts",
  },
  {
    id: 18,
    title: "Classic Shorts",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_16.png",
    productType: "netball-shorts",
  },
];

const jacketsCollection: CollectionItem[] = [
  {
    id: 19,
    title: "Hoodie",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_4.png",
    productType: "hooded-sweatshirt",
  },
  {
    id: 20,
    title: "Puffer Jacket",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_5.png",
    productType: "puffer-jacket",
  },
  {
    id: 21,
    title: "Sleeveless Puffer",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_6.png",
    productType: "reversible-jacket",
  },
  {
    id: 22,
    title: "Track Jacket",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_7.png",
    productType: "track-jacket",
  },
  {
    id: 23,
    title: "Zip Top",
    description: DEFAULT_COLLECTION_COPY,
    image: "/frame_8.png",
    productType: "reversible-jacket",
  },
];

export const collectionSections: CollectionSection[] = [
  {
    key: "caps",
    title: "Caps",
    items: capsCollection,
  },
  {
    key: "t-shirts",
    title: "T-Shirts",
    items: tshirtsCollection,
  },
  {
    key: "bottom",
    title: "Bottom",
    items: bottomCollection,
  },
  {
    key: "jackets",
    title: "Jackets",
    items: jacketsCollection,
  },
];

/** Flat lookup: get any CollectionItem by id */
export const allCollections: CollectionItem[] = collectionSections.flatMap(
  (section) => section.items,
);

export function getCollectionById(id: number): CollectionItem | undefined {
  return allCollections.find((c) => c.id === id);
}
