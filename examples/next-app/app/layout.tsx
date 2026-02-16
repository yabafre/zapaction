import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "ZapAction Next.js Example",
  description: "Real Next.js App Router example using @zapaction/core, @zapaction/query, and @zapaction/react.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
