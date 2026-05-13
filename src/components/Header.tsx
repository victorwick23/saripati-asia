import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LeafGlyph } from "@/components/LeafGlyph";
import { Link } from "@/i18n/navigation";

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/logo.png"
            alt="Saripati ASIA"
            width={44}
            height={44}
            priority
            className="h-11 w-11 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-brand-primary">
              Saripati ASIA
            </span>
            <span className="hidden items-center gap-1 text-xs text-brand-muted md:flex">
              {t("tagline")}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[color:var(--color-ink)] md:flex">
          <Link
            className="transition hover:text-brand-primary"
            href="/#products"
          >
            {t("products")}
          </Link>
          <Link
            className="transition hover:text-brand-primary"
            href="/#contact"
          >
            {t("contact")}
          </Link>
          <Link
            className="transition hover:text-brand-primary"
            href="/#location"
          >
            {t("location")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="flex gap-6 overflow-x-auto border-t border-black/5 px-4 py-2 text-sm font-medium text-[color:var(--color-ink)] md:hidden"
      >
        <Link
          className="whitespace-nowrap hover:text-brand-primary"
          href="/#products"
        >
          {t("products")}
        </Link>
        <Link
          className="whitespace-nowrap hover:text-brand-primary"
          href="/#contact"
        >
          {t("contact")}
        </Link>
        <Link
          className="whitespace-nowrap hover:text-brand-primary"
          href="/#location"
        >
          {t("location")}
        </Link>
      </nav>
    </header>
  );
}
