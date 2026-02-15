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

## Feature-first helpers

```ts
const productsKeys = createFeatureKeys("products", {
  list: () => [],
  detail: (id: string) => [id],
});

const productsTags = createFeatureTags("products", {
  list: () => [],
  detail: (id: string) => [id],
});
```

## Notes

- `defineAction` returns a standard async function.
- Errors are passthrough.
- `setActionContext` must run in a server-only bootstrap.
- `createQueryKeys` remains available as the low-level API.
