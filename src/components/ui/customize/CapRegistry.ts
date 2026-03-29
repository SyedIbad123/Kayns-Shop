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
import CustomCricketBaggyCapMultiColor from "@/components/SVG/Multi-Color/CustomCricketBaggyCapMultiColor";
import SunCricketHat from "@/components/SVG/Multi-Color/SunCricketHatSVG";
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
  { key: "button", label: "Top Button" },
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
    panels: [
      { key: "crown", label: "Crown" },
      { key: "brim", label: "Brim" },
      { key: "side", label: "Side Panels" },
      { key: "back", label: "Back Panel" },
      { key: "button", label: "Top Button" },
    ],
    defaultColors: DEFAULT_PANEL_COLORS,
    SVGComponent: CustomCricketBaggyCapMultiColor,
  },

  {
    id: "school",
    label: "Custom Sun Cricket Hat",
    type: "panel",
    panels: [
      { key: "crown", label: "Crown" },
      { key: "brim", label: "Brim" },
      { key: "side", label: "Side" },
    ],
    defaultColors: {
      crown: "#1D4ED8",
      brim: "#374151",
      side: "#DC2626",
    },
    SVGComponent: SunCricketHat,
  },
  {
    id: "honours",
    label: "Custom Cricket Honours Cap",
    type: "solid",
    defaultColors: {
      main: "#FFFFFF",
    },
    SVGComponent: HonoursCapSVG,
  },
  {
    id: "performance",
    label: "Custom Cricket Performance Cap",
    type: "panel",
    panels: STANDARD_MULTI_PANELS,
    defaultColors: {
      crown: "#523233",
      brim: "#FFFF66",
      side: "#088008",
      back: "#611078",
      button: "#FA8805",
    },
    SVGComponent: PerformanceCapSVG,
  },
  {
    id: "baseball",
    label: "Custom Baseball Cap",
    type: "panel",
    panels: STANDARD_MULTI_PANELS,
    defaultColors: {
      crown: "#523233",
      brim: "#FFFF66",
      side: "#088008",
      back: "#611078",
      button: "#FA8805",
    },
    SVGComponent: BaseballSVG,
  },
  {
    id: "visor",
    label: "Custom Visor",
    type: "panel",
    panels: STANDARD_MULTI_PANELS,
    defaultColors: {
      crown: "#523233",
      brim: "#FFFF66",
      side: "#088008",
      back: "#611078",
      button: "#FA8805",
    },
    SVGComponent: VisorSVG,
  },
  {
    id: "bucket",
    label: "Custom Bucket Hat",
    type: "panel",
    panels: STANDARD_MULTI_PANELS,
    defaultColors: {
      crown: "#523233",
      brim: "#FFFF66",
      side: "#088008",
      back: "#611078",
      button: "#FA8805",
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
    panels: [
      { key: "crown", label: "Crown" },
      { key: "brim", label: "Brim" },
      { key: "side", label: "Side Panels" },
      { key: "back", label: "Back Panel" },
      { key: "button", label: "Top Button" },
    ],
    defaultColors: {
      crown: "#FFFF00",
      brim: "#660818",
      side: "#523233",
      back: "#050840",
      button: "#660818",
    },
    SVGComponent: FlatPeak5SVG,
  },
  {
    id: "flat-6",
    label: "Custom Flat Peak Cap (6 Panels)",
    type: "panel",
    panels: [
      { key: "crown", label: "Crown" },
      { key: "brim", label: "Brim" },
      { key: "side", label: "Side Panels" },
      { key: "back", label: "Back Panel" },
      { key: "button", label: "Top Button" },
    ],
    defaultColors: {
      crown: "#FFFF00",
      brim: "#FC92EA",
      side: "#FA8805",
      back: "#611078",
      button: "#FC92EA",
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
