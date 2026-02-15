import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import type { ReactNode } from "react";

import themeConfig from "../theme.config";
import "nextra-theme-docs/style.css";

export const metadata = {
  title: "ZapAction Docs",
  description: "Keep Next Server Actions and React Query in sync automatically.",
};

const navbar = <Navbar logo={<strong>ZapAction</strong>} projectLink="https://github.com/yabafre/zapaction" />;
const footer = <Footer>{`${new Date().getFullYear()} © ZapAction`}</Footer>;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const pageMap = await getPageMap();

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout {...themeConfig} navbar={navbar} footer={footer} pageMap={pageMap}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
