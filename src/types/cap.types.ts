import type { ComponentType } from "react";

// ─────────────────────────────────────────────
// Colors
// ─────────────────────────────────────────────

/**
 * Generic color map.
 * Solid cap  → { solid: "#201E1E" }
 * Panel cap  → { crown: "#1D4ED8", brim: "#374151", panel: "#143D59", ... }
 */
export type CapColors = Record<string, string>;

// ─────────────────────────────────────────────
// Panel config (only for "panel" type caps)
// ─────────────────────────────────────────────

export interface PanelConfig {
  /** Must match the key used inside the SVG component (e.g. "crown") */
  key: string;
  /** Human-readable label shown in CustomizePanel (e.g. "Crown") */
  label: string;
}

// ─────────────────────────────────────────────
// Cap config — one entry per product
// ─────────────────────────────────────────────

export type CapType = "solid" | "panel";

export interface CapConfig {
  /** Unique ID — used as lookup key in the registry */
  id: string;

  /** Must match the label used in ProductDropdown MENU_ITEMS */
  label: string;

  /** "solid" = one color for the whole cap; "panel" = each section is individually coloured */
  type: CapType;

  /** Only required for type === "panel". Lists every colourable section. */
  panels?: PanelConfig[];

  /** Starting colors shown when the cap is first selected */
  defaultColors: CapColors;

  /** The SVG React component to render for this cap */
  SVGComponent: ComponentType<{ colors: CapColors }>;
}
