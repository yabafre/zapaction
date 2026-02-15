# @zapaction/query

TanStack Query integration for ZapAction actions.

## Exports

- `useActionQuery`
- `useActionMutation`
- `setTagRegistry`
- `invalidateTags`

## Tag Mapping Contract

Register tags once during bootstrap:

```ts
setTagRegistry({
  users: [usersKeys.all()],
})
```

Mutations can invalidate automatically from `action.tags`:

```ts
const mutation = useActionMutation(createUser)
```

`useActionQuery` requires explicit read intent:

```ts
useActionQuery(listUsers, {
  input: {},
  queryKey: usersKeys.all(),
  readPolicy: "read-only",
})
```

## Best Practice

Use query keys created by `createQueryKeys` from `@zapaction/core` and keep one canonical key factory per domain.
