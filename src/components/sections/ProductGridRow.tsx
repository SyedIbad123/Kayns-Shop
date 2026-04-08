type CapConfiguration = {
  style: string;
  aliases?: string[];
  features: string[];
  price: string;
  minOrder: string;
  turnaround: string;
  sizing: string[];
};

const commonTurnaround =
  "Orders will be dispatched from our warehouse (Brisbane, QLD) within three weeks of the day of order confirmation.";

const commonPricingNote =
  "Above prices include all designing costs and one embroidery.";

const capConfigurations: CapConfiguration[] = [
  {
    style: "Baggy Cap",
    features: [
      "Premium 100% wool",
      "8 separate panels",
      "Premium lining for moisture absorption and comfort",
      "Elasticated for a perfect fit",
    ],
    price: "$29.00 for single color panels",
    minOrder: "Minimum order: 10 caps",
    turnaround: commonTurnaround,
    sizing: ["Single size fit for all"],
  },
  {
    style: "Sun Hat",
    features: [
      "Premium 100% cotton jeans and 100% canvas",
      "2-panel hat",
      "Protection from sun",
      "Color of your choice",
    ],
    price: "$29.00 for sun/cricket hat",
    minOrder: "Minimum order: 10 caps",
    turnaround: commonTurnaround,
    sizing: [
      "Small (54-55 cm)",
      "Medium (56-57 cm)",
      "Large (58-59 cm)",
      "X-Large (60-61 cm)",
      "2X-Large (62-63 cm)",
    ],
  },
  {
    style: "Bucket Hat",
    features: [
      "Premium 100% cotton jeans and 100% polyester",
      "2-panel hat",
      "Protection from sun",
      "Choice of your sizes",
    ],
    price: "$28.00 for bucket hat",
    minOrder: "Minimum order: 10 caps",
    turnaround: commonTurnaround,
    sizing: [
      "Small (54-55 cm)",
      "Medium (56-57 cm)",
      "Large (58-59 cm)",
      "X-Large (60-61 cm)",
      "2X-Large (62-63 cm)",
    ],
  },
  {
    style: "Trucker Cap",
    features: [
      "5-panel cap",
      "Perfect for warmer summer",
      "Adjustable snapback strap for a comfortable fit",
      "Mesh for breathability",
    ],
    price: "$29.00 for trucker cap",
    minOrder: "Minimum order: 10 caps",
    turnaround: commonTurnaround,
    sizing: ["Single size fit for all"],
  },
  {
    style: "Visor",
    features: [
      "Premium 100% cotton jeans",
      "3-panel cap",
      "Adjustable snapback strap for a comfortable fit",
      "Extra sun protection",
    ],
    price: "$28.00 for visor",
    minOrder: "Minimum order: 10 caps",
    turnaround: commonTurnaround,
    sizing: ["Single size fit for all"],
  },
  {
    style: "Beanie",
    features: [
      "Premium 100% cotton",
      "Comfortable and warm",
      "Skin-friendly",
      "Lightweight",
    ],
    price: "$28.00 for single color beanies",
    minOrder: "Minimum order: 10 caps",
    turnaround: commonTurnaround,
    sizing: ["Single size fit for all"],
  },
  {
    style: "Flat Peak Cap (6 Panels)",
    aliases: ["Flat Peak Cap"],
    features: [
      "Premium 100% cotton and neoprene",
      "6-panel cap",
      "Adjustable snapback for a comfortable fit",
      "Eyelets for breathability",
    ],
    price: "$28.00 for 6-panel flat peak cap",
    minOrder: "Minimum order: 10 caps",
    turnaround: commonTurnaround,
    sizing: ["Single size fit for all"],
  },
  {
    style: "Basketball Cap",
    aliases: ["Baseball Cap", "Basket ball cap"],
    features: [
      "Premium 100% cotton",
      "6-panel cap",
      "Adjustable snapback strap for a comfortable fit",
      "Eyelets for breathability",
    ],
    price: "$29.00 for baseball cap",
    minOrder: "Minimum order: 10 caps",
    turnaround: commonTurnaround,
    sizing: ["Single size fit for all"],
  },
];

function normalizeCapName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getVisibleCapConfigurations(selectedCap?: string) {
  if (!selectedCap) {
    return capConfigurations;
  }

  const normalizedSelected = normalizeCapName(selectedCap);
  const matchedCaps = capConfigurations.filter((cap) =>
    [cap.style, ...(cap.aliases ?? [])].some(
      (name) => normalizeCapName(name) === normalizedSelected,
    ),
  );

  return matchedCaps.length > 0 ? matchedCaps : capConfigurations;
}

interface ProductGridRowProps {
  selectedCap?: string;
}

export default function ProductGridRow({ selectedCap }: ProductGridRowProps) {
  const visibleConfigurations = getVisibleCapConfigurations(selectedCap);

  return (
    <section
      className="bg-[#F3F6FC] px-2 py-8 sm:px-4 sm:py-12"
      aria-label="Cap configuration table"
    >
      <div className="mx-auto max-w-400 rounded-2xl bg-white shadow-[0_14px_36px_rgba(20,61,89,0.08)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-4xl border-collapse">
            <thead>
              <tr className="bg-[#143D59]/95 text-white">
                <th className="border-r border-[#F1A34B] px-4 py-4 text-left text-sm font-bold uppercase tracking-wide sm:px-6 sm:text-base">
                  Features
                </th>
                <th className="border-r border-[#F1A34B] px-4 py-4 text-left text-sm font-bold uppercase tracking-wide sm:px-6 sm:text-base">
                  Pricing
                </th>
                <th className="border-r border-[#F1A34B] px-4 py-4 text-left text-sm font-bold uppercase tracking-wide sm:px-6 sm:text-base">
                  Turnaround Time
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wide sm:px-6 sm:text-base">
                  Sizing
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleConfigurations.map((cap, index) => (
                <tr
                  key={cap.style}
                  className={`align-top text-slate-800 ${index % 2 === 0 ? "bg-[#F3F6FC]/60" : "bg-white"}`}
                >
                  <td className="border-r border-t border-[#F1A34B] px-4 py-5 text-sm leading-relaxed sm:px-6 sm:text-base">
                    <ul className="list-disc space-y-1.5 pl-5">
                      {cap.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </td>

                  <td className="border-r border-t border-[#F1A34B] px-4 py-5 text-sm leading-relaxed sm:px-6 sm:text-base">
                    <p className="font-semibold text-slate-900">{cap.price}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-sm">
                      {cap.minOrder}
                    </p>
                    <p className="mt-3 text-sm text-slate-700">
                      {commonPricingNote}
                    </p>
                  </td>

                  <td className="border-r border-t border-[#F1A34B] px-4 py-5 text-sm leading-relaxed sm:px-6 sm:text-base">
                    {cap.turnaround}
                  </td>

                  <td className="border-t border-[#F1A34B] px-4 py-5 text-sm leading-relaxed sm:px-6 sm:text-base">
                    <ul className="list-disc space-y-1.5 pl-5">
                      {cap.sizing.map((size) => (
                        <li key={size}>{size}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
