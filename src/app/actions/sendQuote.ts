"use server";

import { createElement } from "react";
import { Resend, type Attachment } from "resend";

import QuoteEmailTemplate from "@/components/email/QuoteEmailTemplate";
import { quoteSubmissionSchema } from "@/lib/validators";

export interface SendQuoteEmailResult {
  success: boolean;
  message: string;
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
  if (!configuration || typeof configuration !== "object") {
    return null;
  }

  const maybeSvg = (configuration as Record<string, unknown>).svgMarkup;
  return sanitizeSvgMarkup(maybeSvg);
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

function sanitizeFileName(name: string) {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function getLogoAttachment(configuration: unknown): Attachment | null {
  if (!configuration || typeof configuration !== "object") {
    return null;
  }

  const maybeLogo = (configuration as Record<string, unknown>).logo;
  if (!maybeLogo || typeof maybeLogo !== "object") {
    return null;
  }

  const logoRecord = maybeLogo as Record<string, unknown>;
  const safeDataUrl = getSafeLogoDataUrl(logoRecord.dataUrl);
  if (!safeDataUrl) {
    return null;
  }

  const matches = safeDataUrl.match(
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

  const fileNameInput =
    typeof logoRecord.fileName === "string"
      ? logoRecord.fileName
      : "logo-image";
  const sanitizedFileName = sanitizeFileName(fileNameInput) || "logo-image";

  return {
    filename: sanitizedFileName,
    content,
    contentType: mimeType,
  };
}

export async function sendQuoteEmail(
  rawPayload: unknown,
): Promise<SendQuoteEmailResult> {
  const parsedPayload = quoteSubmissionSchema.safeParse(rawPayload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: "Please review the form fields and try again.",
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const quoteRecipient = process.env.QUOTE_RECIPIENT_EMAIL;

  if (!resendApiKey || !quoteRecipient) {
    console.error("Missing required quote email environment variables.");
    return {
      success: false,
      message:
        "Quote service is not configured right now. Please try again shortly.",
    };
  }

  const resend = new Resend(resendApiKey);

  const payload = parsedPayload.data;
  const safeSvgMarkup = getSafeSvgMarkup(payload.configuration);
  const logoAttachment = getLogoAttachment(payload.configuration);

  try {
    await resend.emails.send({
      from: "Kayns Shop Quotes <onboarding@resend.dev>",
      to: [quoteRecipient],
      replyTo: payload.emailAddress,
      subject: `New Quote Request from ${payload.fullName}`,
      attachments: logoAttachment ? [logoAttachment] : undefined,
      react: createElement(QuoteEmailTemplate, {
        payload,
        appUrl: process.env.NEXT_PUBLIC_APP_URL,
        safeSvgMarkup,
      }),
    });

    return {
      success: true,
      message: "Quote request sent successfully.",
    };
  } catch (error) {
    console.error("Failed to send quote email", error);

    return {
      success: false,
      message:
        "We could not send your quote request right now. Please try again.",
    };
  }
}
