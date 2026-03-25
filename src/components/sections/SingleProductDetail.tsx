import Image from "next/image";
import type { CollectionItem } from "@/data/collection";

const features = [
  {
    label: "XYZ DESIGNS",
    sub: "Lorem ipsum is simply dummy text of the printing",
  },
  {
    label: "XYZ DESIGNS",
    sub: "Lorem ipsum is simply dummy text of the printing",
  },
  {
    label: "XYZ DESIGNS",
    sub: "Lorem ipsum is simply dummy text of the printing",
  },
  {
    label: "XYZ DESIGNS",
    sub: "Lorem ipsum is simply dummy text of the printing",
  },
  {
    label: "XYZ DESIGNS",
    sub: "Lorem ipsum is simply dummy text of the printing",
  },
];

export default function SingleProductDetail({
  item,
}: {
  item: CollectionItem;
}) {
  return (
    <section className="bg-white py-12" aria-label="Product detail">
      {/* Mobile / tablet: center card only */}
      <div className="flex justify-center px-4 lg:hidden">
        <div className="relative h-64 w-44 overflow-hidden rounded-3xl bg-gray-300 shadow-xl sm:h-80 sm:w-56">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Desktop: full 3-column layout */}
      <div className="mx-auto hidden max-w-4xl items-stretch gap-6 px-4 lg:flex">
        {/* Left column */}
        <div className="flex flex-1 flex-col justify-center gap-5">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Text */}
              <div className="min-w-0 text-right">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-900">
                  {f.label}
                </p>
                <p className="mt-0.5 text-xs leading-tight text-gray-500">
                  {f.sub}
                </p>
              </div>

              {/* Small image rect */}
              <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-300">
                <Image
                  src={item.image}
                  alt={f.label}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Center — large product card */}
        <div className="relative w-52 shrink-0 overflow-hidden rounded-3xl bg-gray-300 shadow-xl sm:w-60">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Right column */}
        <div className="flex flex-1 flex-col justify-center gap-5">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Small image rect */}
              <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-300">
                <Image
                  src={item.image}
                  alt={f.label}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-900">
                  {f.label}
                </p>
                <p className="mt-0.5 text-xs leading-tight text-gray-500">
                  {f.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
