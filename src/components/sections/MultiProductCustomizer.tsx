"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import ProductDropdown from "@/components/ui/customize/ProductDropdown";
import CustomizePanel from "@/components/ui/customize/CustomizePanel";
import {
  getCapByLabel,
  getCapById,
  DEFAULT_CAP,
} from "@/components/ui/customize/CapRegistry";
import {
  getSvgConfig,
  saveQuoteConfig,
  saveSvgConfig,
  type StoredExtraMotif,
  type StoredLogoUpload,
  type StoredSvgConfig,
  type StoredUploadedFileSummary,
} from "@/lib/storage";
import type { CapColors, CapConfig } from "@/types/cap.types";
import CustomCricketBaggyCapSingleColor from "@/components/SVG/Single-Color/CustomCricketBaggyCapSingleColor";
import CustomCricketBaggyCapMultiColor from "@/components/SVG/Multi-Color/CustomCricketBaggyCapMultiColor";
import HonoursCapSVG from "@/components/SVG/Single-Color/HonoursCapSVG";

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

interface CapPanelOption {
  key: string;
  label: string;
}

function formatPanelLabel(key: string) {
  return key.startsWith("id_")
    ? `Panel ${key.replace("id_", "")}`
    : key.replace(/[_-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function getCapPanelOptions(capConfig: CapConfig): CapPanelOption[] {
  if (capConfig.type === "panel") {
    if (capConfig.panels && capConfig.panels.length > 0) {
      return capConfig.panels.map((panel) => ({
        key: panel.key,
        label: panel.label,
      }));
    }

    return Object.keys(capConfig.defaultColors).map((key) => ({
      key,
      label: formatPanelLabel(key),
    }));
  }

  return [{ key: "solid", label: "Cap Colour" }];
}

function createMotifId() {
  return `motif-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function createDefaultExtraMotif(panel: CapPanelOption): StoredExtraMotif {
  return {
    id: createMotifId(),
    type: "text",
    panelKey: panel.key,
    panelLabel: panel.label,
    color: "#000000",
    text: "",
    logo: null,
  };
}

function toUploadedFileSummary(
  fileName: string,
  mimeType: string,
  sizeInBytes: number,
  description?: string,
): StoredUploadedFileSummary {
  return {
    fileName,
    mimeType: mimeType || "application/octet-stream",
    sizeInBytes,
    category: "logo",
    description: description?.trim() || undefined,
  };
}

export default function MultiProductCustomizer({
  initialCapLabel,
}: {
  initialCapLabel?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const svgSourceRef = useRef<HTMLDivElement | null>(null);

  const [isRoutingToQuote, setIsRoutingToQuote] = useState(false);
  const [svgMarkupList, setSvgMarkupList] = useState<string[]>([]);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [extraMotifErrors, setExtraMotifErrors] = useState<
    Record<string, string>
  >({});

  // ── Lazy initialisers read localStorage once on client mount ──
  // (getSvgConfig returns null on SSR; lazy fn runs per mount on client)
  // initialCapLabel (from the collection route) always takes priority so
  // navigating from /collection/4 always pre-selects the right cap type.
  const [capConfig, setCapConfig] = useState<CapConfig>(() => {
    if (initialCapLabel) return getCapByLabel(initialCapLabel) ?? DEFAULT_CAP;
    const saved = getSvgConfig();
    if (saved) return getCapById(saved.capId) ?? DEFAULT_CAP;
    return DEFAULT_CAP;
  });

  const [colors, setColors] = useState<CapColors>(() => {
    if (initialCapLabel) {
      const cap = getCapByLabel(initialCapLabel);
      return cap ? cap.defaultColors : DEFAULT_CAP.defaultColors;
    }
    const saved = getSvgConfig();
    if (saved?.colors) return saved.colors;
    return DEFAULT_CAP.defaultColors;
  });

  const [extraMotifs, setExtraMotifs] = useState<StoredExtraMotif[]>(() => {
    const saved = getSvgConfig();
    return saved?.extraMotifs ?? [];
  });

  const [logoUpload, setLogoUpload] = useState<StoredLogoUpload | null>(() => {
    const saved = getSvgConfig();
    return saved?.logo ?? null;
  });

  // ── new fields ────────────────────────────────────────────
  const [baggyCapType, setBaggyCapType] = useState<string>(() => {
    const saved = getSvgConfig();
    return saved?.baggyCapType ?? "";
  });

  const [cordEnabled, setCordEnabled] = useState<boolean>(() => {
    const saved = getSvgConfig();
    return saved?.cord?.enabled ?? false;
  });

  const [cordColor, setCordColor] = useState<string>(() => {
    const saved = getSvgConfig();
    return saved?.cord?.color ?? "#000000";
  });

  const [tasselColor, setTasselColor] = useState<string>(() => {
    const saved = getSvgConfig();
    return saved?.tasselColor ?? "";
  });

  const panelOptions = useMemo(
    () => getCapPanelOptions(capConfig),
    [capConfig],
  );

  // ─── ProductDropdown selection ───────────────────────────
  function handleProductSelect(label: string) {
    const config = getCapByLabel(label);
    if (!config) return; // label not registered — do nothing

    const nextPanelOptions = getCapPanelOptions(config);
    const panelLookup = new Map(
      nextPanelOptions.map((panel) => [panel.key, panel.label]),
    );

    setExtraMotifs((currentMotifs) => {
      if (nextPanelOptions.length === 0) {
        return [];
      }

      return currentMotifs
        .slice(0, nextPanelOptions.length)
        .map((motif, index) => {
          const fallbackPanel =
            nextPanelOptions[Math.min(index, nextPanelOptions.length - 1)] ??
            nextPanelOptions[0];

          const panelKey = panelLookup.has(motif.panelKey)
            ? motif.panelKey
            : fallbackPanel.key;

          return {
            ...motif,
            panelKey,
            panelLabel: panelLookup.get(panelKey) ?? fallbackPanel.label,
          };
        });
    });

    setExtraMotifErrors({});
    setCapConfig(config);
    setColors(config.defaultColors); // reset colours to new cap defaults
    // reset new cap-specific fields
    setBaggyCapType("");
    setCordEnabled(false);
    setCordColor("#000000");
    setTasselColor("");
  }

  // ─── CustomizePanel colour change ────────────────────────
  function handleColorChange(value: string, panelKey?: string) {
    const key = panelKey ?? "solid";
    setColors((prev) => ({ ...prev, [key]: value }));
  }

  const handleAddExtraMotif = useCallback(() => {
    const limit =
      capConfig.id === "baggy-single" || capConfig.id === "honours"
        ? 10
        : panelOptions.length;
    setExtraMotifs((currentMotifs) => {
      if (panelOptions.length === 0 || currentMotifs.length >= limit) {
        return currentMotifs;
      }

      const defaultPanel =
        panelOptions[Math.min(currentMotifs.length, panelOptions.length - 1)] ??
        panelOptions[panelOptions.length - 1];

      return [...currentMotifs, createDefaultExtraMotif(defaultPanel)];
    });
  }, [capConfig.id, panelOptions]);

  const handleRemoveExtraMotif = useCallback((motifId: string) => {
    setExtraMotifs((currentMotifs) =>
      currentMotifs.filter((motif) => motif.id !== motifId),
    );
    setExtraMotifErrors((currentErrors) => {
      if (!currentErrors[motifId]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[motifId];
      return nextErrors;
    });
  }, []);

  const handleExtraMotifTypeChange = useCallback(
    (motifId: string, nextType: StoredExtraMotif["type"]) => {
      setExtraMotifs((currentMotifs) =>
        currentMotifs.map((motif) =>
          motif.id === motifId
            ? {
                ...motif,
                type: nextType,
                text: nextType === "text" ? motif.text : "",
                logo: nextType === "logo" ? motif.logo : null,
              }
            : motif,
        ),
      );

      setExtraMotifErrors((currentErrors) => {
        if (!currentErrors[motifId]) {
          return currentErrors;
        }

        const nextErrors = { ...currentErrors };
        delete nextErrors[motifId];
        return nextErrors;
      });
    },
    [],
  );

  const handleExtraMotifTextChange = useCallback(
    (motifId: string, textValue: string) => {
      setExtraMotifs((currentMotifs) =>
        currentMotifs.map((motif) =>
          motif.id === motifId
            ? { ...motif, text: textValue.slice(0, 120) }
            : motif,
        ),
      );
    },
    [],
  );

  const handleExtraMotifPanelChange = useCallback(
    (motifId: string, panelKey: string) => {
      const panelLookup = new Map(
        panelOptions.map((panel) => [panel.key, panel.label]),
      );

      setExtraMotifs((currentMotifs) =>
        currentMotifs.map((motif) =>
          motif.id === motifId
            ? {
                ...motif,
                panelKey,
                panelLabel: panelLookup.get(panelKey) ?? motif.panelLabel,
              }
            : motif,
        ),
      );
    },
    [panelOptions],
  );

  const handleExtraMotifColorChange = useCallback(
    (motifId: string, colorValue: string) => {
      setExtraMotifs((currentMotifs) =>
        currentMotifs.map((motif) =>
          motif.id === motifId ? { ...motif, color: colorValue } : motif,
        ),
      );
    },
    [],
  );

  const handleExtraMotifLogoSelect = useCallback(
    async (motifId: string, file: File | null) => {
      setExtraMotifErrors((currentErrors) => {
        if (!currentErrors[motifId]) {
          return currentErrors;
        }

        const nextErrors = { ...currentErrors };
        delete nextErrors[motifId];
        return nextErrors;
      });

      if (!file) {
        setExtraMotifs((currentMotifs) =>
          currentMotifs.map((motif) =>
            motif.id === motifId ? { ...motif, logo: null } : motif,
          ),
        );
        return;
      }

      if (!ALLOWED_LOGO_TYPES.has(file.type)) {
        setExtraMotifErrors((currentErrors) => ({
          ...currentErrors,
          [motifId]: "Please upload a PNG, JPG, WEBP, or SVG image.",
        }));
        return;
      }

      if (file.size > MAX_LOGO_SIZE_BYTES) {
        setExtraMotifErrors((currentErrors) => ({
          ...currentErrors,
          [motifId]: "Logo image must be 1 MB or smaller.",
        }));
        return;
      }

      try {
        const dataUrl = await readFileAsDataUrl(file);

        setExtraMotifs((currentMotifs) =>
          currentMotifs.map((motif) =>
            motif.id === motifId
              ? {
                  ...motif,
                  logo: {
                    fileName: file.name,
                    mimeType: file.type,
                    sizeInBytes: file.size,
                    dataUrl,
                    description: motif.logo?.description ?? "",
                  },
                }
              : motif,
          ),
        );
      } catch {
        setExtraMotifErrors((currentErrors) => ({
          ...currentErrors,
          [motifId]:
            "Could not read the selected image. Please try another file.",
        }));
      }
    },
    [],
  );

  const handleExtraMotifLogoClear = useCallback((motifId: string) => {
    setExtraMotifs((currentMotifs) =>
      currentMotifs.map((motif) =>
        motif.id === motifId ? { ...motif, logo: null } : motif,
      ),
    );

    setExtraMotifErrors((currentErrors) => {
      if (!currentErrors[motifId]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[motifId];
      return nextErrors;
    });
  }, []);

  const handleLogoSelect = useCallback(async (file: File | null) => {
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
      setLogoUpload((currentLogoUpload) => ({
        fileName: file.name,
        mimeType: file.type,
        sizeInBytes: file.size,
        dataUrl,
        description: currentLogoUpload?.description?.trim() ?? "",
      }));
    } catch {
      setLogoError(
        "Could not read the selected image. Please try another file.",
      );
    }
  }, []);

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
  }, [
    capConfig.id,
    colors,
    cordColor,
    cordEnabled,
    tasselColor,
    extractSvgMarkupList,
  ]);

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

  const captureSvgViews = useCallback(() => {
    const svgMarkups =
      svgMarkupList.length > 0 ? svgMarkupList : extractSvgMarkupList();

    return svgMarkups
      .map((markup) => markup.trim())
      .filter((markup) => markup.length > 0);
  }, [extractSvgMarkupList, svgMarkupList]);

  const buildSvgConfigPayload = useCallback((): StoredSvgConfig => {
    const panelLookup = new Map(
      panelOptions.map((panel) => [panel.key, panel.label]),
    );

    const panels = panelOptions.map((panel) => ({
      key: panel.key,
      label: panel.label,
      color: colors[panel.key] ?? "#FFFFFF",
    }));

    const motifLimit =
      capConfig.id === "baggy-single" || capConfig.id === "honours"
        ? 10
        : panelOptions.length;
    const normalizedExtraMotifs = extraMotifs
      .slice(0, motifLimit)
      .map((motif, index) => {
        const fallbackPanel =
          panelOptions[Math.min(index, panelOptions.length - 1)] ??
          panelOptions[0];

        if (!fallbackPanel) {
          return null;
        }

        const panelKey = panelLookup.has(motif.panelKey)
          ? motif.panelKey
          : fallbackPanel.key;

        return {
          ...motif,
          panelKey,
          panelLabel: panelLookup.get(panelKey) ?? fallbackPanel.label,
          color: motif.color || "#000000",
          text: motif.text.trim(),
          logo: motif.logo ?? null,
        };
      })
      .filter((motif): motif is StoredExtraMotif => {
        if (!motif) {
          return false;
        }

        if (motif.type === "text") {
          return motif.text.length > 0;
        }

        return Boolean(motif.logo);
      });

    const uploadedFiles: StoredUploadedFileSummary[] = [];

    if (logoUpload) {
      uploadedFiles.push(
        toUploadedFileSummary(
          logoUpload.fileName,
          logoUpload.mimeType,
          logoUpload.sizeInBytes,
          logoUpload.description,
        ),
      );
    }

    normalizedExtraMotifs.forEach((motif, index) => {
      if (motif.type !== "logo" || !motif.logo) {
        return;
      }

      uploadedFiles.push(
        toUploadedFileSummary(
          motif.logo.fileName,
          motif.logo.mimeType,
          motif.logo.sizeInBytes,
          `Motif ${index + 1} on ${motif.panelLabel}`,
        ),
      );
    });

    const isBaggyCap =
      capConfig.id === "baggy-single" || capConfig.id === "baggy-multi";
    const isHonoursCap = capConfig.id === "honours";

    return {
      source: "svg",
      capId: capConfig.id,
      capLabel: capConfig.label,
      capType: capConfig.type,
      colors: { ...colors },
      panels,
      logo: logoUpload,
      extraMotifs: normalizedExtraMotifs,
      svgMarkup: captureSvgMarkup(),
      svgViews: captureSvgViews(),
      uploadedFiles,
      updatedAt: new Date().toISOString(),
      sourcePath: pathname,
      baggyCapType: isBaggyCap ? baggyCapType || null : null,
      cord: isBaggyCap ? { enabled: cordEnabled, color: cordColor } : null,
      tasselColor: isHonoursCap ? tasselColor || null : null,
    };
  }, [
    baggyCapType,
    capConfig,
    captureSvgMarkup,
    captureSvgViews,
    colors,
    cordColor,
    cordEnabled,
    extraMotifs,
    logoUpload,
    panelOptions,
    pathname,
    tasselColor,
  ]);

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

  // ── motif limit: single baggy and honours caps get 10 motifs ──
  const extraMotifLimit =
    capConfig.id === "baggy-single" || capConfig.id === "honours"
      ? 10
      : panelOptions.length;

  // ─── dynamic SVG ─────────────────────────────────────────
  const { SVGComponent } = capConfig;

  return (
    <section
      className="relative min-h-screen bg-[#F3F6FC] px-4 py-12"
      aria-label="Customize product"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div
          ref={svgSourceRef}
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        >
          {capConfig.id === "baggy-single" ? (
            <CustomCricketBaggyCapSingleColor
              colors={colors}
              cordEnabled={cordEnabled}
              cordColor={cordColor}
            />
          ) : capConfig.id === "baggy-multi" ? (
            <CustomCricketBaggyCapMultiColor
              colors={colors}
              cordEnabled={cordEnabled}
              cordColor={cordColor}
            />
          ) : capConfig.id === "honours" ? (
            <HonoursCapSVG
              colors={colors}
              tasselColor={tasselColor || undefined}
            />
          ) : (
            <SVGComponent colors={colors} />
          )}
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
              panelOptions={panelOptions}
              colors={colors}
              onColorChange={handleColorChange}
              logoUpload={logoUpload}
              logoError={logoError}
              onLogoSelect={handleLogoSelect}
              onLogoDescriptionChange={handleLogoDescriptionChange}
              onLogoClear={handleLogoClear}
              extraMotifs={extraMotifs}
              extraMotifLimit={extraMotifLimit}
              extraMotifErrors={extraMotifErrors}
              onAddExtraMotif={handleAddExtraMotif}
              onRemoveExtraMotif={handleRemoveExtraMotif}
              onExtraMotifTypeChange={handleExtraMotifTypeChange}
              onExtraMotifTextChange={handleExtraMotifTextChange}
              onExtraMotifPanelChange={handleExtraMotifPanelChange}
              onExtraMotifColorChange={handleExtraMotifColorChange}
              onExtraMotifLogoSelect={handleExtraMotifLogoSelect}
              onExtraMotifLogoClear={handleExtraMotifLogoClear}
              baggyCapType={baggyCapType}
              onBaggyCapTypeChange={setBaggyCapType}
              cordEnabled={cordEnabled}
              cordColor={cordColor}
              onCordToggle={setCordEnabled}
              onCordColorChange={setCordColor}
              tasselColor={tasselColor}
              onTasselColorChange={setTasselColor}
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
              ) : capConfig.id === "baggy-single" ? (
                <CustomCricketBaggyCapSingleColor
                  colors={colors}
                  cordEnabled={cordEnabled}
                  cordColor={cordColor}
                />
              ) : capConfig.id === "baggy-multi" ? (
                <CustomCricketBaggyCapMultiColor
                  colors={colors}
                  cordEnabled={cordEnabled}
                  cordColor={cordColor}
                />
              ) : capConfig.id === "honours" ? (
                <HonoursCapSVG
                  colors={colors}
                  tasselColor={tasselColor || undefined}
                />
              ) : (
                <SVGComponent colors={colors} />
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-4 sm:px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#143D59]">
            Step 1 of 2
          </p>
          <p className="mt-1 text-sm text-[#4B5563]">
            Your panel selections are saved automatically.
          </p>

          <button
            type="button"
            onClick={handleRequestQuote}
            disabled={isRoutingToQuote}
            className="mt-3 inline-flex h-11 min-h-11 w-full items-center justify-center rounded-xl bg-[#143D59] px-5 text-sm font-semibold text-white transition hover:bg-[#143D59]/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isRoutingToQuote ? "Continuing..." : "Request a Quote"}
          </button>
        </div>
      </div>
    </section>
  );
}
