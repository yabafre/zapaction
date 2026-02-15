import type { QueryClient, QueryKey } from "@tanstack/react-query";

import { getTagRegistry } from "./tagRegistry";

function resolveKeysForTag(tag: string): readonly QueryKey[] {
  const registry = getTagRegistry();
  const resolver = registry[tag];

  if (!resolver) {
    return [];
  }

  return typeof resolver === "function" ? resolver({}) : resolver;
}

export async function invalidateTags(
  queryClient: QueryClient,
  tags?: readonly string[],
): Promise<void> {
  if (!tags || tags.length === 0) {
    return;
  }

  const invalidated = new Set<string>();

  for (const tag of tags) {
    const keys = resolveKeysForTag(tag);

    for (const key of keys) {
      const dedupeKey = JSON.stringify(key);
      if (invalidated.has(dedupeKey)) {
        continue;
      }

      invalidated.add(dedupeKey);
      await queryClient.invalidateQueries({ queryKey: key });
    }
  }
}
