import "server-only";

import path from "node:path";
import { cache } from "react";
import { portfolioImageByteSize } from "@/data/portfolioImageBytes";
import type { Product, ProductSize } from "@/lib/products";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const MAX_PORTFOLIO_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const CATEGORY_CONFIG = [
  { folder: "basketball", label: "Basketball" },
  { folder: "basketball_shorts", label: "Basketball Shorts" },
  { folder: "cricket_t_shirts", label: "Cricket T-Shirts" },
  { folder: "football_Scarf", label: "Football Scarves" },
  { folder: "hooded_sweatshirt", label: "Hooded Sweatshirts" },
  { folder: "netball_dress", label: "Netball Dresses" },
  { folder: "polo", label: "Polo Shirts" },
  { folder: "puffer_jacket", label: "Puffer Jackets" },
  { folder: "rugby_shirts", label: "Rugby Shirts" },
  { folder: "rugby_shorts", label: "Rugby Shorts" },
  { folder: "skirts_and_bummers", label: "Skirts and Bummers" },
  { folder: "soccer_shorts", label: "Soccer Shorts" },
  { folder: "t_shirts", label: "T-Shirts" },
  { folder: "track_jacket", label: "Track Jackets" },
  { folder: "trousers", label: "Trousers" },
  { folder: "ziptop", label: "Zip Tops" },
] as const;

type CategoryFolder = (typeof CATEGORY_CONFIG)[number]["folder"];

