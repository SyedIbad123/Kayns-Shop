import Image from "next/image";
import type { StoredLogoUpload, StoredQuoteConfig } from "@/lib/storage";

interface ConfigSummaryProps {
  configuration: StoredQuoteConfig | null;
}

function formatLabel(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  if (Array.isArray(value)) {
    return value.map((entry) => formatValue(entry)).join(", ");
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

function getSafeMarkup(markup: string | null | undefined) {
  if (!markup) {
    return null;
  }

  const trimmed = markup.trim();
  if (!trimmed.includes("<svg")) {
    return null;
  }

  return trimmed
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/javascript:/gi, "");
}

function getSafeLogoDataUrl(dataUrl: string | null | undefined) {
  if (!dataUrl || typeof dataUrl !== "string") {
    return null;
  }

  const trimmed = dataUrl.trim();
  const isSafeImageDataUrl =
    /^data:image\/(png|jpeg|jpg|webp|svg\+xml);base64,[a-zA-Z0-9+/=\s]+$/i.test(
      trimmed,
    );

  return isSafeImageDataUrl ? trimmed : null;
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

function LogoSummary({ logo }: { logo: StoredLogoUpload }) {
  const safeLogoDataUrl = getSafeLogoDataUrl(logo.dataUrl);

  return (
    <div className="mt-4 rounded-xl border border-[#E5E7EB] bg-white p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
        Uploaded Logo
      </p>

      <div className="mt-2 flex items-start gap-3">
        {safeLogoDataUrl ? (
          <Image
            src={safeLogoDataUrl}
            alt="Uploaded logo"
            width={72}
            height={72}
            unoptimized
            className="h-18 w-18 rounded-md border border-[#E5E7EB] bg-white object-contain"
          />
        ) : null}

        <div className="min-w-0 text-sm text-[#111827]">
          <p className="truncate font-medium">{logo.fileName}</p>
          <p className="text-xs text-[#6B7280]">
            {logo.mimeType} · {formatBytes(logo.sizeInBytes)}
          </p>
          <p className="mt-1 text-xs text-[#374151]">
            {logo.description?.trim()
              ? `Description: ${logo.description.trim()}`
              : "Description: No additional notes provided."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConfigSummary({ configuration }: ConfigSummaryProps) {
  if (!configuration) {
    return (
      <section className="rounded-2xl border border-dashed border-[#D1D5DB] bg-white px-5 py-5">
        <h2 className="text-lg font-semibold text-[#111827]">
          Configuration Summary
        </h2>
        <p className="mt-2 text-sm text-[#6B7280]">
          No saved configuration was found. Return to the configurator to select
          your product options.
        </p>
      </section>
    );
  }

  if (configuration.source === "standard") {
    const logo = configuration.logo ?? null;

    return (
      <section className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-5 shadow-sm">
        <h2 className="text-lg font-semibold text-[#111827]">
          Configuration Summary
        </h2>
        <p className="mt-1 text-sm text-[#6B7280]">
          Source: Standard Product Configurator
        </p>

        <div className="mt-4 rounded-xl border border-[#F3F4F6] bg-[#FCFCFD] p-4">
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <p>
              <span className="font-semibold text-[#374151]">
                Product Type:
              </span>{" "}
              {formatValue(configuration.productType)}
            </p>
            <p>
              <span className="font-semibold text-[#374151]">Product ID:</span>{" "}
              {formatValue(configuration.productId)}
            </p>
          </div>

          <ul className="mt-3 space-y-2">
            {Object.entries(configuration.values).map(([key, value]) => (
              <li
                key={key}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span className="font-medium text-[#374151]">
                  {formatLabel(key)}
                </span>
                <span className="text-right text-[#111827]">
                  {formatValue(value)}
                </span>
              </li>
            ))}
          </ul>

          {logo ? <LogoSummary logo={logo} /> : null}
        </div>
      </section>
    );
  }

  const logo = configuration.logo ?? null;
  const safeMarkup = getSafeMarkup(configuration.svgMarkup);

  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-5 shadow-sm">
      <h2 className="text-lg font-semibold text-[#111827]">
        Configuration Summary
      </h2>
      <p className="mt-1 text-sm text-[#6B7280]">
        Source: SVG Panel Configurator
      </p>

      <div className="mt-4 rounded-xl border border-[#F3F4F6] bg-[#FCFCFD] p-4">
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          <p>
            <span className="font-semibold text-[#374151]">Cap:</span>{" "}
            {formatValue(configuration.capLabel)}
          </p>
          <p>
            <span className="font-semibold text-[#374151]">Type:</span>{" "}
            {formatValue(configuration.capType)}
          </p>
        </div>

        <ul className="mt-3 space-y-2">
          {configuration.panels.map((panel) => (
            <li
              key={`${panel.key}-${panel.label}`}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="font-medium text-[#374151]">{panel.label}</span>
              <span className="inline-flex items-center gap-2 text-[#111827]">
                <span
                  className="h-4 w-4 rounded-full border border-[#D1D5DB]"
                  style={{ backgroundColor: panel.color }}
                  aria-hidden="true"
                />
                {panel.color}
              </span>
            </li>
          ))}
        </ul>

        {safeMarkup ? (
          <div className="mt-4 rounded-xl border border-[#E5E7EB] bg-white p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
              SVG Snapshot
            </p>
            <div
              className="max-h-[400px] overflow-auto"
              dangerouslySetInnerHTML={{ __html: safeMarkup }}
            />
          </div>
        ) : null}

        {logo ? <LogoSummary logo={logo} /> : null}
      </div>
    </section>
  );
}
