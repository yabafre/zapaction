import { beforeEach, describe, expect, it, vi } from "vitest";

let stateMap: Map<number, unknown>;
let stateIndex: number;

vi.mock("react", () => ({
  useState: (initial: unknown) => {
    const idx = stateIndex++;
    if (!stateMap.has(idx)) {
      stateMap.set(idx, initial);
    }
    return [stateMap.get(idx), (next: unknown) => stateMap.set(idx, next)];
  },
  useCallback: (fn: Function) => fn,
}));

import { useAction } from "./useAction";

describe("useAction", () => {
  beforeEach(() => {
    stateIndex = 0;
    stateMap = new Map();
  });

  function snapshot() {
    stateIndex = 0;
    return useAction(dummyAction);
  }

  const dummyAction = async (_input: string) => "result";

  it("returns idle initial state", () => {
    const result = useAction(async (_: string) => "ok");

    expect(result.status).toBe("idle");
    expect(result.data).toBeUndefined();
    expect(result.error).toBeUndefined();
    expect(result.isIdle).toBe(true);
    expect(result.isPending).toBe(false);
    expect(result.isSuccess).toBe(false);
    expect(result.isError).toBe(false);
  });

  it("sets pending during execution", async () => {
    const action = async (_: string) => new Promise<string>(() => {});
    stateIndex = 0;
    const { execute } = useAction(action);

    execute("test");

    stateIndex = 0;
    const result = useAction(action);

    expect(result.status).toBe("pending");
    expect(result.isPending).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("sets success after resolve", async () => {
    const action = async (_: string) => "hello";
    stateIndex = 0;
    const { execute } = useAction(action);

    await execute("input");

    const result = snapshot();

    expect(result.status).toBe("success");
    expect(result.isSuccess).toBe(true);
    expect(result.data).toBe("hello");
  });

  it("sets error after reject", async () => {
    const err = new Error("fail");
    const action = async (_: string): Promise<string> => {
      throw err;
    };
    stateIndex = 0;
    const { execute } = useAction(action);

    try {
      await execute("input");
    } catch {
      // expected
    }

    const result = snapshot();

    expect(result.status).toBe("error");
    expect(result.isError).toBe(true);
    expect(result.error).toBe(err);
  });

  it("reset clears state", async () => {
    const action = async (_: string) => "value";
    stateIndex = 0;
    const { execute } = useAction(action);

    await execute("input");

    const afterSuccess = snapshot();
    expect(afterSuccess.status).toBe("success");

    afterSuccess.reset();

    const afterReset = snapshot();
    expect(afterReset.status).toBe("idle");
    expect(afterReset.data).toBeUndefined();
    expect(afterReset.error).toBeUndefined();
    expect(afterReset.isIdle).toBe(true);
  });

  it("re-throws errors", async () => {
    const err = new Error("boom");
    const action = async (_: string): Promise<string> => {
      throw err;
    };
    stateIndex = 0;
    const { execute } = useAction(action);

    await expect(execute("input")).rejects.toThrow("boom");
  });

  it("returns the result from execute", async () => {
    const action = async (_: string) => 42;
    stateIndex = 0;
    const { execute } = useAction(action);

    const result = await execute("input");

    expect(result).toBe(42);
  });

  it("passes input to the action", async () => {
    const action = vi.fn(async (input: string) => input.toUpperCase());
    stateIndex = 0;
    const { execute } = useAction(action);

    await execute("hello");

    expect(action).toHaveBeenCalledWith("hello");
  });
});
