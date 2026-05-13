import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryArt } from "@/components/CategoryArt";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductIllustration } from "@/components/ProductIllustration";
import { getCategoryBySlug, getAllCategorySlugs } from "@/data/commodity-queries";
import type { CommodityCategoryId } from "@/data/commodities";
import type { LocaleText } from "@/data/commodities";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ locale: string; categorySlug: string }>;
};

function pick(text: LocaleText, locale: "en" | "id") {
  return text[locale];
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((categorySlug) => ({ categorySlug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, categorySlug } = await params;
  const typedLocale = locale as "en" | "id";
  const category = getCategoryBySlug(categorySlug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!category) {
    return { title: "Saripati ASIA" };
  }

  const t = await getTranslations({ locale, namespace: "metaCategory" });
  const title = t("title", { category: pick(category.title, typedLocale) });
  const description = t("description", {
    category: pick(category.title, typedLocale),
    summary: pick(category.description, typedLocale),
  });

  const canonicalPath = `/category/${categorySlug}`;
  const canonical = absoluteUrl(baseUrl, canonicalPath, locale);

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, absoluteUrl(baseUrl, canonicalPath, l)]),
      ),
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      url: canonical,
      siteName: "Saripati ASIA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { locale, categorySlug } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as "en" | "id";

  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const t = await getTranslations("categoryPage");
  const tProducts = await getTranslations("productList");

  return (
    <div className="flex min-h-dvh flex-col" id="top">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-black/5 bg-gradient-to-br from-white via-brand-surface to-white">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,var(--color-brand-accent-muted)_0%,transparent_55%)] opacity-40" />
          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <Breadcrumbs
              items={[
                { label: t("breadcrumbHome"), href: "/" },
                { label: pick(category.title, typedLocale) },
              ]}
            />
            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_280px]">
              <div className="space-y-4">
                <h1 className="text-balance text-3xl font-semibold leading-tight text-brand-primary sm:text-4xl lg:text-5xl">
                  {t("heroTitle", { category: pick(category.title, typedLocale) })}
                </h1>
                <p className="max-w-2xl text-pretty text-lg text-brand-muted">{pick(category.description, typedLocale)}</p>
              </div>
              <div className="justify-self-start lg:justify-self-end">
                <div className="w-full max-w-[280px] overflow-hidden rounded-3xl border border-black/5 bg-white p-4 shadow-card">
                  <CategoryArt categoryId={category.id as CommodityCategoryId} className="h-40 w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-surface py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-brand-primary sm:text-3xl">{tProducts("heading")}</h2>
            <p className="mt-2 max-w-2xl text-brand-muted">{tProducts("subheading")}</p>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <li key={item.id}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-card transition hover:border-brand-primary/15 hover:shadow-lg">
                    <div className="p-5">
                      <ProductIllustration categoryId={category.id as CommodityCategoryId} />
                      <h3 className="mt-4 text-lg font-semibold text-[color:var(--color-ink)]">
                        {pick(item.name, typedLocale)}
                      </h3>
                    </div>
                    <div className="mt-auto border-t border-black/5 p-5">
                      <Link
                        href={`/product/${item.id}`}
                        className="inline-flex w-full items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-surface px-4 py-2.5 text-sm font-semibold text-brand-primary transition hover:border-brand-primary/40 hover:bg-white"
                      >
                        {tProducts("viewDetails")}
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
