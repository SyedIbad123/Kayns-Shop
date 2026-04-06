import Image from "next/image";
import type { CollectionItem } from "@/data/collection";

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
          <div className="relative mx-auto h-56 w-4/5 max-w-xs overflow-hidden rounded-xl shadow-2xl sm:h-64 sm:max-w-sm bg-gray-900 z-9999">
            <Image
              src={showcaseImage}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Red panel */}
        <div className="flex flex-col justify-center bg-brand-red px-6 py-10 text-white sm:px-10">
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

        {/* Right — brand-red panel with text */}
        <div className="flex w-1/2 flex-col justify-center bg-brand-red px-28 py-12 text-white">
          <h2 className="text-xl font-extrabold leading-snug sm:text-2xl">
            Where Sport Meets Street
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {item.description ??
              "KAYNS is where performance meets street culture and every piece is built with purpose."}
          </p>
        </div>

        {/* Overlapping card — absolutely centered across both panels */}
        <div className="absolute left-130 top-1/2 z-20 h-64 w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-2xl lg:h-88 lg:w-88 bg-gray-100">
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
