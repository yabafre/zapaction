"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setTagRegistry } from "@zapaction/query";
import type { ReactNode } from "react";
import { useState } from "react";

import { appKeys } from "./query-keys";

// Map tags to query keys so mutations auto-invalidate the right queries
setTagRegistry({
  todos: [appKeys.todos()],
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
