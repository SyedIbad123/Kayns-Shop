/**
 * Defines per-product Zod schemas for clothing customization forms and exports a productType discriminated union.
 * Dependencies: used by DynamicClothingForm with zodResolver and keyed by ClothingProductType.
 */

import { z } from "zod";
import type { ClothingProductType } from "@/data/clothingFormConfig";

const requiredOptionSchema = z.string().min(1, "Please select an option");
const yesNoSchema = z.enum(["yes", "no"]);
const genderSchema = z.enum(["male", "female", "both"]);
const purposeSchema = z.enum(["sports", "workwear", "event"]);
const zipTypeSchema = z.enum(["full-zip", "no-zip"]);

const fileSchema = z.custom<File>(
  (value) => {
    if (typeof File === "undefined") {
      return true;
    }
    return value instanceof File;
  },
  { message: "Expected a file" },
);

const uploadLogosSchema = z.array(fileSchema).optional();
const uploadDesignSchema = z.array(fileSchema).optional();

const colorsSchema = z
  .string()
  .min(5, "Please describe your color requirements");

const orderQuantitySchema = z
  .number()
  .int("Quantity must be a whole number")
  .min(1, "Minimum order quantity is 1")
  .max(100000, "Maximum order quantity is 100000");

const addConditionalTypeValidation = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
) =>
  schema.superRefine((data, ctx) => {
    const values = data as {
      nameToggle?: "yes" | "no";
      nameType?: string | null;
      numberToggle?: "yes" | "no";
      numberType?: string | null;
    };

    if (values.nameToggle === "yes" && !values.nameType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["nameType"],
        message: "Please select an option",
      });
    }

    if (values.numberToggle === "yes" && !values.numberType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["numberType"],
        message: "Please select an option",
      });
    }
  });

const baseIdentityFields = {
  logo: requiredOptionSchema,
  nameToggle: yesNoSchema,
  nameType: requiredOptionSchema.nullable().optional(),
  numberToggle: yesNoSchema,
  numberType: requiredOptionSchema.nullable().optional(),
  uploadLogos: uploadLogosSchema,
  logoPositionComment: z.string().optional(),
  uploadDesign: uploadDesignSchema,
  orderQuantity: orderQuantitySchema,
  gender: genderSchema,
} as const;

export const tShirtSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("t-shirt"),
    sleeveLength: requiredOptionSchema,
    sleeveType: requiredOptionSchema,
    collarType: requiredOptionSchema,
    colors: colorsSchema,
    purpose: purposeSchema,
    ...baseIdentityFields,
  }),
);

export const poloShirtSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("polo-shirt"),
    sleeveLength: requiredOptionSchema,
    sleeveType: requiredOptionSchema,
    collarType: requiredOptionSchema,
    colors: colorsSchema,
    purpose: purposeSchema,
    ...baseIdentityFields,
  }),
);

export const hoodedSweatshirtSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("hooded-sweatshirt"),
    sleeveLength: z.literal("long"),
    sleeveType: requiredOptionSchema,
    collarType: requiredOptionSchema,
    cuffsType: requiredOptionSchema,
    colors: colorsSchema,
    purpose: purposeSchema,
    zipType: zipTypeSchema,
    ...baseIdentityFields,
  }),
);

export const trackJacketSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("track-jacket"),
    sleeveLength: z.literal("long"),
    sleeveType: requiredOptionSchema,
    collarType: requiredOptionSchema,
    cuffsType: requiredOptionSchema,
    colors: colorsSchema,
    purpose: purposeSchema,
    zipType: zipTypeSchema,
    needTrousers: yesNoSchema,
    ...baseIdentityFields,
  }),
);

export const pufferJacketSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("puffer-jacket"),
    sleeveLength: requiredOptionSchema,
    sleeveType: requiredOptionSchema,
    collarType: requiredOptionSchema,
    cuffsType: requiredOptionSchema,
    colors: colorsSchema,
    purpose: purposeSchema,
    zipType: zipTypeSchema,
    ...baseIdentityFields,
  }),
);

export const reversibleJacketSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("reversible-jacket"),
    sleeveLength: z.literal("long"),
    sleeveType: requiredOptionSchema,
    collarType: requiredOptionSchema,
    cuffsType: requiredOptionSchema,
    colors: colorsSchema,
    purpose: purposeSchema,
    zipType: zipTypeSchema,
    ...baseIdentityFields,
  }),
);

export const trousersSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("trousers"),
    colors: colorsSchema,
    type: requiredOptionSchema,
    pocketType: requiredOptionSchema,
    bottomType: requiredOptionSchema,
    backPocket: yesNoSchema,
    purpose: purposeSchema,
    ...baseIdentityFields,
  }),
);

export const footballShortsSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("football-shorts"),
    colors: colorsSchema,
    pocketType: requiredOptionSchema,
    backPocket: yesNoSchema,
    ...baseIdentityFields,
  }),
);

export const basketballShortsSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("basketball-shorts"),
    colors: colorsSchema,
    pocketType: requiredOptionSchema,
    backPocket: yesNoSchema,
    ...baseIdentityFields,
  }),
);

export const netballShortsSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("netball-shorts"),
    colors: colorsSchema,
    type: requiredOptionSchema,
    ...baseIdentityFields,
  }),
);

export const rugbyShortsSchema = addConditionalTypeValidation(
  z.object({
    productType: z.literal("rugby-shorts"),
    colors: colorsSchema,
    pocketType: requiredOptionSchema,
    backPocket: yesNoSchema,
    ...baseIdentityFields,
  }),
);

export const clothingSchemaByProductType: Record<
  ClothingProductType,
  z.ZodTypeAny
> = {
  "t-shirt": tShirtSchema,
  "polo-shirt": poloShirtSchema,
  "hooded-sweatshirt": hoodedSweatshirtSchema,
  "track-jacket": trackJacketSchema,
  "puffer-jacket": pufferJacketSchema,
  "reversible-jacket": reversibleJacketSchema,
  trousers: trousersSchema,
  "football-shorts": footballShortsSchema,
  "basketball-shorts": basketballShortsSchema,
  "netball-shorts": netballShortsSchema,
  "rugby-shorts": rugbyShortsSchema,
};

export const clothingFormSchema = z.discriminatedUnion("productType", [
  tShirtSchema,
  poloShirtSchema,
  hoodedSweatshirtSchema,
  trackJacketSchema,
  pufferJacketSchema,
  reversibleJacketSchema,
  trousersSchema,
  footballShortsSchema,
  basketballShortsSchema,
  netballShortsSchema,
  rugbyShortsSchema,
]);

export type ClothingFormValues = z.infer<typeof clothingFormSchema>;
