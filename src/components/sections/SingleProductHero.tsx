import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import type { CollectionItem } from "@/data/collection";

export default function SingleProductHero({ item }: { item: CollectionItem }) {
  return (
    <>
      {/* Large product image */}
      <div className="relative h-72 w-full bg-light-gray sm:h-96">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title + description bar */}
      <div className="bg-white px-6 py-10 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-widest text-gray-900 sm:text-4xl">
          XYZ&ensp;DESIGNS
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-600">
          {item.description ??
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="primary" size="sm">
            Read More &darr;
          </Button>
          <Link href={`/customize/single/${item.id}`}>
            <Button variant="primary" size="sm">
              Customize
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
