"use client";

import type { CapColors } from "@/types/cap.types";

// ─── defaults ────────────────────────────────
export const DEFAULT_PANEL_COLORS: CapColors = {
  crown: "#1D4ED8", // top / main crown panels
  brim: "#374151", // front peak / brim
  side: "#DC2626", // left & right side panels
  back: "#16A34A", // rear panel
  button: "#D97706", // top button
};

// ─── component ───────────────────────────────
/**
 * PanelCapSVG — each section uses its own colour key from `colors`.
 *
 * HOW TO ADD YOUR OWN SVG:
 *  1. Open your SVG file and identify each colourable region (panel, brim, etc.)
 *  2. Give each region a key that matches one of the keys in DEFAULT_PANEL_COLORS
 *     (or add new keys — just keep capRegistry and PanelConfig in sync).
 *  3. Replace the fill prop of each <path> with {colors.<key>}.
 *
 * The placeholder shapes below illustrate the pattern.
 */
export default function PanelCapSVG({ colors }: { colors: CapColors }) {
  const crown = colors.crown ?? DEFAULT_PANEL_COLORS.crown;
  const brim = colors.brim ?? DEFAULT_PANEL_COLORS.brim;
  const side = colors.side ?? DEFAULT_PANEL_COLORS.side;
  const back = colors.back ?? DEFAULT_PANEL_COLORS.back;
  const button = colors.button ?? DEFAULT_PANEL_COLORS.button;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 160"
      className="h-full w-full"
      aria-label="Panel cap preview"
    >
      {/* ── REPLACE BELOW WITH YOUR ACTUAL SVG PATHS ── */}

      {/* Back panel */}
      <path fill={back} d="M160 40 Q175 50 178 80 L155 85 Q152 60 145 48 Z" />

      {/* Left side panel */}
      <path fill={side} d="M75 30 Q60 35 52 55 L65 90 Q72 70 80 55 Z" />

      {/* Right side panel */}
      <path fill={side} d="M125 30 Q140 35 148 55 L135 90 Q128 70 120 55 Z" />

      {/* Crown / front panels */}
      <path fill={crown} d="M80 28 Q100 15 120 28 L130 85 Q100 95 70 85 Z" />

      {/* Brim / peak */}
      <path fill={brim} d="M65 90 Q100 100 135 90 L140 105 Q100 118 60 105 Z" />

      {/* Top button */}
      <circle fill={button} cx="100" cy="20" r="5" />

      {/* Outline stroke */}
      <path
        fill="none"
        stroke="#111"
        strokeWidth="1.5"
        d="M80 28 Q100 15 120 28 L130 85 Q100 95 70 85 Z"
      />
      <path
        fill="none"
        stroke="#111"
        strokeWidth="1.5"
        d="M65 90 Q100 100 135 90 L140 105 Q100 118 60 105 Z"
      />

      {/* ── END OF PLACEHOLDER PATHS ── */}
    </svg>
  );
}
