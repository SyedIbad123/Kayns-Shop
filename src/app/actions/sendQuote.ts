"use server";

import { createHash } from "crypto";
import { createElement } from "react";
import { Resend, type Attachment } from "resend";

import QuoteEmailTemplate, {
  type QuoteEmailAttachmentSummary,
  type QuoteEmailTemplateVariant,
} from "@/components/email/QuoteEmailTemplate";
import { quoteSubmissionSchema } from "@/lib/validators";

export interface SendQuoteEmailResult {
  success: boolean;
  message: string;
}

const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const MAX_ATTACHMENT_COUNT = 24;
const MAX_INLINE_PREVIEW_BYTES = 512 * 1024;
const SAFE_IMAGE_DATA_URL_REGEX =
  /^data:image\/(png|jpeg|jpg|webp|svg\+xml);base64,[a-zA-Z0-9+/=\s]+$/i;

const ALLOWED_ATTACHMENT_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".svg",
  ".pdf",
  ".ai",
  ".cdr",
  ".html",
]);

const MIME_EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "application/pdf": ".pdf",
  "text/html": ".html",
};

const DEFAULT_QUOTE_FROM_EMAIL = "Kayns Shop Quotes <onboarding@resend.dev>";
const PRODUCTION_APP_URL = "https://kayns.co.uk";
const LOCAL_DEV_APP_URL = "http://localhost:3000";
const PREVIEWABLE_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

interface ParsedRawInput {
  payload: unknown;
  logoFiles: File[];
  designFiles: File[];
}

