import Image from "next/image";
import Link from "next/link";
import type { CollectionItem } from "@/data/collection";

export default function CollectionHero({ item }: { item: CollectionItem }) {
  const heroImage = "/hero_Image_01.png";
  return (
    <>
      {/* Banner image */}
      <div className="relative h-64 w-full sm:h-125 flex justify-center items-center ">
        <Image
          src={heroImage}
          alt={item.title}
          width={700}
          height={700}
          className="object-contain"
          priority
        />
      </div>

      {/* Title + description bar */}
      <div className="bg-dark-blue text-center px-6 py-8 text-white">
        <h1 className="text-2xl  font-extrabold uppercase tracking-widest sm:text-5xl">
          KAYNS
        </h1>
        <p className="mt-3 text-center text-base leading-relaxed text-gray-300 sm:text-lg">
          {item.description ??
            "Where sport meets street and quality never compromises."}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link
            href={`/collection/${item.id}#products`}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Read More &darr;
          </Link>
          <Link
            href={`/customize/${item.id}`}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Customize
          </Link>
        </div>
      </div>
    </>
  );
}
