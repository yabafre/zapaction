import { beforeEach, describe, expect, it, vi } from "vitest";

import { setTagRegistry } from "./tagRegistry";
import { useActionMutation } from "./useActionMutation";

const invalidateQueries = vi.fn(async () => {});

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    invalidateQueries,
  }),
  useMutation: (options: {
    mutationFn: (input: unknown) => Promise<unknown>;
    onSuccess?: (
      data: unknown,
      variables: unknown,
      onMutateResult: unknown,
      context: unknown,
    ) => Promise<void> | void;
  }) => ({
    mutateAsync: async (input: unknown) => {
      const data = await options.mutationFn(input);
      if (options.onSuccess) {
        await options.onSuccess(data, input, undefined, undefined);
      }
      return data;
    },
  }),
}));

describe("useActionMutation", () => {
  beforeEach(() => {
    invalidateQueries.mockClear();
    setTagRegistry({});
  });

  it("invalidates mapped query keys using action.tags", async () => {
    const usersKey = ["users"] as const;

    setTagRegistry({
      users: [usersKey],
    });

    const action = Object.assign(async (input: { name: string }) => ({ id: input.name }), {
      tags: ["users"] as const,
    });

    const mutation = useActionMutation(action);
    await mutation.mutateAsync({ name: "alex" });

    expect(invalidateQueries).toHaveBeenCalledTimes(1);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: usersKey });
  });

  it("does not invalidate when action has no tags", async () => {
    const action = async (input: { name: string }) => ({ id: input.name });

    const mutation = useActionMutation(action);
    await mutation.mutateAsync({ name: "alex" });

    expect(invalidateQueries).not.toHaveBeenCalled();
  });
});
