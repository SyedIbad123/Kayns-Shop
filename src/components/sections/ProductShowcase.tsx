import Image from "next/image";
import Link from "next/link";
import type { CollectionItem } from "@/data/collection";
import { cn } from "@/lib/utils";

const namedImageByTitle: Record<string, string> = {
  Beanie: "/benni_.png",
  "Baggy Cap": "/baggy_.png",
  "Bucket Hat": "/hat_.png",
  "Flat Peak Cap": "/flatceep_.png",
  "Sun Hat": "/sunhat_.png",
  "Trucker Cap": "/truckercap_.png",
  Visor: "/visor_.png",
  "Cricket T-Shirt": "/tshirt_.png",
  "Soccer T-Shirt": "/t-shirt_.png",
  "Rugby T-Shirt": "/rugby_.png",
  "Basketball Singlet": "/basketball_s_.png",
  "Polo T-Shirt": "/polo_.png",
  Trouser: "/trouser_.png",
  "Netball Bummer": "/netball_.png",
  "Basketball Short": "/basketball_s_.png",
  "Soccer Short": "/soccer_.png",
  "Rugby Short": "/rugby_s_.png",
  Sweatshirt: "/sweatshirt_.png",
  "Full Sleeves Puffer Jacket": "/puffer_f_.png",
  "Half Sleeves Puffer Jacket": "/puffer_h_.png",
  "Track Jacket": "/zipper_jacket_.png",
  "Zip Top Jacket": "/ziptop.png",
};

export default function ProductShowcase({ item }: { item: CollectionItem }) {
  const showcaseImage = namedImageByTitle[item.title] ?? item.image;
  const bgImage = "/bg_Image.png";
  const capProducts = item.products ?? [];
  const hasCapGrid = capProducts.length > 1;

  if (hasCapGrid) {
    return (
      <section
        aria-label="Product showcase"
        className="bg-white py-12 sm:py-14"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-xl font-extrabold uppercase tracking-[0.12em] text-gray-900 sm:text-2xl">
            Explore Cap Styles
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-gray-600 sm:text-base">
            Pick a cap style to switch page. Current style is subtly
            highlighted.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
            {capProducts.map((product) => {
              const isActiveCap =
                product.id === item.id || product.name === item.title;

              return (
                <Link
                  key={product.id}
                  href={`/collection/${product.id}`}
                  aria-current={isActiveCap ? "page" : undefined}
                  className={cn(
                    "group rounded-2xl border px-3 py-4 text-center transition-all duration-200 sm:px-4 sm:py-5",
                    isActiveCap ? " border-none" : "border-none",
                  )}
                >
                  <div
                    className={cn(
                      "relative mx-auto h-24 w-24 overflow-hidden rounded-full border bg-gray-50 sm:h-28 sm:w-28",
                      isActiveCap
                        ? "border-[#143D59]/35 bg-[#143d59]"
                        : "border-gray-200",
                    )}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 96px, 112px"
                      className="object-contain p-3 transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>

                  <p
                    className={cn(
                      "mt-3 text-sm font-semibold leading-tight sm:text-base",
                      isActiveCap
                        ? "text-[#143D59]"
                        : "text-gray-700 group-hover:text-gray-900",
                    )}
                  >
                    {product.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Product showcase">
      {/* Mobile / tablet: stacked layout */}
      <div className="flex flex-col lg:hidden">
        {/* White panel with faint bg */}
        <div className="relative overflow-hidden py-10">
          <div className="pointer-events-none absolute inset-0 ">
            <Image
              src={bgImage}
              alt="background illustration"
              fill
              className="object-cover"
            />
          </div>
          {/* Product image shown inline on mobile */}
          <div className="relative mx-auto z-9999 h-56 w-4/5 max-w-xs overflow-hidden rounded-xl bg-[#F3F6FC] shadow-2xl sm:h-64 sm:max-w-sm">
            <Image
              src={showcaseImage}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Red panel */}
        <div className="flex flex-col justify-center bg-[#143D59] px-6 py-10 text-white sm:px-10">
          <h2 className="text-xl font-extrabold leading-snug sm:text-2xl">
            Where Sport Meets Street
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {item.description ??
              "KAYNS is where performance meets street culture and every piece is built with purpose."}
          </p>
        </div>
      </div>

      {/* Desktop: side-by-side split with overlapping card */}
      <div className="relative hidden min-h-100 lg:flex">
        {/* Left — white panel with illustration bg */}
        <div className="relative w-1/2 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 ">
            <Image
              src={bgImage}
              alt="background illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right — [#143D59] panel with text */}
        <div className="flex w-1/2 flex-col justify-center bg-[#143D59] px-28 py-12 text-white">
          <h2 className="text-xl font-extrabold leading-snug sm:text-2xl">
            Where Sport Meets Street
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {item.description ??
              "KAYNS is where performance meets street culture and every piece is built with purpose."}
          </p>
        </div>

        {/* Overlapping card — absolutely centered across both panels */}
        <div className="absolute left-130 top-1/2 z-20 h-64 w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-2xl lg:h-88 lg:w-88 bg-[#F3F6FC]">
          <Image
            src={showcaseImage}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
