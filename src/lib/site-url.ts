import { routing } from "@/i18n/routing";

/** Path with optional non-default locale prefix (matches next-intl `localePrefix: "as-needed"`). */
export function withLocalePrefix(path: string, locale: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized;
  return `/${locale}${normalized}`;
}

export function absoluteUrl(baseUrl: string, path: string, locale: string): string {
  const base = baseUrl.replace(/\/$/, "");
  return `${base}${withLocalePrefix(path, locale)}`;
}
