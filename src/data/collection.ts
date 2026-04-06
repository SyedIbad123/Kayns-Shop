import type { ClothingProductType } from "@/data/clothingFormConfig";

const CAPS_COLLECTION_INTRO =
  "From the structured snap of a trucker cap to the laid-back drape of a bucket hat — KAYNS caps collection has a style for every head and every moment. The baggy cap brings oversized street energy, the flat peak cap delivers sharp urban attitude, the visor keeps it clean and athletic, the sun hat and cricket cap offer classic coverage with a modern edge, and the beanie locks in warmth without losing an ounce of style.";

const CAPS_COLLECTION_BRANDING =
  "At KAYNS every cap is a custom branding opportunity — embroidered logos, signature colorways, and precision craftsmanship across every style. Whether you're kitting out a team, a brand, or a whole collection, we make sure every cap tells your story perfectly.";

const CAPS_COLLECTION_COPY = `${CAPS_COLLECTION_INTRO} ${CAPS_COLLECTION_BRANDING}`;

const CRICKET_TSHIRT_COPY =
  "Built for the pitch, loved beyond it. Our cricket t-shirts combine lightweight performance fabric with a sharp, athletic cut that moves with you through every over. Sweat-wicking, durable, and designed to handle the heat of match day without compromising on style. KAYNS brings your team's identity to life on every cricket shirt — custom numbers, logos, and colorways that make your squad look as sharp as they play.";

const SOCCER_TSHIRT_COPY =
  "From kickoff to the final whistle, our soccer t-shirts are engineered for full-match performance. Lightweight mesh construction ensures maximum airflow while the tailored athletic fit keeps you moving freely. Sharp on the field, clean off it — a jersey built for players who take the game seriously. At KAYNS we craft soccer jerseys that represent your club with pride — fully customized with crests, player names, numbers, and sponsor logos done with professional precision.";

const RUGBY_TSHIRT_COPY =
  "Built tough for a tough game. Our rugby t-shirts are constructed from heavy-duty stretch fabric that withstands the physical demands of every tackle, scrum, and sprint. Reinforced stitching and a locked-in fit mean this shirt stays with you no matter how intense the match gets. KAYNS delivers rugby shirts built to your team's identity — bold custom prints, reinforced branding, and colors that command respect the moment your squad steps onto the field.";

const BASKETBALL_SINGLET_COPY =
  "Lightweight, breathable, and built for the game. Our basketball singlets feature a wide-cut armhole and airy mesh construction that keeps you cool through every quarter. Designed for full range of motion so nothing slows you down when you're driving to the basket or defending hard on the wing. KAYNS delivers basketball singlets with full custom treatment — player names, numbers, team colors, and sponsor logos crafted to make your squad look like they just walked off an NBA roster.";

const POLO_TSHIRT_COPY =
  "A timeless classic reimagined for modern sport and style. Our polo t-shirts are crafted from breathable, premium fabric that keeps you cool under pressure. Whether you're on the court, at training, or stepping out — this is the piece that works everywhere, every time. At KAYNS, we customize every polo to your exact vision — your colors, your logo, your identity stitched into every thread. From team kits to brand uniforms, we deliver perfection.";

const TROUSER_COPY =
  "Engineered for movement, designed for life. Our trousers combine athletic performance with everyday wearability — flexible fabric, reinforced seams, and a tailored fit that works whether you're training, travelling, or just taking it easy. Built to last through heavy use without losing their shape or comfort. At KAYNS we customize trousers for teams and brands alike — embroidered logos, custom stripe detailing, and signature colorways that make even the basics a powerful extension of your identity.";

const NETBALL_BUMMER_COPY =
  "Designed for the demands of the netball court. Our netball bummers offer a secure, comfortable fit that stays in place through every jump, pivot, and sprint. Made from stretch-performance fabric that moves with your body — lightweight, durable, and built specifically for the fast pace of the game. KAYNS brings full customization to netball bummers — team colors, logo prints, and player details delivered with the precision and quality your squad deserves on and off the court.";

const BASKETBALL_SHORT_COPY =
  "Court-ready from the first bounce. Our basketball shorts are cut long, loose, and breathable — giving you the freedom and airflow needed to perform at full intensity. Moisture-wicking fabric keeps you dry while the elastic waistband with drawstring ensures a secure fit through every play. At KAYNS we fully customize basketball shorts with team branding, bold graphic prints, and colorways that match your full kit — because looking unified on court is half the confidence.";

