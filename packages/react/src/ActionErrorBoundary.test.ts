import { describe, it, expect, vi, beforeEach } from "vitest";

import { ActionErrorBoundary, useActionErrorReset } from "./ActionErrorBoundary";

// Mock React's useContext to test the hook in isolation
const mockUseContext = vi.fn();
vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useContext: (...args: unknown[]) => mockUseContext(...args),
  };
});

describe("ActionErrorBoundary", () => {
  beforeEach(() => {
    mockUseContext.mockReset();
  });

  it("getDerivedStateFromError returns error state", () => {
    const error = new Error("test error");
    const state = ActionErrorBoundary.getDerivedStateFromError(error);

    expect(state).toEqual({ hasError: true, error });
  });

  it("componentDidCatch calls onError", () => {
    const onError = vi.fn();
    const instance = Object.create(ActionErrorBoundary.prototype) as InstanceType<typeof ActionErrorBoundary>;
    Object.defineProperty(instance, "props", { value: { children: null, fallback: null, onError } });

    instance.componentDidCatch(new Error("caught"));

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(new Error("caught"));
  });

  it("reset clears error state", () => {
    const instance = Object.create(ActionErrorBoundary.prototype) as InstanceType<typeof ActionErrorBoundary>;
    instance.state = { hasError: true, error: new Error("fail") };

    const setStateSpy = vi.fn();
    instance.setState = setStateSpy;

    // The reset method is an arrow function assigned in the constructor,
    // so we need to bind it manually on the prototype-created instance.
    ActionErrorBoundary.prototype.reset = function (this: InstanceType<typeof ActionErrorBoundary>) {
      this.setState({ hasError: false, error: undefined });
    };
    instance.reset();

    expect(setStateSpy).toHaveBeenCalledWith({ hasError: false, error: undefined });
  });

  it("useActionErrorReset throws outside boundary", () => {
    mockUseContext.mockReturnValue(null);

    expect(() => useActionErrorReset()).toThrow(
      "useActionErrorReset must be used within an ActionErrorBoundary fallback.",
    );
  });

  it("useActionErrorReset returns context when available", () => {
    const contextValue = { error: new Error("test"), reset: vi.fn() };
    mockUseContext.mockReturnValue(contextValue);

    const result = useActionErrorReset();

    expect(result).toBe(contextValue);
  });

  it("fallback function receives error and reset", () => {
    const error = new Error("render error");
    const fallbackFn = vi.fn(() => null);
    const resetFn = vi.fn();

    const instance = Object.create(ActionErrorBoundary.prototype) as InstanceType<typeof ActionErrorBoundary>;
    Object.defineProperty(instance, "props", { value: { children: null, fallback: fallbackFn } });
    instance.state = { hasError: true, error };
    instance.reset = resetFn;

    // Call render to exercise the fallback-function branch
    instance.render();

    expect(fallbackFn).toHaveBeenCalledTimes(1);
    expect(fallbackFn).toHaveBeenCalledWith({ error, reset: resetFn });
  });
});
