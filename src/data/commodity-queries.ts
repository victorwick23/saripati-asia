import { commodityCategories } from "@/data/commodities";
import type { CommodityCategory, CommodityItem } from "@/data/commodities";

export function getCategoryBySlug(slug: string): CommodityCategory | undefined {
  return commodityCategories.find((c) => c.id === slug);
}

export function getProductWithCategory(
  productSlug: string,
): { category: CommodityCategory; item: CommodityItem } | undefined {
  for (const category of commodityCategories) {
    const item = category.items.find((i) => i.id === productSlug);
    if (item) return { category, item };
  }
  return undefined;
}

export function getAllCategorySlugs(): string[] {
  return commodityCategories.map((c) => c.id);
}

export function getAllProductSlugs(): string[] {
  return commodityCategories.flatMap((c) => c.items.map((i) => i.id));
}
