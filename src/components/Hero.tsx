import { getTranslations } from "next-intl/server";
import { LeafGlyph } from "@/components/LeafGlyph";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-surface to-white">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,var(--color-brand-accent-muted)_0%,transparent_55%)] opacity-40" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
            <LeafGlyph className="h-4 w-4 text-brand-accent" />
            {t("eyebrow")}
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-brand-primary sm:text-5xl">
            {t("title")}
          </h1>
          <p className="max-w-xl text-pretty text-lg text-brand-muted">{t("subtitle")}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-xl border border-brand-primary/20 bg-white px-5 py-3 text-sm font-semibold text-brand-primary transition hover:border-brand-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>

        <div className="relative isolate rounded-3xl border border-black/5 bg-white p-6 shadow-card">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-brand-accent/30 blur-2xl" />
          <div className="relative grid gap-4 sm:grid-cols-2">
            {(["a", "b", "c", "d"] as const).map((key) => (
              <Stat key={key} label={t(`panel.${key}.title`)} value={t(`panel.${key}.body`)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-brand-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">{label}</p>
      <p className="mt-2 text-sm text-[color:var(--color-ink)]">{value}</p>
    </div>
  );
}
