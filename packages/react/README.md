# @zapaction/react

React hook primitives for ZapAction.

## Install

```bash
npm install @zapaction/react react
# or pnpm/yarn/bun
```

## Exports

- `useAction`

## Usage

```tsx
const { execute, status, data, error } = useAction(createUser);
```

For cache-aware query/mutation flows, use `@zapaction/query`.
