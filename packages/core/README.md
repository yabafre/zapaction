# @zapaction/core

Core contracts for ZapAction.

## Install

```bash
npm install @zapaction/core zod
# or pnpm/yarn/bun
```

## Exports

- `defineAction`
- `setActionContext`
- `createQueryKeys`
- `createFeatureKeys`
- `createFeatureTags`
- `revalidateTags`
- `configureLogger`

## Feature-first helpers

```ts
const todoKeys = createFeatureKeys("todos", {
  list: () => [],
  detail: (id: string) => [id],
});

const todoTags = createFeatureTags("todos", {
  list: () => [],
  detail: (id: string) => [id],
});
```

## Logging

```ts
configureLogger({
  enabled: true,
  level: "info",
  onLog: (event) => console.log(event),
});
```

## Notes

- `defineAction` returns a standard async function.
- Errors are passthrough.
- `setActionContext` must run in a server-only bootstrap.
- `createQueryKeys` remains available as the low-level API.
