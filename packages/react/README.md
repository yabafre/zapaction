# @zapaction/react

React hook primitives for ZapAction.

## Install

```bash
npm install @zapaction/react react
# or pnpm/yarn/bun
```

## Exports

- `useAction`
- `ActionErrorBoundary`
- `useActionErrorReset`

## Usage

```tsx
const { execute, status, data, error, reset } = useAction(createTodo);
```

### Error Boundary

```tsx
<ActionErrorBoundary
  fallback={({ error, reset }) => (
    <div>
      <p>Something went wrong: {String(error)}</p>
      <button onClick={reset}>Retry</button>
    </div>
  )}
>
  <MyComponent />
</ActionErrorBoundary>
```

For cache-aware query/mutation flows, use `@zapaction/query`.
