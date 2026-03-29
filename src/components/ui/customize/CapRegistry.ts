/**
 * capRegistry.ts
 * ──────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for every cap product.
 *
 * HOW TO ADD A NEW CAP:
 *  1. Create its SVG component (SolidCapSVG or PanelCapSVG pattern).
 *  2. Add an entry to CAP_REGISTRY below.
 *  3. The label must match exactly what is in ProductDropdown MENU_ITEMS.
 *
 * That's it — CustomizePanel and MultiProductCustomizer adapt automatically.
 * ──────────────────────────────────────────────────────────────
 */

import type { CapConfig } from "@/types/cap.types";

// ── SVG components ────────────────────────────────────────────
import SolidCapSVG, { DEFAULT_SOLID_COLORS } from "./SolidCapSVG";
import PanelCapSVG, { DEFAULT_PANEL_COLORS } from "./PanelCapSVG";
import CustomCricketBaggyCapSingleColor from "@/components/SVG/Single-Color/CustomCricketBaggyCapSingleColor";
import CustomBeanies from "@/components/SVG/Single-Color/CustomBeanies";
import CustomCricketBaggyCapMultiColor, {
  DEFAULT_BAGGY_MULTI_COLORS,
} from "@/components/SVG/Multi-Color/CustomCricketBaggyCapMultiColor";
import SunCricketHat, {
  DEFAULT_SUN_CRICKET_HAT_COLORS,
} from "@/components/SVG/Multi-Color/SunCricketHatSVG";
import CustomBucketHat from "@/components/SVG/Multi-Color/BucketHatSVG";
import HonoursCapSVG from "@/components/SVG/Single-Color/HonoursCapSVG";
import PerformanceCapSVG from "@/components/SVG/Multi-Color/PerformanceCapSVG";
import BaseballSVG from "@/components/SVG/Multi-Color/BaseballCapSVG";
import FlatPeak5SVG from "@/components/SVG/Multi-Color/FlatPeak5SVG";
import FlatPeak6SVG from "@/components/SVG/Multi-Color/FlatPeak6SVG";
import VisorSVG from "@/components/SVG/Multi-Color/VisorSVG";
import TruckerCapSVG from "@/components/SVG/Multi-Color/TruckerCapSVG";
// import TruckerCapSVG, { DEFAULT_TRUCKER_COLORS } from "./TruckerCapSVG";
// … add more imports as you build out your SVG library

const STANDARD_MULTI_PANELS = [
  { key: "crown", label: "Crown" },
  { key: "brim", label: "Brim" },
  { key: "side", label: "Side Panels" },
  { key: "back", label: "Back Panel" },
];

const BUCKET_PANELS = [
  { key: "id_1", label: "Top Surface" },
  { key: "id_2", label: "Base Surface" },
];

const SIX_ZONE_PANELS = [
  { key: "id_1", label: "Front Panels" },
  { key: "id_2", label: "Peak" },
  { key: "id_3", label: "Side Panels" },
  { key: "id_4", label: "Back Panel" },
  { key: "id_5", label: "Top Button" },
  { key: "id_6", label: "Stitching / Accent" },
];

