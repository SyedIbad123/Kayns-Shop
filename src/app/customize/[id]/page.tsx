import { notFound } from "next/navigation";
import { getCollectionById, allCollections } from "@/data/collection";
import MultiProductCustomizer from "@/components/sections/MultiProductCustomizer";

interface Props {
  params: Promise<{ id: string }>;
}

/** Maps collection title to the matching cap registry label */
const COLLECTION_TITLE_TO_CAP_LABEL: Record<string, string> = {
  Beanie: "Custom Beanies",
  "Baggy Cap": "Custom Cricket Baggy Caps (Single Color)",
  "Bucket Hat": "Custom Bucket Hat",
  "Flat Peak Cap": "Custom Flat Peak Cap (5 Panels)",
  "Sun Hat": "Custom Sun Cricket Hat",
  "Trucker Cap": "Custom Trucker Cap",
  Visor: "Custom Visor",
};

export async function generateStaticParams() {
  return allCollections
    .filter((c) => (c.products?.length ?? 0) > 1)
    .map((c) => ({ id: String(c.id) }));
}

export default async function CustomizePage({ params }: Props) {
  const { id } = await params;
  const collection = getCollectionById(Number(id));

  if (!collection) notFound();

  const initialCapLabel = COLLECTION_TITLE_TO_CAP_LABEL[collection.title];

  return (
    <main className="min-h-screen">
      <MultiProductCustomizer initialCapLabel={initialCapLabel} />
    </main>
  );
}
