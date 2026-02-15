import { describe, it, expect, beforeEach, vi } from "vitest";
import { z } from "zod";

import { setActionContext, __resetActionContextForTests } from "./context";
import { defineAction } from "./defineAction";
import { revalidateTags } from "./revalidateTags";

vi.mock("./revalidateTags", () => ({
  revalidateTags: vi.fn(async () => {}),
}));

describe("defineAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    __resetActionContextForTests();
  });

  it("validates input and resolves context", async () => {
    setActionContext(async () => ({ userId: "u-1" }));

    const action = defineAction({
      input: z.object({ name: z.string().min(1) }),
      output: z.object({ id: z.string(), name: z.string() }),
      handler: async ({ input, ctx }: { input: { name: string }; ctx: { userId: string } }) => ({
        id: `id-${ctx.userId}`,
        name: input.name,
      }),
    });

    await expect(action({ name: "Alex" })).resolves.toEqual({
      id: "id-u-1",
      name: "Alex",
    });
  });

  it("throws zod errors as-is and does not call handler", async () => {
    setActionContext(() => ({ userId: "u-1" }));

    const handler = vi.fn(async () => ({ id: "1" }));

    const action = defineAction({
      input: z.object({ age: z.number().int().positive() }),
      output: z.object({ id: z.string() }),
      handler,
    });

    await expect(action({ age: -2 })).rejects.toMatchObject({ name: "ZodError" });
    expect(handler).not.toHaveBeenCalled();
  });

  it("throws output validation errors as-is", async () => {
    setActionContext(() => ({ userId: "u-1" }));

    const action = defineAction({
      input: z.object({ name: z.string() }),
      output: z.object({ id: z.string(), createdAt: z.string() }),
      handler: async ({ input }) =>
        ({
          id: input.name,
        }) as unknown as { id: string; createdAt: string },
    });

    await expect(action({ name: "broken" })).rejects.toMatchObject({
      name: "ZodError",
    });
  });

  it("exposes tags metadata and revalidates when tags exist", async () => {
    setActionContext(() => ({ userId: "u-1" }));

    const action = defineAction({
      input: z.object({ value: z.string() }),
      tags: ["users", "users"],
      handler: async ({ input }) => ({
        ok: input.value,
      }),
    });

    expect(action.tags).toEqual(["users", "users"]);

    await action({ value: "ok" });
    expect(revalidateTags).toHaveBeenCalledWith(["users", "users"]);
  });

  it("does not revalidate when no tags are defined", async () => {
    setActionContext(() => ({ userId: "u-1" }));

    const action = defineAction({
      input: z.object({ value: z.string() }),
      handler: async ({ input }) => ({
        ok: input.value,
      }),
    });

    expect(action.tags).toBeUndefined();
    await action({ value: "ok" });
    expect(revalidateTags).not.toHaveBeenCalled();
  });
});
