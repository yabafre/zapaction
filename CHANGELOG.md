# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-02-15

### Added
- Monorepo setup with `pnpm` workspaces and strict TypeScript baseline.
- New packages: `@zapaction/core`, `@zapaction/react`, `@zapaction/query`.
- Core APIs: `defineAction`, `setActionContext`, `createQueryKeys`, `revalidateTags`.
- Query APIs: `useActionQuery`, `useActionMutation`, `setTagRegistry`, `invalidateTags`.
- React API: `useAction`.
- Runtime metadata support via `DefinedAction.tags`.
- Tag-based server/client cache synchronization flow.
- Next.js 15+ example app demonstrating end-to-end usage.
- Contract and behavior tests for core and query packages.

### Changed
- Hardened action/runtime behavior for production builds.
- Enforced read-only intent for `useActionQuery` through explicit `readPolicy`.
- Added registry/context bootstrap guidance and policy in docs.

### Fixed
- Server/client boundary issues caused by transitive imports in client bundles.
- Context initialization failure in production action execution path.
- Registry validation, deterministic query key behavior, and invalidation edge cases.
