"use client";

import { useRef } from "react";
import type { CapColors } from "./CapSVG";

const COLOR_PARTS: { key: keyof Omit<CapColors, "cord">; label: string }[] = [
  { key: "body", label: "Body Color" },
  { key: "brim", label: "Brim Color" },
  { key: "button", label: "Button Color" },
  { key: "sweatband", label: "Sweatband Color" },
];

const SWATCH_PRESETS = [
  "#9CA3AF",
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

interface Props {
  colors: CapColors;
  logoFile: File | null;
  onColorChange: (key: keyof CapColors, value: string | boolean) => void;
  onLogoUpload: (file: File) => void;
}

export default function CustomizePanel({
  colors,
  logoFile,
  onColorChange,
  onLogoUpload,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-3">
      {/* Cap name */}
      <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
        <p className="text-sm font-medium text-gray-800">English Cricket cap</p>
      </div>

      {/* Select Color */}
      <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
        <p className="mb-2 text-sm font-medium text-gray-700">Select Color</p>
        <div className="grid grid-cols-6 gap-1.5">
          {COLOR_PARTS.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-1">
              <input
                type="color"
                value={colors[key] as string}
                onChange={(e) => onColorChange(key, e.target.value)}
                className="h-8 w-8 cursor-pointer rounded-full border-2 border-gray-200 p-0.5"
                title={label}
                aria-label={label}
              />
              <span className="text-center text-[9px] text-gray-500 leading-tight">
                {label.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Logo */}
      <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-700">
            Upload Your logo
          </span>
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-300"
          >
            {logoFile ? "Change" : "Upload here"}
          </button>
        </div>
        {logoFile && (
          <p className="mt-1 truncate text-xs text-gray-400">{logoFile.name}</p>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            e.target.files?.[0] && onLogoUpload(e.target.files[0])
          }
          aria-label="Upload logo file"
        />
      </div>

      {/* Add Cord */}
      <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
        <p className="mb-2 text-sm font-medium text-gray-700">Add Cord</p>
        <input
          type="checkbox"
          checked={colors.cord}
          onChange={(e) => onColorChange("cord", e.target.checked)}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-brand-red"
          aria-label="Add cord to cap"
        />
      </div>

      {/* Style swatches */}
      <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
          {SWATCH_PRESETS.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange("body", color)}
              style={{ backgroundColor: color }}
              className="h-8 rounded-lg border-2 border-gray-200 transition hover:scale-110 hover:border-gray-400"
              title={color}
              aria-label={`Set body color to ${color}`}
            />
          ))}
        </div>
        <button
          onClick={() => {
            const next = prompt("Enter hex color for body (e.g. #FF0000)");
            if (next) onColorChange("body", next);
          }}
          className="mt-2 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
        >
          <span className="text-base font-bold">+</span> Custom color
        </button>
      </div>
    </div>
  );
}
