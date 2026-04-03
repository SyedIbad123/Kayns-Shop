import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import type { CollectionItem } from "@/data/collection";

const namedImageByTitle: Record<string, string> = {
  "Sports T-Shirt": "/cricket_shirt.jpg",
  "Performance Tee": "/soccer_shirt.jpg",
  "Racer T-Shirt": "/rugby_shirt.jpg",
  "Athletic Singlet": "/basketball_singlet.jpg",
  "Polo Shirt": "/polo_shirt.jpg",
  "Pro Jersey": "/soccer_shirt.jpg",
  "Performance Trouser": "/trouser.jpg",
  "Training Shorts": "/netball_short.jpg",
  "Fleece Shorts": "/rugby_short.jpg",
  "Match Shorts": "/basketball_short.jpg",
  "Classic Shorts": "/soccer_short.jpg",
  "Puffer Jacket": "/full_sleves_puffer.jpg",
  Hoodie: "/sweat_shirt.jpg",
  "Sleeveless Puffer": "/half_sleves_puffer.jpg",
  "Track Jacket": "/track_jacket.jpg",
  "Zip Top": "/ziptop.jpg",
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
