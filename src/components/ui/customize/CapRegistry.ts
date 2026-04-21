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
import { DEFAULT_SOLID_COLORS } from "./SolidCapSVG";
import { DEFAULT_PANEL_COLORS } from "./PanelCapSVG";
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

const BUCKET_PANELS = [
  { key: "id_1", label: "Head Color" },
  { key: "id_2", label: "Brim Color" },
];

// ── Motif panel options (independent of colour panels) ────────

/** Panels 1–10 for baggy caps */
const BAGGY_MOTIF_PANELS = Array.from({ length: 10 }, (_, i) => ({
  key: `motif_p${i + 1}`,
  label: `Panel ${i + 1}`,
}));

const TRUCKER_MOTIF_PANELS = [
  { key: "motif_p1", label: "Panel 1" },
  { key: "motif_p2", label: "Panel 2" },
  { key: "motif_p4", label: "Panel 4" },
];

const BUCKET_MOTIF_PANELS = [{ key: "motif_p2", label: "Panel 2" }];

const SUN_MOTIF_PANELS = [{ key: "motif_p1", label: "Panel 1" }];

const BASEBALL_MOTIF_PANELS = [
  { key: "motif_p1", label: "Panel 1" },
  { key: "motif_p4", label: "Panel 4" },
  { key: "motif_p5", label: "Panel 5" },
];

const VISOR_MOTIF_PANELS = [{ key: "motif_p2", label: "Panel 2" }];

const BEANIE_MOTIF_PANELS = [
  { key: "motif_p1", label: "Panel 1" },
  { key: "motif_p2", label: "Panel 2" },
];

const HONOURS_MOTIF_PANELS = [{ key: "motif_p1", label: "Panel 1" }];

const SIX_ZONE_PANELS = [
  { key: "id_1", label: "Front Color" },
  { key: "id_2", label: "Peak Color" },
  { key: "id_3", label: "Middle Color" },
  { key: "id_4", label: "Back Color" },
  { key: "id_5", label: "Eyelet Color" },
  { key: "id_6", label: "Back Strap Color" },
];

const BASEBALL_PANELS = [
  { key: "id_1", label: "Front Color" },
  { key: "id_2", label: "Peak Color" },
  { key: "id_3", label: "Middle Color" },
  { key: "id_4", label: "Back Color" },
  { key: "id_5", label: "Eyelet Color" },
  { key: "id_6", label: "Back Strap Color" },
];

const BAGGY_MULTI_PANELS = Object.keys(DEFAULT_BAGGY_MULTI_COLORS).map(
  (key) => ({
    key,
    label: key.startsWith("id_")
      ? `Panel ${key.replace("id_", "")}`
      : key
          .replace(/[_-]/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
  }),
);

const PERFORMANCE_PANELS = [
  { key: "crown", label: "Front Color" },
  { key: "brim", label: "Peak Color" },
  { key: "back", label: "Back Color" },
  { key: "middle", label: "Middle Color" },
  { key: "eyelets", label: "Eyelet Color" },
  { key: "strap", label: "Back Strap Color" },
];

const VISOR_PANELS = [
  { key: "id_1", label: "Peak Color" },
  { key: "id_2", label: "Head Color" },
  { key: "id_3", label: "Back Strap Color" },
];

const BEANIE_PANEL = { solid: "#201E1E" };

const TRUCKER_PANELS = [
  { key: "crown", label: "Front Color / Panel 1" },
  { key: "brim", label: "Peak Color / Panel 2" },
  { key: "side", label: "Back Strap Color" },
  { key: "back", label: "Back Mesh Color / Panel 4" },
  { key: "button", label: "Button Color" },
];

const CAP_REGISTRY: CapConfig[] = [
  {
    id: "baggy-single",
    label: "Custom Cricket Baggy Caps (Single Color)",
    type: "solid",
    defaultColors: DEFAULT_SOLID_COLORS,
    motifPanels: BAGGY_MOTIF_PANELS,
    SVGComponent: CustomCricketBaggyCapSingleColor,
  },

  {
    id: "baggy-multi",
    label: "Custom Cricket Baggy Caps (Multi Color)",
    type: "panel",
    panels: BAGGY_MULTI_PANELS,
    defaultColors: DEFAULT_BAGGY_MULTI_COLORS,
    motifPanels: BAGGY_MOTIF_PANELS,
    SVGComponent: CustomCricketBaggyCapMultiColor,
  },

  {
    id: "school",
    label: "Custom Sun Cricket Hat",
    type: "panel",
    panels: [
      { key: "id_1", label: "Head Color" },
      { key: "id_2", label: "Brim Color" },
      { key: "id_3", label: "Eyelet Color" },
    ],
    defaultColors: DEFAULT_SUN_CRICKET_HAT_COLORS,
    motifPanels: SUN_MOTIF_PANELS,
    SVGComponent: SunCricketHat,
  },
  {
    id: "honours",
    label: "Custom Cricket Honours Cap",
    type: "solid",
    defaultColors: {
      solid: "#FFFFFF",
    },
    motifPanels: HONOURS_MOTIF_PANELS,
    SVGComponent: HonoursCapSVG,
  },
  {
    id: "performance",
    label: "Custom Cricket Performance Cap",
    type: "panel",
    panels: PERFORMANCE_PANELS,
    defaultColors: {
      crown: "#523233",
      back: "#611078",
      button: "#FA8805",
      eyelets: "#088008",
      strap: "#ffffff",
      middle: "#ffffff",
    },
    SVGComponent: PerformanceCapSVG,
  },
  {
    id: "baseball",
    label: "Custom Baseball Cap",
    type: "panel",
    panels: BASEBALL_PANELS,
    defaultColors: {
      id_1: "#523233",
      id_2: "#FFFF66",
      id_3: "#088008",
      id_4: "#611078",
      id_5: "#FA8805",
      id_6: "#EF4444",
    },
    motifPanels: BASEBALL_MOTIF_PANELS,
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
    motifPanels: VISOR_MOTIF_PANELS,
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
    motifPanels: BUCKET_MOTIF_PANELS,
    SVGComponent: CustomBucketHat,
  },
  {
    id: "beanie",
    label: "Custom Beanies",
    type: "solid",
    defaultColors: BEANIE_PANEL,
    motifPanels: BEANIE_MOTIF_PANELS,
    SVGComponent: CustomBeanies,
  },

  // ── PANEL TYPE EXAMPLES ───────────────────────────────────

  {
    id: "trucker",
    label: "Custom Trucker Cap",
    type: "panel",
    panels: TRUCKER_PANELS,
    defaultColors: DEFAULT_PANEL_COLORS,
    motifPanels: TRUCKER_MOTIF_PANELS,
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
    motifPanels: BASEBALL_MOTIF_PANELS,
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
    motifPanels: BASEBALL_MOTIF_PANELS,
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
