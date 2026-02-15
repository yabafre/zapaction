import { getPageMap } from "nextra/page-map";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import Link from "next/link";
import type { ReactNode } from "react";

import themeConfig from "../theme.config";
import { LanguageSwitcher } from "./language-switcher";
import { ZapActionLogo } from "./zapaction-logo";

type DocsLocale = "en" | "fr";

const docsLabel: Record<DocsLocale, string> = {
  en: "Docs",
  fr: "Docs",
};

function normalizeLocaleRoutes(pageMap: any[], locale: DocsLocale): any[] {
  const localePrefix = `/${locale}`;

  const stripLocalePrefix = (value: string) => {
    if (value === localePrefix) {
      return "/";
    }

    if (value.startsWith(`${localePrefix}/`)) {
      return value.slice(localePrefix.length) || "/";
    }

    return value;
  };

  return pageMap.map((item) => {
    let nextItem: any = item;

    if (typeof item?.route === "string") {
      nextItem = { ...nextItem, route: stripLocalePrefix(item.route) };
    }

    if (typeof item?.href === "string") {
      nextItem = { ...nextItem, href: stripLocalePrefix(item.href) };
    }

    if (Array.isArray(item?.children)) {
      nextItem = { ...nextItem, children: normalizeLocaleRoutes(item.children, locale) };
    }

    return nextItem;
  });
}

export async function DocsLayout({ locale, children }: { locale: DocsLocale; children: ReactNode }) {
  const rawPageMap = await getPageMap(`/${locale}/${locale}`);
  const pageMap = normalizeLocaleRoutes(rawPageMap, locale);

  const navbar = (
    <Navbar logo={<ZapActionLogo />} projectLink="https://github.com/yabafre/zapaction">
      <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        <Link href={`/${locale}`} style={{ fontSize: 13 }}>
          {docsLabel[locale]}
        </Link>
        <LanguageSwitcher />
      </div>
    </Navbar>
  );

  const footer = <Footer>{`${new Date().getFullYear()} © ZapAction`}</Footer>;

  return (
    <Layout {...themeConfig} navbar={navbar} footer={footer} pageMap={pageMap}>
      {children}
    </Layout>
  );
}
