import type { ReactNode } from "react";

import "nextra-theme-docs/style.css";

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
      <body>{children}</body>
    </html>
  );
}
