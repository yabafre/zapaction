import { createQueryKeys } from "@zapaction/core";

export const usersKeys = createQueryKeys({
  all: () => ["users"] as const,
});
