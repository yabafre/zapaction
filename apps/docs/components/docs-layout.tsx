import { getPageMap } from "nextra/page-map";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import Link from "next/link";
import type { ReactNode } from "react";

import pkg from "../../../packages/core/package.json";
import themeConfig from "../theme.config";
import { LanguageSwitcher } from "./language-switcher";
import { ZapActionLogo } from "./zapaction-logo";

type DocsLocale = "en" | "fr";

const docsLabel: Record<DocsLocale, string> = {
  en: "Documentation",
  fr: "Documentation",
};

const tocTitle: Record<DocsLocale, string> = {
  en: "On this page",
  fr: "Sur cette page",
};

const backToTopLabel: Record<DocsLocale, string> = {
  en: "Back to top",
  fr: "Retour en haut",
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

  const localizedConfig = {
    ...themeConfig,
    editLink: locale === "fr" ? "Modifier cette page" : "Suggest an edit",
    feedback: {
      ...themeConfig.feedback,
      content: locale === "fr" ? "Une question ? Donnez votre avis" : "Question? Give feedback",
    },
    toc: {
      ...themeConfig.toc,
      title: tocTitle[locale],
      backToTop: backToTopLabel[locale],
    },
  };

  const navbar = (
    <Navbar logo={<ZapActionLogo />} projectLink="https://github.com/yabafre/zapaction">
      <div className="za-navbar-actions">
        <Link className="za-navbar-pill" href={`/${locale}`}>
          {docsLabel[locale]}
        </Link>
        <a
          className="za-stars-pill"
          href="https://github.com/yabafre/zapaction"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden>★</span>
          <span>Stars</span>
        </a>
        <LanguageSwitcher />
      </div>
    </Navbar>
  );

  const footer = (
    <Footer>
      <div className="za-footer-content">
        <p className="za-footer-line">
          <span>{`${new Date().getFullYear()} © ZapAction`}</span>
          <span className="za-footer-version">v{pkg.version}</span>
        </p>
        <p className="za-footer-links">
          <a
            href="https://github.com/yabafre/zapaction"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/@zapaction/core"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </a>
          <Link href={`/${locale}/guide/project-setup`}>
            {locale === "fr" ? "Demarrage rapide" : "Quick Start"}
          </Link>
        </p>
      </div>
    </Footer>
  );

  return (
    <Layout {...localizedConfig} navbar={navbar} footer={footer} pageMap={pageMap}>
      {children}
    </Layout>
  );
}
