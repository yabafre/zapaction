import { assertServer } from "./assertServer";

export type CacheLifeProfile = string | { expire?: number };

export type RevalidationMode = "revalidate" | "update";

export type RevalidateTagsOptions = {
  /**
   * Cache revalidation strategy in Next.js 16+:
   * - `"revalidate"` (default): calls `revalidateTag(tag, profile)` (stale-while-revalidate; works in Server Actions and Route Handlers).
   * - `"update"`: calls `updateTag(tag)` for immediate read-your-own-writes expiration inside Server Actions (falls back to `revalidateTag` on Next.js 15).
   */
  mode?: RevalidationMode;
  /**
   * CacheLife profile passed as the second argument to `revalidateTag(tag, profile)` in Next.js 16+.
   * Ignored when `mode` is `"update"` or on Next.js 15 (single-argument `revalidateTag`).
   * Defaults to `"max"`.
   */
  profile?: CacheLifeProfile;
};

type NextCacheModule = {
  revalidateTag?:
    | ((tag: string) => void)
    | ((tag: string, profile: CacheLifeProfile) => void);
  updateTag?: (tag: string) => void;
};

export async function revalidateTags(
  tags?: readonly string[],
  options?: RevalidateTagsOptions,
): Promise<void> {
  assertServer("revalidateTags");

  if (!tags || tags.length === 0) {
    return;
  }

  const uniqueTags = new Set(tags.filter((tag) => tag.length > 0));
  if (uniqueTags.size === 0) {
    return;
  }

  const cache = (await import("next/cache")) as NextCacheModule;
  const mode = options?.mode ?? "revalidate";
  const profile: CacheLifeProfile = options?.profile ?? "max";

  const updateTag =
    "updateTag" in cache && typeof cache.updateTag === "function"
      ? cache.updateTag
      : undefined;

  if (mode === "update" && updateTag) {
    for (const tag of uniqueTags) {
      updateTag(tag);
    }
    return;
  }

  const revalidateTag =
    "revalidateTag" in cache && typeof cache.revalidateTag === "function"
      ? cache.revalidateTag
      : undefined;

  if (!revalidateTag) {
    return;
  }

  const supportsProfile =
    revalidateTag.length >= 2 ||
    updateTag !== undefined ||
    options?.profile !== undefined;

  for (const tag of uniqueTags) {
    if (supportsProfile) {
      (revalidateTag as (currentTag: string, currentProfile: CacheLifeProfile) => void)(
        tag,
        profile,
      );
      continue;
    }

    (revalidateTag as (currentTag: string) => void)(tag);
  }
}

export async function updateTags(tags?: readonly string[]): Promise<void> {
  assertServer("updateTags");
  await revalidateTags(tags, { mode: "update" });
}
