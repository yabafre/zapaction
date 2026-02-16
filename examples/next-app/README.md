# Next.js Real-World Example

This workspace is a real Next.js App Router application that demonstrates ZapAction in end-to-end flow:

- `@zapaction/core` for typed server actions
- `beforeAction` middleware guards using request context
- `tags` for server-side cache revalidation
- `@zapaction/query` (`useActionQuery` + `useActionMutation`) for client cache sync
- `@zapaction/react` (`useAction` + `ActionErrorBoundary`) for imperative actions and UI safety

## What the app does

- Reads a viewer role (`viewer`/`admin`) from a cookie via `next/headers`
- Exposes CRUD actions on an in-memory users store
- Restricts role updates and delete operations to `admin`
- Uses shared tag invalidation so mutations refresh the users query automatically

## Run

```bash
pnpm install
pnpm --filter @zapaction/example-next-app dev
```

Open <http://localhost:3000>.

## File map

- `app/actions.ts`: server actions, middleware, context, schemas
- `app/providers.tsx`: `QueryClientProvider` + tag registry
- `components/users-panel.tsx`: full client flow (query, mutation, useAction, error boundary)
