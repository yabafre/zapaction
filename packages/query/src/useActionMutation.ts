import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

import type { DefinedAction } from "@zapaction/core";

import { invalidateTags } from "./invalidateTags";

export type UseActionMutationOptions<
  TInput,
  TOutput,
  TError,
  TContext,
> = Omit<UseMutationOptions<TOutput, TError, TInput, TContext>, "mutationFn"> & {
  invalidateOnSuccess?: boolean;
  invalidateWithTags?: readonly string[];
};

export function useActionMutation<
  TInput,
  TOutput,
  TError = unknown,
  TContext = unknown,
>(
  action: DefinedAction<TInput, TOutput>,
  options: UseActionMutationOptions<TInput, TOutput, TError, TContext> = {},
): UseMutationResult<TOutput, TError, TInput, TContext> {
  const queryClient = useQueryClient();
  const {
    invalidateOnSuccess = true,
    invalidateWithTags,
    onSuccess,
    ...mutationOptions
  } = options;

  return useMutation<TOutput, TError, TInput, TContext>({
    ...mutationOptions,
    mutationFn: async (input: TInput) => action(input),
    onSuccess: async (data, variables, onMutateResult, mutationContext) => {
      const tags = invalidateWithTags ?? action.tags;
      if (invalidateOnSuccess && tags && tags.length > 0) {
        await invalidateTags(queryClient, tags);
      }

      if (onSuccess) {
        await onSuccess(data, variables, onMutateResult, mutationContext);
      }
    },
  });
}
