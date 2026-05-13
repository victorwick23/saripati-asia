import { getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";

const MAP_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=106.78%2C-6.30%2C106.95%2C-6.15&layer=mapnik&marker=-6.22%2C106.86";
const MAP_LINK = "https://www.openstreetmap.org/?mlat=-6.22&mlon=106.86#map=12/-6.22/106.86";

export async function LocationSection() {
  const t = await getTranslations("location");

  return (
    <section id="location" className="scroll-mt-24 border-t border-black/5 bg-brand-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-brand-primary sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-lg text-brand-muted">{t("subtitle")}</p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <address className="not-italic">
            <div className="flex items-start gap-3 rounded-3xl border border-black/5 bg-white p-6 shadow-card">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-surface text-brand-primary">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
                  {t("addressLabel")}
                </p>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[color:var(--color-ink)]">
                  {t("addressLines")}
                </p>
                <p className="mt-4 text-xs text-brand-muted">{t("note")}</p>
              </div>
            </div>
          </address>

          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
              <p className="text-sm font-semibold text-brand-primary">{t("mapTitle")}</p>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-brand-primary underline-offset-4 hover:underline"
              >
                {t("openMaps")}
              </a>
            </div>
            <div className="relative aspect-[4/3] w-full bg-brand-surface">
              <iframe
                title="Saripati ASIA map preview"
                className="absolute inset-0 h-full w-full"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
