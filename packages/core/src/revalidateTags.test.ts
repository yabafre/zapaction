import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { revalidateTags, updateTags } from "./revalidateTags";

describe("revalidateTags & updateTags", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.doUnmock("next/cache");
    vi.unstubAllGlobals();
  });

  it("calls Next.js 16 revalidateTag with default 'max' profile and deduplicates tags", async () => {
    const calls: unknown[][] = [];
    function mockRevalidateTag(tag: string, profile: unknown) {
      calls.push([tag, profile]);
    }
    const mockUpdateTag = vi.fn();

    vi.doMock("next/cache", () => ({
      revalidateTag: mockRevalidateTag,
      updateTag: mockUpdateTag,
    }));

    await revalidateTags(["todos", "todos", "", "users"]);

    expect(calls).toEqual([
      ["todos", "max"],
      ["users", "max"],
    ]);
    expect(mockUpdateTag).not.toHaveBeenCalled();
  });

  it("passes custom CacheLifeProfile string or expire config to revalidateTag", async () => {
    const calls: unknown[][] = [];
    function mockRevalidateTag(tag: string, profile: unknown) {
      calls.push([tag, profile]);
    }

    vi.doMock("next/cache", () => ({
      revalidateTag: mockRevalidateTag,
      updateTag: vi.fn(),
    }));

    await revalidateTags(["posts"], { profile: "hours" });
    await revalidateTags(["orders"], { profile: { expire: 0 } });

    expect(calls).toEqual([
      ["posts", "hours"],
      ["orders", { expire: 0 }],
    ]);
  });

  it("uses Next.js 16 updateTag when mode is 'update' or via updateTags helper", async () => {
    const mockRevalidateTag = vi.fn();
    const mockUpdateTag = vi.fn();

    vi.doMock("next/cache", () => ({
      revalidateTag: mockRevalidateTag,
      updateTag: mockUpdateTag,
    }));

    await revalidateTags(["todos", "todos"], { mode: "update" });
    await updateTags(["users", ""]);

    expect(mockUpdateTag).toHaveBeenCalledTimes(2);
    expect(mockUpdateTag).toHaveBeenNthCalledWith(1, "todos");
    expect(mockUpdateTag).toHaveBeenNthCalledWith(2, "users");
    expect(mockRevalidateTag).not.toHaveBeenCalled();
  });

  it("falls back to single-argument revalidateTag on Next.js 15 when updateTag is unavailable", async () => {
    const calls: unknown[][] = [];
    function mockNext15RevalidateTag(tag: string) {
      calls.push([tag]);
    }

    vi.doMock("next/cache", () => ({
      revalidateTag: mockNext15RevalidateTag,
    }));

    await revalidateTags(["todos"]);
    await updateTags(["users"]);

    expect(calls).toEqual([["todos"], ["users"]]);
  });

  it("does nothing when tags are empty or omitted", async () => {
    const mockRevalidateTag = vi.fn();
    const mockUpdateTag = vi.fn();

    vi.doMock("next/cache", () => ({
      revalidateTag: mockRevalidateTag,
      updateTag: mockUpdateTag,
    }));

    await revalidateTags();
    await revalidateTags([]);
    await revalidateTags(["", ""]);

    expect(mockRevalidateTag).not.toHaveBeenCalled();
    expect(mockUpdateTag).not.toHaveBeenCalled();
  });

  it("throws when called in a browser environment", async () => {
    vi.stubGlobal("window", {});

    await expect(revalidateTags(["todos"])).rejects.toThrow(
      "revalidateTags must be called on the server.",
    );
    await expect(updateTags(["todos"])).rejects.toThrow(
      "updateTags must be called on the server.",
    );
  });
});
