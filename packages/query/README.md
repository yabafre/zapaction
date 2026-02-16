# @zapaction/query

TanStack Query integration for ZapAction actions.

## Install

```bash
npm install @zapaction/query @zapaction/core @tanstack/react-query react
# or pnpm/yarn/bun
```

## Exports

- `useActionQuery`
- `useActionMutation`
- `setTagRegistry`
- `invalidateTags`

## Best Practice

- Keep feature-scoped keys in one place.
- Register tag mappings once during app bootstrap.
- Use `useActionQuery` only for read operations.

```ts
const todoKeys = createFeatureKeys("todos", {
  list: () => [],
});

setTagRegistry({
  todos: [todoKeys.list()],
});
```
