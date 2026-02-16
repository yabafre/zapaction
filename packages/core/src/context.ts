import { assertServer } from "./assertServer";

type ActionContextFactory = () => unknown | Promise<unknown>;

let contextFactory: ActionContextFactory | undefined;

export function setActionContext<TContext>(
  factory: () => Promise<TContext> | TContext,
): void {
  assertServer("setActionContext");
  contextFactory = factory as ActionContextFactory;
}

export async function resolveActionContext<TContext>(): Promise<TContext> {
  assertServer("resolveActionContext");

  if (!contextFactory) {
    throw new Error(
      "Action context factory is not configured. Call setActionContext() during server bootstrap.",
    );
  }

  return (await contextFactory()) as TContext;
}

export function __resetActionContextForTests(): void {
  contextFactory = undefined;
}
