# Smoke Test

## Scenario 1: Role guard works

1. Start the app.
2. Keep default role `viewer`.
3. Try `Set admin` or `Delete` on any user.

Expected:

- Buttons are disabled for `viewer` role.
- No mutation runs.

## Scenario 2: Role switch updates context

1. Click `Switch to admin`.
2. Verify role label becomes `admin`.
3. Try `Set admin/viewer` and `Delete` on users.

Expected:

- `setViewerRole` action updates the cookie-backed session.
- Viewer and users queries are refreshed.

## Scenario 3: Unified cache tags

1. Create a user from the form.
2. Verify the list updates without manual query invalidation code.

Expected:

- Mutation actions (`create`, `updateRole`, `delete`) carry `tags: ["users"]`.
- Client query invalidation is resolved via `setTagRegistry`.
- User list refreshes after each successful mutation.
