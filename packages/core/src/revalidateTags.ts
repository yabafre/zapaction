function assertServer(apiName: string): void {
  if (typeof window !== "undefined") {
    throw new Error(`${apiName} must be called on the server.`);
  }
}

export async function revalidateTags(tags?: readonly string[]): Promise<void> {
  assertServer("revalidateTags");

  if (!tags || tags.length === 0) {
    return;
  }

  const uniqueTags = new Set(tags.filter((tag) => tag.length > 0));
  const { revalidateTag } = await import("next/cache");
  const revalidateTagCompat = revalidateTag as
    | ((tag: string) => void)
    | ((tag: string, profile: "max") => void);

  for (const tag of uniqueTags) {
    if (revalidateTag.length >= 2) {
      (revalidateTagCompat as (currentTag: string, profile: "max") => void)(tag, "max");
      continue;
    }

    (revalidateTagCompat as (currentTag: string) => void)(tag);
  }
}
