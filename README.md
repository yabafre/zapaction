# ZapAction

Type-safe Server Actions with React and React Query for Next.js 15+.

## Compatibility

- Next.js `>= 15` (App Router + Server Actions required)
- React `>= 18.3`
- TanStack Query `>= 5`

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
