import { describe, expect, it } from "vitest";

import { getTagRegistry, setTagRegistry } from "./tagRegistry";

describe("setTagRegistry", () => {
  it("uses last registration", () => {
    setTagRegistry({ users: [["users-old"]] });
    setTagRegistry({ users: [["users-new"]] });

    expect(getTagRegistry().users).toEqual([["users-new"]]);
  });

  it("throws for invalid shape in dev", () => {
    expect(() =>
      setTagRegistry({
        users: ["invalid" as unknown as readonly unknown[]],
      }),
    ).toThrow("contains an invalid query key");
  });
});
