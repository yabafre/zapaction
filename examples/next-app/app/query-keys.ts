import { createQueryKeys } from "@zapaction/core";

export const appKeys = createQueryKeys({
  todos: () => ["todos"] as const,
});
