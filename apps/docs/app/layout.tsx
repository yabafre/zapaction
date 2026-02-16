import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";

import "nextra-theme-docs/style.css";
import "./docs-theme.css";

const docsSans = Inter({
  subsets: ["latin"],
  variable: "--font-docs-sans",
});

const docsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-docs-mono",
});

export const metadata = {
  title: "ZapAction Docs",
  description: "Keep Next.js Server Actions and React Query in sync.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${docsSans.variable} ${docsMono.variable}`}>{children}</body>
    </html>
  );
}
