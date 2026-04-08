import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

interface UniformCard {
  label: string;
  variant: "Top" | "Bottom";
  collectionId: number;
  image: string;
}

interface UniformSection {
  heading: string;
  cards: UniformCard[];
}

const uniformSections: UniformSection[] = [
  {
    heading: "Rugby",
    cards: [
      {
        label: "Rugby Top",
        variant: "Top",
        collectionId: 13,
        image:
          "/portfolio_Images/rugby_shirts/34734951_07_rugby_sublimated_shirts_mock_up_illustrations_templates.jpg",
      },
      {
        label: "Rugby Bottom",
        variant: "Bottom",
        collectionId: 17,
        image: "/portfolio_Images/rugby_shorts/1391916-cover.jpg",
      },
    ],
  },
  {
    heading: "Cricket (Trouser)",
    cards: [
      {
        label: "Cricket Top",
        variant: "Top",
        collectionId: 8,
        image:
          "/portfolio_Images/cricket_t_shirts/34444156_05_sublimated_cricket_wears.jpg",
      },
      {
        label: "Cricket Trouser",
        variant: "Bottom",
        collectionId: 14,
        image: "/portfolio_Images/trousers/13428431_388.jpg",
      },
    ],
  },
  {
    heading: "Soccer",
    cards: [
      {
        label: "Soccer Top",
        variant: "Top",
        collectionId: 9,
        image:
          "/portfolio_Images/t_shirts/20202007_Back_Soccer_Jersey_kit_Mockup.jpg",
      },
      {
        label: "Soccer Bottom",
        variant: "Bottom",
        collectionId: 16,
        image: "/portfolio_Images/soccer_shorts/9241398_342.jpg",
      },
    ],
  },
  {
    heading: "Basketball",
    cards: [
      {
        label: "Basketball Top",
        variant: "Top",
        collectionId: 11,
        image: "/portfolio_Images/basketball/AdobeStock_367540139.jpeg",
      },
      {
        label: "Basketball Bottom",
        variant: "Bottom",
        collectionId: 15,
        image: "/portfolio_Images/basketball_shorts/13746308_A200.jpg",
      },
    ],
  },
];

export default function UniformPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FC] py-14 sm:py-16">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#143D59]">
            Uniform Collection
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
            Choose Your Uniform Style
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Explore tops and bottoms by sport. Click any card to open the
            matching product in our collection.
          </p>
        </header>

        {uniformSections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {section.heading}
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {section.cards.map((card) => (
                <Link
                  key={card.label}
                  href={`/collection/${card.collectionId}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-[#F3F6FC]">
                    <Image
                      src={card.image}
                      alt={card.label}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center justify-between px-4 py-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#143D59]">
                        {card.variant}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-slate-900">
                        {card.label}
                      </h3>
                    </div>
                    <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-[#143D59]">
                      View
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </main>
  );
}
