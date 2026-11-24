# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Next.js 16 cache revalidation support in `@zapaction/core`:
  - `revalidateTags(tags, options)` now supports `mode: "revalidate" | "update"` and custom `profile` (`CacheLifeProfile` string or `{ expire?: number }`) for Next.js 16 `revalidateTag(tag, profile)` and `updateTag(tag)`, while keeping automatic fallback to single-argument `revalidateTag(tag)` on Next.js 15.
  - Added `updateTags(tags)` helper for immediate read-your-own-writes cache expiration inside Next.js 16 Server Actions.
  - Added optional `revalidation?: RevalidateTagsOptions` option to `defineAction`.
- Unit tests in `packages/core/src/revalidateTags.test.ts` covering Next.js 16 (`revalidateTag` profiles, `updateTag`/`updateTags`) and Next.js 15 fallback behavior.

### Changed
- Upgraded monorepo and example dependencies to latest compatible versions:
  - `next` `^16.4.6`, `react` / `react-dom` `^19.3.1`, `@types/react` `^19.3.0`
  - `@tanstack/react-query` `^5.108.4`, `zod` `^4.6.7`
  - `turbo` `^2.11.13`, `tsup` `^9.0.0`, `typescript` `^6.0.3`, `vitest` `^5.1.1`, `vite` `^8.3.8`, `@types/node` `^26.6.6`, `mint` `^4.3.88`
- Removed deprecated `baseUrl` from `tsconfig.base.json` and migrated `paths` to relative `./` entries for TypeScript 6/7 and `tsup@9` compatibility.
- Updated GitHub Actions CI Node.js matrix to `[22, 24]`.
- Updated `examples/next-app` to Next.js 16 with `revalidation: { mode: "update" }` and refreshed EN/FR documentation, READMEs, and `context7.md`.

### Fixed
- Added explicit `ReactNode` return type to `ActionErrorBoundary.render()` in `@zapaction/react` so generated `.d.ts` declarations remain compatible with both React 18.3 and React 19.
- Added explicit ESM (`import.types`) and CJS (`require.types`) conditional `exports` entries across `@zapaction/core`, `@zapaction/react`, and `@zapaction/query`.
- Made `next/cache` feature detection safe under partial Vitest module mocks (`"updateTag" in cache`).
- Deduplicated workspace peer dependencies in `pnpm-lock.yaml` to prevent dual `@tanstack/react-query` instances under Next.js 16 Turbopack builds.

## [0.2.3] - 2026-05-20

### Changed
- `useActionQuery` / `useActionMutation` / `useAction` now default `TError` to `Error` instead of `unknown`. Consumers reading `error.message` no longer need to narrow or pass an explicit generic. Existing code that explicitly specified `TError` is unaffected. (#2)
- `useAction`'s `UseActionResult.error` is now typed as `Error | undefined`. Non-`Error` throws are wrapped via `new Error(String(caught))` so the message is always readable without losing the original value's string representation.

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
