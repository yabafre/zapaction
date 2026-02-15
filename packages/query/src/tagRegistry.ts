import type { QueryKey } from "@tanstack/react-query";

export type TagResolverArgs = {
  input?: unknown;
  result?: unknown;
};

export type TagRegistry = Record<
  string,
  readonly QueryKey[] | ((args: TagResolverArgs) => readonly QueryKey[])
>;

let activeRegistry: TagRegistry = {};

function isQueryKey(value: unknown): value is QueryKey {
  return Array.isArray(value);
}

function validateRegistry(registry: TagRegistry): void {
  for (const [tag, resolver] of Object.entries(registry)) {
    if (typeof tag !== "string" || tag.length === 0) {
      throw new Error("Tag registry keys must be non-empty strings.");
    }

    if (typeof resolver === "function") {
      continue;
    }

    if (!Array.isArray(resolver)) {
      throw new Error(`Tag "${tag}" must map to an array of query keys or a resolver function.`);
    }

    for (const key of resolver) {
      if (!isQueryKey(key)) {
        throw new Error(`Tag "${tag}" contains an invalid query key.`);
      }
    }
  }
}

export function setTagRegistry(registry: TagRegistry): void {
  const isProduction =
    (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV ===
    "production";

  if (!isProduction) {
    validateRegistry(registry);
  }

  activeRegistry = registry;
}

export function getTagRegistry(): TagRegistry {
  return activeRegistry;
}
