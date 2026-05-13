import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { LocationSection } from "@/components/LocationSection";
import { CategoryCards } from "@/components/CategoryCards";
import { ValueProps } from "@/components/ValueProps";
import { commodityCategories } from "@/data/commodities";
import { buildJsonLdGraph } from "@/lib/seo/build-json-ld";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale,
      siteName: "Saripati ASIA",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as "en" | "id";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const graph = buildJsonLdGraph(baseUrl, commodityCategories, typedLocale);

  return (
    <>
      <JsonLd data={graph} />
      <div className="flex min-h-dvh flex-col" id="top">
        <Header />
        <main>
          <Hero />
          <ValueProps />
          <CategoryCards locale={typedLocale} />
          <ContactForm locale={typedLocale} />
          <LocationSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
