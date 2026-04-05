export type ProductSize = "large" | "wide" | "tall" | "medium" | "small";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  size: ProductSize;
};
