import Image from "next/image";
import type { CollectionItem } from "@/data/collection";
import { getCapImageDimensions } from "@/lib/utils";

export default function CollectionProductList({
  item,
}: {
  item: CollectionItem;
}) {
  const products = item.products ?? [];

  const isImageSource = (value?: string) => {
    if (!value) return false;
    return (
      value.startsWith("/") ||
      value.startsWith("http://") ||
      value.startsWith("https://")
    );
  };

  const renderProductImage = (
    imageSrc: string,
    imageAlt: string,
    dimensions: ReturnType<typeof getCapImageDimensions>,
  ) => {
    if (dimensions) {
      return (
        <div className="flex h-full w-full items-center justify-center p-2">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={dimensions.width}
            height={dimensions.height}
            className="h-auto w-auto max-h-full max-w-full object-contain"
          />
        </div>
      );
    }

    return (
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
    );
  };

  return (
    <section
      id="products"
      className="bg-white px-6 py-10"
      aria-label="Products"
    >
      <h2 className="mb-8 text-center text-3xl font-extrabold uppercase tracking-widest text-gray-900">
        {item.title.replace("Design ", "").toUpperCase()}&nbsp;CAPS
      </h2>

      <div className="mx-auto max-w-xl space-y-5">
        {products.map((product, i) => {
          const isEven = i % 2 === 1;
          const capDimensions = getCapImageDimensions(product.image);

          return (
            <div key={product.id}>
              {/* Zigzag row */}
              <div className="flex items-center gap-3">
                {isEven ? (
                  <>
                    {/* Even: dashed line — circle — image */}
                    <div className="flex flex-1 items-center">
                      <div className="h-px flex-1 border-t-2 border-dashed border-gray-300" />
                    </div>
                    <div className="relative h-52 w-52 shrink-0 overflow-hidden ">
                      {isImageSource(product.image) ? (
                        renderProductImage(
                          product.image,
                          product.name,
                          capDimensions,
                        )
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#F3F6FC] text-2xl">
                          {product.image || "🧢"}
                        </div>
                      )}
                    </div>
                    <div className="flex text-center justify-center items-center relative h-22 w-40 shrink-0 overflow-hidden">
                      <div className="flex text-center justify-center items-center text-2xl font-extrabold">
                        <h1>{product.name}</h1>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Odd: image — circle — dashed line */}
                    <div className="flex text-center justify-center items-center relative h-22 w-40 shrink-0 overflow-hidden ">
                      <div className="flex text-center justify-center items-center text-2xl font-extrabold">
                        <h1>{product.name}</h1>
                      </div>
                    </div>
                    <div className="relative h-52 w-52 shrink-0 overflow-hidden">
                      {renderProductImage(
                        product.image,
                        product.name,
                        capDimensions,
                      )}
                    </div>
                    <div className="flex flex-1 items-center">
                      <div className="h-px flex-1 border-t-2 border-dashed border-gray-300" />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
