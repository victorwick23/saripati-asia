"use client";

import { useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe2 } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");
  const [pending, startTransition] = useTransition();
  const [compactLocaleLabels, setCompactLocaleLabels] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompactLocaleLabels(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  function onChange(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)]">
      <Globe2 className="h-4 w-4 text-brand-primary" aria-hidden />
      <span className="sr-only">{t("en")}</span>
      <select
        className="cursor-pointer rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm shadow-sm outline-none ring-brand-accent transition focus:ring-2"
        value={locale}
        disabled={pending}
        aria-label="Language"
        onChange={(e) => onChange(e.target.value)}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {compactLocaleLabels ? loc.toUpperCase() : loc === "en" ? t("en") : t("id")}
          </option>
        ))}
      </select>
    </label>
  );
}
