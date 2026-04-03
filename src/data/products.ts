export interface Product {
  id: number;
  title: string;
  image: string;
}

export const hotProducts: Product[] = [
  {
    id: 1,
    title: "Custom Baggy Cap",
    image: "/baggy_cap.png",
  },
  {
    id: 2,
    title: "Custom Trucker Cap",
    image: "/trucker_hat.png",
  },
  {
    id: 3,
    title: "Custom Sun Hat Cap",
    image: "/sun_hat.png",
  },
  {
    id: 4,
    title: "Cricket T-Shirt",
    image: "/frame_2.png",
  },
  {
    id: 5,
    title: "Full Sleeves Puffer Jacket",
    image: "/frame_5.png",
  },
];
