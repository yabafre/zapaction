# ZapAction - Context7

## What is ZapAction

ZapAction keeps Next.js Server Actions and React Query in sync with tag-driven cache invalidation.

It provides:
- `defineAction` with Zod validation
- feature-first key/tag helpers
- React Query integration
- migration-friendly patterns

Works with:
- Next.js App Router
- React 18/19
- TanStack Query v5
- npm, pnpm, yarn, bun

## Core Concepts

### Feature-first architecture

```txt
features/
  products/
    _actions/
    _queries/
    _hooks/
    _components/
```

Flow:

```txt
RSC -> Client Component -> Feature Hook -> useActionQuery/useActionMutation -> Server Action
```

### Feature keys

```ts
const productKeys = createFeatureKeys("products", {
  list: () => [],
  detail: (id: string) => [id],
});
```

Output:
- `["products"]`
- `["products", id]`

### Feature tags

```ts
const productTags = createFeatureTags("products", {
  list: () => [],
  detail: (id: string) => [id],
});
```

### Example flow

```ts
export const createProduct = defineAction({
  input: schema,
  output: outputSchema,
  tags: ["products"],
  handler: async ({ input }) => db.product.create({ data: input }),
});
```

```ts
const mutation = useActionMutation(createProduct);
```

## Installation

### npm

```bash
npm install @zapaction/core @zapaction/query @zapaction/react zod
```

### pnpm

```bash
pnpm add @zapaction/core @zapaction/query @zapaction/react zod
```

### yarn

```bash
yarn add @zapaction/core @zapaction/query @zapaction/react zod
```

### bun

```bash
bun add @zapaction/core @zapaction/query @zapaction/react zod
```

## Docs map

- Getting Started
- Guide -> Project Setup, Feature Structure, Query Keys, Cache Tags
- Examples -> Basic CRUD, Feature Module (products)
- API Reference -> defineAction, useActionQuery, useActionMutation, Cache Tags
- Migration -> From ZSA, From next-safe-action

## i18n routing

- Dynamic locale routes: `/en/*` and `/fr/*`
- Root path redirects to default locale
- Locale paths are rewritten to shared canonical docs pages

## When to use ZapAction

Use ZapAction if you:
- already use Next.js Server Actions
- use TanStack Query on the client
- want predictable invalidation without hand-written cache glue
- prefer feature-first architecture over global utility sprawl
