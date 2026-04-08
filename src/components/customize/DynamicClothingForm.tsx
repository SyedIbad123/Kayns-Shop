/**
 * Renders and validates a config-driven clothing customization form using RHF + Zod.
 * Dependencies: clothing form config, per-product Zod schemas, and reusable field components.
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Controller,
  type FieldErrors,
  type SubmitErrorHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CLOTHING_FORM_CONFIG,
  type ClothingProductType,
  type FormConfig,
  type FormField,
} from "@/data/clothingFormConfig";
import {
  clothingSchemaByProductType,
  type ClothingFormValues,
} from "@/lib/schemas/clothingFormSchema";
import {
  clearProductConfig,
  getProductConfig,
  saveProductConfig,
  saveQuoteConfig,
  type StoredUploadedFileSummary,
} from "@/lib/storage";
import { setPendingQuoteFiles } from "@/lib/quote-file-store";
import { cn } from "@/lib/utils";

import ColorDescriptionField from "./fields/ColorDescriptionField";
import FixedBadge from "./fields/FixedBadge";
import ImageRadioGroup from "./fields/ImageRadioGroup";
import MultiFileUpload from "./fields/MultiFileUpload";
import NumberInput from "./fields/NumberInput";
import SelectDropdown from "./fields/SelectDropdown";
import SingleFileUpload from "./fields/SingleFileUpload";
import YesNoConditional from "./fields/YesNoConditional";
import YesNoSimple from "./fields/YesNoSimple";

type SubmitIntent = "add-to-cart" | "request-quote";

export interface CustomizationOrder {
  productId: string;
  productType: ClothingProductType;
  submitIntent: SubmitIntent;
  values: Record<string, unknown>;
  files: {
    uploadLogos: File[];
    uploadDesign: File[];
  };
  submittedAt: string;
}

interface DynamicClothingFormProps {
  productType: ClothingProductType;
  productId: string | number;
  onFormComplete?: (order: CustomizationOrder) => Promise<void> | void;
}

const ERROR_BANNER_TEXT =
  "Please complete all required fields before continuing";

function getConditionalFieldId(toggleFieldId: string) {
  if (toggleFieldId.endsWith("Toggle")) {
    return toggleFieldId.replace(/Toggle$/, "Type");
  }
  return `${toggleFieldId}Type`;
}

function readErrorMessage(
  errors: FieldErrors<ClothingFormValues>,
  key: string,
) {
  const maybeError = (errors as Record<string, unknown>)[key] as
    | { message?: unknown }
    | undefined;

  if (!maybeError || typeof maybeError !== "object") {
    return undefined;
  }

  return typeof maybeError.message === "string"
    ? maybeError.message
    : undefined;
}

function hasError(errors: FieldErrors<ClothingFormValues>, key: string) {
  return Boolean((errors as Record<string, unknown>)[key]);
}

function sanitizeForStorage(value: unknown): unknown {
  if (typeof File !== "undefined" && value instanceof File) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value
      .map((entry) => sanitizeForStorage(entry))
      .filter((entry) => entry !== undefined);
  }

  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([key, entry]) => {
      const sanitized = sanitizeForStorage(entry);
      if (sanitized !== undefined) {
        output[key] = sanitized;
      }
    });
    return output;
  }

  return value;
}

function toUploadedFileSummary(
  file: File,
  category: StoredUploadedFileSummary["category"],
  description?: string,
): StoredUploadedFileSummary {
  return {
    fileName: file.name,
    mimeType: file.type || "application/octet-stream",
    sizeInBytes: file.size,
    category,
    description: description?.trim() || undefined,
  };
}

function createDefaultValues(config: FormConfig): Record<string, unknown> {
  const defaults: Record<string, unknown> = {
    productType: config.productType,
    orderQuantity: 1,
    nameToggle: "no",
    nameType: null,
    numberToggle: "no",
    numberType: null,
    uploadLogos: [],
    uploadDesign: [],
    logoPositionComment: "",
    gender: "both",
    purpose: "sports",
    backPocket: "no",
    needTrousers: "no",
  };

  config.fields.forEach((field) => {
    switch (field.type) {
      case "fixed-badge":
        defaults[field.id] = field.fixedValue ?? "";
        break;
      case "textarea":
        defaults[field.id] = "";
        break;
      case "multi-file-upload":
      case "single-file-upload":
        defaults[field.id] = [];
        break;
      case "number-input":
        defaults[field.id] = 1;
        break;
      case "yes-no-simple":
        defaults[field.id] = "no";
        break;
      case "yes-no-conditional":
        defaults[field.id] = "no";
        defaults[getConditionalFieldId(field.id)] = null;
        break;
      case "select-dropdown":
        defaults[field.id] =
          field.options?.[0]?.value ??
          (field.id === "gender" ? "both" : "sports");
        break;
      case "image-radio":
        defaults[field.id] = "";
        break;
      default:
        break;
    }
  });

  return defaults;
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  );
}

export default function DynamicClothingForm({
  productType,
  productId,
  onFormComplete,
}: DynamicClothingFormProps) {
  const router = useRouter();
  const pathname = usePathname();

  const config = CLOTHING_FORM_CONFIG[productType];
  const schema = clothingSchemaByProductType[productType];

  const defaultValues = useMemo(() => createDefaultValues(config), [config]);
  const skipNextPersistenceRef = useRef(false);

  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeIntent, setActiveIntent] = useState<SubmitIntent>("add-to-cart");

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClothingFormValues>({
    resolver: zodResolver(schema as never) as never,
    defaultValues: defaultValues as ClothingFormValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const watchedValuesRaw = useWatch({ control });
  const watchedValues = useMemo(
    () => (watchedValuesRaw ?? {}) as Record<string, unknown>,
    [watchedValuesRaw],
  );

  useEffect(() => {
    const savedProductConfig = getProductConfig();
    if (!savedProductConfig) {
      return;
    }

    if (
      savedProductConfig.productType !== productType ||
      savedProductConfig.productId !== String(productId)
    ) {
      return;
    }

    try {
      const hydrated: Record<string, unknown> = {
        ...defaultValues,
        ...savedProductConfig.values,
        productType,
        uploadLogos: [],
        uploadDesign: [],
      };

      const quantity = Number(hydrated.orderQuantity);
      hydrated.orderQuantity = Number.isFinite(quantity)
        ? Math.trunc(quantity)
        : 1;

      reset(hydrated as ClothingFormValues);
    } catch {
      reset(defaultValues as ClothingFormValues);
    }
  }, [defaultValues, productId, productType, reset]);

  useEffect(() => {
    if (skipNextPersistenceRef.current) {
      skipNextPersistenceRef.current = false;
      return;
    }

    const serialized = sanitizeForStorage(watchedValues) as Record<
      string,
      unknown
    >;
    delete serialized.uploadLogos;
    delete serialized.uploadDesign;

    saveProductConfig({
      source: "standard",
      productId: String(productId),
      productType,
      values: serialized,
      updatedAt: new Date().toISOString(),
      sourcePath: pathname,
    });
  }, [pathname, productId, productType, watchedValues]);

  const buildCustomizationOrder = (
    values: ClothingFormValues,
    intent: SubmitIntent,
  ): CustomizationOrder => {
    const rawValues = values as Record<string, unknown>;
    const uploadLogos = (rawValues.uploadLogos as File[] | undefined) ?? [];
    const uploadDesign = (rawValues.uploadDesign as File[] | undefined) ?? [];

    const cleanValues: Record<string, unknown> = {
      ...rawValues,
      uploadLogos: undefined,
      uploadDesign: undefined,
    };

    delete cleanValues.uploadLogos;
    delete cleanValues.uploadDesign;

    return {
      productId: String(productId),
      productType,
      submitIntent: intent,
      values: cleanValues,
      files: {
        uploadLogos,
        uploadDesign,
      },
      submittedAt: new Date().toISOString(),
    };
  };

  const buildStandardQuoteConfig = (
    values: ClothingFormValues,
    uploadedFiles: StoredUploadedFileSummary[],
  ) => {
    const cleanValues =
      (sanitizeForStorage(values) as Record<string, unknown>) ?? {};

    delete cleanValues.uploadLogos;
    delete cleanValues.uploadDesign;

    return {
      source: "standard" as const,
      productId: String(productId),
      productType,
      values: cleanValues,
      uploadedFiles,
      updatedAt: new Date().toISOString(),
      sourcePath: pathname,
    };
  };

  const resetConfigurator = () => {
    skipNextPersistenceRef.current = true;
    reset(defaultValues as ClothingFormValues);
    clearProductConfig();
    setActiveIntent("add-to-cart");
  };

  const onSubmit = async (values: ClothingFormValues, intent: SubmitIntent) => {
    setShowErrorBanner(false);
    setSubmitError(null);

    if (intent === "request-quote") {
      const rawValues = values as Record<string, unknown>;
      const uploadLogos = (rawValues.uploadLogos as File[] | undefined) ?? [];
      const uploadDesign = (rawValues.uploadDesign as File[] | undefined) ?? [];
      const logoPositionComment =
        typeof rawValues.logoPositionComment === "string"
          ? rawValues.logoPositionComment
          : "";

      const uploadedFiles: StoredUploadedFileSummary[] = [
        ...uploadLogos.map((file) =>
          toUploadedFileSummary(file, "logo", logoPositionComment),
        ),
        ...uploadDesign.map((file) =>
          toUploadedFileSummary(file, "design-reference"),
        ),
      ];

      setPendingQuoteFiles(
        uploadedFiles.length > 0
          ? {
              source: "standard",
              createdAt: new Date().toISOString(),
              files: [
                ...uploadLogos.map((file) => ({
                  file,
                  summary: toUploadedFileSummary(
                    file,
                    "logo",
                    logoPositionComment,
                  ),
                })),
                ...uploadDesign.map((file) => ({
                  file,
                  summary: toUploadedFileSummary(file, "design-reference"),
                })),
              ],
            }
          : null,
      );

      const quoteConfig = buildStandardQuoteConfig(values, uploadedFiles);
      saveQuoteConfig(quoteConfig);

      // Reset synchronously before navigation to fix quote-click reset behavior.
      resetConfigurator();
      router.push("/quote?source=standard");
      return;
    }

    const customizationOrder = buildCustomizationOrder(values, intent);

    try {
      if (onFormComplete) {
        await onFormComplete(customizationOrder);
      }

      resetConfigurator();
    } catch {
      setShowErrorBanner(true);
      setSubmitError("We could not submit your request. Please try again.");
    }
  };

  const onInvalid: SubmitErrorHandler<ClothingFormValues> = (formErrors) => {
    setShowErrorBanner(true);
    setSubmitError(null);

    const firstErrorField = config.fields.find((field) => {
      if (hasError(formErrors, field.id)) {
        return true;
      }

      if (field.type === "yes-no-conditional") {
        const conditionalFieldId = getConditionalFieldId(field.id);
        return hasError(formErrors, conditionalFieldId);
      }

      return false;
    });

    if (!firstErrorField) {
      return;
    }

    const selector = `[data-field-section="${firstErrorField.id}"]`;
    const domSectionElement = document.querySelector<HTMLElement>(selector);
    if (!domSectionElement) return;

    domSectionElement.scrollIntoView({ behavior: "smooth", block: "center" });

    const focusTarget = domSectionElement.querySelector<HTMLElement>(
      "button, input, textarea, [role='radio'], [tabindex='0']",
    );
    focusTarget?.focus();
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const nativeSubmitEvent = event.nativeEvent as SubmitEvent;
    const submitter = nativeSubmitEvent.submitter as HTMLButtonElement | null;
    const submitIntent =
      submitter?.dataset.intent === "request-quote"
        ? "request-quote"
        : "add-to-cart";

    setActiveIntent(submitIntent);

    void handleSubmit(async (values) => {
      await onSubmit(values, submitIntent);
    }, onInvalid)(event);
  };

  const renderField = (field: FormField) => {
    const fieldError = readErrorMessage(errors, field.id);

    if (field.type === "fixed-badge") {
      return (
        <FixedBadge
          label={field.label}
          value={field.fixedValue ?? ""}
          hideLabel
        />
      );
    }

    if (field.type === "image-radio") {
      return (
        <Controller
          name={field.id as never}
          control={control}
          render={({ field: controllerField }) => (
            <ImageRadioGroup
              hideLabel
              label={field.label}
              options={field.options ?? []}
              value={
                (controllerField.value as string | null | undefined) ?? null
              }
              onChange={controllerField.onChange}
              error={fieldError}
              columns={(field.options?.length ?? 0) <= 2 ? 2 : 4}
            />
          )}
        />
      );
    }

    if (field.type === "yes-no-conditional") {
      const conditionalFieldId = getConditionalFieldId(field.id);
      const conditionalError = readErrorMessage(errors, conditionalFieldId);

      return (
        <Controller
          name={field.id as never}
          control={control}
          render={({ field: controllerField }) => (
            <YesNoConditional
              hideLabel
              label={field.label}
              value={
                (controllerField.value as "yes" | "no" | null | undefined) ??
                "no"
              }
              onChange={(nextValue) => {
                controllerField.onChange(nextValue);

                if (nextValue === "no") {
                  setValue(conditionalFieldId as never, null as never, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  clearErrors(conditionalFieldId as never);
                  trigger(conditionalFieldId as never);
                }

                if (nextValue === "yes") {
                  trigger(conditionalFieldId as never);
                }
              }}
              conditionalOptions={field.conditionalOptions ?? []}
              conditionalValue={
                (watchedValues[conditionalFieldId] as
                  | string
                  | null
                  | undefined) ?? null
              }
              onConditionalChange={(nextConditionalValue) => {
                setValue(
                  conditionalFieldId as never,
                  nextConditionalValue as never,
                  {
                    shouldDirty: true,
                    shouldValidate: true,
                  },
                );

                if (nextConditionalValue === null) {
                  clearErrors(conditionalFieldId as never);
                }
              }}
              error={fieldError}
              conditionalError={conditionalError}
            />
          )}
        />
      );
    }

    if (field.type === "yes-no-simple") {
      return (
        <Controller
          name={field.id as never}
          control={control}
          render={({ field: controllerField }) => (
            <div className="space-y-2">
              <YesNoSimple
                hideLabel
                label={field.label}
                value={
                  (controllerField.value as "yes" | "no" | null | undefined) ??
                  "no"
                }
                onChange={controllerField.onChange}
                error={fieldError}
              />
              {field.id === "needTrousers" &&
              watchedValues.needTrousers === "yes" ? (
                <p className="rounded-lg border border-[#143D59]/20 bg-[#F3F6FC] px-3 py-2 text-sm text-[#143D59]">
                  Our team will contact you to customize your matching trousers
                </p>
              ) : null}
            </div>
          )}
        />
      );
    }

    if (field.type === "textarea") {
      return (
        <Controller
          name={field.id as never}
          control={control}
          render={({ field: controllerField }) => (
            <ColorDescriptionField
              hideLabel
              value={(controllerField.value as string | undefined) ?? ""}
              onChange={controllerField.onChange}
              error={fieldError}
            />
          )}
        />
      );
    }

    if (field.type === "multi-file-upload") {
      const positionCommentError = readErrorMessage(
        errors,
        "logoPositionComment",
      );
      return (
        <Controller
          name={field.id as never}
          control={control}
          render={({ field: controllerField }) => (
            <MultiFileUpload
              hideLabel
              label={field.label}
              value={(controllerField.value as File[] | undefined) ?? []}
              onChange={controllerField.onChange}
              error={fieldError}
              showPositionComment
              positionComment={
                (watchedValues.logoPositionComment as string | undefined) ?? ""
              }
              onPositionCommentChange={(comment) => {
                setValue("logoPositionComment" as never, comment as never, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              positionCommentError={positionCommentError}
              acceptedTypes={field.acceptedFileTypes}
              maxFiles={field.maxFiles}
              helperText={field.helperText}
            />
          )}
        />
      );
    }

    if (field.type === "single-file-upload") {
      return (
        <Controller
          name={field.id as never}
          control={control}
          render={({ field: controllerField }) => (
            <SingleFileUpload
              hideLabel
              label={field.label}
              value={(controllerField.value as File[] | undefined) ?? []}
              onChange={controllerField.onChange}
              error={fieldError}
              helperText={field.helperText}
            />
          )}
        />
      );
    }

    if (field.type === "number-input") {
      return (
        <Controller
          name={field.id as never}
          control={control}
          render={({ field: controllerField }) => (
            <NumberInput
              hideLabel
              label={field.label}
              value={
                typeof controllerField.value === "number"
                  ? controllerField.value
                  : 1
              }
              onChange={controllerField.onChange}
              error={fieldError}
              min={1}
              max={100000}
            />
          )}
        />
      );
    }

    if (field.type === "select-dropdown") {
      return (
        <Controller
          name={field.id as never}
          control={control}
          render={({ field: controllerField }) => (
            <SelectDropdown
              hideLabel
              label={field.label}
              options={field.options ?? []}
              value={(controllerField.value as string | undefined) ?? ""}
              onChange={controllerField.onChange}
              error={fieldError}
              placeholder={field.placeholder}
            />
          )}
        />
      );
    }

    return null;
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="relative rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 shadow-sm sm:px-8 sm:py-5"
    >
      {showErrorBanner ? (
        <div className="mb-6 rounded-[10px] bg-[#143D59] px-4 py-3 text-sm font-medium text-white">
          {submitError ?? ERROR_BANNER_TEXT}
        </div>
      ) : null}

      {config.fields.map((field, index) => (
        <div
          key={field.id}
          data-field-section={field.id}
          className={cn(
            "border-b border-[#F3F6FC] py-6",
            index === config.fields.length - 1 && "border-b-0",
          )}
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex h-6 min-h-6 min-w-6 items-center justify-center rounded-full bg-[#143D59] px-1 text-xs font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="text-base font-semibold text-[#111827]">
              {field.label}
            </h3>
          </div>

          {renderField(field)}
        </div>
      ))}

      <div className="hidden items-center justify-end gap-3 pt-8 md:flex">
        <button
          type="submit"
          data-intent="request-quote"
          disabled={isSubmitting}
          className="inline-flex h-13 min-h-11 items-center gap-2 rounded-[10px] border border-[#D1D5DB] bg-white px-6 text-sm font-semibold text-[#111827] transition hover:bg-[#F3F6FC] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting && activeIntent === "request-quote" ? (
            <Spinner />
          ) : null}
          {isSubmitting && activeIntent === "request-quote"
            ? "Submitting..."
            : "Request a Quote"}
        </button>

        <button
          type="submit"
          data-intent="add-to-cart"
          disabled={isSubmitting}
          className="inline-flex h-13 min-h-11 items-center gap-2 rounded-[10px] bg-[#143D59] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#143D59]/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting && activeIntent === "add-to-cart" ? <Spinner /> : null}
          {isSubmitting && activeIntent === "add-to-cart"
            ? "Submitting..."
            : "Add to Cart"}
        </button>
      </div>

      <div className="h-28 md:hidden" />
      <div className="pointer-events-none fixed inset-x-0 bottom-14 z-20 h-12 bg-linear-to-t from-white to-transparent md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E5E7EB] bg-white px-4 py-3 md:hidden">
        <div className="mx-auto flex max-w-3xl gap-2">
          <button
            type="submit"
            data-intent="request-quote"
            disabled={isSubmitting}
            className="inline-flex h-13 min-h-11 w-1/2 items-center justify-center gap-2 rounded-[10px] border border-[#D1D5DB] bg-white px-3 text-sm font-semibold text-[#111827] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting && activeIntent === "request-quote" ? (
              <Spinner />
            ) : null}
            {isSubmitting && activeIntent === "request-quote"
              ? "Submitting..."
              : "Request a Quote"}
          </button>

          <button
            type="submit"
            data-intent="add-to-cart"
            disabled={isSubmitting}
            className="inline-flex h-13 min-h-11 w-1/2 items-center justify-center gap-2 rounded-[10px] bg-[#143D59] px-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting && activeIntent === "add-to-cart" ? (
              <Spinner />
            ) : null}
            {isSubmitting && activeIntent === "add-to-cart"
              ? "Submitting..."
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </form>
  );
}
