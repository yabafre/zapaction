# @zapaction/core

Core contracts for ZapAction.

## Exports

- `defineAction`
- `setActionContext`
- `createQueryKeys`
- `revalidateTags`

## API

```ts
type DefinedAction<TInput, TOutput> = {
  (input: TInput): Promise<TOutput>
  tags?: readonly string[]
}

type DefineActionOptions<TInput, TOutput, TContext> = {
  input: ZodType<TInput>
  output?: ZodType<TOutput>
  tags?: readonly string[]
  handler: (args: { input: TInput; ctx: TContext }) => Promise<TOutput>
}

declare function defineAction<TInput, TOutput, TContext = unknown>(
  options: DefineActionOptions<TInput, TOutput, TContext>
): DefinedAction<TInput, TOutput>

declare function setActionContext<TContext>(
  factory: () => Promise<TContext> | TContext
): void
```

## Notes

- `defineAction` returns a standard async function compatible with Next.js Server Actions.
- Errors are passthrough only (no result envelope).
- `setActionContext` must be configured in a server-only bootstrap module.

## Migration Note

Future versions can add APIs, but changing `defineAction` signature is a breaking change.
