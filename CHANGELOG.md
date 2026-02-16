# Changelog

All notable changes to this project will be documented in this file.

## [0.2.2] - 2026-02-16

### Fixed
- Extracted duplicated `assertServer` helper into shared module in `@zapaction/core`.
- Dynamic version display in documentation footer (no longer hardcoded).
- Added `components` and `middleware.ts` to docs `tsconfig.json` include paths.
- Updated package READMEs to list all public exports.
- Fixed escaped newlines in release preparation script console output.
- Updated docs visual system to a neutral Vercel-style layout (header, footer, code blocks, dynamic TOC).

### Added
- GitHub Actions CI workflow for automated build, typecheck, and test on PRs and pushes.
- Interactive docs demos for live query state and test-result previews.

## [0.2.0] - 2026-02-15

### Added
- `configureLogger` API in `@zapaction/core` for structured, phase-aware action logging.
- `ActionErrorBoundary` and `useActionErrorReset` in `@zapaction/react` for declarative error handling.
- `createFeatureTags` in `@zapaction/core` for feature-scoped cache tag generation.
- `name` option in `defineAction` for identifying actions in logs.
- Nextra 4 documentation site with English and French (i18n) support.
- Comprehensive API reference, architecture guide, and example pages in docs.

### Changed
- `useActionMutation` now supports `invalidateWithTags` option for custom tag-based invalidation.
- Improved input cloning for middleware with `structuredClone` fallback.

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