const BAGGY_MULTI_PANELS = Object.keys(DEFAULT_BAGGY_MULTI_COLORS).map(
  (key) => ({
    key,
    label: key.startsWith("id_")
      ? `Path ${key.replace("id_", "")}`
      : key
          .replace(/[_-]/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
  }),
);

const PERFORMANCE_PANELS = [
  { key: "crown", label: "Crown" },
  { key: "brim", label: "Brim" },
  { key: "back", label: "Back Panel" },
  { key: "eyelets", label: "Eyelets" },
  { key: "strap", label: "Strap" },
];

const VISOR_PANELS = [
  { key: "id_1", label: "Top Surface" },
  { key: "id_2", label: "Base Surface" },
  { key: "id_3", label: "Band" },
];

const CAP_REGISTRY: CapConfig[] = [
  {
    id: "baggy-single",
    label: "Custom Cricket Baggy Caps (Single Color)",
    type: "solid",
    defaultColors: DEFAULT_SOLID_COLORS,
    SVGComponent: CustomCricketBaggyCapSingleColor,
  },

  {
    id: "baggy-multi",
    label: "Custom Cricket Baggy Caps (Multi Color)",
    type: "panel",
    panels: BAGGY_MULTI_PANELS,
    defaultColors: DEFAULT_BAGGY_MULTI_COLORS,
    SVGComponent: CustomCricketBaggyCapMultiColor,
  },

  {
    id: "school",
    label: "Custom Sun Cricket Hat",
    type: "panel",
    panels: [
      { key: "id_1", label: "Top Surface" },
      { key: "id_2", label: "Base Surface" },
      { key: "id_3", label: "Vent" },
    ],
    defaultColors: DEFAULT_SUN_CRICKET_HAT_COLORS,
    SVGComponent: SunCricketHat,
  },
  {
    id: "honours",
    label: "Custom Cricket Honours Cap",
    type: "solid",
    defaultColors: {
      solid: "#FFFFFF",
    },
    SVGComponent: HonoursCapSVG,
  },
  {
    id: "performance",
    label: "Custom Cricket Performance Cap",
    type: "panel",
    panels: PERFORMANCE_PANELS,
    defaultColors: {
      crown: "#523233",
      brimTop: "#FFFF66",
      brimBottom: "#E7B800",
      back: "#611078",
      button: "#FA8805",
      eyelets: "#088008",
      strap: "#ffffff",
    },
    SVGComponent: PerformanceCapSVG,
  },
  {
    id: "baseball",
    label: "Custom Baseball Cap",
    type: "panel",
    panels: SIX_ZONE_PANELS,
    defaultColors: {
      id_1: "#523233",
      id_2: "#FFFF66",
      id_3: "#088008",
      id_4: "#611078",
      id_5: "#FA8805",
      id_6: "#EF4444",
    },
    SVGComponent: BaseballSVG,
  },
  {
    id: "visor",
    label: "Custom Visor",
    type: "panel",
    panels: VISOR_PANELS,
    defaultColors: {
      id_1: "#523233",
      id_2: "#FFFF66",
      id_3: "#088008",
    },
    SVGComponent: VisorSVG,
  },
  {
    id: "bucket",
    label: "Custom Bucket Hat",
    type: "panel",
    panels: BUCKET_PANELS,
    defaultColors: {
      id_1: "#523233",
      id_2: "#FFFF66",
    },
    SVGComponent: CustomBucketHat,
  },
  {
    id: "beanie",
    label: "Custom Beanies",
    type: "solid",
    defaultColors: DEFAULT_SOLID_COLORS,
    SVGComponent: CustomBeanies,
  },

  // ── PANEL TYPE EXAMPLES ───────────────────────────────────

  {
    id: "trucker",
    label: "Custom Trucker Cap",
    type: "panel",
    panels: [
      { key: "crown", label: "Crown" },
      { key: "brim", label: "Brim" },
      { key: "side", label: "Side Panels" },
      { key: "back", label: "Back Panel" },
      { key: "button", label: "Top Button" },
    ],
    defaultColors: DEFAULT_PANEL_COLORS,
    SVGComponent: TruckerCapSVG,
  },
  {
    id: "flat-5",
    label: "Custom Flat Peak Cap (5 Panels)",
    type: "panel",
    panels: SIX_ZONE_PANELS,
    defaultColors: {
      id_1: "#FFFF00",
      id_2: "#660818",
      id_3: "#523233",
      id_4: "#050840",
      id_5: "#660818",
      id_6: "#111111",
    },
    SVGComponent: FlatPeak5SVG,
  },
  {
    id: "flat-6",
    label: "Custom Flat Peak Cap (6 Panels)",
    type: "panel",
    panels: SIX_ZONE_PANELS,
    defaultColors: {
      id_1: "#FFFF00",
      id_2: "#FC92EA",
      id_3: "#FA8805",
      id_4: "#611078",
      id_5: "#FC92EA",
      id_6: "#111111",
    },
    SVGComponent: FlatPeak6SVG,
  },
];

// ─────────────────────────────────────────────────────────────
// Lookup helpers
// ─────────────────────────────────────────────────────────────

/** Get config by product label (must match MENU_ITEMS label exactly) */
export function getCapByLabel(label: string): CapConfig | undefined {
  return CAP_REGISTRY.find((c) => c.label === label);
}

/** Get config by id */
export function getCapById(id: string): CapConfig | undefined {
  return CAP_REGISTRY.find((c) => c.id === id);
}

/** First cap in the registry (used as default selection) */
export const DEFAULT_CAP: CapConfig = CAP_REGISTRY[0];

export default CAP_REGISTRY;
