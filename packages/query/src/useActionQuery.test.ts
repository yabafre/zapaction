import { describe, expect, it, vi } from "vitest";

import { useActionQuery } from "./useActionQuery";

const useQueryMock = vi.fn((options: unknown) => ({ data: options }));

vi.mock("@tanstack/react-query", () => ({
  useQuery: (options: unknown) => useQueryMock(options),
}));

describe("useActionQuery", () => {
  it("throws when read policy is missing", () => {
    const readAction = (async (_input: {}) => []) as (input: {}) => Promise<unknown[]>;

    expect(() =>
      useActionQuery(readAction, {
        input: {},
        queryKey: ["users"],
      } as any),
    ).toThrow("readPolicy='read-only'");
  });

  it("executes query when read policy is set", () => {
    const readAction = (async (_input: {}) => []) as (input: {}) => Promise<unknown[]>;

    useActionQuery(readAction, {
      input: {},
      queryKey: ["users"],
      readPolicy: "read-only",
    });

    expect(useQueryMock).toHaveBeenCalledTimes(1);
  });

  it("defaults TError to Error so consumers can read error.message without narrowing", () => {
    const readAction = (async (_input: {}) => []) as (input: {}) => Promise<unknown[]>;

    const result = useActionQuery(readAction, {
      input: {},
      queryKey: ["users"],
      readPolicy: "read-only",
    });

    // No explicit TError generic. With `TError = Error` default `.message`
    // typechecks. Under the old `unknown` default this access fails (TS2339).
    const message: string | undefined = result.error?.message;

    expect(message).toBeUndefined();
  });
});
