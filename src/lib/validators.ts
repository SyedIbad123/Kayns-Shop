import { z } from "zod";

const internationalPhoneRegex = /^\+?[1-9]\d{7,14}$/;

const optionalShortText = z
  .string()
  .trim()
  .max(120, "Please keep this under 120 characters")
  .optional()
  .or(z.literal(""));

const optionalCommentText = z
  .string()
  .trim()
  .max(500, "Comments cannot exceed 500 characters")
  .optional()
  .or(z.literal(""));

export const quoteFormSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .trim()
    .regex(
      internationalPhoneRegex,
      "Enter a valid international phone number (for example +447700900123)",
    ),
  emailAddress: z.string().trim().email("Enter a valid email address"),
  clubReference: optionalShortText,
  fullAddress: z
    .string()
    .trim()
    .min(10, "Address must be at least 10 characters"),
  comments: optionalCommentText,
});

const quoteConfigurationSchema = z
  .object({
    source: z.enum(["standard", "svg"]),
    updatedAt: z.string().optional(),
  })
  .passthrough();

export const quoteSubmissionSchema = quoteFormSchema.extend({
  configuration: quoteConfigurationSchema.nullable(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
export type QuoteSubmissionValues = z.infer<typeof quoteSubmissionSchema>;
