export interface UniformProduct {
  label: string;
  image: string;
  collectionId: number;
}

export interface SportUniform {
  slug: string;
  name: string;
  products: UniformProduct[];
}

export const sportUniforms: SportUniform[] = [
  {
    slug: "cricket",
    name: "Cricket",
    products: [
      { label: "Cricket T-Shirt", image: "/frame_2.png", collectionId: 9 },
      { label: "Trouser", image: "/frame_11.png", collectionId: 25 },
      { label: "Baggy Cap", image: "/baggy_cap.png", collectionId: 2 },
      { label: "Honour Cap", image: "/honour_cap.png", collectionId: 24 },
      { label: "Cricket Sun Hat", image: "/sun_hat.png", collectionId: 5 },
      {
        label: "Performance Cap",
        image: "/flat_peak_cap.png",
        collectionId: 23,
      },
      { label: "Track Jacket", image: "/frame_7.png", collectionId: 21 },
      { label: "Puffer Jacket", image: "/frame_5.png", collectionId: 19 },
      { label: "Zip Top Jacket", image: "/frame_8.png", collectionId: 22 },
      { label: "Sweatshirt", image: "/frame_4.png", collectionId: 18 },
      { label: "Bucket Hat", image: "/bucket_hat.png", collectionId: 3 },
    ],
  },
  {
    slug: "football",
    name: "Football",
    products: [
      { label: "Football T-Shirt", image: "/frame_3.png", collectionId: 10 },
      { label: "Shorts", image: "/frame_16.png", collectionId: 16 },
      { label: "Beanie", image: "/beanies.png", collectionId: 1 },
      { label: "Bucket Hat", image: "/bucket_hat.png", collectionId: 3 },
      { label: "Trucker Cap", image: "/trucker_hat.png", collectionId: 6 },
      {
        label: "Performance Cap",
        image: "/flat_peak_cap.png",
        collectionId: 23,
      },
      { label: "Football Trouser", image: "/frame_11.png", collectionId: 25 },
      { label: "Track Jacket", image: "/frame_7.png", collectionId: 21 },
      { label: "Puffer Jacket", image: "/frame_5.png", collectionId: 19 },
      { label: "Zip Top Jacket", image: "/frame_8.png", collectionId: 22 },
      { label: "Sweatshirt", image: "/frame_4.png", collectionId: 18 },
    ],
  },
  {
    slug: "basketball",
    name: "Basketball",
    products: [
      { label: "Basketball Singlet", image: "/frame_9.png", collectionId: 12 },
      { label: "Basketball Shorts", image: "/frame_15.png", collectionId: 15 },
      { label: "T-Shirt", image: "/frame_1.png", collectionId: 8 },
      { label: "Polo Shirt", image: "/frame_17.png", collectionId: 13 },
      { label: "Bucket Hat", image: "/bucket_hat.png", collectionId: 3 },
      {
        label: "Performance Cap",
        image: "/flat_peak_cap.png",
        collectionId: 23,
      },
      { label: "Track Jacket", image: "/frame_7.png", collectionId: 21 },
      { label: "Puffer Jacket", image: "/frame_5.png", collectionId: 19 },
      { label: "Zip Top Jacket", image: "/frame_8.png", collectionId: 22 },
      { label: "Sweatshirt", image: "/frame_4.png", collectionId: 18 },
    ],
  },
  {
    slug: "rugby",
    name: "Rugby",
    products: [
      { label: "Rugby T-Shirt", image: "/frame_10.png", collectionId: 11 },
      { label: "Polo Shirt", image: "/frame_17.png", collectionId: 13 },
      { label: "Shorts", image: "/frame_14.png", collectionId: 17 },
      { label: "Beanie", image: "/beanies.png", collectionId: 1 },
      { label: "Bucket Hat", image: "/bucket_hat.png", collectionId: 3 },
      { label: "Trucker Cap", image: "/trucker_hat.png", collectionId: 6 },
      { label: "Track Jacket", image: "/frame_7.png", collectionId: 21 },
      { label: "Puffer Jacket", image: "/frame_5.png", collectionId: 19 },
      { label: "Zip Top Jacket", image: "/frame_8.png", collectionId: 22 },
      { label: "Sweatshirt", image: "/frame_4.png", collectionId: 18 },
    ],
  },
  {
    slug: "netball",
    name: "Netball",
    products: [
      { label: "Netball Bummer", image: "/frame_13.png", collectionId: 14 },
      { label: "Polo Shirt", image: "/frame_17.png", collectionId: 13 },
      { label: "T-Shirt", image: "/frame_1.png", collectionId: 8 },
      {
        label: "Netball Singlet",
        image: "/netball_tshirt.png",
        collectionId: 26,
      },
      { label: "Honour Cap", image: "/honour_cap.png", collectionId: 24 },
      { label: "Visor", image: "/visor.png", collectionId: 7 },
      { label: "Beanie", image: "/beanies.png", collectionId: 1 },
      { label: "Track Jacket", image: "/frame_7.png", collectionId: 21 },
      { label: "Puffer Jacket", image: "/frame_5.png", collectionId: 19 },
      { label: "Zip Top Jacket", image: "/frame_8.png", collectionId: 22 },
      { label: "Sweatshirt", image: "/frame_4.png", collectionId: 18 },
    ],
  },
  {
    slug: "running",
    name: "Running",
    products: [
      { label: "T-Shirt", image: "/frame_1.png", collectionId: 8 },
      { label: "Polo Shirt", image: "/frame_17.png", collectionId: 13 },
      { label: "Trousers", image: "/frame_11.png", collectionId: 25 },
      { label: "Shorts", image: "/frame_14.png", collectionId: 17 },
      { label: "Beanie", image: "/beanies.png", collectionId: 1 },
      {
        label: "Performance Cap",
        image: "/flat_peak_cap.png",
        collectionId: 23,
      },
      { label: "Track Jacket", image: "/frame_7.png", collectionId: 21 },
      { label: "Puffer Jacket", image: "/frame_5.png", collectionId: 19 },
      { label: "Zip Top Jacket", image: "/frame_8.png", collectionId: 22 },
      { label: "Sweatshirt", image: "/frame_4.png", collectionId: 18 },
    ],
  },
];

export function getSportBySlug(slug: string): SportUniform | undefined {
  return sportUniforms.find((s) => s.slug === slug);
}
