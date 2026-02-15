# Smoke Test

## Scenario 1: Unified cache tags

1. Start the app.
2. Open the page and note the user list.
3. Create a user using the input + button.
4. Verify the list refreshes after mutation.

Expected:

- Server action revalidates `users` tag.
- Client invalidates mapped query key from `setTagRegistry`.
- UI shows the new user without manual cache wiring.

## Scenario 2: No tags means no invalidation

1. Create a temporary action with no `tags` metadata.
2. Execute via mutation.
3. Inspect query cache behavior.

Expected:

- No server revalidation call.
- No client `invalidateQueries` call.
