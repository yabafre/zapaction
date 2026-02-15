import { useCallback, useState } from "react";

import type { DefinedAction } from "@zapaction/core";

export type ActionStatus = "idle" | "pending" | "success" | "error";

export type UseActionResult<TInput, TOutput> = {
  execute: (input: TInput) => Promise<TOutput>;
  data: TOutput | undefined;
  error: unknown;
  status: ActionStatus;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  reset: () => void;
};

export function useAction<TInput, TOutput>(
  action: DefinedAction<TInput, TOutput>,
): UseActionResult<TInput, TOutput> {
  const [status, setStatus] = useState<ActionStatus>("idle");
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);

  const execute = useCallback(
    async (input: TInput): Promise<TOutput> => {
      setStatus("pending");
      setError(undefined);

      try {
        const result = await action(input);
        setData(result);
        setStatus("success");
        return result;
      } catch (caught) {
        setError(caught);
        setStatus("error");
        throw caught;
      }
    },
    [action],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setData(undefined);
    setError(undefined);
  }, []);

  return {
    execute,
    data,
    error,
    status,
    isIdle: status === "idle",
    isPending: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    reset,
  };
}
