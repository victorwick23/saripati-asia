import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryArt } from "@/components/CategoryArt";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getProductWithCategory, getAllProductSlugs } from "@/data/commodity-queries";
import type { CommodityCategoryId } from "@/data/commodities";
import type { LocaleText } from "@/data/commodities";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ locale: string; productSlug: string }>;
};

function pick(text: LocaleText, locale: "en" | "id") {
  return text[locale];
}

export function generateStaticParams() {
  return getAllProductSlugs().map((productSlug) => ({ productSlug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, productSlug } = await params;
  const typedLocale = locale as "en" | "id";
  const found = getProductWithCategory(productSlug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!found) {
    return { title: "Saripati ASIA" };
  }

  const { category, item } = found;
  const variantSummary =
    item.variants?.map((v) => pick(v, typedLocale)).join(", ") ??
    pick(category.description, typedLocale);

  const t = await getTranslations({ locale, namespace: "metaProduct" });
  const title = t("title", { product: pick(item.name, typedLocale) });
  const description = t("description", {
    product: pick(item.name, typedLocale),
    category: pick(category.title, typedLocale),
    variants: variantSummary,
  });

  const canonicalPath = `/product/${productSlug}`;
  const canonical = absoluteUrl(baseUrl, canonicalPath, locale);

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: t("keywords", { product: pick(item.name, typedLocale), category: pick(category.title, typedLocale) }),
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

export default async function ProductPage({ params }: PageProps) {
  const { locale, productSlug } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as "en" | "id";

  const found = getProductWithCategory(productSlug);
  if (!found) notFound();

  const { category, item } = found;
  const t = await getTranslations("productPage");
  const commodityValue = `${category.id}:${item.id}`;
  const lockedLabel = `${pick(category.title, typedLocale)} — ${pick(item.name, typedLocale)}`;

  const rows =
    item.variants && item.variants.length > 0
      ? item.variants.map((v) => ({ variant: pick(v, typedLocale) }))
      : [{ variant: t("specs.standardRow") }];

  return (
    <div className="flex min-h-dvh flex-col" id="top">
      <Header />
      <main>
        <section className="border-b border-black/5 bg-gradient-to-br from-white via-brand-surface to-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            <Breadcrumbs
              items={[
                { label: t("breadcrumbHome"), href: "/" },
                { label: pick(category.title, typedLocale), href: `/category/${category.id}` },
                { label: pick(item.name, typedLocale) },
              ]}
            />

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
              <div>
                <div className="overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-card lg:hidden">
                  <CategoryArt categoryId={category.id as CommodityCategoryId} className="h-48 w-full max-w-sm mx-auto" />
                </div>
                <h1 className="mt-8 text-3xl font-semibold leading-tight text-brand-primary sm:text-4xl lg:mt-0">
                  {pick(item.name, typedLocale)}
                </h1>
                <p className="mt-4 max-w-2xl text-pretty text-lg text-brand-muted">{pick(category.description, typedLocale)}</p>
              </div>
              <div className="hidden overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-card lg:block">
                <CategoryArt categoryId={category.id as CommodityCategoryId} className="h-56 w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14" aria-labelledby="specs-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="specs-heading" className="text-2xl font-semibold text-brand-primary sm:text-3xl">
              {t("specsTitle")}
            </h2>
            <p className="mt-2 text-brand-muted">{t("specsIntro")}</p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-black/5 shadow-inner">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-brand-surface">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-brand-primary sm:px-6">{t("specsColVariant")}</th>
                    <th className="px-4 py-3 font-semibold text-brand-primary sm:px-6">{t("specsColNotes")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx} className="border-t border-black/5 bg-white">
                      <td className="px-4 py-3 font-medium text-[color:var(--color-ink)] sm:px-6">{row.variant}</td>
                      <td className="px-4 py-3 text-brand-muted sm:px-6">{t("specsRowNotes")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-brand-muted">
              {t("specsFootnote")}{" "}
              <Link href="/#contact" className="font-semibold text-brand-primary underline-offset-4 hover:underline">
                {t("specsFootnoteCta")}
              </Link>
            </p>
          </div>
        </section>

        <ContactForm
          locale={typedLocale}
          sectionId="product-inquiry"
          title={t("inquiryTitle", { product: pick(item.name, typedLocale) })}
          subtitle={t("inquirySubtitle")}
          defaultCommodity={commodityValue}
          lockCommodity
          lockedCommodityLabel={lockedLabel}
        />
      </main>
      <Footer />
    </div>
  );
}