const SOCCER_SHORT_COPY =
  "Lightweight, fast, and built for the beautiful game. Our soccer shorts feature a clean athletic cut with stretch fabric that moves with every sprint, slide, and kick. Designed to stay out of your way so your focus stays entirely on the ball and the goal ahead. KAYNS crafts soccer shorts that complete your team's look — matching your jersey's colors, adding club crests, and delivering the kind of full-kit consistency that makes your team look truly professional.";

const RUGBY_SHORT_COPY =
  "Tough enough for the contact, comfortable enough for the full eighty minutes. Our rugby shorts are built from reinforced stretch fabric with a locked waistband that stays put through scrums, tackles, and open-field runs. Durable, flexible, and designed to take everything the game demands without flinching. At KAYNS we customize rugby shorts to complete your team's identity — matched colorways, embroidered branding, and reinforced quality that holds up through the toughest seasons game after game.";

const SWEATSHIRT_COPY =
  "Comfort that never goes out of style. Our sweatshirts are crafted from soft, heavyweight fleece that wraps you in warmth without the bulk. Perfect for post-training cool-downs, casual days, or layering up in cold weather — this is the essential piece every wardrobe needs year-round. KAYNS turns the humble sweatshirt into a statement — custom embroidery, screen prints, and branded designs that make your team, club, or brand look effortlessly premium every single day.";

const FULL_SLEEVES_PUFFER_COPY =
  "Maximum warmth, zero compromise on style. Our full sleeves puffer jacket is designed for cold-weather performance — insulated fill keeps body heat locked in while the lightweight shell lets you move freely. From sidelines to streets, this jacket handles whatever the season throws at you. KAYNS customizes every puffer to carry your brand boldly — embroidered logos, custom color panels, and tailored fits that make your team look elite even in the coldest conditions.";

const HALF_SLEEVES_PUFFER_COPY =
  "The best of both worlds — warmth where you need it, freedom where you want it. Our half sleeves puffer jacket gives you insulated core coverage without restricting arm movement, making it the perfect layering piece for active outdoor sessions and casual cold-weather outings alike. At KAYNS we customize half-sleeve puffers with sharp branding and bold colorways — giving your team or brand a distinctive edge that stands out on and off the field.";

const TRACK_JACKET_COPY =
  "Speed meets style in every stitch. Our track jacket is engineered for athletes who demand performance and aesthetics in equal measure. Lightweight, breathable, and built with a streamlined fit — it transitions effortlessly from warm-up sessions to post-match street style without missing a beat. KAYNS crafts track jackets that carry your brand with confidence — custom panels, embroidered logos, and signature color combinations that make your squad unmistakable from warm-up to podium.";

const ZIP_TOP_JACKET_COPY =
  "Versatility is the name of the game. Our zip top jacket gives you full control over your comfort — zip up for warmth, open for airflow, layer it over anything and look sharp doing it. Built from durable performance fabric with a clean athletic silhouette that works for every occasion. At KAYNS every zip top is a branding opportunity — your logo, your palette, your identity executed with the kind of custom craftsmanship that separates serious brands from the rest.";

export interface CollectionProduct {
  id: number;
  name: string;
  image: string;
}

export interface CollectionItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  products?: CollectionProduct[];
  productType?: ClothingProductType;
}

export interface CollectionSection {
  key: "caps" | "t-shirts" | "bottom" | "jackets";
  title: string;
  items: CollectionItem[];
}

const capProducts: CollectionProduct[] = [
  {
    id: 1,
    name: "Beanie",
    image: "/beanies.png",
  },
  {
    id: 2,
    name: "Baggy Cap",
    image: "/baggy_cap.png",
  },
  {
    id: 3,
    name: "Bucket Hat",
    image: "/bucket_hat.png",
  },
  {
    id: 4,
    name: "Flat Peak Cap",
    image: "/flat_peak_cap.png",
  },
  {
    id: 5,
    name: "Sun Hat",
    image: "/sun_hat.png",
  },
  {
    id: 6,
    name: "Trucker Cap",
    image: "/trucker_hat.png",
  },
  {
    id: 7,
    name: "Visor",
    image: "/visor.png",
  },
];

