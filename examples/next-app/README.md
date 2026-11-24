# Next.js 16 Real-World Example

This workspace is a real Next.js 16 App Router (Turbopack) application that demonstrates ZapAction end-to-end:

- `@zapaction/core` for typed server actions (`defineAction`, `setActionContext`, `configureLogger`)
- `beforeAction` middleware validation guards
- `tags` + `revalidation: { mode: "update" }` for Next.js 16 immediate (`updateTag`) server-side cache invalidation
- `@zapaction/query` (`useActionQuery` + `useActionMutation` + `setTagRegistry`) for client cache sync
- `@zapaction/react` (`ActionErrorBoundary` + `useActionErrorReset`) for UI error handling

## What the app does

- Exposes typed CRUD todo actions (`listTodos`, `createTodo`, `toggleTodo`, `deleteTodo`) on an in-memory store
- Validates inputs and outputs at runtime with Zod v4
- Uses shared `todos` cache tags so mutations automatically refresh server cache (`updateTag`) and client TanStack Query cache

## Run

```bash
pnpm install
pnpm --filter @zapaction/example-next-app dev
```

Open <http://localhost:3000>.

## File map

- `app/actions.ts`: server actions, `beforeAction` guards, context, schemas, and Next.js 16 `revalidation` options
- `app/providers.tsx`: `QueryClientProvider` + `setTagRegistry`
- `app/query-keys.ts`: typed query key factory
- `components/todo-panel.tsx`: client flow (`useActionQuery`, `useActionMutation`, `ActionErrorBoundary`)
