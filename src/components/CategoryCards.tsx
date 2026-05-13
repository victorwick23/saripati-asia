import { getTranslations } from "next-intl/server";
import { CategoryArt } from "@/components/CategoryArt";
import { commodityCategories } from "@/data/commodities";
import type { CommodityCategoryId } from "@/data/commodities";
import type { LocaleText } from "@/data/commodities";
import { Link } from "@/i18n/navigation";

type CategoryCardsProps = {
  locale: "en" | "id";
};

function pick(text: LocaleText, locale: "en" | "id") {
  return text[locale];
}

export async function CategoryCards({ locale }: CategoryCardsProps) {
  const t = await getTranslations("products");
  const tCards = await getTranslations("categoryCards");

  return (
    <section id="products" className="scroll-mt-24 bg-brand-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-brand-primary sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-lg text-brand-muted">{t("subtitleCategories")}</p>
        </header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commodityCategories.map((category) => (
            <article
              key={category.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-card transition hover:border-brand-primary/15 hover:shadow-lg"
            >
              <div className="border-b border-black/5 bg-gradient-to-br from-brand-surface to-white p-6">
                <CategoryArt categoryId={category.id as CommodityCategoryId} className="h-36 w-full" />
                <h3 className="mt-5 text-xl font-semibold text-brand-primary">{pick(category.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{pick(category.description, locale)}</p>
              </div>
              <div className="mt-auto p-6 pt-4">
                <Link
                  href={`/category/${category.id}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-brand-primary px-4 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                >
                  {tCards("explore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
