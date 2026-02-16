import { describe, it, expect, beforeEach, vi } from "vitest";
import { z } from "zod";

import { setActionContext, __resetActionContextForTests } from "./context";
import { defineAction } from "./defineAction";
import { __resetLoggerForTests } from "./logger";

vi.mock("./revalidateTags", () => ({
  revalidateTags: vi.fn(async () => {}),
}));

describe("middleware hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    __resetActionContextForTests();
    __resetLoggerForTests();
    setActionContext(async () => ({ userId: "u-1" }));
  });

  it("calls beforeAction with parsed input and resolved context", async () => {
    const beforeAction = vi.fn();

    const action = defineAction({
      input: z.object({ name: z.string() }),
      beforeAction,
      handler: async ({ input }) => ({ id: input.name }),
    });

    await action({ name: "Alex" });

    expect(beforeAction).toHaveBeenCalledOnce();
    expect(beforeAction).toHaveBeenCalledWith({
      input: { name: "Alex" },
      ctx: { userId: "u-1" },
    });
  });

  it("isolates beforeAction input mutations from handler input", async () => {
    const action = defineAction({
      input: z.object({
        profile: z.object({
          name: z.string(),
        }),
      }),
      beforeAction: ({ input }) => {
        input.profile.name = "Mutated by middleware";
      },
      handler: async ({ input }) => ({
        observedName: input.profile.name,
      }),
    });

    const result = await action({
      profile: { name: "Alex" },
    });

    expect(result).toEqual({
      observedName: "Alex",
    });
  });

  it("aborts execution when beforeAction throws", async () => {
    const handler = vi.fn(async () => ({ id: "1" }));

    const action = defineAction({
      input: z.object({ name: z.string() }),
      beforeAction: () => {
        throw new Error("Unauthorized");
      },
      handler,
    });

    await expect(action({ name: "Alex" })).rejects.toThrow("Unauthorized");
    expect(handler).not.toHaveBeenCalled();
  });

  it("runs beforeAction after context resolution", async () => {
    const callOrder: string[] = [];

    __resetActionContextForTests();
    setActionContext(async () => {
      callOrder.push("context");
      return { userId: "u-1" };
    });

    const action = defineAction({
      input: z.object({ name: z.string() }),
      beforeAction: () => {
        callOrder.push("beforeAction");
      },
      handler: async () => {
        callOrder.push("handler");
        return { ok: true };
      },
    });

    await action({ name: "test" });

    expect(callOrder).toEqual(["context", "beforeAction", "handler"]);
  });

  it("calls afterAction with input, context, and result", async () => {
    const afterAction = vi.fn();

    const action = defineAction({
      input: z.object({ name: z.string() }),
      afterAction,
      handler: async ({ input }) => ({ id: input.name }),
    });

    await action({ name: "Alex" });

    expect(afterAction).toHaveBeenCalledOnce();
    expect(afterAction).toHaveBeenCalledWith({
      input: { name: "Alex" },
      ctx: { userId: "u-1" },
      result: { id: "Alex" },
    });
  });

  it("passes through when afterAction returns void", async () => {
    const action = defineAction({
      input: z.object({ name: z.string() }),
      afterAction: () => {
        // void return
      },
      handler: async ({ input }) => ({ id: input.name }),
    });

    const result = await action({ name: "Alex" });
    expect(result).toEqual({ id: "Alex" });
  });

  it("allows afterAction to modify the result", async () => {
    const action = defineAction({
      input: z.object({ name: z.string() }),
      afterAction: ({ result }: { result: { id: string; modified: boolean } }) => ({
        ...result,
        modified: true,
      }),
      handler: async ({ input }) => ({
        id: input.name,
        modified: false,
      }),
    });

    const result = await action({ name: "Alex" });
    expect(result).toEqual({ id: "Alex", modified: true });
  });

  it("validates afterAction modified result through output schema", async () => {
    const action = defineAction({
      input: z.object({ name: z.string() }),
      output: z.object({ id: z.string(), count: z.number() }),
      afterAction: () =>
        ({ id: "ok" }) as unknown as { id: string; count: number },
      handler: async ({ input }) => ({ id: input.name, count: 1 }),
    });

    await expect(action({ name: "Alex" })).rejects.toMatchObject({
      name: "ZodError",
    });
  });

  it("runs beforeAction and afterAction in correct order", async () => {
    const callOrder: string[] = [];

    const action = defineAction({
      input: z.object({ name: z.string() }),
      beforeAction: () => {
        callOrder.push("before");
      },
      afterAction: () => {
        callOrder.push("after");
      },
      handler: async () => {
        callOrder.push("handler");
        return { ok: true };
      },
    });

    await action({ name: "test" });

    expect(callOrder).toEqual(["before", "handler", "after"]);
  });

  it("propagates errors from beforeAction", async () => {
    const action = defineAction({
      input: z.object({ name: z.string() }),
      beforeAction: async () => {
        throw new Error("before failed");
      },
      handler: async () => ({ ok: true }),
    });

    await expect(action({ name: "test" })).rejects.toThrow("before failed");
  });

  it("propagates errors from afterAction", async () => {
    const action = defineAction({
      input: z.object({ name: z.string() }),
      afterAction: () => {
        throw new Error("after failed");
      },
      handler: async () => ({ ok: true }),
    });

    await expect(action({ name: "test" })).rejects.toThrow("after failed");
  });
});
