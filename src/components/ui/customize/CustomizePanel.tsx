"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CapConfig, CapColors } from "@/types/cap.types";
import type { StoredLogoUpload } from "@/lib/storage";

// ─────────────────────────────────────────────
interface Props {
  capConfig: CapConfig;
  colors: CapColors;
  /** For solid caps: called with (value) — key is always "solid"   */
  /** For panel caps: called with (value, panelKey)                 */
  onColorChange: (value: string, panelKey?: string) => void;
  logoUpload?: StoredLogoUpload | null;
  logoError?: string | null;
  onLogoSelect?: (file: File | null) => void;
  onLogoDescriptionChange?: (value: string) => void;
  onLogoClear?: () => void;
}

function formatBytes(sizeInBytes: number) {
  if (!Number.isFinite(sizeInBytes) || sizeInBytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB"];
  const exponent = Math.min(
    Math.floor(Math.log(sizeInBytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = sizeInBytes / Math.pow(1024, exponent);
  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
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
    { value: "#FFF", label },
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
    <div>
      <p className="mb-1 pl-4 block text-sm font-medium text-gray-700">
        {label}
      </p>
      <div ref={wrapperRef} className="relative rounded-xl px-4 py-3">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-xl border border-black bg-white px-4 py-3 text-base text-gray-900 outline-none transition"
          onClick={() => setIsOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`${label} color dropdown`}
        >
          <span className="flex items-center gap-2">
            <span
              className={`inline-block h-4 w-4 rounded-full ${selectedOption.value === "#FFFFFF" || selectedOption.value === "#FFF" ? "border border-gray-300" : ""}`}
              style={{ backgroundColor: selectedOption.value }}
            />
            <span>{selectedOption.label}</span>
          </span>
          <span className="text-xs text-gray-500">▼</span>
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className="absolute left-4 right-4 z-20 mt-1 max-h-60 overflow-auto rounded border border-gray-200 bg-white py-1 shadow-lg"
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
                    className={`inline-block h-4 w-4 rounded-full ${opt.value === "#FFFFFF" || opt.value === "#FFF" ? "border border-gray-300" : ""}`}
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
  logoUpload,
  logoError,
  onLogoSelect,
  onLogoDescriptionChange,
  onLogoClear,
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

  const useTwoColumnPanelLayout =
    capConfig.type === "panel" && dynamicPanelRows.length > 4;

  return (
    <div className="flex flex-col justify-center gap-4 w-full">
      <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
        <p className="text-sm font-medium text-gray-800">{capConfig.label}</p>
        <p className="mt-0.5 text-xs text-gray-400 capitalize">
          {capConfig.type} colour cap
        </p>
      </div>

      <div className="flex flex-col p-4 gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
        {/* Product name */}

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
        {capConfig.type === "panel" && (
          <div
            className={
              useTwoColumnPanelLayout
                ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
                : "flex flex-col gap-3"
            }
          >
            {dynamicPanelRows.map((panel) => (
              <ColorRow
                key={panel.key}
                label={panel.label}
                colorKey={panel.key}
                colors={colors}
                onColorChange={onColorChange}
              />
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
        <p className="text-sm font-medium text-gray-800">
          Logo Upload (Optional)
        </p>
        <p className="mt-0.5 text-xs text-gray-500">
          This does not change the SVG preview. It is sent with your quote
          request.
        </p>

        <div className="mt-3">
          <label
            htmlFor="logo-upload"
            className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Choose Logo Image
          </label>
          <input
            id="logo-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              onLogoSelect?.(file);
              event.currentTarget.value = "";
            }}
          />
        </div>

        {logoError ? (
          <p className="mt-2 rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-xs text-red-700">
            {logoError}
          </p>
        ) : null}

        {logoUpload ? (
          <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-start gap-3">
              <Image
                src={logoUpload.dataUrl}
                alt="Uploaded logo preview"
                width={64}
                height={64}
                unoptimized
                className="h-16 w-16 rounded-md border border-gray-200 bg-white object-contain"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-gray-800">
                  {logoUpload.fileName}
                </p>
                <p className="text-[11px] text-gray-500">
                  {logoUpload.mimeType} · {formatBytes(logoUpload.sizeInBytes)}
                </p>
              </div>

              <button
                type="button"
                onClick={onLogoClear}
                className="rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Remove
              </button>
            </div>

            <div className="mt-3 space-y-1.5">
              <label
                htmlFor="logo-description"
                className="text-xs font-medium text-gray-700"
              >
                Logo Description
              </label>
              <textarea
                id="logo-description"
                rows={2}
                value={logoUpload.description ?? ""}
                onChange={(event) =>
                  onLogoDescriptionChange?.(event.target.value)
                }
                placeholder="e.g. Club crest for front panel"
                className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 text-xs text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
