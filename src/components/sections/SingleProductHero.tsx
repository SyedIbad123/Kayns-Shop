import Image from "next/image";
import Link from "next/link";
import type { CollectionItem } from "@/data/collection";

const namedImageByTitle: Record<string, string> = {
  "Cricket T-Shirt": "/cricket_shirt.jpg",
  "Soccer T-Shirt": "/soccer_shirt.jpg",
  "Rugby T-Shirt": "/rugby_shirt.jpg",
  "Basketball Singlet": "/basketball_singlet.jpg",
  "Polo T-Shirt": "/polo_shirt.jpg",
  Trouser: "/trouser.jpg",
  "Netball Bummer": "/netball_short.jpg",
  "Basketball Short": "/basketball_short.jpg",
  "Soccer Short": "/soccer_short.jpg",
  "Rugby Short": "/rugby_short.jpg",
  Sweatshirt: "/sweat_shirt.jpg",
  "Full Sleeves Puffer Jacket": "/full_sleves_puffer.jpg",
  "Half Sleeves Puffer Jacket": "/half_sleves_puffer.jpg",
  "Track Jacket": "/track_jacket.jpg",
  "Zip Top Jacket": "/ziptop.jpg",
};

export default function SingleProductHero({ item }: { item: CollectionItem }) {
  const heroImage = namedImageByTitle[item.title] ?? item.image;

  return (
    <>
      {/* Large product image */}
      <div className="relative h-72 sm:h-120 mt-2">
        <Image
          src={heroImage}
          alt={item.title}
          fill
          className="object-contain "
          priority
        />
      </div>

      {/* Title + description bar */}
      <div className="bg-white px-6 py-10 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-widest text-gray-900 sm:text-4xl">
          KAYNS
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-600">
          {item.description ??
            "Where sport meets street and quality never compromises."}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href={`/collection/${item.id}#details`}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Read More &darr;
          </Link>
          <Link
            href={`/customize/single/${item.id}`}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Customize
          </Link>
        </div>
      </div>
    </>
  );
}