interface AttachmentBuildResult {
  attachments: Attachment[];
  inlinePreviewAttachments: Attachment[];
  summaries: QuoteEmailAttachmentSummary[];
  errorMessage?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function sanitizeSvgMarkup(markup: unknown) {
  if (typeof markup !== "string") {
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

function getSafeSvgMarkup(configuration: unknown) {
  if (!isRecord(configuration)) {
    return null;
  }

  const maybeSvg = configuration.svgMarkup;
  return sanitizeSvgMarkup(maybeSvg);
}

function getSafeSvgViews(configuration: unknown) {
  if (!isRecord(configuration) || !Array.isArray(configuration.svgViews)) {
    return [] as string[];
  }

  return configuration.svgViews
    .map((markup) => sanitizeSvgMarkup(markup))
    .filter((markup): markup is string => Boolean(markup));
}

function getSafeLogoDataUrl(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  const isSafeImageDataUrl = SAFE_IMAGE_DATA_URL_REGEX.test(trimmed);

  return isSafeImageDataUrl ? trimmed : null;
}

function extractExtension(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");
  if (lastDot === -1) {
    return "";
  }

  return fileName.slice(lastDot).toLowerCase();
}

function withExtensionFallback(fileName: string, mimeType: string) {
  const currentExtension = extractExtension(fileName);
  if (currentExtension) {
    return fileName;
  }

  const fallbackExtension = MIME_EXTENSION_MAP[mimeType.toLowerCase()];
  if (!fallbackExtension) {
    return fileName;
  }

  return `${fileName}${fallbackExtension}`;
}

function sanitizeFileName(name: string) {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function normalizeEnvValue(value: string | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getSafeInlineContentId(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().replace(/^cid:/i, "");
  if (!normalized) {
    return null;
  }

  return /^[a-zA-Z0-9_.+\-@]+$/.test(normalized) ? normalized : null;
}

function normalizeAppUrl(value: string | null) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const withProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function resolveAppUrl() {
  const explicitAppUrl = normalizeAppUrl(
    normalizeEnvValue(process.env.NEXT_PUBLIC_APP_URL) ??
      normalizeEnvValue(process.env.APP_URL),
  );

  if (process.env.NODE_ENV === "production") {
    return explicitAppUrl ?? PRODUCTION_APP_URL;
  }

  const inferredAppUrl =
    explicitAppUrl ??
    normalizeAppUrl(
      normalizeEnvValue(process.env.VERCEL_URL) ??
        normalizeEnvValue(process.env.VERCEL_PROJECT_PRODUCTION_URL),
    );

  return inferredAppUrl ?? LOCAL_DEV_APP_URL;
}

function isSingleSvgMarkup(markup: string) {
  return /^<svg[\s>]/i.test(markup.trim());
}

function buildInlinePreviewContent({
  mimeType,
  extension,
  content,
}: {
  mimeType: string;
  extension: string;
  content: Buffer;
}) {
  if (content.length === 0 || content.length > MAX_INLINE_PREVIEW_BYTES) {
    return null;
  }

  const normalizedMimeType = mimeType.toLowerCase();
  if (normalizedMimeType === "image/svg+xml" || extension === ".svg") {
    const sanitizedSvg = sanitizeSvgMarkup(content.toString("utf8"));
    if (!sanitizedSvg || !isSingleSvgMarkup(sanitizedSvg)) {
      return null;
    }

    return {
      content: Buffer.from(sanitizedSvg, "utf8"),
      mimeType: "image/svg+xml",
    };
  }

  if (!PREVIEWABLE_IMAGE_MIME_TYPES.has(normalizedMimeType)) {
    return null;
  }

  return {
    content,
    mimeType: normalizedMimeType,
  };
}

function createInlinePreviewContentId(contentHash: string) {
  return `quote-preview-${contentHash.slice(0, 24)}@kayns.co.uk`;
}

function parseRawInput(rawPayload: unknown): ParsedRawInput | null {
  if (!(rawPayload instanceof FormData)) {
    return {
      payload: rawPayload,
      logoFiles: [],
      designFiles: [],
    };
  }

  const payloadJson = rawPayload.get("payload");
  if (typeof payloadJson !== "string") {
    return null;
  }

  try {
    return {
      payload: JSON.parse(payloadJson),
      logoFiles: rawPayload
        .getAll("logoFiles")
        .filter((entry): entry is File => entry instanceof File),
      designFiles: rawPayload
        .getAll("designFiles")
        .filter((entry): entry is File => entry instanceof File),
    };
  } catch {
    return null;
  }
}

function decodeImageDataUrl(dataUrl: string) {
  const matches = dataUrl.match(
    /^data:(image\/(png|jpeg|jpg|webp|svg\+xml));base64,([a-zA-Z0-9+/=\s]+)$/i,
  );
  if (!matches) {
    return null;
  }

  const mimeType = matches[1].toLowerCase();
  const base64Content = matches[3].replace(/\s+/g, "");
  const content = Buffer.from(base64Content, "base64");
  if (content.length === 0) {
    return null;
  }

  return {
    mimeType,
    content,
  };
}

function getConfiguredUploadedFileSummaries(configuration: unknown) {
  if (!isRecord(configuration) || !Array.isArray(configuration.uploadedFiles)) {
    return [] as QuoteEmailAttachmentSummary[];
  }

  return configuration.uploadedFiles
    .filter((entry): entry is Record<string, unknown> => isRecord(entry))
    .map((entry) => {
      const fileName =
        typeof entry.fileName === "string" ? entry.fileName : "uploaded-file";
      const mimeType =
        typeof entry.mimeType === "string"
          ? entry.mimeType
          : "application/octet-stream";
      const sizeInBytes =
        typeof entry.sizeInBytes === "number" ? entry.sizeInBytes : 0;
      const category =
        typeof entry.category === "string" ? entry.category : "other";
      const description =
        typeof entry.description === "string" ? entry.description : undefined;
      const previewDataUrl = getSafeLogoDataUrl(entry.previewDataUrl);
      const previewCid = getSafeInlineContentId(entry.previewCid);

      return {
        fileName,
        mimeType,
        sizeInBytes,
        category,
        label:
          category === "design-reference"
            ? "Design Reference"
            : category === "logo"
              ? "Logo Upload"
              : "Uploaded File",
        description,
        previewDataUrl: previewDataUrl ?? undefined,
        previewCid: previewCid ?? undefined,
      };
    });
}

function mergeAttachmentSummaries(
  primary: QuoteEmailAttachmentSummary[],
  secondary: QuoteEmailAttachmentSummary[],
) {
  const mergedByKey = new Map<string, QuoteEmailAttachmentSummary>();

  [...primary, ...secondary].forEach((entry) => {
    const key = `${entry.fileName.toLowerCase()}::${entry.sizeInBytes}::${entry.category}`;
    const existing = mergedByKey.get(key);
    if (!existing) {
      mergedByKey.set(key, entry);
      return;
    }

    mergedByKey.set(key, {
      ...existing,
      ...entry,
      description: existing.description ?? entry.description,
      previewDataUrl: existing.previewDataUrl ?? entry.previewDataUrl,
      previewCid: existing.previewCid ?? entry.previewCid,
    });
  });

  return Array.from(mergedByKey.values());
}

async function buildAttachments({
  configuration,
  logoFiles,
  designFiles,
}: {
  configuration: Record<string, unknown> | null;
  logoFiles: File[];
  designFiles: File[];
}): Promise<AttachmentBuildResult> {
  const attachments: Attachment[] = [];
  const inlinePreviewAttachments: Attachment[] = [];
  const summaries: QuoteEmailAttachmentSummary[] = [];
  const seenContent = new Set<string>();
  const seenInlinePreviewContentIds = new Set<string>();
  let totalBytes = 0;

  const addAttachment = ({
    fileName,
    mimeType,
    content,
    category,
    label,
    description,
  }: {
    fileName: string;
    mimeType: string;
    content: Buffer;
    category: string;
    label: string;
    description?: string;
  }) => {
    if (content.length === 0) {
      return;
    }

    const safeBaseName = sanitizeFileName(fileName) || "quote-file";
    const normalizedFileName = withExtensionFallback(safeBaseName, mimeType);
    const extension = extractExtension(normalizedFileName);
    if (!ALLOWED_ATTACHMENT_EXTENSIONS.has(extension)) {
      return;
    }

    const dedupeKey = createHash("sha256").update(content).digest("hex");
    if (seenContent.has(dedupeKey)) {
      return;
    }

    if (attachments.length >= MAX_ATTACHMENT_COUNT) {
      throw new Error(
        `Attachment limit reached (${MAX_ATTACHMENT_COUNT} files). Please reduce the number of uploads.`,
      );
    }

    if (totalBytes + content.length > MAX_TOTAL_ATTACHMENT_BYTES) {
      throw new Error(
        "Total attachment size is too large. Please reduce file sizes and submit again.",
      );
    }

    seenContent.add(dedupeKey);
    totalBytes += content.length;

    const inlinePreview = buildInlinePreviewContent({
      mimeType,
      extension,
      content,
    });
    const previewCid = inlinePreview
      ? createInlinePreviewContentId(dedupeKey)
      : undefined;

    attachments.push({
      filename: normalizedFileName,
      content,
      contentType: mimeType,
      contentId: previewCid,
    });

    if (
      inlinePreview &&
      previewCid &&
      !seenInlinePreviewContentIds.has(previewCid)
    ) {
      seenInlinePreviewContentIds.add(previewCid);
      inlinePreviewAttachments.push({
        filename: `preview-${normalizedFileName}`,
        content: inlinePreview.content,
        contentType: inlinePreview.mimeType,
        contentId: previewCid,
      });
    }

    summaries.push({
      fileName: normalizedFileName,
      mimeType,
      sizeInBytes: content.length,
      category,
      label,
      description,
      previewCid,
    });
  };

  try {
    for (const file of logoFiles) {
      const mimeType = file.type || "application/octet-stream";
      const content = Buffer.from(await file.arrayBuffer());
      addAttachment({
        fileName: file.name,
        mimeType,
        content,
        category: "logo",
        label: "Logo Upload",
      });
    }

    for (const file of designFiles) {
      const mimeType = file.type || "application/octet-stream";
      const content = Buffer.from(await file.arrayBuffer());
      addAttachment({
        fileName: file.name,
        mimeType,
        content,
        category: "design-reference",
        label: "Design Reference",
      });
    }

    if (configuration) {
      const maybeLogo = configuration.logo;
      if (isRecord(maybeLogo)) {
        const safeDataUrl = getSafeLogoDataUrl(maybeLogo.dataUrl);
        if (safeDataUrl) {
          const decoded = decodeImageDataUrl(safeDataUrl);
          if (decoded) {
            addAttachment({
              fileName:
                typeof maybeLogo.fileName === "string"
                  ? maybeLogo.fileName
                  : "main-logo",
              mimeType: decoded.mimeType,
              content: decoded.content,
              category: "logo",
              label: "Main Logo",
              description:
                typeof maybeLogo.description === "string"
                  ? maybeLogo.description
                  : undefined,
            });
          }
        }
      }

      const maybeMotifs = Array.isArray(configuration.extraMotifs)
        ? configuration.extraMotifs
        : [];

      maybeMotifs.forEach((motif, index) => {
        if (
          !isRecord(motif) ||
          motif.type !== "logo" ||
          !isRecord(motif.logo)
        ) {
          return;
        }

        const safeDataUrl = getSafeLogoDataUrl(motif.logo.dataUrl);
        if (!safeDataUrl) {
          return;
        }

        const decoded = decodeImageDataUrl(safeDataUrl);
        if (!decoded) {
          return;
        }

        addAttachment({
          fileName:
            typeof motif.logo.fileName === "string"
              ? motif.logo.fileName
              : `motif-logo-${index + 1}`,
          mimeType: decoded.mimeType,
          content: decoded.content,
          category: "motif-logo",
          label: `Motif Logo ${index + 1}`,
          description:
            typeof motif.panelLabel === "string"
              ? `Panel: ${motif.panelLabel}`
              : undefined,
        });
      });

      const safeSvgViews = getSafeSvgViews(configuration);
      safeSvgViews.forEach((svgMarkup, index) => {
        addAttachment({
          fileName: `customized-view-${index + 1}.svg`,
          mimeType: "image/svg+xml",
          content: Buffer.from(svgMarkup, "utf8"),
          category: "svg-snapshot",
          label: `Customized SVG View ${index + 1}`,
        });
      });

      const safeCombinedSvg = getSafeSvgMarkup(configuration);
      if (safeCombinedSvg) {
        const isSingleSvg = isSingleSvgMarkup(safeCombinedSvg);
        addAttachment({
          fileName: isSingleSvg
            ? "customized-layout.svg"
            : "customized-layout.html",
          mimeType: isSingleSvg ? "image/svg+xml" : "text/html",
          content: Buffer.from(safeCombinedSvg, "utf8"),
          category: "svg-snapshot",
          label: "Customized SVG Layout",
        });
      }
    }
  } catch (error) {
    return {
      attachments: [],
      inlinePreviewAttachments: [],
      summaries: [],
      errorMessage:
        error instanceof Error
          ? error.message
          : "Failed to process file attachments.",
    };
  }

  return {
    attachments,
    inlinePreviewAttachments,
    summaries,
  };
}

function getResendSandboxRecipient(errorMessage: string) {
  const match = errorMessage.match(/own email address \(([^)]+)\)/i);
  return match ? match[1]?.trim() || null : null;
}

export async function sendQuoteEmail(
  rawPayload: unknown,
): Promise<SendQuoteEmailResult> {
  const parsedInput = parseRawInput(rawPayload);
  if (!parsedInput) {
    return {
      success: false,
      message: "Invalid quote submission payload.",
    };
  }

  const parsedPayload = quoteSubmissionSchema.safeParse(parsedInput.payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: "Please review the form fields and try again.",
    };
  }

  const payload = parsedPayload.data;

  const resendApiKey = normalizeEnvValue(process.env.RESEND_API_KEY);
  const configuredVendorRecipient =
    normalizeEnvValue(process.env.QUOTE_VENDOR_EMAIL) ??
    normalizeEnvValue(process.env.QUOTE_RECIPIENT_EMAIL);
  const testVendorRecipientOverride = normalizeEnvValue(
    process.env.QUOTE_TEST_RECIPIENT_EMAIL,
  );
  const fromAddress =
    normalizeEnvValue(process.env.QUOTE_FROM_EMAIL) ?? DEFAULT_QUOTE_FROM_EMAIL;

  // Keep customer confirmation dynamic so each submitter receives their own email.
  const userRecipient = payload.emailAddress;
  // Optional test override only for internal/vendor mailbox.
  const vendorRecipient =
    testVendorRecipientOverride ?? configuredVendorRecipient;

  if (!resendApiKey || !vendorRecipient) {
    console.error("Missing required quote email environment variables.");

    return {
      success: false,
      message:
        "Quote service is not configured right now. Please try again shortly.",
    };
  }

  const resend = new Resend(resendApiKey);
  const configuration = isRecord(payload.configuration)
    ? payload.configuration
    : null;

  const safeSvgViews = getSafeSvgViews(configuration);
  const safeSvgMarkup =
    getSafeSvgMarkup(configuration) ?? safeSvgViews[0] ?? null;
  const appUrl = resolveAppUrl();

  const configuredUploadedFileSummaries =
    getConfiguredUploadedFileSummaries(configuration);

  const attachmentBuildResult = await buildAttachments({
    configuration,
    logoFiles: parsedInput.logoFiles,
    designFiles: parsedInput.designFiles,
  });

  if (attachmentBuildResult.errorMessage) {
    return {
      success: false,
      message: attachmentBuildResult.errorMessage,
    };
  }

  const attachmentSummaries = mergeAttachmentSummaries(
    configuredUploadedFileSummaries,
    attachmentBuildResult.summaries,
  );
  const safeSvgPreviewCid =
    attachmentSummaries.find(
      (entry) => entry.category === "svg-snapshot" && Boolean(entry.previewCid),
    )?.previewCid ?? null;

  const sendEmail = async ({
    to,
    replyTo,
    subject,
    variant,
    attachments,
  }: {
    to: string;
    replyTo?: string;
    subject: string;
    variant: QuoteEmailTemplateVariant;
    attachments?: Attachment[];
  }) => {
    const result = await resend.emails.send({
      from: fromAddress,
      to: [to],
      replyTo,
      subject,
      attachments: attachments?.length ? attachments : undefined,
      react: createElement(QuoteEmailTemplate, {
        payload,
        appUrl,
        safeSvgMarkup,
        safeSvgPreviewCid,
        attachmentSummaries,
        variant,
      }),
    });

    if (result.error) {
      throw new Error(
        result.error.message || `Failed to send ${variant} email.`,
      );
    }
  };

  try {
    const sendEmailToVendor = await sendEmail({
      to: vendorRecipient,
      replyTo: payload.emailAddress,
      subject: `New Quote Request from ${payload.fullName}`,
      variant: "vendor",
      attachments: attachmentBuildResult.attachments,
    });

    const sendEmailToRecipient = await sendEmail({
      to: userRecipient,
      replyTo: configuredVendorRecipient ?? undefined,
      subject: "We received your quote inquiry - Kayns Shop",
      variant: "user",
      attachments: attachmentBuildResult.inlinePreviewAttachments,
    });

    void sendEmailToVendor;
    void sendEmailToRecipient;

    return {
      success: true,
      message: "Quote request sent successfully.",
    };
  } catch (error) {
    console.error("Failed to send quote email", error);

    const errorMessage = error instanceof Error ? error.message : "";
    const sandboxRecipient = getResendSandboxRecipient(errorMessage);

    if (sandboxRecipient) {
      return {
        success: false,
        message: `Resend testing mode currently allows sending only to ${sandboxRecipient}. Vendor notification will go to the configured receiver, but customer confirmation to ${payload.emailAddress} requires a verified Resend domain and a domain-based QUOTE_FROM_EMAIL address.`,
      };
    }

    return {
      success: false,
      message:
        "We could not send your quote request right now. Please try again.",
    };
  }
}
