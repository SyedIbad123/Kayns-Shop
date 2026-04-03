import type { CSSProperties } from "react";

import type { QuoteSubmissionValues } from "@/lib/validators";

interface QuoteEmailTemplateProps {
  payload: QuoteSubmissionValues;
  appUrl?: string;
  safeSvgMarkup?: string | null;
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

const wrapperStyle: CSSProperties = {
  margin: "0",
  padding: "0",
  backgroundColor: "#F4F6F8",
  fontFamily: "'Segoe UI', Arial, sans-serif",
  color: "#1F2937",
};

const cardStyle: CSSProperties = {
  maxWidth: "720px",
  margin: "24px auto",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "14px",
  overflow: "hidden",
};

const sectionStyle: CSSProperties = {
  padding: "20px 24px",
  borderTop: "1px solid #F3F4F6",
};

export default function QuoteEmailTemplate({
  payload,
  appUrl,
  safeSvgMarkup,
}: QuoteEmailTemplateProps) {
  const sourceDetails = getSourceDetails(payload.configuration);
  const sourceData = sourceDetails.data;
  const logoDetails = getLogoDetails(sourceData);

  const standardValues = isRecord(sourceData?.values)
    ? sourceData.values
    : null;

  const svgPanels = Array.isArray(sourceData?.panels)
    ? sourceData.panels.filter(isRecord)
    : [];

  const svgColors = isRecord(sourceData?.colors) ? sourceData.colors : null;

  const submittedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <html>
      <body style={wrapperStyle}>
        <div style={cardStyle}>
          <div
            style={{
              backgroundColor: "#0F172A",
              color: "#FFFFFF",
              padding: "20px 24px",
            }}
          >
            <h1 style={{ margin: "0 0 6px", fontSize: "22px" }}>
              New Quote Request
            </h1>
            <p style={{ margin: "0", opacity: "0.85", fontSize: "14px" }}>
              Submitted at {submittedAt}
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={{ margin: "0 0 14px", fontSize: "16px" }}>
              Contact Details
            </h2>
            <table
              role="presentation"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <tbody>
                {[
                  ["Full Name", payload.fullName],
                  ["Phone Number", payload.phoneNumber],
                  ["Email Address", payload.emailAddress],
                  ["Club / Reference", payload.clubReference || "N/A"],
                  ["Full Address", payload.fullAddress],
                  ["Comments / Notes", payload.comments || "N/A"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td
                      style={{
                        width: "180px",
                        verticalAlign: "top",
                        fontWeight: 600,
                        padding: "8px 12px 8px 0",
                        color: "#111827",
                      }}
                    >
                      {label}
                    </td>
                    <td style={{ padding: "8px 0", color: "#374151" }}>
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={sectionStyle}>
            <h2 style={{ margin: "0 0 14px", fontSize: "16px" }}>
              Configuration Summary
            </h2>

            {sourceDetails.source === "standard" && standardValues ? (
              <div>
                <p style={{ margin: "0 0 12px", fontSize: "14px" }}>
                  Source: Standard Product Configurator
                </p>
                <table
                  role="presentation"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <tbody>
                    {Object.entries(standardValues).map(([key, value]) => (
                      <tr key={key}>
                        <td
                          style={{
                            width: "220px",
                            verticalAlign: "top",
                            fontWeight: 600,
                            padding: "6px 12px 6px 0",
                          }}
                        >
                          {formatLabel(key)}
                        </td>
                        <td style={{ padding: "6px 0", color: "#374151" }}>
                          {formatValue(value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {sourceDetails.source === "svg" ? (
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "14px" }}>
                  Source: SVG Panel Configurator
                </p>
                <p style={{ margin: "0 0 6px", fontSize: "14px" }}>
                  Product: {formatValue(sourceData?.capLabel)}
                </p>
                <p style={{ margin: "0 0 14px", fontSize: "14px" }}>
                  Cap Type: {formatValue(sourceData?.capType)}
                </p>

                {svgPanels.length > 0 ? (
                  <table
                    role="presentation"
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "14px",
                    }}
                  >
                    <tbody>
                      {svgPanels.map((panel, index) => (
                        <tr key={`${String(panel.key)}-${index}`}>
                          <td
                            style={{
                              width: "220px",
                              verticalAlign: "top",
                              fontWeight: 600,
                              padding: "6px 12px 6px 0",
                            }}
                          >
                            {formatValue(panel.label || panel.key)}
                          </td>
                          <td style={{ padding: "6px 0", color: "#374151" }}>
                            {formatValue(panel.color)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}

                {svgPanels.length === 0 && svgColors ? (
                  <table
                    role="presentation"
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "14px",
                    }}
                  >
                    <tbody>
                      {Object.entries(svgColors).map(([key, value]) => (
                        <tr key={key}>
                          <td
                            style={{
                              width: "220px",
                              verticalAlign: "top",
                              fontWeight: 600,
                              padding: "6px 12px 6px 0",
                            }}
                          >
                            {formatLabel(key)}
                          </td>
                          <td style={{ padding: "6px 0", color: "#374151" }}>
                            {formatValue(value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}

                {safeSvgMarkup ? (
                  <div
                    style={{
                      marginTop: "16px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      padding: "12px",
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

            {logoDetails ? (
              <div
                style={{
                  marginTop: "16px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  padding: "12px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#6B7280",
                    fontWeight: 700,
                  }}
                >
                  Uploaded Logo
                </p>

                <p style={{ margin: "0", fontSize: "14px", color: "#111827" }}>
                  <strong>File:</strong> {logoDetails.fileName}
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "13px",
                    color: "#4B5563",
                  }}
                >
                  {logoDetails.mimeType} ·{" "}
                  {formatBytes(logoDetails.sizeInBytes)}
                </p>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: "13px",
                    color: "#374151",
                  }}
                >
                  <strong>Description:</strong>{" "}
                  {logoDetails.description || "No additional notes provided."}
                </p>

                {logoDetails.safeDataUrl ? (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={logoDetails.safeDataUrl}
                      alt="Uploaded logo preview"
                      style={{
                        maxWidth: "180px",
                        maxHeight: "140px",
                        objectFit: "contain",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        padding: "6px",
                        backgroundColor: "#F9FAFB",
                      }}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div style={{ ...sectionStyle, backgroundColor: "#F9FAFB" }}>
            <p style={{ margin: "0", fontSize: "12px", color: "#6B7280" }}>
              Generated by Kayns Shop quote workflow
              {appUrl ? ` (${appUrl})` : ""}.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
