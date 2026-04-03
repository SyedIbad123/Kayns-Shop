"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import ProductDropdown from "@/components/ui/customize/ProductDropdown";
import CustomizePanel from "@/components/ui/customize/CustomizePanel";
import {
  getCapByLabel,
  DEFAULT_CAP,
} from "@/components/ui/customize/CapRegistry";
import {
  saveQuoteConfig,
  saveSvgConfig,
  type StoredLogoUpload,
  type StoredSvgConfig,
} from "@/lib/storage";
import type { CapColors } from "@/types/cap.types";

const MAX_LOGO_SIZE_BYTES = 1 * 1024 * 1024;

const ALLOWED_LOGO_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
]);

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
        return;
      }

      reject(new Error("Could not read selected image."));
    };

    reader.onerror = () => {
      reject(new Error("Could not read selected image."));
    };

    reader.readAsDataURL(file);
  });
}

function normalizeSvgMarkup(svgElement: SVGElement) {
  const clone = svgElement.cloneNode(true) as SVGElement;
  const existingStyle = clone.getAttribute("style") ?? "";
  const sanitizedStyle = existingStyle
    .replace(/\bwidth\s*:[^;]+;?/gi, "")
    .replace(/\bheight\s*:[^;]+;?/gi, "")
    .replace(/\bmax-width\s*:[^;]+;?/gi, "")
    .replace(/\bmax-height\s*:[^;]+;?/gi, "")
    .trim();
  const stylePrefix =
    sanitizedStyle.length > 0
      ? `${sanitizedStyle}${sanitizedStyle.endsWith(";") ? "" : ";"}`
      : "";

  clone.removeAttribute("width");
  clone.removeAttribute("height");
  clone.setAttribute(
    "style",
    `${stylePrefix}width:100%;height:100%;max-width:100%;max-height:100%;`,
  );

  if (!clone.getAttribute("preserveAspectRatio")) {
    clone.setAttribute("preserveAspectRatio", "xMidYMid meet");
  }

  return clone.outerHTML;
}

function areSvgMarkupsEqual(current: string[], next: string[]) {
  if (current.length !== next.length) {
    return false;
  }

  return current.every((value, index) => value === next[index]);
}

function getPreviewLayoutClasses(svgCount: number) {
  if (svgCount <= 1) {
    return "grid h-full w-full grid-cols-1 grid-rows-1";
  }

  if (svgCount === 2) {
    return "grid h-full w-full grid-cols-2 grid-rows-1 gap-3";
  }

  if (svgCount === 3 || svgCount === 4) {
    return "grid h-full w-full auto-rows-fr grid-cols-2 grid-rows-2 gap-3";
  }

  return "grid h-full w-full auto-rows-fr grid-cols-2 gap-3";
}

function getPreviewCellClasses(svgCount: number, index: number) {
  const baseClasses =
    "relative flex h-full min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-2xl bg-white/70 p-2 shadow-sm";

  if (svgCount === 1) {
    return `${baseClasses} mx-auto h-full w-full max-h-[92%] max-w-[92%]`;
  }

  if (svgCount === 3 && index === 2) {
    return `${baseClasses} col-span-2 justify-self-center w-full max-w-[48%]`;
  }

  return baseClasses;
}

function getSnapshotLayoutStyle(svgCount: number) {
  if (svgCount === 2) {
    return "display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;width:100%;";
  }

  return "display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;width:100%;";
}

function getSnapshotCellStyle(svgCount: number, index: number) {
  const baseStyle =
    "display:flex;align-items:center;justify-content:center;min-height:0;min-width:0;overflow:hidden;border-radius:12px;padding:8px;background:rgba(255,255,255,0.78);";

  if (svgCount === 3 && index === 2) {
    return `${baseStyle}grid-column:1 / span 2;justify-self:center;width:48%;`;
  }

  return baseStyle;
}

