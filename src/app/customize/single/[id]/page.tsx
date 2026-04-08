/**
 * Server route for rendering a single clothing customization page with dynamic form mounting.
 * Dependencies: collection data lookup and DynamicClothingForm client renderer.
 */

import Image from "next/image";
import { notFound } from "next/navigation";

import DynamicClothingForm from "@/components/customize/DynamicClothingForm";
import type { ClothingProductType } from "@/data/clothingFormConfig";
import { allCollections, getCollectionById } from "@/data/collection";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allCollections
    .filter((c) => (c.products?.length ?? 0) === 1)
    .map((c) => ({ id: String(c.id) }));
}

const CATEGORY_TO_PRODUCT_TYPE: Record<string, ClothingProductType> = {
  "sports t-shirt": "t-shirt",
  "cricket t-shirt": "t-shirt",
  "soccer t-shirt": "t-shirt",
  "rugby t-shirt": "t-shirt",
  "basketball singlet": "t-shirt",
  "polo shirt": "polo-shirt",
  "polo t-shirt": "polo-shirt",
  sweatshirt: "hooded-sweatshirt",
  "hooded sweatshirt": "hooded-sweatshirt",
  hoodie: "hooded-sweatshirt",
  "full sleeves puffer jacket": "puffer-jacket",
  "track jacket": "track-jacket",
  "half sleeves puffer jacket": "reversible-jacket",
  "zip top jacket": "reversible-jacket",
  "puffer jacket": "puffer-jacket",
  "reversible jacket": "reversible-jacket",
  trouser: "trousers",
  trousers: "trousers",
  "basketball short": "basketball-shorts",
  "soccer short": "football-shorts",
  "rugby short": "rugby-shorts",
  "netball bummer": "netball-shorts",
  "football shorts": "football-shorts",
  "basketball shorts": "basketball-shorts",
  "netball shorts": "netball-shorts",
  "rugby shorts": "rugby-shorts",
};

function mapCategoryToProductType(category?: string | null) {
  if (!category) {
    return undefined;
  }

  return CATEGORY_TO_PRODUCT_TYPE[category.trim().toLowerCase()];
}

export default async function CustomizeSinglePage({ params }: Props) {
  const { id } = await params;
  const collection = getCollectionById(Number(id));

  if (!collection) notFound();

  const selectedProduct = collection.products?.[0];
  const mappedProductType =
    mapCategoryToProductType(selectedProduct?.name) ??
    mapCategoryToProductType(collection.title) ??
    collection.productType;

  if (!mappedProductType) {
    notFound();
  }

  const description =
    collection.description ??
    "Customize your product with garment details, branding options, and upload references for production.";

  const shortDescription =
    description.length > 140 ? `${description.slice(0, 140)}...` : description;

  return (
    <main className="min-h-screen bg-[#F3F6FC] pb-24 md:pb-12">
      <section className="mx-auto flex w-[90vw] max-w-full flex-row gap-6 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <article className="overflow-hidden h-1/2 w-1/2 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="relative h-52 w-full sm:h-96">
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="space-y-3 px-5 py-5 sm:px-8">
            <h1
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: "#111827" }}
            >
              {selectedProduct?.name ?? collection.title}
            </h1>
            <p className="text-sm leading-6 text-[#4B5563]">
              {shortDescription}
            </p>

            <details className="group rounded-lg border border-[#F3F6FC] bg-[#FCFCFD] px-4 py-3">
              <summary className="cursor-pointer list-none text-sm font-semibold text-[#143D59] marker:content-none">
                View More
              </summary>
              <p className="mt-2 text-sm leading-6 text-[#4B5563]">
                {description}
              </p>
            </details>
          </div>
        </article>

        <DynamicClothingForm
          productType={mappedProductType}
          productId={selectedProduct?.id ?? id}
        />
      </section>
    </main>
  );
}
