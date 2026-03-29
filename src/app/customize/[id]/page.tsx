import { notFound } from "next/navigation";
import { getCollectionById, allCollections } from "@/data/collection";
import MultiProductCustomizer from "@/components/sections/MultiProductCustomizer";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allCollections
    .filter((c) => (c.products?.length ?? 0) > 1)
    .map((c) => ({ id: String(c.id) }));
}

export default async function CustomizePage({ params }: Props) {
  const { id } = await params;
  const collection = getCollectionById(Number(id));

  if (!collection) notFound();

  return (
    <main className="min-h-screen">
      <MultiProductCustomizer />
    </main>
  );
}
