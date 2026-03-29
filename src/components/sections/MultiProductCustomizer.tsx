"use client";

import { useState } from "react";

import ProductDropdown from "@/components/ui/customize/ProductDropdown";
import CustomizePanel from "@/components/ui/customize/CustomizePanel";
import {
  getCapByLabel,
  DEFAULT_CAP,
} from "@/components/ui/customize/CapRegistry";
import type { CapColors } from "@/types/cap.types";

export default function MultiProductCustomizer() {
  // ── active cap config ─────────────────────────────────────
  const [capConfig, setCapConfig] = useState(DEFAULT_CAP);

  // ── colours — re-seeded whenever cap changes ──────────────
  const [colors, setColors] = useState<CapColors>(DEFAULT_CAP.defaultColors);

  // ─── ProductDropdown selection ───────────────────────────
  function handleProductSelect(label: string) {
    const config = getCapByLabel(label);
    if (!config) return; // label not registered — do nothing
    setCapConfig(config);
    setColors(config.defaultColors); // reset colours to new cap defaults
  }

  // ─── CustomizePanel colour change ────────────────────────
  function handleColorChange(value: string, panelKey?: string) {
    const key = panelKey ?? "solid";
    setColors((prev) => ({ ...prev, [key]: value }));
  }

  // ─── dynamic SVG ─────────────────────────────────────────
  const { SVGComponent } = capConfig;

  return (
    <section
      className="relative min-h-screen bg-gray-100 px-4 py-12"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='600' height='600' viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D1D5DB' stroke-width='1.5' opacity='0.4'%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3Crect x='300' y='50' width='60' height='80' rx='8'/%3E%3Cpath d='M450 300 L500 250 L550 300 L500 350 Z'/%3E%3Ccircle cx='80' cy='400' r='30'/%3E%3Cpath d='M200 450 Q250 400 300 450'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "400px",
      }}
      aria-label="Customize product"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {/* ── 1. Product Dropdown (top) ────────────────── */}
        <div className="w-full">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
            Select Product
          </label>
          <ProductDropdown
            selected={capConfig.label}
            onSelect={handleProductSelect}
          />
        </div>

        {/* ── 2. Panel + Preview ──────────────────────── */}
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
          {/* Left — customize panel (dynamic per cap type) */}
          <div className="w-full lg:w-72 lg:shrink-0">
            <CustomizePanel
              capConfig={capConfig}
              colors={colors}
              onColorChange={handleColorChange}
            />
          </div>

          {/* Right — live SVG preview (dynamic per cap) */}
          <div className="flex w-full flex-1 items-center justify-center">
            <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-3xl bg-gray-300 shadow-2xl sm:h-72 sm:w-72 md:h-250 md:w-150">
              <SVGComponent colors={colors} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
