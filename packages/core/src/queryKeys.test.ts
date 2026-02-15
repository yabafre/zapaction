import { describe, expect, it } from "vitest";

import { createQueryKeys } from "./queryKeys";

describe("createQueryKeys", () => {
  it("returns deterministic tuple keys", () => {
    const keys = createQueryKeys({
      all: () => ["users"] as const,
      byId: (id: string) => ["users", id] as const,
    });

    expect(keys.all()).toEqual(["users"]);
    expect(keys.byId("42")).toEqual(["users", "42"]);
  });

  it("throws when query key is not serializable", () => {
    const keys = createQueryKeys({
      broken: () => ["users", () => "nope"],
    });

    expect(() => keys.broken()).toThrow("must be JSON-serializable");
  });
});
