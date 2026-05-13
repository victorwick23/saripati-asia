import type { CommodityCategory } from "@/data/commodities";
import { absoluteUrl } from "@/lib/site-url";

const SITE_NAME = "Saripati ASIA";

export function buildOrganizationJsonLd(baseUrl: string) {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: baseUrl,
    logo: `${baseUrl}/logo/logo.png`,
    description:
      "B2B agricultural commodity trading including spices, coconut derivatives, charcoal, coffee, essential oils, and specialty produce.",
    areaServed: "Worldwide",
    knowsAbout: [
      "Agricultural commodity trading",
      "Bulk spices export",
      "Coconut copra",
      "Coffee beans",
      "Charcoal",
      "Essential oils",
    ],
  };
}

export function buildItemListJsonLd(
  baseUrl: string,
  categories: CommodityCategory[],
  locale: "en" | "id",
) {
  const elements: Record<string, unknown>[] = [];
  let position = 1;

  for (const cat of categories) {
    for (const item of cat.items) {
      const name = item.name[locale];
      const variantText = item.variants?.map((v) => v[locale]).join(", ");
      const productPath = `/product/${item.id}`;
      elements.push({
        "@type": "ListItem",
        position: position++,
        item: {
          "@type": "Product",
          name,
          description: variantText
            ? `${name} — ${variantText}`
            : `${name} — ${cat.title[locale]}`,
          category: cat.title[locale],
          brand: { "@type": "Brand", name: SITE_NAME },
          url: absoluteUrl(baseUrl, productPath, locale),
        },
      });
    }
  }

  return {
    "@type": "ItemList",
    name: `${SITE_NAME} — Commodity catalog`,
    itemListElement: elements,
  };
}

export function buildWebSiteJsonLd(baseUrl: string) {
  return {
    "@type": "WebSite",
    name: SITE_NAME,
    url: baseUrl,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export function buildJsonLdGraph(
  baseUrl: string,
  categories: CommodityCategory[],
  locale: "en" | "id",
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(baseUrl),
      buildWebSiteJsonLd(baseUrl),
      buildItemListJsonLd(baseUrl, categories, locale),
    ],
  };
}
