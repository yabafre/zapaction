import type { ReactNode } from "react";

import { DocsLayout } from "../../components/docs-layout";

export default function FrLayout({ children }: { children: ReactNode }) {
  return <DocsLayout locale="fr">{children}</DocsLayout>;
}
