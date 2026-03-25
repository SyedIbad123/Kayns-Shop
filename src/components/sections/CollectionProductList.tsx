import Image from "next/image";
import type { CollectionItem } from "@/data/collection";

export default function CollectionProductList({
  item,
}: {
  item: CollectionItem;
}) {
  const products = item.products ?? [];

  return (
    <section className="bg-white px-6 py-10" aria-label="Products">
      <h2 className="mb-8 text-center text-3xl font-extrabold uppercase tracking-widest text-gray-900">
        {item.title.replace("Design ", "").toUpperCase()}&nbsp;CAPS
      </h2>

      <div className="mx-auto max-w-xl space-y-5">
        {products.map((product, i) => {
          const isEven = i % 2 === 1;
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
                    <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-full border-2 border-gray-300">
                      <Image
                        src={product.icon}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex text-center justify-center items-center relative h-22 w-40 shrink-0 overflow-hidden rounded-xl border border-black">
                      <div className="flex text-center justify-center items-center">
                        <h1>syed Ibad ali</h1>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Odd: image — circle — dashed line */}
                    <div className="flex text-center justify-center items-center relative h-22 w-40 shrink-0 overflow-hidden rounded-xl border border-black">
                      <div className="flex text-center justify-center items-center">
                        <h1>syed Ibad ali</h1>
                      </div>
                    </div>
                    <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-full border-2 border-gray-300">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
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
