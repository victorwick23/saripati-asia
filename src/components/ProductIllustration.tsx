import { LeafGlyph } from "@/components/LeafGlyph";
import type { CommodityCategoryId } from "@/data/commodities";

type ProductIllustrationProps = {
  categoryId: CommodityCategoryId;
  className?: string;
};

/** Compact on-brand mark for product cards (category-tinted surface + leaf). */
export function ProductIllustration({ categoryId, className }: ProductIllustrationProps) {
  const tint =
    categoryId === "charcoal-energy"
      ? "from-[color:var(--color-ink)]/10 to-brand-surface"
      : "from-brand-accent/25 to-brand-surface";

  return (
    <div
      className={`flex aspect-square w-full items-center justify-center rounded-2xl bg-gradient-to-br ${tint} ${className ?? ""}`}
    >
      <LeafGlyph className="h-12 w-12 text-brand-primary opacity-90" aria-hidden />
    </div>
  );
}
