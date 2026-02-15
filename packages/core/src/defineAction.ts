import type { ZodType } from "zod";

import { resolveActionContext } from "./context";
import { revalidateTags } from "./revalidateTags";

export type DefinedAction<TInput, TOutput> = {
  (input: TInput): Promise<TOutput>;
  tags?: readonly string[];
};

export type ActionResult<TOutput> = Promise<TOutput>;

export type DefineActionOptions<TInput, TOutput, TContext> = {
  input: ZodType<TInput>;
  output?: ZodType<TOutput>;
  tags?: readonly string[];
  handler: (args: {
    input: TInput;
    ctx: TContext;
  }) => Promise<TOutput>;
};

export function defineAction<TInput, TOutput, TContext = unknown>(
  options: DefineActionOptions<TInput, TOutput, TContext>,
): DefinedAction<TInput, TOutput> {
  const { input, output, tags, handler } = options;

  const action = async (rawInput: TInput): Promise<TOutput> => {
    const parsedInput = input.parse(rawInput);
    const ctx = await resolveActionContext<TContext>();
    const result = await handler({ input: parsedInput, ctx });

    if (output) {
      output.parse(result);
    }

    if (tags && tags.length > 0) {
      await revalidateTags(tags);
    }

    return result;
  };

  if (tags && tags.length > 0) {
    const frozenTags = Object.freeze([...tags]);
    Object.defineProperty(action, "tags", {
      value: frozenTags,
      writable: false,
      enumerable: true,
      configurable: false,
    });
  }

  return action as DefinedAction<TInput, TOutput>;
}
