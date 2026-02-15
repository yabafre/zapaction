# ZapAction

Type-safe Server Actions with React and React Query for Next.js 15+.

## Compatibility

- Next.js `>= 15` (App Router + Server Actions required)
- React `>= 18.3`
- TanStack Query `>= 5`
- Zod `>= 4`

## Install

```bash
pnpm add @zapaction/core @zapaction/react @zapaction/query zod
```

## MVP Public APIs

### `@zapaction/core`

- `defineAction`
- `setActionContext`
- `createQueryKeys`
- `revalidateTags`

### `@zapaction/react`

- `useAction`

### `@zapaction/query`

- `useActionQuery`
- `useActionMutation`
- `setTagRegistry`
- `invalidateTags`

## Non-goals (v0.1)

- No optimistic updates
- No retry/timeouts policy layer
- No FormData helpers
- No RBAC middleware layer
- No OpenAPI/codegen module

## Quick Start

```ts
import { defineAction, setActionContext } from "@zapaction/core";
import { z } from "zod";

setActionContext(() => ({ tenantId: "demo" }));

export const createUser = defineAction({
  input: z.object({ name: z.string().min(1) }),
  output: z.object({ id: z.string(), name: z.string(), tenantId: z.string() }),
  tags: ["users"],
  handler: async ({ input, ctx }) => ({
    id: crypto.randomUUID(),
    name: input.name,
    tenantId: ctx.tenantId,
  }),
});
```

## Monorepo Commands (Turbo)

```bash
pnpm install
pnpm run dev
pnpm run dev:all
pnpm run build
pnpm run typecheck
pnpm run test
```

- `pnpm run dev`: docs only (`@zapaction/docs`)
- `pnpm run dev:all`: all workspace dev tasks

## Docs App

```bash
pnpm turbo run dev --filter=@zapaction/docs
pnpm turbo run build --filter=@zapaction/docs...
```

The docs app uses Next.js App Router + Nextra and resolves local workspace packages under `@zapaction/*`.

## Vercel Deployment (Docs)

- Root Directory: repository root
- Build Command: `pnpm turbo run build --filter=@zapaction/docs...`
- Output Directory: `apps/docs/.next`
