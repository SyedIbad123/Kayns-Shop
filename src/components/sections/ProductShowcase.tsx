import Image from "next/image";
import type { CollectionItem } from "@/data/collection";

export default function ProductShowcase({ item }: { item: CollectionItem }) {
  return (
    <section aria-label="Product showcase">
      {/* Mobile / tablet: stacked layout */}
      <div className="flex flex-col lg:hidden">
        {/* White panel with faint bg */}
        <div className="relative overflow-hidden bg-white py-10">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <Image
              src={item.image}
              alt="background illustration"
              fill
              className="object-cover"
            />
          </div>
          {/* Product image shown inline on mobile */}
          <div className="relative mx-auto h-56 w-4/5 max-w-xs overflow-hidden rounded-xl shadow-2xl sm:h-64 sm:max-w-sm">
            <Image
              src={item.image}
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
        <div className="relative w-1/2 overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <Image
              src={item.image}
              alt="background illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right — brand-red panel with text */}
        <div className="flex w-1/2 flex-col justify-center bg-brand-red px-24 py-12 text-white">
          <h2 className="text-xl font-extrabold leading-snug sm:text-2xl">
            Lorem Ipsum is simply dummy
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {item.description ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing"}
          </p>
        </div>

        {/* Overlapping card — absolutely centered across both panels */}
        <div className="absolute left-130 top-1/2 z-50 h-64 w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-2xl lg:h-80 lg:w-96">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