const portfolioImageManifest: Record<CategoryFolder, string[]> = {
  basketball: [
    "29529048_46_basketball_uniform_shorts_template_for_basketball_club.jpg",
    "29529315_89_basketball_uniform_shorts_template_for_basketball_club_front_and_back_view_sport_jersey.jpg",
    "30030990_136_basketball_uniform_shorts_template_for_basketball_club_front_and_back_view_sport_jersey.jpg",
    "AdobeStock_367540139.jpeg",
    "AdobeStock_456304294.jpeg",
    "AdobeStock_528163245.jpeg",
    "basekball 1.png",
  ],
  basketball_shorts: [
    "4402070_7.jpg",
    "4831604_492 (1).jpg",
    "13746308_A200.jpg",
    "21298261_25_clothes.jpg",
    "30637928_260_basketball_uniform_shorts_front_and_back_view_mock_ups_templates.jpg",
  ],
  cricket_t_shirts: [
    "9471424_4150801.jpg",
    "31400784_j17.jpg",
    "32312978_flat_illustrations_503.jpg",
    "32312983_flat_illustrations_504.jpg",
    "34444156_05_sublimated_cricket_wears.jpg",
    "34444156_05_sublimated_cricket_wearsw.jpg",
    "34444160_06_sublimated_cricket_wears.jpg",
    "34444160_06_sublimated_cricket_wearsdw.jpg",
    "34444164_07_sublimated_cricket_wears.jpg",
    "34444164_07_sublimated_cricket_wearsw.jpg",
    "cricket shirt-1.png",
    "cricket shirt-2.png",
    "cricket shirt-3.png",
  ],
  football_Scarf: [
    "WhatsApp Image 2023-09-25 at 00.23.36 (1).jpeg",
    "WhatsApp Image 2023-09-25 at 00.23.36.jpeg",
    "WhatsApp Image 2023-09-25 at 00.23.37 (2).jpeg",
    "WhatsApp Image 2023-09-25 at 00.23.38 (1).jpeg",
    "WhatsApp Image 2023-09-25 at 00.23.38.jpeg",
    "WhatsApp Image 2023-09-25 at 00.23.39 - Copy.jpeg",
    "WhatsApp Image 2023-09-25 at 00.23.39 (1) - Copy.jpeg",
    "WhatsApp Image 2023-09-25 at 00.23.39 (1).jpeg",
    "WhatsApp Image 2023-09-25 at 00.23.39.jpeg",
  ],
  hooded_sweatshirt: [
    "5629976_79.jpg",
    "5629978_81.jpg",
    "11006143_336.jpg",
    "23919295_00122_batch_118_25_clothes.jpg",
    "24306195_hoodie_side2_style.jpg",
    "30237725_7682056.jpg",
    "34444499_21_custom_long_sleeve_hoodie_design_and_template_illustration.jpg",
    "34444597_40_hoodie_fabrics_cotton_fleece_mock_ups_illustrations_templates.jpg",
    "hoodies (1).jpg",
    "hoodies (2).jpg",
    "hoodies (4).jpg",
    "kayns recent customer orders (1).jpeg",
    "WhatsApp Image 2024-01-20 at 00.58.08_568a7c18.jpg",
  ],
  netball_dress: [
    "33663300_g66.jpg",
    "34444265_04_sublimated_hockey_dresses_mock_ups.jpg",
    "34444272_05_sublimated_hockey_dresses_mock_ups (1).jpg",
    "34444272_05_sublimated_hockey_dresses_mock_ups.jpg",
    "34444286_07_sublimated_vests_mock_ups.jpg",
    "34734773_17_singlet_mock_ups.jpg",
    "34734825_11_netball_dresses_sublimated_mock_up_illustration_templates.jpg",
    "34734831_13_netball_dresses_sublimated_mock_up_illustrations_templates (1).jpg",
    "34734834_14_netball_dresses_sublimated_mock_ups_illustration_template.jpg",
    "34734869_19_men_athletics_sublimated_vests (1).jpg",
    "34961605_21_sublimated_hockey_and_netball_skorts_mock_ups.jpg",
    "dresses-black-yellow.png",
  ],
  polo: [
    "3.jpg",
    "79.jpg",
    "147q.jpg",
    "150.jpg",
    "151.jpg",
    "162.jpg",
    "3181606_75.jpg",
    "7864036.jpg",
    "10711549_358.jpg",
    "19177092_Polo_50_2.jpg",
    "26618171_polo_shirt_48.jpg",
    "31632204_7840583.jpg",
  ],
  puffer_jacket: [
    "25650891_kerfin7_nea_2604.jpg",
    "25650894_kerfin7_nea_2605.jpg",
    "26414971_lightweight_puffer_jacket_for_the_winter_men_s_front.jpg",
    "26414972_lightweight_puffer_jacket_for_the_winter_men_s_side_left.jpg",
    "29205983_men_s_down_swether_front.jpg",
    "29205999_men_s_down_swether_side_right.jpg",
    "33758607_8108337.jpg",
    "33758619_8108473.jpg",
    "33758621_8108450.jpg",
    "33758704_8011084.jpg",
    "34341489_8142014.jpg",
    "34341489_8142015.jpg",
    "34341493_8142027.jpg",
    "34341502_8150149.jpg",
    "34341512_8147160.jpg",
    "34341512_8147163.jpg",
    "AdobeStock_508813371.jpeg",
  ],
  rugby_shirts: [
    "16542136_07.jpg",
    "29590104_sports_jersey_1.jpg",
    "34181027_45nfl_buffalo_2.jpg",
    "34323098_soccer_1c.jpg",
    "34734951_07_rugby_sublimated_shirts_mock_up_illustrations_templates.jpg",
    "34734954_09_rugby_sublimated_shirts_mock_ups_illustration.jpg",
    "34734994_25_sublimated_rugby_jerseys_mock_ups.jpg",
    "AdobeStock_387698156.jpeg",
    "AdobeStock_475887271.jpeg",
    "AdobeStock_579018863.jpeg",
    "Short.png",
    "Short2.png",
  ],
  rugby_shorts: [
    "369-3694814_rugby-shorts-stretch-panels-hd-png-download.png",
    "1391916-cover.jpg",
    "29286457_00146_batch_142_05_soccer_clothes.jpg",
    "30637928_260_basketball_uniform_shorts_front_and_back_view_mock_ups_templates.jpg",
    "30638137_287_basketball_uniform_shorts_front_and_back_view_mock_ups_templates.jpg",
    "31110451_p07.jpg",
    "rugby-imports-usa-pro-xv-rugby-shorts-28417756692595_1600x.webp",
  ],
  skirts_and_bummers: [
    "26537086_sports_short_mockup.jpg",
    "30638181_291_basketball_uniform_shorts_front_and_back_view_mock_ups_templates.jpg",
    "33466037_15_sublimated_sleeveless_v_neck_cheer_dress_mock_ups.jpg",
    "34444286_07_sublimated_vests_mock_ups (1).jpg",
    "download (4).jpg",
  ],
  soccer_shorts: [
    "4831604_492 (1).jpg",
    "9241398_342.jpg",
    "13746305_A197 (1).jpg",
    "29613742_00149_batch_145_02_pants.jpg",
    "30638137_287_basketball_uniform_shorts_front_and_back_view_mock_ups_templates.jpg",
    "31110451_p07.jpg",
  ],
  t_shirts: [
    "4302.jpg",
    "9471420_4150805.jpg",
    "9540535_4154899.jpg",
    "12120020_312.jpg",
    "12120033_318 (1).jpg",
    "13428423_306.jpg",
    "14476034_445.jpg",
    "20202007_Back_Soccer_Jersey_kit_Mockup.jpg",
    "20202047_Right_Side_Back_Soccer_Jersey_kit_Mockup.jpg",
    "31349449_239.jpg",
  ],
  track_jacket: [
    "3933765_397.jpg",
    "7477755_600.jpg",
    "19263233_11_clothes.jpg",
    "28783205_hoodie_front.jpg",
    "34953179_21_training_track_suits_mock_ups.jpg",
    "AdobeStock_396820548.jpeg",
    "AdobeStock_396820627.jpeg",
    "AdobeStock_510284506.jpeg",
    "AdobeStock_513089494.jpeg",
    "AdobeStock_514613369.jpeg",
  ],
  trousers: [
    "3434036_163.jpg",
    "3784398_354 (1).jpg",
    "3784398_354.jpg",
    "3897888_386.jpg",
    "13428431_388.jpg",
    "13428434_391.jpg",
    "18932584_Track_pant_logo_design_mockup.jpg",
    "25303406_pants_mockup_front (1).jpg",
    "34444156_05_sublimated_cricket_wears.jpg",
    "34444160_06_sublimated_cricket_wears.jpg",
    "34444164_07_sublimated_cricket_wears.jpg",
  ],
  ziptop: [
    "24778350_dress_jacket_side_r.jpg",
    "24778597_training_jersey_side.jpg",
    "25293356_d_102.jpg",
    "26414996_raglan_zipper_t_shirt_long_sleeve_side_left.jpg",
    "28878698_design_942.jpg",
    "34343944_tracktop_halfzip (1).jpg",
    "34343944_tracktop_halfzip.jpg",
    "34343964_tracktop_raglan_halfzip.jpg",
  ],
};

