"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LOCALES = ["en", "fr"] as const;

type Locale = (typeof LOCALES)[number];

function getActiveLocale(pathname: string): Locale {
  const maybeLocale = pathname.split("/")[1];
  return maybeLocale === "fr" ? "fr" : "en";
}

function withLocale(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const parts = normalized.split("/");

  if (parts.length > 1 && (parts[1] === "en" || parts[1] === "fr")) {
    parts[1] = locale;
    return parts.join("/") || `/${locale}`;
  }

  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const activeLocale = getActiveLocale(pathname);

  return (
    <div className="za-locale-switch">
      {LOCALES.map((locale) => {
        const href = withLocale(pathname, locale);
        const isActive = locale === activeLocale;

        return (
          <Link
            key={locale}
            href={href}
            className="za-locale-pill"
            data-active={isActive ? "true" : "false"}
            aria-current={isActive ? "page" : undefined}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
