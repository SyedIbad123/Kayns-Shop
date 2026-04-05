import type { CSSProperties } from "react";

import type { QuoteSubmissionValues } from "@/lib/validators";

export interface QuoteEmailAttachmentSummary {
  fileName: string;
  mimeType: string;
  sizeInBytes: number;
  category: string;
  label: string;
  description?: string;
}

interface QuoteEmailTemplateProps {
  payload: QuoteSubmissionValues;
  appUrl?: string;
  safeSvgMarkup?: string | null;
  attachmentSummaries?: QuoteEmailAttachmentSummary[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
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

function getSourceDetails(configuration: unknown) {
  if (!isRecord(configuration)) {
    return { source: "unknown", data: null as Record<string, unknown> | null };
  }

  const source =
    configuration.source === "standard" || configuration.source === "svg"
      ? configuration.source
      : "unknown";

  return {
    source,
    data: configuration,
  };
}

function getSafeLogoDataUrl(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
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

function normalizeColorToken(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const isHex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed);
  const isWord = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/.test(trimmed);

  if (isHex || isWord) {
    return trimmed;
  }

  return null;
}

function getLogoDetails(configuration: Record<string, unknown> | null) {
  if (!configuration) {
    return null;
  }

  const maybeLogo = configuration.logo;
  if (!isRecord(maybeLogo)) {
    return null;
  }

  const fileName =
    typeof maybeLogo.fileName === "string" ? maybeLogo.fileName : "logo-image";
  const mimeType =
    typeof maybeLogo.mimeType === "string"
      ? maybeLogo.mimeType
      : "image/unknown";
  const sizeInBytes =
    typeof maybeLogo.sizeInBytes === "number" ? maybeLogo.sizeInBytes : 0;
  const description =
    typeof maybeLogo.description === "string"
      ? maybeLogo.description.trim()
      : "";
  const safeDataUrl = getSafeLogoDataUrl(maybeLogo.dataUrl);

  return {
    fileName,
    mimeType,
    sizeInBytes,
    description,
    safeDataUrl,
  };
}

function getExtraMotifs(configuration: Record<string, unknown> | null) {
  if (!configuration || !Array.isArray(configuration.extraMotifs)) {
    return [] as Array<Record<string, unknown>>;
  }

  return configuration.extraMotifs.filter(
    (motif): motif is Record<string, unknown> => isRecord(motif),
  );
}

function parseColorDescriptions(rawValue: unknown) {
  if (typeof rawValue !== "string") {
    return [] as string[];
  }

  return rawValue
    .split(/\r?\n|,|;/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

const pageStyle: CSSProperties = {
  margin: "0",
  padding: "0",
  backgroundColor: "#E9E9E9",
  fontFamily: "Tahoma, Verdana, Arial, sans-serif",
  color: "#1F2937",
};

const cardStyle: CSSProperties = {
  maxWidth: "980px",
  margin: "18px auto",
  backgroundColor: "#FFFFFF",
  border: "1px solid #D1D5DB",
};

const sectionStyle: CSSProperties = {
  padding: "14px 16px",
  borderTop: "1px solid #E5E7EB",
};

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
};

const headerCellStyle: CSSProperties = {
  border: "1px solid #BFC0C2",
  backgroundColor: "#F3F4F6",
  padding: "6px 8px",
  textAlign: "left",
  color: "#111827",
};

const bodyCellStyle: CSSProperties = {
  border: "1px solid #D1D5DB",
  padding: "6px 8px",
  color: "#111827",
  verticalAlign: "top",
};

const labelBoxStyle: CSSProperties = {
  border: "1px solid #1D4ED8",
  padding: "8px 10px",
  fontSize: "13px",
  backgroundColor: "#FFFFFF",
  color: "#1F2937",
  minWidth: "140px",
};

function SectionTitle({ title }: { title: string }) {
  return (
    <p
      style={{
        margin: "0 0 8px",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: "#111827",
        textTransform: "uppercase",
      }}
    >
      {title}
    </p>
  );
}

export default function QuoteEmailTemplate({
  payload,
  appUrl,
  safeSvgMarkup,
  attachmentSummaries = [],
}: QuoteEmailTemplateProps) {
  const sourceDetails = getSourceDetails(payload.configuration);
  const sourceData = sourceDetails.data;
  const logoDetails = getLogoDetails(sourceData);
  const extraMotifs = getExtraMotifs(sourceData);

  const standardValues = isRecord(sourceData?.values)
    ? sourceData.values
    : null;

  const svgPanels = Array.isArray(sourceData?.panels)
    ? sourceData.panels.filter(isRecord)
    : [];

  const svgColors = isRecord(sourceData?.colors) ? sourceData.colors : null;
  const standardColorRows = parseColorDescriptions(standardValues?.colors);

  const submittedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const contactCells: Array<[string, string]> = [
    ["Name", payload.fullName],
    ["Phone", payload.phoneNumber],
    ["Email", payload.emailAddress],
    ["Club/Reference", payload.clubReference || "N/A"],
    ["Address", payload.fullAddress],
    ["Comments", payload.comments || "N/A"],
  ];

  const motifRows = extraMotifs.map((motif, index) => {
    const type = motif.type === "logo" ? "Logo" : "Text";
    const panelLabel =
      typeof motif.panelLabel === "string" ? motif.panelLabel : "N/A";

    const details =
      motif.type === "logo"
        ? isRecord(motif.logo) && typeof motif.logo.fileName === "string"
          ? motif.logo.fileName
          : "N/A"
        : typeof motif.text === "string" && motif.text.trim().length > 0
          ? motif.text
          : "N/A";

    const color =
      motif.type === "text" && typeof motif.color === "string"
        ? motif.color
        : "N/A";

    return {
      id: `${String(motif.id ?? index)}-${index}`,
      index: index + 1,
      type,
      panelLabel,
      details,
      color,
    };
  });

  const motifLogoPreviews = extraMotifs
    .map((motif, index) => {
      if (!isRecord(motif.logo)) {
        return null;
      }

      const safeDataUrl = getSafeLogoDataUrl(motif.logo.dataUrl);
      if (!safeDataUrl) {
        return null;
      }

      return {
        id: `${String(motif.id ?? index)}-logo`,
        index: index + 1,
        panelLabel:
          typeof motif.panelLabel === "string" ? motif.panelLabel : "N/A",
        fileName:
          typeof motif.logo.fileName === "string"
            ? motif.logo.fileName
            : `motif-logo-${index + 1}`,
        mimeType:
          typeof motif.logo.mimeType === "string"
            ? motif.logo.mimeType
            : "image/unknown",
        sizeInBytes:
          typeof motif.logo.sizeInBytes === "number"
            ? motif.logo.sizeInBytes
            : 0,
        safeDataUrl,
      };
    })
    .filter(
      (
        preview,
      ): preview is {
        id: string;
        index: number;
        panelLabel: string;
        fileName: string;
        mimeType: string;
        sizeInBytes: number;
        safeDataUrl: string;
      } => Boolean(preview),
    );

  return (
    <html>
      <body style={pageStyle}>
        <div style={cardStyle}>
          <div
            style={{
              backgroundColor: "#111827",
              color: "#FFFFFF",
              padding: "12px 16px",
            }}
          >
            <h1 style={{ margin: "0", fontSize: "20px" }}>New Quote Request</h1>
            <p style={{ margin: "4px 0 0", opacity: "0.88", fontSize: "12px" }}>
              Submitted at {submittedAt}
              {sourceDetails.source !== "unknown"
                ? ` · Source: ${sourceDetails.source.toUpperCase()}`
                : ""}
            </p>
          </div>

          <div style={sectionStyle}>
            <SectionTitle title="Customer Details" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {contactCells.map(([label, value]) => (
                <div key={label} style={labelBoxStyle}>
                  <strong>{label} :</strong> {value}
                </div>
              ))}
            </div>
          </div>

          <div style={sectionStyle}>
            <SectionTitle title="Configuration Summary" />

            {sourceDetails.source === "standard" && standardValues ? (
              <div>
                <table role="presentation" style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={headerCellStyle}>Field</th>
                      <th style={headerCellStyle}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={bodyCellStyle}>Source</td>
                      <td style={bodyCellStyle}>
                        Standard Product Configurator
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCellStyle}>Product Type</td>
                      <td style={bodyCellStyle}>
                        {formatValue(sourceData?.productType)}
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCellStyle}>Product ID</td>
                      <td style={bodyCellStyle}>
                        {formatValue(sourceData?.productId)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table
                  role="presentation"
                  style={{ ...tableStyle, marginTop: "10px" }}
                >
                  <thead>
                    <tr>
                      <th style={headerCellStyle}>Option</th>
                      <th style={headerCellStyle}>Selection</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(standardValues).map(([key, value]) => (
                      <tr key={key}>
                        <td style={bodyCellStyle}>{formatLabel(key)}</td>
                        <td style={bodyCellStyle}>{formatValue(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {standardColorRows.length > 0 ? (
                  <table
                    role="presentation"
                    style={{ ...tableStyle, marginTop: "10px" }}
                  >
                    <thead>
                      <tr>
                        <th style={headerCellStyle}>Panel / Colour Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standardColorRows.map((entry, index) => (
                        <tr key={`${entry}-${index}`}>
                          <td style={bodyCellStyle}>{entry}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>
            ) : null}

            {sourceDetails.source === "svg" ? (
              <div>
                <table role="presentation" style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={headerCellStyle}>Field</th>
                      <th style={headerCellStyle}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={bodyCellStyle}>Source</td>
                      <td style={bodyCellStyle}>SVG Panel Configurator</td>
                    </tr>
                    <tr>
                      <td style={bodyCellStyle}>Product</td>
                      <td style={bodyCellStyle}>
                        {formatValue(sourceData?.capLabel)}
                      </td>
                    </tr>
                    <tr>
                      <td style={bodyCellStyle}>Cap Type</td>
                      <td style={bodyCellStyle}>
                        {formatValue(sourceData?.capType)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {svgPanels.length > 0 ? (
                  <table
                    role="presentation"
                    style={{ ...tableStyle, marginTop: "10px" }}
                  >
                    <thead>
                      <tr>
                        <th style={headerCellStyle}>Panel</th>
                        <th style={headerCellStyle}>Colour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {svgPanels.map((panel, index) => (
                        <tr key={`${String(panel.key)}-${index}`}>
                          <td style={bodyCellStyle}>
                            {formatValue(panel.label || panel.key)}
                          </td>
                          <td style={bodyCellStyle}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "14px",
                                  height: "14px",
                                  border: "1px solid #9CA3AF",
                                  backgroundColor:
                                    normalizeColorToken(panel.color) ||
                                    "#FFFFFF",
                                }}
                              />
                              {formatValue(panel.color)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}

                {svgPanels.length === 0 && svgColors ? (
                  <table
                    role="presentation"
                    style={{ ...tableStyle, marginTop: "10px" }}
                  >
                    <thead>
                      <tr>
                        <th style={headerCellStyle}>Panel</th>
                        <th style={headerCellStyle}>Colour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(svgColors).map(([key, value]) => (
                        <tr key={key}>
                          <td style={bodyCellStyle}>{formatLabel(key)}</td>
                          <td style={bodyCellStyle}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "14px",
                                  height: "14px",
                                  border: "1px solid #9CA3AF",
                                  backgroundColor:
                                    normalizeColorToken(value) || "#FFFFFF",
                                }}
                              />
                              {formatValue(value)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}

                {motifRows.length > 0 ? (
                  <table
                    role="presentation"
                    style={{ ...tableStyle, marginTop: "10px" }}
                  >
                    <thead>
                      <tr>
                        <th style={headerCellStyle}>Motif #</th>
                        <th style={headerCellStyle}>Type</th>
                        <th style={headerCellStyle}>Panel</th>
                        <th style={headerCellStyle}>Details</th>
                        <th style={headerCellStyle}>Colour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {motifRows.map((motif) => (
                        <tr key={motif.id}>
                          <td style={bodyCellStyle}>{motif.index}</td>
                          <td style={bodyCellStyle}>{motif.type}</td>
                          <td style={bodyCellStyle}>{motif.panelLabel}</td>
                          <td style={bodyCellStyle}>{motif.details}</td>
                          <td style={bodyCellStyle}>{motif.color}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}

                {safeSvgMarkup ? (
                  <div
                    style={{
                      marginTop: "10px",
                      border: "1px solid #D1D5DB",
                      padding: "8px",
                      backgroundColor: "#F9FAFB",
                    }}
                    dangerouslySetInnerHTML={{ __html: safeSvgMarkup }}
                  />
                ) : null}
              </div>
            ) : null}

            {sourceDetails.source === "unknown" ? (
              <p style={{ margin: "0", fontSize: "14px", color: "#6B7280" }}>
                No configuration details were attached.
              </p>
            ) : null}

            {attachmentSummaries.length > 0 ? (
              <table
                role="presentation"
                style={{ ...tableStyle, marginTop: "10px" }}
              >
                <thead>
                  <tr>
                    <th style={headerCellStyle}>Type</th>
                    <th style={headerCellStyle}>File</th>
                    <th style={headerCellStyle}>Format</th>
                    <th style={headerCellStyle}>Size</th>
                    <th style={headerCellStyle}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {attachmentSummaries.map((file, index) => (
                    <tr key={`${file.fileName}-${file.sizeInBytes}-${index}`}>
                      <td style={bodyCellStyle}>{file.label}</td>
                      <td style={bodyCellStyle}>{file.fileName}</td>
                      <td style={bodyCellStyle}>{file.mimeType}</td>
                      <td style={bodyCellStyle}>
                        {formatBytes(file.sizeInBytes)}
                      </td>
                      <td style={bodyCellStyle}>{file.description || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {logoDetails ? (
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #D1D5DB",
                  padding: "10px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <p style={{ margin: "0", fontSize: "13px", fontWeight: 700 }}>
                  Main Logo Preview
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "12px" }}>
                  {logoDetails.fileName} · {logoDetails.mimeType} ·{" "}
                  {formatBytes(logoDetails.sizeInBytes)}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "12px" }}>
                  {logoDetails.description || "No additional notes provided."}
                </p>
                {logoDetails.safeDataUrl ? (
                  <div style={{ marginTop: "8px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoDetails.safeDataUrl}
                      alt="Uploaded logo preview"
                      style={{
                        maxWidth: "170px",
                        maxHeight: "130px",
                        objectFit: "contain",
                        border: "1px solid #D1D5DB",
                        padding: "5px",
                        backgroundColor: "#F9FAFB",
                      }}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}

            {motifLogoPreviews.length > 0 ? (
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #D1D5DB",
                  padding: "10px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <p style={{ margin: "0", fontSize: "13px", fontWeight: 700 }}>
                  Motif Logo Previews
                </p>

                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {motifLogoPreviews.map((preview) => (
                    <div
                      key={preview.id}
                      style={{
                        border: "1px solid #D1D5DB",
                        backgroundColor: "#F9FAFB",
                        padding: "6px",
                        width: "180px",
                      }}
                    >
                      <p
                        style={{
                          margin: "0",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        Motif {preview.index}
                      </p>
                      <p style={{ margin: "2px 0 0", fontSize: "11px" }}>
                        Panel: {preview.panelLabel}
                      </p>
                      <p style={{ margin: "2px 0 0", fontSize: "11px" }}>
                        {preview.fileName}
                      </p>
                      <p style={{ margin: "2px 0 0", fontSize: "11px" }}>
                        {preview.mimeType} · {formatBytes(preview.sizeInBytes)}
                      </p>

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview.safeDataUrl}
                        alt={`Motif ${preview.index} logo preview`}
                        style={{
                          marginTop: "6px",
                          maxWidth: "100%",
                          height: "90px",
                          objectFit: "contain",
                          border: "1px solid #D1D5DB",
                          backgroundColor: "#FFFFFF",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div style={{ ...sectionStyle, backgroundColor: "#F9FAFB" }}>
            <p style={{ margin: "0", fontSize: "11px", color: "#6B7280" }}>
              Generated by Kayns Shop quote workflow
              {appUrl ? ` (${appUrl})` : ""}.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
