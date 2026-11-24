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
- `updateTags`
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

## Next.js 15 & 16 Cache Revalidation

`defineAction` automatically revalidates `tags` after a successful execution:

```ts
export const createTodo = defineAction({
  input: z.object({ title: z.string().min(1) }),
  tags: ["todos"],
  // Next.js 16 read-your-own-writes via updateTag (falls back to revalidateTag on Next.js 15)
  revalidation: { mode: "update" },
  handler: async ({ input }) => db.todo.create({ data: input }),
});
```

- Default (`mode: "revalidate"`): calls `revalidateTag(tag, profile)` with `profile: "max"` by default on Next.js 16 (or a custom cacheLife profile / `{ expire }`), and falls back to `revalidateTag(tag)` on Next.js 15.
- Immediate (`mode: "update"` or `updateTags(tags)`): calls `updateTag(tag)` in Next.js 16 Server Actions (falls back to `revalidateTag(tag)` on Next.js 15).

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
