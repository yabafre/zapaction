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
});
