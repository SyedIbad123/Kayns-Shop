"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sendQuoteEmail } from "@/app/actions/sendQuote";
import {
  clearQuoteStorage,
  getMostRecentConfig,
  getQuoteFormData,
  saveQuoteFormData,
  STORAGE_KEYS,
  type StoredQuoteConfig,
  type StoredQuoteFormData,
} from "@/lib/storage";
import {
  clearPendingQuoteFiles,
  getPendingQuoteFiles,
} from "@/lib/quote-file-store";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/validators";

import ConfigSummary from "./ConfigSummary";

const defaultValues: QuoteFormValues = {
  fullName: "",
  phoneNumber: "",
  emailAddress: "",
  clubReference: "",
  fullAddress: "",
  comments: "",
};

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  );
}

function toStoredFormData(values: QuoteFormValues): StoredQuoteFormData {
  return {
    fullName: values.fullName,
    phoneNumber: values.phoneNumber,
    emailAddress: values.emailAddress,
    clubReference: values.clubReference || "",
    fullAddress: values.fullAddress,
    comments: values.comments || "",
  };
}

function subscribeToStorage(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}

let cachedConfigurationSignature = "";
let cachedConfigurationSnapshot: StoredQuoteConfig | null = null;

function getClientConfigurationSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  const quoteRaw = localStorage.getItem(STORAGE_KEYS.quoteConfig) ?? "";
  const productRaw = localStorage.getItem(STORAGE_KEYS.productConfig) ?? "";
  const svgRaw = localStorage.getItem(STORAGE_KEYS.svgConfig) ?? "";
  const nextSignature = `${quoteRaw}::${productRaw}::${svgRaw}`;

  if (nextSignature === cachedConfigurationSignature) {
    return cachedConfigurationSnapshot;
  }

  cachedConfigurationSignature = nextSignature;
  cachedConfigurationSnapshot = getMostRecentConfig();
  return cachedConfigurationSnapshot;
}

function getServerConfigurationSnapshot(): StoredQuoteConfig | null {
  return null;
}

