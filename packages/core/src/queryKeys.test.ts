import { describe, expect, it } from "vitest";

import { createFeatureKeys, createFeatureTags, createQueryKeys } from "./queryKeys";

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

describe("createFeatureKeys", () => {
  it("prefixes all keys with the feature name", () => {
    const keys = createFeatureKeys("products", {
      list: () => [],
      detail: (id: string) => [id],
      filtered: (filters: { status: "draft" | "published" }) => [filters],
    });

    expect(keys.list()).toEqual(["products"]);
    expect(keys.detail("42")).toEqual(["products", "42"]);
    expect(keys.filtered({ status: "published" })).toEqual([
      "products",
      { status: "published" },
    ]);
  });

  it("throws for empty feature names", () => {
    expect(() =>
      createFeatureKeys("  ", {
        list: () => [],
      }),
    ).toThrow("Feature name must be a non-empty string");
  });

  it("throws when feature key segment is not serializable", () => {
    const keys = createFeatureKeys("products", {
      broken: () => [() => "nope"],
    });

    expect(() => keys.broken()).toThrow("must be JSON-serializable");
  });
});

describe("createFeatureTags", () => {
  it("generates deterministic tags with all/list/detail semantics", () => {
    const tags = createFeatureTags("products", {
      list: () => [],
      detail: (id: string) => [id],
      byFilter: (filters: { status: "draft" | "published" }) => [filters],
    });

    expect(tags.all()).toBe("products");
    expect(tags.list()).toBe("products");
    expect(tags.detail("42")).toBe("products:42");
    expect(tags.byFilter({ status: "draft" })).toBe('products:{"status":"draft"}');
  });

  it("throws for invalid feature names", () => {
    expect(() =>
      createFeatureTags("", {
        list: () => [],
      }),
    ).toThrow("Feature name must be a non-empty string");
  });

  it("throws when feature tag segment is not serializable", () => {
    const tags = createFeatureTags("products", {
      broken: () => [() => "nope"],
    });

    expect(() => tags.broken()).toThrow("must be JSON-serializable");
  });
});
