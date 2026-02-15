# Next.js Example

This example demonstrates the ZapAction MVP flow:

- Define actions with `defineAction`
- Execute writes with `useActionMutation`
- Read with `useActionQuery` (read-only policy)
- Keep cache coherence with shared tag `users`

Warning:

- This example stores users in module memory for demonstration only.
- It is not a production persistence strategy for serverless environments.

## Run

```bash
pnpm install
pnpm --filter @zapaction/example-next-app dev
```
