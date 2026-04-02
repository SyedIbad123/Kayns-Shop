"use client";

import { useEffect, useRef, useState } from "react";
import type { CapConfig, CapColors } from "@/types/cap.types";

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
  const current = colors[colorKey] ?? "#FFF";
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Provided color options and labels
  const COLOR_OPTIONS = [
    { value: "#FFF", label: "Select  Head Colour" },
    { value: "#000000", label: "Black" },
    { value: "#FFFFFF", label: "White" },
    { value: "#FF0000", label: "Red" },
    { value: "#193802", label: "Bottle Green" },
    { value: "#FA8805", label: "Orange" },
    { value: "#FC92EA", label: "Pink" },
    { value: "#660818", label: "Maroon" },
    { value: "#023085", label: "Royal Blue" },
    { value: "Yellow", label: "Yellow" },
    { value: "#523233", label: "Brown" },
    { value: "#611078", label: "Purple" },
    { value: "Grey", label: "Grey" },
    { value: "Gold", label: "Gold" },
    { value: "#050840", label: "Navy" },
    { value: "#63B0F0", label: "Sky Blue" },
    { value: "#198A0A", label: "Green" },
  ];

  const selectedOption =
    COLOR_OPTIONS.find((opt) => opt.value === current) ?? COLOR_OPTIONS[0];

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
      <p className="mb-2 text-sm font-medium text-gray-700">{label}</p>
      <div ref={wrapperRef} className="relative w-3/4">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded  bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          onClick={() => setIsOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`${label} color dropdown`}
        >
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-4 w-4 rounded-full border border-gray-300"
              style={{ backgroundColor: selectedOption.value }}
            />
            <span>{selectedOption.label}</span>
          </span>
          <span className="text-xs text-gray-500">▼</span>
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-200 bg-white py-1 shadow-lg"
          >
            {COLOR_OPTIONS.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => {
                    onColorChange(opt.value, colorKey);
                    setIsOpen(false);
                  }}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full ${(opt.label == "White" || opt.label === "Select  Head Colour") && "border border-gray-300"}`}
                    style={{ backgroundColor: opt.value }}
                  />
                  <span>{opt.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
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