const SIZE_PATTERN: ProductSize[] = [
  "large",
  "medium",
  "wide",
  "tall",
  "small",
  "medium",
  "wide",
  "small",
  "tall",
  "medium",
];

function isImageFile(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();
  return IMAGE_EXTENSIONS.has(extension);
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => {
      if (/^\d+$/.test(part)) {
        return part;
      }

      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(" ");
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "portfolio-item";
}

function createUniqueSlug(baseSlug: string, usageCounter: Map<string, number>) {
  const seen = usageCounter.get(baseSlug) ?? 0;
  usageCounter.set(baseSlug, seen + 1);

  if (seen === 0) {
    return baseSlug;
  }

  return `${baseSlug}-${seen + 1}`;
}

function toPublicImagePath(folder: string, fileName: string) {
  const encodedFolder = encodeURIComponent(folder);
  const encodedFileName = encodeURIComponent(fileName);
  return `/portfolio_Images/${encodedFolder}/${encodedFileName}`;
}

function makeDisplayName(
  fileName: string,
  categoryLabel: string,
  categoryIndex: number,
) {
  const fileStem = path.parse(fileName).name;
  const cleanedStem = fileStem
    .replace(/[._-]+/g, " ")
    .replace(/\s*\(\d+\)$/g, "")
    .replace(/\s*-\s*copy$/i, "")
    .replace(/\bcopy\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const shouldFallback =
    !cleanedStem ||
    /^whatsapp image/i.test(cleanedStem) ||
    /^adobestock/i.test(cleanedStem) ||
    /^\d+$/.test(cleanedStem);

  if (shouldFallback) {
    return `${categoryLabel} Design ${categoryIndex}`;
  }

  const titled = toTitleCase(cleanedStem);
  if (titled.length > 72) {
    return `${categoryLabel} Design ${categoryIndex}`;
  }

  return titled;
}

function makeDescription(categoryLabel: string) {
  return `Custom ${categoryLabel.toLowerCase()} sample from the Kayns Shop portfolio.`;
}

function getPortfolioImageSize(folder: CategoryFolder, fileName: string) {
  return portfolioImageByteSize[`${folder}/${fileName}`];
}

function isAllowedPortfolioImageSize(folder: CategoryFolder, fileName: string) {
  const fileSize = getPortfolioImageSize(folder, fileName);

  // Keep unknown files to avoid accidental content drops if manifest is stale.
  if (typeof fileSize !== "number") {
    return true;
  }

  return fileSize <= MAX_PORTFOLIO_IMAGE_SIZE_BYTES;
}

function getCategoryImageFiles(folder: CategoryFolder) {
  return (portfolioImageManifest[folder] ?? []).filter(
    (fileName) =>
      isImageFile(fileName) && isAllowedPortfolioImageSize(folder, fileName),
  );
}

export const getPortfolioProducts = cache((): Product[] => {
  const products: Product[] = [];
  const usageCounter = new Map<string, number>();
  let nextId = 1;

  CATEGORY_CONFIG.forEach(({ folder, label }) => {
    const imageFiles = getCategoryImageFiles(folder);

    imageFiles.forEach((fileName, categoryIndex) => {
      const baseSlug = slugify(`${folder}-${path.parse(fileName).name}`);
      const slug = createUniqueSlug(baseSlug, usageCounter);

      products.push({
        id: nextId,
        slug,
        name: makeDisplayName(fileName, label, categoryIndex + 1),
        category: label,
        description: makeDescription(label),
        image: toPublicImagePath(folder, fileName),
        size: SIZE_PATTERN[(nextId - 1) % SIZE_PATTERN.length],
      });

      nextId += 1;
    });
  });

  return products;
});

export function getPortfolioProductBySlug(slug: string) {
  return getPortfolioProducts().find((item) => item.slug === slug);
}
