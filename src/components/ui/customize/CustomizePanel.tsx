"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CapConfig, CapColors } from "@/types/cap.types";
import type { StoredExtraMotif, StoredLogoUpload } from "@/lib/storage";

interface PanelOption {
  key: string;
  label: string;
}

const COLOR_OPTIONS = [
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

// ─────────────────────────────────────────────
interface Props {
  capConfig: CapConfig;
  panelOptions: PanelOption[];
  colors: CapColors;
  /** For solid caps: called with (value) — key is always "solid"   */
  /** For panel caps: called with (value, panelKey)                 */
  onColorChange: (value: string, panelKey?: string) => void;
  logoUpload?: StoredLogoUpload | null;
  logoError?: string | null;
  onLogoSelect?: (file: File | null) => void;
  onLogoDescriptionChange?: (value: string) => void;
  onLogoClear?: () => void;
  extraMotifs?: StoredExtraMotif[];
  extraMotifLimit?: number;
  extraMotifErrors?: Record<string, string>;
  onAddExtraMotif?: () => void;
  onRemoveExtraMotif?: (motifId: string) => void;
  onExtraMotifTypeChange?: (
    motifId: string,
    motifType: StoredExtraMotif["type"],
  ) => void;
  onExtraMotifTextChange?: (motifId: string, value: string) => void;
  onExtraMotifPanelChange?: (motifId: string, panelKey: string) => void;
  onExtraMotifColorChange?: (motifId: string, color: string) => void;
  onExtraMotifLogoSelect?: (motifId: string, file: File | null) => void;
  onExtraMotifLogoClear?: (motifId: string) => void;
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

  const selectedOption = COLOR_OPTIONS.find((opt) => opt.value === current) ?? {
    value: current,
    label,
  };

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
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F3F6FC]"
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
  panelOptions,
  colors,
  onColorChange,
  logoUpload,
  logoError,
  onLogoSelect,
  onLogoDescriptionChange,
  onLogoClear,
  extraMotifs = [],
  extraMotifLimit = 0,
  extraMotifErrors = {},
  onAddExtraMotif,
  onRemoveExtraMotif,
  onExtraMotifTypeChange,
  onExtraMotifTextChange,
  onExtraMotifPanelChange,
  onExtraMotifColorChange,
  onExtraMotifLogoSelect,
  onExtraMotifLogoClear,
}: Props) {
  const dynamicPanelRows = capConfig.type === "panel" ? panelOptions : [];

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
          <p className="mt-2 rounded-md border border-[#143D59]/20 bg-[#F3F6FC] px-2.5 py-2 text-xs text-[#143D59]">
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
                className="rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] font-medium text-gray-700 transition hover:bg-[#F3F6FC]"
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
                className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 text-xs text-gray-800 outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border border-[#143D59]/20 bg-[#F3F6FC] px-4 py-3 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#1F2937]">
              Choose Any Extra Motifs (Logo or Text)
            </p>
            <p className="mt-0.5 text-xs text-[#6B7280]">
              You can add or remove motifs. Maximum {extraMotifLimit} motif
              {extraMotifLimit === 1 ? "" : "s"} based on your panel count.
            </p>
          </div>

          <button
            type="button"
            onClick={onAddExtraMotif}
            disabled={extraMotifs.length >= extraMotifLimit}
            className="inline-flex items-center justify-center rounded-lg border border-[#143D59]/35 bg-white px-3 py-2 text-xs font-semibold text-[#143D59] transition hover:bg-[#F3F6FC] disabled:cursor-not-allowed disabled:opacity-60"
          >
            + Add Motif
          </button>
        </div>

        {extraMotifs.length > 0 ? (
          <div className="mt-3 space-y-3">
            {extraMotifs.map((motif, index) => {
              const motifFileInputId = `motif-logo-upload-${motif.id}`;
              const motifColorExists = COLOR_OPTIONS.some(
                (option) => option.value === motif.color,
              );
              const motifPanelExists = panelOptions.some(
                (panel) => panel.key === motif.panelKey,
              );

              return (
                <div
                  key={motif.id}
                  className="rounded-lg border border-[#143D59]/20 bg-white/90 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#143D59]">
                      Motif {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => onRemoveExtraMotif?.(motif.id)}
                      className="rounded-md border border-[#143D59]/35 bg-white px-2 py-1 text-[11px] font-semibold text-[#143D59] transition hover:bg-[#F3F6FC]"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label
                        htmlFor={`motif-type-${motif.id}`}
                        className="text-xs font-medium text-gray-700"
                      >
                        Type
                      </label>
                      <select
                        id={`motif-type-${motif.id}`}
                        value={motif.type}
                        onChange={(event) =>
                          onExtraMotifTypeChange?.(
                            motif.id,
                            event.target.value as StoredExtraMotif["type"],
                          )
                        }
                        className="h-10 w-full rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
                      >
                        <option value="text">Text</option>
                        <option value="logo">Logo</option>
                      </select>
                    </div>

                    {motif.type === "text" ? (
                      <div className="space-y-1">
                        <label
                          htmlFor={`motif-text-${motif.id}`}
                          className="text-xs font-medium text-gray-700"
                        >
                          Text
                        </label>
                        <input
                          id={`motif-text-${motif.id}`}
                          type="text"
                          value={motif.text}
                          onChange={(event) =>
                            onExtraMotifTextChange?.(
                              motif.id,
                              event.target.value,
                            )
                          }
                          placeholder="Type text"
                          className="h-10 w-full rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <label
                          htmlFor={motifFileInputId}
                          className="text-xs font-medium text-gray-700"
                        >
                          Logo File
                        </label>
                        <div className="flex flex-wrap items-center gap-2">
                          <label
                            htmlFor={motifFileInputId}
                            className="inline-flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            Choose Logo
                          </label>
                          <input
                            id={motifFileInputId}
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/svg+xml"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0] ?? null;
                              onExtraMotifLogoSelect?.(motif.id, file);
                              event.currentTarget.value = "";
                            }}
                          />

                          {motif.logo ? (
                            <button
                              type="button"
                              onClick={() => onExtraMotifLogoClear?.(motif.id)}
                              className="rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] font-medium text-gray-700 transition hover:bg-[#F3F6FC]"
                            >
                              Clear
                            </button>
                          ) : null}
                        </div>

                        {motif.logo ? (
                          <div className="mt-1 flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5">
                            <Image
                              src={motif.logo.dataUrl}
                              alt="Motif logo preview"
                              width={32}
                              height={32}
                              unoptimized
                              className="h-8 w-8 rounded border border-gray-200 bg-white object-contain"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-[11px] font-medium text-gray-800">
                                {motif.logo.fileName}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                {formatBytes(motif.logo.sizeInBytes)}
                              </p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>

                  <div
                    className={`mt-2 grid gap-2 ${motif.type === "text" ? "sm:grid-cols-2" : ""}`}
                  >
                    {motif.type === "text" ? (
                      <div className="space-y-1">
                        <label
                          htmlFor={`motif-color-${motif.id}`}
                          className="text-xs font-medium text-gray-700"
                        >
                          Colour
                        </label>
                        <select
                          id={`motif-color-${motif.id}`}
                          value={motif.color}
                          onChange={(event) =>
                            onExtraMotifColorChange?.(
                              motif.id,
                              event.target.value,
                            )
                          }
                          className="h-10 w-full rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
                        >
                          {!motifColorExists ? (
                            <option value={motif.color}>{motif.color}</option>
                          ) : null}
                          {COLOR_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : null}

                    <div className="space-y-1">
                      <label
                        htmlFor={`motif-panel-${motif.id}`}
                        className="text-xs font-medium text-gray-700"
                      >
                        Panel
                      </label>
                      <select
                        id={`motif-panel-${motif.id}`}
                        value={motif.panelKey}
                        onChange={(event) =>
                          onExtraMotifPanelChange?.(
                            motif.id,
                            event.target.value,
                          )
                        }
                        className="h-10 w-full rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
                      >
                        {!motifPanelExists ? (
                          <option value={motif.panelKey}>
                            {motif.panelLabel}
                          </option>
                        ) : null}
                        {panelOptions.map((panel) => (
                          <option key={panel.key} value={panel.key}>
                            {panel.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {extraMotifErrors[motif.id] ? (
                    <p className="mt-2 rounded-md border border-[#143D59]/20 bg-[#F3F6FC] px-2.5 py-2 text-xs text-[#143D59]">
                      {extraMotifErrors[motif.id]}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-3 rounded-md border border-dashed border-[#143D59]/35 bg-white px-3 py-2 text-xs text-[#143D59]">
            No extra motifs added yet.
          </p>
        )}
      </div>
    </div>
  );
}
