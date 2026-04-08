export interface Product {
  id: number;
  collectionId: number;
  title: string;
  image: string;
}

export const hotProducts: Product[] = [
  {
    id: 1,
    collectionId: 2,
    title: "Custom Baggy Cap",
    image: "/baggy_cap.png",
  },
  {
    id: 2,
    collectionId: 6,
    title: "Custom Trucker Cap",
    image: "/trucker_hat.png",
  },
  {
    id: 3,
    collectionId: 5,
    title: "Custom Sun Hat Cap",
    image: "/sun_hat.png",
  },
  {
    id: 4,
    collectionId: 8,
    title: "Cricket T-Shirt",
    image: "/frame_2.png",
  },
  {
    id: 5,
    collectionId: 19,
    title: "Full Sleeves Puffer Jacket",
    image: "/frame_5.png",
  },
];
