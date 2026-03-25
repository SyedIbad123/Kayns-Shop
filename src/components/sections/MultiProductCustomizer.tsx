"use client";

import { useState } from "react";
import CapSVG, { DEFAULT_CAP_COLORS } from "@/components/ui/customize/CapSVG";
import type { CapColors } from "@/components/ui/customize/CapSVG";
import CustomizePanel from "@/components/ui/customize/CustomizePanel";

interface Props {
  productName: string;
}

export default function MultiProductCustomizer({ productName }: Props) {
  const [colors, setColors] = useState<CapColors>(DEFAULT_CAP_COLORS);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  function handleColorChange(key: keyof CapColors, value: string | boolean) {
    setColors((prev) => ({ ...prev, [key]: value }));
  }

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
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 lg:flex-row lg:gap-8">
        {/* Left — editing panel */}
        <div className="w-full lg:w-72 lg:shrink-0">
          <CustomizePanel
            colors={colors}
            logoFile={logoFile}
            onColorChange={handleColorChange}
            onLogoUpload={setLogoFile}
          />
        </div>

        {/* Right — live SVG cap preview */}
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-3xl bg-gray-300 shadow-2xl sm:h-72 sm:w-72 md:h-80 md:w-80">
            <CapSVG colors={colors} />
          </div>
        </div>
      </div>
    </section>
  );
}
