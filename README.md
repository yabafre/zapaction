# ZapAction

Keep Next.js Server Actions and React Query in sync.

## Compatibility

- Next.js `>= 15` (including Next.js 16)
- React `>= 18.3` (including React 19)
- TanStack Query `>= 5`
- Zod `>= 4`

## Package Managers

ZapAction works with all major package managers.

```bash
npm install @zapaction/core @zapaction/react @zapaction/query zod
# or
pnpm add @zapaction/core @zapaction/react @zapaction/query zod
# or
yarn add @zapaction/core @zapaction/react @zapaction/query zod
# or
bun add @zapaction/core @zapaction/react @zapaction/query zod
```

## 10-line Example

```ts
const todoKeys = createFeatureKeys("todos", {
  list: () => [],
});

const listTodos = defineAction({
  input: z.object({}),
  output: z.array(z.object({ id: z.string(), title: z.string() })),
  tags: ["todos"],
  handler: async () => db.todo.findMany(),
});
```

```tsx
const { data: todos } = useActionQuery(listTodos, {
  input: {},
  queryKey: todoKeys.list(),
  readPolicy: "read-only",
});
```

## Public APIs

### `@zapaction/core`

- `defineAction`
- `setActionContext`
- `createQueryKeys`
- `createFeatureKeys`
- `createFeatureTags`
- `revalidateTags`
- `updateTags`
- `configureLogger`

### `@zapaction/react`

- `useAction`
- `ActionErrorBoundary`
- `useActionErrorReset`

### `@zapaction/query`

- `useActionQuery`
- `useActionMutation`
- `setTagRegistry`
- `invalidateTags`

## Repo vs Library Tooling

- Contributors: this monorepo uses Node.js `>= 22`, `pnpm`, and Turborepo.
- Consumers: the published packages work with npm, pnpm, yarn, and bun (Next.js 15 & 16, React 18.3 & 19).

## Monorepo Commands

```bash
pnpm install
pnpm run dev
pnpm run dev:all
pnpm run build
pnpm run typecheck
pnpm run test
```
