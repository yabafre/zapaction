# @zapaction/react

React hook primitives for ZapAction.

## Exports

- `useAction`

## Usage

```tsx
const { execute, status, data, error } = useAction(createUser)
```

`useAction` tracks state transitions:

- `idle`
- `pending`
- `success`
- `error`

For TanStack Query integration, use `@zapaction/query`.
