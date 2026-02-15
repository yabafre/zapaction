import type { ReactNode } from "react";

import { DocsLayout } from "../../components/docs-layout";

export default function EnLayout({ children }: { children: ReactNode }) {
  return <DocsLayout locale="en">{children}</DocsLayout>;
}
