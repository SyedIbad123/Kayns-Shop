import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import type { CollectionItem } from "@/data/collection";

export default function CollectionHero({ item }: { item: CollectionItem }) {
  return (
    <>
      {/* Banner image */}
      <div className="relative h-64 w-full sm:h-80">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title + description bar */}
      <div className="bg-dark-blue text-center px-6 py-8 text-white">
        <h1 className="text-2xl  font-extrabold uppercase tracking-widest sm:text-5xl">
          XYZ&ensp;DESIGNS
        </h1>
        <p className="mt-3 text-center text-base leading-relaxed text-gray-300 sm:text-lg">
          {item.description ??
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Button variant="primary" size="sm">
            Read More &darr;
          </Button>
          <Link href={`/customize/${item.id}`}>
            <Button variant="primary" size="sm">
              Customize
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
