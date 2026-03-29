"use client";

import type { CapConfig, CapColors } from "@/types/cap.types";

// ─── shared presets ──────────────────────────
const SWATCH_PRESETS = [
  "#201E1E",
  "#374151",
  "#1D4ED8",
  "#DC2626",
  "#16A34A",
  "#D97706",
  "#7C3AED",
  "#FFFFFF",
  "#000000",
  "#F9A8D4",
  "#FDE68A",
  "#A7F3D0",
];

// ─────────────────────────────────────────────
interface Props {
  capConfig: CapConfig;
  colors: CapColors;
  /** For solid caps: called with (value) — key is always "solid"   */
  /** For panel caps: called with (value, panelKey)                 */
  onColorChange: (value: string, panelKey?: string) => void;
}

// ── helper: one color-picker row ─────────────────────────
function ColorRow({
  label,
  colorKey,
  colors,
  onColorChange,
}: {
  label: string;
  colorKey: string;
  colors: CapColors;
  onColorChange: (value: string, panelKey?: string) => void;
}) {
  const current = colors[colorKey] ?? "#201E1E";

  function handleCustom() {
    const next = prompt(`Enter hex for "${label}" (e.g. #FF0000)`);
    if (next) onColorChange(next, colorKey);
  }

  return (
    <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
      <p className="mb-2 text-sm font-medium text-gray-700">{label}</p>

      {/* Current colour + native picker */}
      <div className="mb-2 flex items-center gap-3">
        <input
          type="color"
          value={current}
          onChange={(e) => onColorChange(e.target.value, colorKey)}
          className="h-10 w-12 cursor-pointer rounded-lg border-2 border-gray-200 p-1"
          aria-label={`${label} color picker`}
        />
        <span className="font-mono text-xs text-gray-500">{current}</span>
      </div>

      {/* Swatches */}
      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
        {SWATCH_PRESETS.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color, colorKey)}
            style={{ backgroundColor: color }}
            className={`h-7 rounded-md border-2 transition hover:scale-110 ${
              current === color
                ? "border-gray-800"
                : "border-gray-200 hover:border-gray-400"
            }`}
            title={color}
            aria-label={`Set ${label} to ${color}`}
          />
        ))}
      </div>

      {/* Custom hex */}
      <button
        onClick={handleCustom}
        className="mt-2 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
      >
        <span className="text-base font-bold">+</span> Custom colour
      </button>
    </div>
  );
}

export default function CustomizePanel({
  capConfig,
  colors,
  onColorChange,
}: Props) {
  const dynamicPanelRows =
    capConfig.type === "panel"
      ? capConfig.panels && capConfig.panels.length > 0
        ? capConfig.panels
        : Object.keys(capConfig.defaultColors).map((key) => ({
            key,
            label: key.startsWith("id_")
              ? `Path ${key.replace("id_", "")}`
              : key
                  .replace(/[_-]/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase()),
          }))
      : [];

  return (
    <div className="flex flex-col gap-3">
      {/* Product name */}
      <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
        <p className="text-sm font-medium text-gray-800">{capConfig.label}</p>
        <p className="mt-0.5 text-xs text-gray-400 capitalize">
          {capConfig.type} colour cap
        </p>
      </div>

      {/* ── SOLID: single colour picker ─────── */}
      {capConfig.type === "solid" && (
        <ColorRow
          label="Cap Colour"
          colorKey="solid"
          colors={colors}
          onColorChange={onColorChange}
        />
      )}

      {/* ── PANEL: one picker per section ───── */}
      {capConfig.type === "panel" &&
        dynamicPanelRows.map((panel) => (
          <ColorRow
            key={panel.key}
            label={panel.label}
            colorKey={panel.key}
            colors={colors}
            onColorChange={onColorChange}
          />
        ))}
    </div>
  );
}
