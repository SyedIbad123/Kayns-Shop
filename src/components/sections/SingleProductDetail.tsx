import Image from "next/image";
import type { CollectionItem } from "@/data/collection";

const baseFeatures = [
  {
    label: "MULTIPLE COLOR OPTIONS",
    sub: "Built for club identity, sponsor blocks, and fast recoloring.",
  },
  {
    label: "JUNIOR, MEN & LADIES SIZES",
    sub: "Consistent fit range available across team size brackets.",
  },
  {
    label: "LOGO READY",
    sub: "Add crest, initials, and sponsor marks in preferred positions.",
  },
  {
    label: "HIGH QUALITY FABRIC",
    sub: "Durable stock fabrics for training, game day, and travel.",
  },
  {
    label: "CUSTOM CUT OPTIONS",
    sub: "Neck, sleeve, and trim choices based on product category.",
  },
];

const namedImageByTitle: Record<string, string> = {
  "Sports T-Shirt": "/cricket_shirt.jpg",
  "Performance Tee": "/soccer_shirt.jpg",
  "Racer T-Shirt": "/rugby_shirt.jpg",
  "Athletic Singlet": "/basketball_singlet.jpg",
  "Polo Shirt": "/polo_shirt.jpg",
  "Pro Jersey": "/soccer_shirt.jpg",
  "Training Shorts": "/soccer_short.jpg",
  "Fleece Shorts": "/rugby_short.jpg",
  "Match Shorts": "/rugby_short.jpg",
  "Classic Shorts": "/netball_short.jpg",
  "Puffer Jacket": "/full_sleves_puffer.jpg",
  "Sleeveless Puffer": "/half_sleves_puffer.jpg",
  "Zip Top": "/ziptop.jpg",
};

const frameImageByTitle: Record<string, string> = {
  "Sports T-Shirt": "/frame_1.png",
  "Performance Tee": "/frame_2.png",
  "Racer T-Shirt": "/frame_3.png",
  "Athletic Singlet": "/frame_9.png",
  "Polo Shirt": "/frame_17.png",
  "Pro Jersey": "/frame_10.png",
  "Performance Trouser": "/frame_11.png",
  "Training Shorts": "/frame_13.png",
  "Fleece Shorts": "/frame_14.png",
  "Match Shorts": "/frame_15.png",
  "Classic Shorts": "/frame_16.png",
  Hoodie: "/frame_4.png",
  "Puffer Jacket": "/frame_5.png",
  "Sleeveless Puffer": "/frame_6.png",
  "Track Jacket": "/frame_7.png",
  "Zip Top": "/frame_8.png",
};

function getFeatures(title: string) {
  return [
    {
      label: `${title.toUpperCase()} DESIGNS`,
      sub: "Personalized teamwear layout aligned with your branding.",
    },
    ...baseFeatures.slice(0, 2),
  ];
}

export default function SingleProductDetail({
  item,
}: {
  item: CollectionItem;
}) {
  const features = getFeatures(item.title);
  const sideImage = namedImageByTitle[item.title] ?? item.image;
  const centerImage = frameImageByTitle[item.title] ?? item.image;

  return (
    <section className="bg-white py-12" aria-label="Product detail">
      {/* Mobile / tablet: center card only */}
      <div className="flex justify-center px-4 lg:hidden">
        <div className="relative h-64 w-44 overflow-hidden rounded-3xl bg-gray-300 shadow-xl sm:h-80 sm:w-56">
          <Image
            src={centerImage}
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
                  src={sideImage}
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
            src={centerImage}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Right column */}
        <div className="flex flex-1 flex-col justify-center gap-5">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Small image rect */}
              <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-300">
                <Image
                  src={sideImage}
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