export default function QuoteForm() {
  const router = useRouter();

  const configuration = useSyncExternalStore(
    subscribeToStorage,
    getClientConfigurationSnapshot,
    getServerConfigurationSnapshot,
  );
  const isHydratedRef = useRef(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const watchedValues = useWatch({ control });

  useEffect(() => {
    const savedFormData = getQuoteFormData();

    if (savedFormData) {
      reset({
        ...defaultValues,
        ...savedFormData,
      });
    }

    isHydratedRef.current = true;
  }, [reset]);

  useEffect(() => {
    if (!isHydratedRef.current || !watchedValues) {
      return;
    }

    saveQuoteFormData(toStoredFormData({ ...defaultValues, ...watchedValues }));
  }, [watchedValues]);

  const backToConfiguratorHref = useMemo(() => {
    if (configuration?.sourcePath) {
      return configuration.sourcePath;
    }

    return "/";
  }, [configuration]);

  const onSubmit = (values: QuoteFormValues) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setSubmitWarning(null);

    if (!configuration) {
      setSubmitError(
        "No saved configuration was found. Please return to the configurator first.",
      );
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append(
        "payload",
        JSON.stringify({
          ...values,
          configuration,
        }),
      );

      if (configuration.source === "standard") {
        const pendingFiles = getPendingQuoteFiles();

        if (pendingFiles?.source === "standard" && pendingFiles.files.length) {
          pendingFiles.files.forEach((entry) => {
            const fieldName =
              entry.summary.category === "design-reference"
                ? "designFiles"
                : "logoFiles";
            formData.append(fieldName, entry.file, entry.file.name);
          });
        } else if ((configuration.uploadedFiles?.length ?? 0) > 0) {
          setSubmitWarning(
            "Uploaded files were not available to attach (likely due to page refresh). Quote details are still sent; please re-upload files if needed.",
          );
        }
      }

      const response = await sendQuoteEmail(formData);

      if (!response.success) {
        setSubmitError(response.message);
        return;
      }

      setSubmitSuccess("Your quote request has been sent successfully.");
      clearPendingQuoteFiles();
      clearQuoteStorage();
      router.push("/quote/success");
    });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl p-6 sm:p-8">
        <div className="mb-6 rounded-2xl border border-[#143D59]/20 bg-white/80 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#143D59]">
            Step 2 of 2
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#111827]">
            Your Details
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Complete your contact details and we will email your custom quote.
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F3F6FC]">
            <span className="block h-full w-full rounded-full bg-[#143D59]" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <ConfigSummary configuration={configuration} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-5 shadow-sm"
            noValidate
          >
            <h2 className="text-lg font-semibold text-[#111827]">
              Request a Quote
            </h2>

            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-[#374151]"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName")}
                  className="h-11 w-full rounded-xl border border-[#D1D5DB] px-3 text-sm text-[#111827] outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
                  aria-invalid={errors.fullName ? "true" : "false"}
                />
                <span className="text-xs text-[#143D59]">
                  {errors.fullName?.message ?? ""}
                </span>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-[#374151]"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber")}
                  placeholder="+447700900123"
                  className="h-11 w-full rounded-xl border border-[#D1D5DB] px-3 text-sm text-[#111827] outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
                  aria-invalid={errors.phoneNumber ? "true" : "false"}
                />
                <span className="text-xs text-[#143D59]">
                  {errors.phoneNumber?.message ?? ""}
                </span>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="emailAddress"
                  className="text-sm font-medium text-[#374151]"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  {...register("emailAddress")}
                  className="h-11 w-full rounded-xl border border-[#D1D5DB] px-3 text-sm text-[#111827] outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
                  aria-invalid={errors.emailAddress ? "true" : "false"}
                />
                <span className="text-xs text-[#143D59]">
                  {errors.emailAddress?.message ?? ""}
                </span>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="clubReference"
                  className="text-sm font-medium text-[#374151]"
                >
                  Club or Reference (optional)
                </label>
                <input
                  id="clubReference"
                  type="text"
                  {...register("clubReference")}
                  className="h-11 w-full rounded-xl border border-[#D1D5DB] px-3 text-sm text-[#111827] outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
                  aria-invalid={errors.clubReference ? "true" : "false"}
                />
                <span className="text-xs text-[#143D59]">
                  {errors.clubReference?.message ?? ""}
                </span>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="fullAddress"
                  className="text-sm font-medium text-[#374151]"
                >
                  Full Address
                </label>
                <textarea
                  id="fullAddress"
                  {...register("fullAddress")}
                  rows={3}
                  className="w-full rounded-xl border border-[#D1D5DB] px-3 py-2.5 text-sm text-[#111827] outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
                  aria-invalid={errors.fullAddress ? "true" : "false"}
                />
                <span className="text-xs text-[#143D59]">
                  {errors.fullAddress?.message ?? ""}
                </span>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="comments"
                  className="text-sm font-medium text-[#374151]"
                >
                  Comments / Notes (optional)
                </label>
                <textarea
                  id="comments"
                  {...register("comments")}
                  rows={3}
                  className="w-full rounded-xl border border-[#D1D5DB] px-3 py-2.5 text-sm text-[#111827] outline-none transition focus:border-[#143D59] focus:ring-2 focus:ring-[#143D59]/20"
                  aria-invalid={errors.comments ? "true" : "false"}
                />
                <span className="text-xs text-[#143D59]">
                  {errors.comments?.message ?? ""}
                </span>
              </div>
            </div>

            {submitError ? (
              <p className="mt-4 rounded-lg border border-[#143D59]/20 bg-[#F3F6FC] px-3 py-2 text-sm text-[#143D59]">
                {submitError}
              </p>
            ) : null}

            {submitSuccess ? (
              <p className="mt-4 rounded-lg border border-[#143D59]/20 bg-[#F3F6FC] px-3 py-2 text-sm text-[#143D59]">
                {submitSuccess}
              </p>
            ) : null}

            {submitWarning ? (
              <p className="mt-4 rounded-lg border border-[#143D59]/20 bg-[#F3F6FC] px-3 py-2 text-sm text-[#143D59]">
                {submitWarning}
              </p>
            ) : null}

            <div className="mt-20 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={backToConfiguratorHref}
                className="text-sm font-medium text-[#143D59] underline-offset-4 transition hover:underline"
              >
                {"Back to Configurator"}
              </Link>

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex h-11 min-h-11 items-center justify-center gap-2 rounded-xl bg-[#143D59] px-5 text-sm font-semibold text-white transition hover:bg-[#143D59]/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? <Spinner /> : null}
                {isPending ? "Sending..." : "Send Quote Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
