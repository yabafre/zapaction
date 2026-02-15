import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

import type { DefinedAction } from "@zapaction/core";

export type UseActionQueryOptions<TInput, TOutput, TError, TData> = Omit<
  UseQueryOptions<TOutput, TError, TData, QueryKey>,
  "queryKey" | "queryFn"
> & {
  input: TInput;
  queryKey: QueryKey;
  readPolicy: "read-only";
};

export function useActionQuery<
  TInput,
  TOutput,
  TError = unknown,
  TData = TOutput,
>(
  action: DefinedAction<TInput, TOutput>,
  options: UseActionQueryOptions<TInput, TOutput, TError, TData>,
): UseQueryResult<TData, TError> {
  const { input, queryKey, readPolicy, ...queryOptions } = options;

  if (readPolicy !== "read-only") {
    throw new Error("useActionQuery requires readPolicy='read-only'.");
  }

  return useQuery<TOutput, TError, TData, QueryKey>({
    ...queryOptions,
    queryKey,
    queryFn: async () => action(input),
  });
}
