"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { commodityCategories } from "@/data/commodities";
import type { LocaleText } from "@/data/commodities";
import { Loader2, Send } from "lucide-react";

type ContactFormProps = {
  locale: "en" | "id";
  /** Section `id` for in-page anchors (default: contact). */
  sectionId?: string;
  /** Override main heading (e.g. product-specific quote request). */
  title?: string;
  subtitle?: string;
  /** `categoryId:itemId` matching the contact API commodity field. */
  defaultCommodity?: string;
  /** When true, commodity is fixed (hidden input) — use on PDPs. */
  lockCommodity?: boolean;
  /** Shown when `lockCommodity` (e.g. localized category — product label). */
  lockedCommodityLabel?: string;
};

function label(text: LocaleText, locale: "en" | "id") {
  return text[locale];
}

export function ContactForm({
  locale,
  sectionId = "contact",
  title,
  subtitle,
  defaultCommodity,
  lockCommodity = false,
  lockedCommodityLabel,
}: ContactFormProps) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const options = useMemo(
    () =>
      commodityCategories.flatMap((cat) =>
        cat.items.map((item) => ({
          value: `${cat.id}:${item.id}`,
          label: `${label(cat.title, locale)} — ${label(item.name, locale)}`,
        })),
      ),
    [locale],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const heading = title ?? t("title");
  const blurb = subtitle ?? t("subtitle");

  return (
    <section id={sectionId} className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-brand-primary sm:text-4xl">{heading}</h2>
          <p className="mt-3 text-lg text-brand-muted">{blurb}</p>
        </header>

        <form
          onSubmit={onSubmit}
          className="mt-10 grid max-w-3xl gap-4 rounded-3xl border border-black/5 bg-brand-surface p-6 shadow-inner sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="company"
              label={t("fields.company")}
              placeholder={t("placeholders.company")}
              required
            />
            <Field name="name" label={t("fields.name")} placeholder={t("placeholders.name")} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="email"
              type="email"
              label={t("fields.email")}
              placeholder={t("placeholders.email")}
              required
            />
            <Field name="phone" label={t("fields.phone")} placeholder={t("placeholders.phone")} />
          </div>

          <div>
            <label className="text-sm font-semibold text-[color:var(--color-ink)]" htmlFor={lockCommodity ? "commodity-locked" : "commodity"}>
              {t("fields.commodity")}
            </label>
            {lockCommodity && defaultCommodity ? (
              <>
                <input type="hidden" name="commodity" value={defaultCommodity} readOnly />
                <p
                  id="commodity-locked"
                  className="mt-2 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-[color:var(--color-ink)] shadow-sm"
                >
                  {lockedCommodityLabel ?? defaultCommodity}
                </p>
              </>
            ) : (
              <>
                <select
                  id="commodity"
                  name="commodity"
                  required
                  defaultValue={defaultCommodity ?? ""}
                  className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-accent focus:ring-2"
                >
                  <option value="" disabled>
                    {t("placeholders.commodity")}
                  </option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <Field name="volume" label={t("fields.volume")} placeholder={t("placeholders.volume")} />

          <div>
            <label className="text-sm font-semibold text-[color:var(--color-ink)]" htmlFor="message">
              {t("fields.message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder={t("placeholders.message")}
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-accent focus:ring-2"
            />
          </div>

          <input type="hidden" name="locale" value={locale} readOnly />

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  {t("sending")}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden />
                  {t("submit")}
                </>
              )}
            </button>
            {status === "success" ? (
              <p className="text-sm font-medium text-brand-primary" role="status">
                {t("success")}
              </p>
            ) : null}
            {status === "error" ? (
              <p className="text-sm font-medium text-red-700" role="alert">
                {t("error")}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-[color:var(--color-ink)]" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-brand-accent focus:ring-2"
      />
    </div>
  );
}
