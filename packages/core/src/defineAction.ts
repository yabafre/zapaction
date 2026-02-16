import type { ZodType } from "zod";

import { resolveActionContext } from "./context";
import { createActionLogger } from "./logger";
import { revalidateTags } from "./revalidateTags";

function fallbackClone<TInput>(value: TInput): TInput {
  if (Array.isArray(value)) {
    return value.map((item) => fallbackClone(item)) as TInput;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as TInput;
  }

  if (value && typeof value === "object") {
    const clonedEntries = Object.entries(value as Record<string, unknown>).map(
      ([key, entryValue]) => [key, fallbackClone(entryValue)],
    );
    return Object.fromEntries(clonedEntries) as TInput;
  }

  return value;
}

function cloneInputForMiddleware<TInput>(input: TInput): TInput {
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(input);
    } catch {
      // Fall through to a recursive clone fallback.
    }
  }

  return fallbackClone(input);
}

export type DefinedAction<TInput, TOutput> = {
  (input: TInput): Promise<TOutput>;
  tags?: readonly string[];
};

export type ActionResult<TOutput> = Promise<TOutput>;

export type BeforeActionArgs<TInput, TContext> = {
  input: TInput;
  ctx: TContext;
};

export type AfterActionArgs<TInput, TOutput, TContext> = {
  input: TInput;
  ctx: TContext;
  result: TOutput;
};

export type DefineActionOptions<TInput, TOutput, TContext> = {
  input: ZodType<TInput>;
  output?: ZodType<TOutput>;
  tags?: readonly string[];
  name?: string;
  beforeAction?: (args: BeforeActionArgs<TInput, TContext>) => void | Promise<void>;
  afterAction?: (
    args: AfterActionArgs<TInput, TOutput, TContext>,
  ) => TOutput | void | Promise<TOutput | void>;
  handler: (args: {
    input: TInput;
    ctx: TContext;
  }) => Promise<TOutput>;
};

export function defineAction<TInput, TOutput, TContext = unknown>(
  options: DefineActionOptions<TInput, TOutput, TContext>,
): DefinedAction<TInput, TOutput> {
  const { input, output, tags, handler, beforeAction, afterAction, name } = options;

  const action = async (rawInput: TInput): Promise<TOutput> => {
    const logger = createActionLogger(name ?? "anonymous");
    const start = Date.now();

    try {
      logger.log("action_start", "info");

      const parsedInput = input.parse(rawInput);
      const middlewareInput = cloneInputForMiddleware(parsedInput);

      const ctx = await resolveActionContext<TContext>();
      logger.log("context_resolved", "debug");

      if (beforeAction) {
        await beforeAction({ input: middlewareInput, ctx });
        logger.log("before_action", "debug");
      }

      let result = await handler({ input: parsedInput, ctx });
      logger.log("handler_complete", "debug", { duration: Date.now() - start });

      if (afterAction) {
        const modified = await afterAction({ input: middlewareInput, ctx, result });
        if (modified !== undefined) {
          result = modified;
        }
        logger.log("after_action", "debug");
      }

      if (output) {
        output.parse(result);
        logger.log("validation_complete", "debug");
      }

      if (tags && tags.length > 0) {
        await revalidateTags(tags);
        logger.log("revalidation_complete", "debug");
      }

      return result;
    } catch (error) {
      logger.log("action_error", "error", { error, duration: Date.now() - start });
      throw error;
    }
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
