import Image from "next/image";
import type { CollectionItem } from "@/data/collection";

type DetailFeature = {
  label: string;
  sub: string;
  icon: string;
  iconAlt: string;
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

function getFeatures(title: string): DetailFeature[] {
  return [
    {
      label: `${title.toUpperCase()} DESIGN STUDIO`,
      sub: "From concept to final mockup, we shape kits that carry your identity.",
      icon: "/paint.png",
      iconAlt: "Paint icon",
    },
    {
      label: "PROVEN QUALITY CONTROL",
      sub: "Every batch is checked for color, stitching, fit, and finish consistency.",
      icon: "/trust.png",
      iconAlt: "Trust icon",
    },
    {
      label: "RESPONSIBLE MATERIALS",
      sub: "Sustainable fabric and print paths available without losing performance.",
      icon: "/sustainability.png",
      iconAlt: "Sustainability icon",
    },
    {
      label: "SMART DESIGN INSIGHT",
      sub: "Our specialists refine cuts and details for a sharper game-day look.",
      icon: "/lightbulb.png",
      iconAlt: "Lightbulb icon",
    },
    {
      label: "ON-TIME DELIVERY",
      sub: "Clear production planning keeps your season, launch, or event on schedule.",
      icon: "/delivery.png",
      iconAlt: "Delivery icon",
    },
    {
      label: "RETAIL-READY PACKAGING",
      sub: "Orders are neatly packed, counted, and protected for smooth dispatch.",
      icon: "/box.png",
      iconAlt: "Box icon",
    },
  ];
}

export default function SingleProductDetail({
  item,
}: {
  item: CollectionItem;
}) {
  const features = getFeatures(item.title);
  const leftFeatures = features.slice(0, 3);
  const rightFeatures = features.slice(3);
  const centerImage = frameImageByTitle[item.title] ?? item.image;

  return (
    <section className="bg-white py-12" aria-label="Product detail">
      {/* Mobile / tablet: center card with compact feature list */}
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

      <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3 px-4 lg:hidden">
        {features.map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm"
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={f.icon}
                alt={f.iconAlt}
                fill
                sizes="36px"
                className="object-contain p-1.5"
              />
            </div>
            <p className="text-[10px] font-semibold leading-tight text-gray-700">
              {f.label}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop: full 3-column layout */}
      <div className="mx-auto hidden max-w-4xl items-stretch gap-6 px-4 lg:flex">
        {/* Left column */}
        <div className="flex flex-1 flex-col justify-center gap-5">
          {leftFeatures.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              {/* Text */}
              <div className="min-w-0 text-right">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-900">
                  {f.label}
                </p>
                <p className="mt-0.5 text-xs leading-tight text-gray-500">
                  {f.sub}
                </p>
              </div>

              {/* Feature icon */}
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <Image
                  src={f.icon}
                  alt={f.iconAlt}
                  fill
                  sizes="48px"
                  className="object-contain p-2"
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
          {rightFeatures.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              {/* Feature icon */}
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <Image
                  src={f.icon}
                  alt={f.iconAlt}
                  fill
                  sizes="48px"
                  className="object-contain p-2"
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
