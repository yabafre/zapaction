import { beforeEach, describe, expect, it } from "vitest";

import { __resetActionContextForTests, resolveActionContext, setActionContext } from "./context";

describe("setActionContext", () => {
  beforeEach(() => {
    __resetActionContextForTests();
  });

  it("uses last registration", async () => {
    setActionContext(() => ({ tenantId: "first" }));
    setActionContext(() => ({ tenantId: "second" }));

    await expect(resolveActionContext<{ tenantId: string }>()).resolves.toEqual({
      tenantId: "second",
    });
  });

  it("throws when context is not configured", async () => {
    await expect(resolveActionContext()).rejects.toThrow(
      "Action context factory is not configured",
    );
  });
});
