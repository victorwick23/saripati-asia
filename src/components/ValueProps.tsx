import { getTranslations } from "next-intl/server";
import { BadgeCheck, Container, FileText } from "lucide-react";

const icons = {
  quality: BadgeCheck,
  logistics: Container,
  compliance: FileText,
} as const;

export async function ValueProps() {
  const t = await getTranslations("valueProps");

  const keys = ["quality", "logistics", "compliance"] as const;

  return (
    <section className="border-y border-black/5 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-brand-primary sm:text-4xl">{t("title")}</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {keys.map((key) => {
            const Icon = icons[key];
            return (
              <article
                key={key}
                className="flex flex-col rounded-2xl border border-black/5 bg-brand-surface p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-primary shadow-inner">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[color:var(--color-ink)]">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{t(`items.${key}.body`)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
