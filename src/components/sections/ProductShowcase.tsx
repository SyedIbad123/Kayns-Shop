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
  "Sports T-Shirt": "/tshirt_.png",
  "Performance Tee": "/t-shirt_.png",
  "Racer T-Shirt": "/tshirt_.png",
  "Athletic Singlet": "/rugby_.png",
  "Polo Shirt": "/polo_.png",
  "Pro Jersey": "/t-shirt_.png",
  "Performance Trouser": "/trouser_.png",
  "Training Shorts": "/netball_.png",
  "Fleece Shorts": "/rugby_s_.png",
  "Match Shorts": "/rugby_s_.png",
  "Classic Shorts": "/netball_s_.png",
  Hoodie: "/sweatshirt_.png",
  "Puffer Jacket": "/puffer_f_.png",
  "Sleeveless Puffer": "/puffer_h_.png",
  "Track Jacket": "/zipper_jacket_.png",
  "Zip Top": "/ziptop.png",
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
            Lorem Ipsum is simply dummy
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {item.description ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing"}
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
            Lorem Ipsum is simply dummy
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {item.description ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing"}
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
