import { notFound } from "next/navigation";
import { getCollectionById, allCollections } from "@/data/collection";
import CollectionHero from "@/components/sections/CollectionHero";
import CollectionProductList from "@/components/sections/CollectionProductList";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ProductGridRow from "@/components/sections/ProductGridRow";
import BookOrder from "@/components/sections/BookOrder";
import SingleProductHero from "@/components/sections/SingleProductHero";
import SingleProductDetail from "@/components/sections/SingleProductDetail";
import SingleProductQuote from "@/components/sections/SingleProductQuote";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allCollections.map((c) => ({ id: String(c.id) }));
}

export default async function CollectionPage({ params }: Props) {
  const { id } = await params;
  const collection = getCollectionById(Number(id));

  if (!collection) notFound();

  const hasMultipleProducts =
    Array.isArray(collection.products) && collection.products.length > 1;

  if (!hasMultipleProducts) {
    return (
      <main className="min-h-screen">
        <SingleProductHero item={collection} />
        <SingleProductDetail item={collection} />
        <SingleProductQuote item={collection} />
        <ProductShowcase item={collection} />
        <BookOrder item={collection} />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <CollectionHero item={collection} />
      <BookOrder item={collection} />
      <ProductShowcase item={collection} />
      <ProductGridRow selectedCap={collection.title} />
    </main>
  );
}
