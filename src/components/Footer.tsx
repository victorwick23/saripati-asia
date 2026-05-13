import { getTranslations } from "next-intl/server";
import { LeafGlyph } from "@/components/LeafGlyph";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-brand-muted">
          <LeafGlyph className="h-4 w-4 text-brand-accent" aria-hidden />
          <span>{t("tagline")}</span>
        </div>
        <p className="text-sm text-brand-muted">{t("rights", { year })}</p>
      </div>
    </footer>
  );
}
