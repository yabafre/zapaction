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

  for (const tag of uniqueTags) {
    revalidateTag(tag, "max");
  }
}
