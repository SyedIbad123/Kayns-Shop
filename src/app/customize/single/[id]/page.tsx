import { notFound } from "next/navigation";
import { getCollectionById, allCollections } from "@/data/collection";
import SingleProductOption from "@/components/sections/SingleProductOption";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allCollections
    .filter((c) => (c.products?.length ?? 0) === 1)
    .map((c) => ({ id: String(c.id) }));
}

export default async function CustomizeSinglePage({ params }: Props) {
  const { id } = await params;
  const collection = getCollectionById(Number(id));

  if (!collection) notFound();

  return (
    <main className="min-h-screen">
      <SingleProductOption
        title={collection.title}
        description={
          collection.description ??
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        }
      />
    </main>
  );
}