export default function MultiProductCustomizer() {
  const router = useRouter();
  const pathname = usePathname();

  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const svgSourceRef = useRef<HTMLDivElement | null>(null);

  const [isRoutingToQuote, setIsRoutingToQuote] = useState(false);
  const [svgMarkupList, setSvgMarkupList] = useState<string[]>([]);
  const [logoUpload, setLogoUpload] = useState<StoredLogoUpload | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

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

  const handleLogoSelect = useCallback(
    async (file: File | null) => {
      setLogoError(null);

      if (!file) {
        return;
      }

      if (!ALLOWED_LOGO_TYPES.has(file.type)) {
        setLogoError("Please upload a PNG, JPG, WEBP, or SVG image.");
        return;
      }

      if (file.size > MAX_LOGO_SIZE_BYTES) {
        setLogoError("Logo image must be 1 MB or smaller.");
        return;
      }

      try {
        const dataUrl = await readFileAsDataUrl(file);
        setLogoUpload({
          fileName: file.name,
          mimeType: file.type,
          sizeInBytes: file.size,
          dataUrl,
          description: logoUpload?.description?.trim() ?? "",
        });
      } catch {
        setLogoError(
          "Could not read the selected image. Please try another file.",
        );
      }
    },
    [logoUpload?.description],
  );

  const handleLogoDescriptionChange = useCallback((description: string) => {
    setLogoUpload((currentLogoUpload) => {
      if (!currentLogoUpload) {
        return currentLogoUpload;
      }

      return {
        ...currentLogoUpload,
        description: description.slice(0, 300),
      };
    });
  }, []);

  const handleLogoClear = useCallback(() => {
    setLogoUpload(null);
    setLogoError(null);
  }, []);

  const extractSvgMarkupList = useCallback(() => {
    const sourceRoot = svgSourceRef.current;

    if (sourceRoot) {
      const sourceSvgs = Array.from(sourceRoot.querySelectorAll("svg")).map(
        (svg) => normalizeSvgMarkup(svg),
      );

      if (sourceSvgs.length > 0) {
        return sourceSvgs;
      }
    }

    const previewRoot = previewContainerRef.current;
    if (!previewRoot) {
      return [];
    }

    return Array.from(previewRoot.querySelectorAll("svg")).map((svg) =>
      normalizeSvgMarkup(svg),
    );
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const nextSvgMarkup = extractSvgMarkupList();

      setSvgMarkupList((currentSvgMarkup) =>
        areSvgMarkupsEqual(currentSvgMarkup, nextSvgMarkup)
          ? currentSvgMarkup
          : nextSvgMarkup,
      );
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [capConfig.id, colors, extractSvgMarkupList]);

  const captureSvgMarkup = useCallback(() => {
    const svgMarkups =
      svgMarkupList.length > 0 ? svgMarkupList : extractSvgMarkupList();

    if (svgMarkups.length === 0) {
      return null;
    }

    if (svgMarkups.length === 1) {
      return svgMarkups[0];
    }

    return `<div style="${getSnapshotLayoutStyle(svgMarkups.length)}">${svgMarkups
      .map(
        (svgMarkup, index) =>
          `<div style="${getSnapshotCellStyle(svgMarkups.length, index)}">${svgMarkup}</div>`,
      )
      .join("")}</div>`;
  }, [extractSvgMarkupList, svgMarkupList]);

  const buildSvgConfigPayload = useCallback((): StoredSvgConfig => {
    const fallbackPanels = Object.keys(colors).map((key) => ({
      key,
      label: key
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
    }));

    const panels =
      capConfig.type === "panel"
        ? (capConfig.panels && capConfig.panels.length > 0
            ? capConfig.panels
            : fallbackPanels
          ).map((panel) => ({
            key: panel.key,
            label: panel.label,
            color: colors[panel.key] ?? "#FFFFFF",
          }))
        : [
            {
              key: "solid",
              label: "Cap Colour",
              color: colors.solid ?? Object.values(colors)[0] ?? "#FFFFFF",
            },
          ];

    return {
      source: "svg",
      capId: capConfig.id,
      capLabel: capConfig.label,
      capType: capConfig.type,
      colors: { ...colors },
      panels,
      logo: logoUpload,
      svgMarkup: captureSvgMarkup(),
      updatedAt: new Date().toISOString(),
      sourcePath: pathname,
    };
  }, [capConfig, captureSvgMarkup, colors, logoUpload, pathname]);

  function handleRequestQuote() {
    const payload = buildSvgConfigPayload();
    saveSvgConfig(payload);
    saveQuoteConfig(payload);

    setIsRoutingToQuote(true);
    router.push("/quote?source=svg");
  }

  useEffect(() => {
    const payload = buildSvgConfigPayload();
    saveSvgConfig(payload);
  }, [buildSvgConfigPayload]);

  // ─── dynamic SVG ─────────────────────────────────────────
  const { SVGComponent } = capConfig;

  return (
    <section
      className="relative min-h-screen bg-gray-100 px-4 py-12"
      aria-label="Customize product"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div
          ref={svgSourceRef}
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        >
          <SVGComponent colors={colors} />
        </div>

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
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-2">
          {/* Left — customize panel (dynamic per cap type) */}
          <div className="w-full lg:w-140 lg:shrink-0">
            <CustomizePanel
              capConfig={capConfig}
              colors={colors}
              onColorChange={handleColorChange}
              logoUpload={logoUpload}
              logoError={logoError}
              onLogoSelect={handleLogoSelect}
              onLogoDescriptionChange={handleLogoDescriptionChange}
              onLogoClear={handleLogoClear}
            />
          </div>

          {/* Right — live SVG preview (dynamic per cap) */}
          <div className="flex w-full flex-1 items-center justify-center">
            <div
              ref={previewContainerRef}
              className="relative flex h-90 w-full max-w-125 items-center justify-center overflow-hidden  p-4 sm:h-100 md:h-115"
            >
              {svgMarkupList.length > 0 ? (
                <div className={getPreviewLayoutClasses(svgMarkupList.length)}>
                  {svgMarkupList.map((svgMarkup, index) => (
                    <div
                      key={`${capConfig.id}-preview-${index}`}
                      className={getPreviewCellClasses(
                        svgMarkupList.length,
                        index,
                      )}
                    >
                      <div
                        className="h-full w-full [&_svg]:h-full [&_svg]:w-full [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:object-contain"
                        dangerouslySetInnerHTML={{ __html: svgMarkup }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <SVGComponent colors={colors} />
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-4 sm:px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E63946]">
            Step 1 of 2
          </p>
          <p className="mt-1 text-sm text-[#4B5563]">
            Your panel selections are saved automatically.
          </p>

          <button
            type="button"
            onClick={handleRequestQuote}
            disabled={isRoutingToQuote}
            className="mt-3 inline-flex h-11 min-h-11 w-full items-center justify-center rounded-xl bg-[#E63946] px-5 text-sm font-semibold text-white transition hover:bg-[#D62839] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isRoutingToQuote ? "Continuing..." : "Request a Quote"}
          </button>
        </div>
      </div>
    </section>
  );
}
