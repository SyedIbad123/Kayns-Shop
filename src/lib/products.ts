export type ProductSize = "large" | "wide" | "tall" | "medium" | "small";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  size: ProductSize;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "heritage-match-jersey",
    name: "Heritage Match Jersey",
    category: "Jerseys",
    description: "Premium game-day jersey with breathable contour panels.",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1400&q=80",
    size: "large",
  },
  {
    id: 2,
    slug: "altitude-training-tee",
    name: "Altitude Training Tee",
    category: "Training",
    description:
      "Lightweight stretch fabric built for high-intensity sessions.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
    size: "medium",
  },
  {
    id: 3,
    slug: "striker-elite-trackpants",
    name: "Striker Elite Trackpants",
    category: "Training",
    description: "Tapered athletic cut with zip ankle vents.",
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1400&q=80",
    size: "tall",
  },
  {
    id: 4,
    slug: "sideline-storm-jacket",
    name: "Sideline Storm Jacket",
    category: "Limited Edition",
    description: "Weatherproof shell engineered for all-season play.",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=80",
    size: "wide",
  },
  {
    id: 5,
    slug: "captain-armband-pro",
    name: "Captain Armband Pro",
    category: "Accessories",
    description: "High-visibility armband with anti-slip inner grip.",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80",
    size: "medium",
  },
  {
    id: 6,
    slug: "tactical-gym-sack",
    name: "Tactical Gym Sack",
    category: "Accessories",
    description: "Compact carry sack with reinforced drawcord closure.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80",
    size: "small",
  },
  {
    id: 7,
    slug: "velocity-goalie-kit",
    name: "Velocity Goalie Kit",
    category: "Jerseys",
    description: "Impact-ready goalkeeper set with padded zones.",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1400&q=80",
    size: "medium",
  },
  {
    id: 8,
    slug: "founders-edition-home-kit",
    name: "Founders Edition Home Kit",
    category: "Limited Edition",
    description: "Collector's release featuring signature woven crest.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80",
    size: "large",
  },
  {
    id: 9,
    slug: "aero-mesh-cap",
    name: "Aero Mesh Cap",
    category: "Accessories",
    description: "Ventilated cap with structured front and snap closure.",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1400&q=80",
    size: "wide",
  },
  {
    id: 10,
    slug: "endurance-compression-top",
    name: "Endurance Compression Top",
    category: "Training",
    description: "Body-mapped compression for support and recovery.",
    image:
      "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=1400&q=80",
    size: "tall",
  },
  {
    id: 11,
    slug: "matchday-crew-sweatshirt",
    name: "Matchday Crew Sweatshirt",
    category: "Teamwear",
    description: "Soft brushed fleece with modern athletic silhouette.",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80",
    size: "medium",
  },
  {
    id: 12,
    slug: "teamline-duffel",
    name: "Teamline Duffel",
    category: "Accessories",
    description: "Durable travel duffel with ventilated shoe compartment.",
    image:
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1400&q=80",
    size: "small",
  },
  {
    id: 13,
    slug: "legacy-away-jersey",
    name: "Legacy Away Jersey",
    category: "Jerseys",
    description: "Clean away palette with precision-cut panel detailing.",
    image:
      "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1400&q=80",
    size: "wide",
  },
  {
    id: 14,
    slug: "apex-training-shorts",
    name: "Apex Training Shorts",
    category: "Training",
    description: "4-way stretch shorts with moisture-control lining.",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1400&q=80",
    size: "medium",
  },
  {
    id: 15,
    slug: "monogrammed-bucket-hat",
    name: "Monogrammed Bucket Hat",
    category: "Accessories",
    description: "Street-inspired bucket hat with embroidered monogram.",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80",
    size: "tall",
  },
  {
    id: 16,
    slug: "champions-celebration-kit",
    name: "Champions Celebration Kit",
    category: "Limited Edition",
    description: "Special release kit commemorating title-winning moments.",
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1400&q=80",
    size: "large",
  },
  {
    id: 17,
    slug: "hydration-belt-pro",
    name: "Hydration Belt Pro",
    category: "Accessories",
    description: "Race-day hydration belt with bounce-free fit.",
    image:
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1400&q=80",
    size: "medium",
  },
  {
    id: 18,
    slug: "insulated-travel-parka",
    name: "Insulated Travel Parka",
    category: "Teamwear",
    description: "Longline insulated outerwear for cold match nights.",
    image:
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=1400&q=80",
    size: "wide",
  },
  {
    id: 19,
    slug: "academy-drill-vest",
    name: "Academy Drill Vest",
    category: "Training",
    description: "Ultra-light bib vest designed for quick drill rotations.",
    image:
      "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&w=1400&q=80",
    size: "medium",
  },
  {
    id: 20,
    slug: "signature-supporter-scarf",
    name: "Signature Supporter Scarf",
    category: "Accessories",
    description: "Premium jacquard scarf with signature Kayns motif.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
    size: "small",
  },
];
