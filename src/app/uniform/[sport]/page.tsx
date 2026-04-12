import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { sportUniforms, getSportBySlug } from "@/data/uniformSports";

interface Props {
  params: Promise<{ sport: string }>;
}

export async function generateStaticParams() {
  return sportUniforms.map((s) => ({ sport: s.slug }));
}

export default async function UniformSportPage({ params }: Props) {
  const { sport } = await params;
  const data = getSportBySlug(sport);

  if (!data) notFound();

  return (
    <main className="min-h-screen bg-[#F3F6FC] py-14 sm:py-16">
      <Container className="space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#143D59]">
            {data.name} Uniform
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
            {data.name} Collection
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Explore our full range of custom {data.name.toLowerCase()} gear.
            Every product can be customized with your team colors, logos, and
            branding.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.products.map((product) => (
            <Link
              key={product.label}
              href={`/collection/${product.collectionId}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-[#143D59] shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-36 w-full sm:h-40">
                <Image
                  src={product.image}
                  alt={product.label}
                  fill
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
                  {product.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