const capsCollection: CollectionItem[] = [
  {
    id: 1,
    title: "Beanie",
    description: CAPS_COLLECTION_COPY,
    image: "/beanies.png",
    products: capProducts,
  },
  {
    id: 2,
    title: "Baggy Cap",
    description: CAPS_COLLECTION_COPY,
    image: "/baggy_cap.png",
    products: capProducts,
  },
  {
    id: 3,
    title: "Bucket Hat",
    description: CAPS_COLLECTION_COPY,
    image: "/bucket_hat.png",
    products: capProducts,
  },
  {
    id: 4,
    title: "Flat Peak Cap",
    description: CAPS_COLLECTION_COPY,
    image: "/flat_peak_cap.png",
    products: capProducts,
  },
  {
    id: 5,
    title: "Sun Hat",
    description: CAPS_COLLECTION_COPY,
    image: "/sun_hat.png",
    products: capProducts,
  },
  {
    id: 6,
    title: "Trucker Cap",
    description: CAPS_COLLECTION_COPY,
    image: "/trucker_hat.png",
    products: capProducts,
  },
  {
    id: 7,
    title: "Visor",
    description: CAPS_COLLECTION_COPY,
    image: "/visor.png",
    products: capProducts,
  },
];

const tshirtsCollection: CollectionItem[] = [
  {
    id: 8,
    title: "Cricket T-Shirt",
    description: CRICKET_TSHIRT_COPY,
    image: "/frame_1.png",
    productType: "t-shirt",
  },
  {
    id: 9,
    title: "Soccer T-Shirt",
    description: SOCCER_TSHIRT_COPY,
    image: "/frame_2.png",
    productType: "t-shirt",
  },
  {
    id: 10,
    title: "Rugby T-Shirt",
    description: RUGBY_TSHIRT_COPY,
    image: "/frame_3.png",
    productType: "t-shirt",
  },
  {
    id: 11,
    title: "Basketball Singlet",
    description: BASKETBALL_SINGLET_COPY,
    image: "/frame_9.png",
    productType: "t-shirt",
  },
  {
    id: 12,
    title: "Polo T-Shirt",
    description: POLO_TSHIRT_COPY,
    image: "/frame_17.png",
    productType: "polo-shirt",
  },
];

const bottomCollection: CollectionItem[] = [
  {
    id: 13,
    title: "Trouser",
    description: TROUSER_COPY,
    image: "/frame_11.png",
    productType: "trousers",
  },
  {
    id: 14,
    title: "Netball Bummer",
    description: NETBALL_BUMMER_COPY,
    image: "/frame_13.png",
    productType: "netball-shorts",
  },
  {
    id: 15,
    title: "Basketball Short",
    description: BASKETBALL_SHORT_COPY,
    image: "/frame_14.png",
    productType: "basketball-shorts",
  },
  {
    id: 16,
    title: "Soccer Short",
    description: SOCCER_SHORT_COPY,
    image: "/frame_15.png",
    productType: "football-shorts",
  },
  {
    id: 17,
    title: "Rugby Short",
    description: RUGBY_SHORT_COPY,
    image: "/frame_16.png",
    productType: "rugby-shorts",
  },
];

const jacketsCollection: CollectionItem[] = [
  {
    id: 18,
    title: "Sweatshirt",
    description: SWEATSHIRT_COPY,
    image: "/frame_4.png",
    productType: "hooded-sweatshirt",
  },
  {
    id: 19,
    title: "Full Sleeves Puffer Jacket",
    description: FULL_SLEEVES_PUFFER_COPY,
    image: "/frame_5.png",
    productType: "puffer-jacket",
  },
  {
    id: 20,
    title: "Half Sleeves Puffer Jacket",
    description: HALF_SLEEVES_PUFFER_COPY,
    image: "/frame_6.png",
    productType: "reversible-jacket",
  },
  {
    id: 21,
    title: "Track Jacket",
    description: TRACK_JACKET_COPY,
    image: "/frame_7.png",
    productType: "track-jacket",
  },
  {
    id: 22,
    title: "Zip Top Jacket",
    description: ZIP_TOP_JACKET_COPY,
    image: "/frame_8.png",
    productType: "reversible-jacket",
  },
];

export const collectionSections: CollectionSection[] = [
  {
    key: "caps",
    title: "Caps",
    items: capsCollection,
  },
  {
    key: "t-shirts",
    title: "T-Shirts",
    items: tshirtsCollection,
  },
  {
    key: "bottom",
    title: "Bottom",
    items: bottomCollection,
  },
  {
    key: "jackets",
    title: "Jackets",
    items: jacketsCollection,
  },
];

/** Flat lookup: get any CollectionItem by id */
export const allCollections: CollectionItem[] = collectionSections.flatMap(
  (section) => section.items,
);

export function getCollectionById(id: number): CollectionItem | undefined {
  return allCollections.find((c) => c.id === id);
}
