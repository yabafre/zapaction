---
title: 'ZapAction Adoption & Structure Release 0.2.1'
slug: 'zapaction-adoption-structure-release-0-2-1'
created: '2026-02-15T17:37:47Z'
status: 'Completed'
stepsCompleted: [1, 2, 3, 4]
tech_stack:
  - 'TypeScript 5.7.x (strict, moduleResolution Bundler)'
  - 'Next.js App Router 15.5.6 (current repo) + Next.js 16.1.x routing guidance validated via Context7'
  - 'React 19.1.x'
  - 'Nextra 4.6.1 + nextra-theme-docs 4.6.1'
  - 'TanStack React Query v5'
  - 'Zod 4.3.x'
  - 'Turborepo 2.x + pnpm workspaces'
  - 'Vitest 2.x'
files_to_modify:
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/package.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/queryKeys.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/index.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/queryKeys.test.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/README.md'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/package.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/README.md'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/package.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/README.md'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/package.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/README.md'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/scripts/rewrite-workspace-deps.mjs'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/next.config.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/theme.config.tsx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/mdx-components.tsx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/layout.tsx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/_meta.js'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/why-zapaction/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/feature-structure/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/query-keys-pattern/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/cache-tags-pattern/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/client-data-fetching/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/mutations/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/error-handling/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/architecture-guide/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/examples/basic-crud/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/examples/feature-module-products/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/examples/auth-example/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/migration/from-zsa/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/migration/from-next-safe-action/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/advanced/performance/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/advanced/server-vs-client-cache/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/getting-started/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/components/language-switcher.tsx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/components/zapaction-logo.tsx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/lib/i18n.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/en/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/fr/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/fr/getting-started/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/fr/guide/feature-structure/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/project-setup/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/middleware.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/public/logo.svg'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/public/favicon.svg'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/context7.md'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/SKILL.md'
code_patterns:
  - 'Core query keys use factory wrappers with runtime JSON-serializable validation before returning tuples.'
  - 'Action metadata pattern: defineAction attaches immutable action.tags consumed by query hooks for automatic invalidation.'
  - 'Query layer pattern: useActionQuery requires explicit readPolicy read-only; useActionMutation invalidates via tag registry.'
  - 'Tag registry pattern supports static query-key arrays and resolver functions with non-prod validation guards.'
  - 'Docs rendering pattern uses Nextra App Router Layout/Navbar/Footer and pageMap-driven navigation from app/_meta.js.'
  - 'Monorepo source-first pattern relies on tsconfig path aliases and Next transpilePackages for @zapaction/* packages.'
  - 'Docs content is MDX-first with copy-paste examples and minimal custom component layer (mdx-components passthrough).'
test_patterns:
  - 'Vitest unit tests colocated under packages/*/src/*.test.ts.'
  - 'Behavior-first tests cover deterministic tuples, runtime guards, and explicit error messages.'
  - 'Mock-driven tests validate revalidation/invalidation side-effects without network/runtime integration.'
  - 'No dedicated docs E2E suite; docs correctness currently validated by typecheck/build flows.'
---

# Tech-Spec: ZapAction Adoption & Structure Release 0.2.1

**Created:** 2026-02-15T17:37:47Z

## Overview

### Problem Statement

ZapAction works technically, but adoption friction remains high for real-world project usage. Current documentation is API-first and flat, feature-first architecture guidance is not official, FR/EN i18n is missing, and package-manager guidance is pnpm-centric. Core DX helpers for feature-scoped query keys/tags are also missing.

### Solution

Ship an adoption-focused 0.2.1 release with zero breaking changes: add feature-scoped key/tag helpers, remap docs into a guide-first hierarchy, add practical examples and migration guidance, implement lightweight FR/EN docs i18n, and standardize package-manager-agnostic installation and peer dependency policy.

### Scope

**In Scope:**
- Add `createFeatureKeys` and `createFeatureTags` in `@zapaction/core` while keeping `createQueryKeys`.
- Use strict factory pattern for feature keys (serializable, predictable tuples).
- Officialize feature-first structure in docs (`features/<feature>/_actions|_hooks|_queries|_components`).
- Restructure docs IA incrementally (no big-bang rewrite): Introduction, Getting Started, Guide, Examples, API (foundation), Advanced (optional), Migration.
- Add key adoption docs: Architecture Guide, Why ZapAction, Migration from ZSA, and Performance.
- Add package-manager-agnostic install docs (npm/pnpm/yarn/bun) and tabbed snippets.
- Implement soft docs i18n for v0.2.1: keep EN canonical routes, redirect `/` to `/en`, ship targeted FR pages (Home, Getting Started, Feature Structure), and add navbar language switcher.
- Add minimal branding assets (`logo.svg`, `favicon.svg`) and header/badges improvements.
- Add AI-discovery context artifacts at repository root (`context7.md`, optional `SKILL.md`).
- Align release output as npm version `0.2.1`.
- Define publishing rule: no `workspace:*` in published package manifests.

**Out of Scope:**
- Breaking API changes to existing exports.
- Codegen, feature builder, optimistic updates, DevTools (deferred).
- Full translation coverage for all docs pages.
- Complex design system overhaul for docs.

## Context for Development

### Codebase Patterns

- Core key factories are validated wrappers (`createQueryKeys`) that enforce array shape + JSON-serializable values at runtime.
- `defineAction` keeps runtime metadata on action functions (`tags`) and triggers server-side revalidation through `revalidateTags`.
- Query integration is split cleanly:
  - `useActionQuery` enforces `readPolicy: "read-only"` and explicit `queryKey`.
  - `useActionMutation` performs optional invalidation via `action.tags` and `invalidateTags`.
  - tag registry supports both static key arrays and resolver functions with dev-time validation.
- Docs app already runs on Nextra App Router with root `app/layout.tsx`, flat `app/_meta.js`, and MDX content pages.
- Monorepo workflow is source-first in dev:
  - tsconfig path aliases map `@zapaction/*` to `packages/*/src/index.ts`.
  - docs app uses explicit `transpilePackages` for local workspace packages.
- Contributor workflow is pnpm + turbo; user install docs are currently pnpm-only (adoption gap to close).
- No `project-context.md` exists in the repository; conventions were derived directly from source and existing tech specs.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/queryKeys.ts` | Add `createFeatureKeys` and factory-style `createFeatureTags` on top of current validated key-factory pattern |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/queryKeys.test.ts` | Add behavioral tests for new helper tuple output and serializability constraints |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/index.ts` | Export new helper APIs without breaking existing exports |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/defineAction.ts` | Keep compatibility with action metadata tag strategy used by query hooks |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/useActionQuery.ts` | Preserve read-only guard and explicit key requirement in docs and examples |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/useActionMutation.ts` | Preserve mutation invalidation semantics driven by `action.tags` |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/tagRegistry.ts` | Align feature tag helper docs with static/resolver registry contract |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/invalidateTags.ts` | Keep deduped invalidation behavior as performance baseline |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/package.json` | Set minimal peer policy (`zod` required, `next` optional only because `revalidateTag` integration is in core) |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/package.json` | Keep minimal peers (`react`, `@tanstack/react-query`) and remove unnecessary `next` peer |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/package.json` | Keep minimal peer surface (`react`) |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/README.md` | Clarify user package-manager neutrality vs pnpm contributor workflow |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/next.config.ts` | Keep `transpilePackages` explicit and preserve Nextra-compatible routing setup |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/layout.tsx` | Integrate language context/switch and locale-aware root layout concerns |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/_meta.js` | Remap nav hierarchy to introduction/guide/examples/migration structure |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/theme.config.tsx` | Add branding, header links, and optional locale switch controls |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/getting-started/page.mdx` | Replace pnpm-only install with npm/pnpm/yarn/bun tabs |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/page.mdx` | Update hero/value proposition and adoption-first CTA |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/middleware.ts` | Implement default locale redirect from `/` to `/en` and safe locale fallback behavior |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/en/*` | Keep canonical English entry routes explicit for adoption |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/fr/*` | Add limited French rollout routes (Home, Getting Started, Feature Structure) |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/project-setup/page.mdx` | Add recommended project structure page with feature-first tree and call flow |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/public/logo.svg` | Add minimal brand mark |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/public/favicon.svg` | Add favicon aligned with brand mark |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/context7.md` | Add Context7 source-of-truth context for AI agents and code assistants |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/SKILL.md` | Add lightweight skill marker to improve agent routing (optional) |

### Technical Decisions

- Release target is `0.2.1` (adoption-focused, non-breaking).
- Keep `createQueryKeys` as low-level API; add DX sugar APIs `createFeatureKeys` and `createFeatureTags`.
- `createFeatureKeys` uses strict factory shape only (no null sentinel).
- `createFeatureTags` follows the same factory mental model as keys (`list/detail` style), not only `{ all }`.
- Docs migration is incremental remap, not a full rewrite.
- i18n scope for v0.2.1 is intentionally soft: keep EN canonical routes and add only targeted FR pages (Home, Getting Started, Feature Structure).
- Root path `/` redirects to `/en`; supported locales are `en` and `fr`; untranslated routes fall back to EN.
- Context7 validation anchors:
  - Next.js App Router i18n: middleware redirect strategy and locale-aware routing behavior.
  - Next.js package bundling: keep explicit `transpilePackages` for workspace packages (replacement for `next-transpile-modules`).
  - Nextra Tabs usage: use `Tabs` + `Tabs.Tab` in MDX for package-manager switchers.
- Peer dependency policy is minimal by package:
  - `@zapaction/core`: `zod` peer required; `next` optional via `peerDependenciesMeta` due to `revalidateTag` integration.
  - `@zapaction/query`: `react` + `@tanstack/react-query` peers; no required `next` peer.
  - `@zapaction/react`: `react` peer only.
- Release pipeline rewrites internal `workspace:*` ranges only in publish artifacts (temporary packaging workspace), never in source manifests.
- Add root `context7.md` as the AI-facing canonical context and optional `SKILL.md` marker for tool/agent discovery.

## Implementation Plan

### Tasks

- [x] Task 1: Add feature-scoped key helpers in core (non-breaking)
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/queryKeys.ts`
  - Action: Implement `createFeatureKeys(feature, factory)` with strict factory pattern so each key is `[feature, ...segment]`, preserving current `createQueryKeys` behavior.
  - Notes: Reject non-serializable segments using existing validation path; keep return type readonly tuples for React Query compatibility.

- [x] Task 2: Redesign feature tags helper to match key mental model
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/queryKeys.ts`
  - Action: Implement factory-style `createFeatureTags(feature, factory)` so tags can express `list/detail` semantics consistently with keys.
  - Notes: Keep default `all` support and deterministic string generation for registry compatibility.

- [x] Task 3: Export, document, and test helper APIs
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/index.ts`
  - Action: Export `createFeatureKeys` and `createFeatureTags` without removing existing exports.
  - Notes: Backward compatibility is required.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/README.md`
  - Action: Add strict-factory examples and migration notes from legacy key factory usage.
  - Notes: Include feature-first module snippets.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/queryKeys.test.ts`
  - Action: Add deterministic output, serializability, empty-feature, and tag-factory tests.
  - Notes: Unit-level deterministic coverage only.

- [x] Task 4: Align peer dependencies with minimal per-package policy
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/package.json`
  - Action: Keep `zod` peer required; make `next` optional via `peerDependenciesMeta` because `revalidateTag` is used in core.
  - Notes: Do not require `react` in core.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/package.json`
  - Action: Keep peers limited to `react` and `@tanstack/react-query`; remove unnecessary `next` peer.
  - Notes: Avoid install-time noise in non-Next consumers.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/package.json`
  - Action: Keep `react` as the only peer dependency.
  - Notes: Maintain minimal adoption friction.

- [x] Task 5: Add publish-safe workspace dependency rewrite in temporary packaging workspace
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/scripts/rewrite-workspace-deps.mjs`
  - Action: Implement rewrite script that operates on packed/temp publish artifacts, not source manifests.
  - Notes: Preserve repository integrity on failed publishes.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/package.json`
  - Action: Add release script chain (`pack -> temp rewrite -> publish`) and dry-run command.
  - Notes: Keep local dev flow unchanged with `workspace:*`.

- [x] Task 6: Refresh top-level package-manager messaging
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/README.md`
  - Action: Add “Package Managers” section with npm/pnpm/yarn/bun examples and clarify repo-vs-consumer policy.
  - Notes: Keep examples copy-paste ready.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/README.md`
  - Action: Align install snippets and remove pnpm-only tone.
  - Notes: Mention React Query peer requirements.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/README.md`
  - Action: Align install snippets and minimal peer explanation.
  - Notes: Keep concise.

- [x] Task 7: Remap docs navigation to adoption-first hierarchy
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/_meta.js`
  - Action: Prioritize Introduction, Guide, Examples, then API/Advanced/Migration.
  - Notes: Incremental remap; no full content rewrite.

- [x] Task 8: Add core adoption guide pages including setup structure
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/project-setup/page.mdx`
  - Action: Add “Recommended Project Structure” page with canonical feature tree and call flow.
  - Notes: Include `RSC -> Client -> useFeatureHook -> useActionQuery/useActionMutation -> Server Action`.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/feature-structure/page.mdx`
  - Action: Document official feature-first directory contract.
  - Notes: Include enforceable rules and anti-patterns.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/architecture-guide/page.mdx`
  - Action: Add architecture responsibilities and boundaries.
  - Notes: Explicitly state “components never call actions directly”.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/query-keys-pattern/page.mdx`
  - Action: Show `createFeatureKeys` usage in production-style modules.
  - Notes: Include migration notes.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/guide/cache-tags-pattern/page.mdx`
  - Action: Show factory-style `createFeatureTags` and invalidation mapping.
  - Notes: Keep aligned with registry semantics.

- [x] Task 9: Add examples and migration pages
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/examples/basic-crud/page.mdx`
  - Action: Add compact CRUD example for adoption.
  - Notes: Keep generic.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/examples/feature-module-products/page.mdx`
  - Action: Add complete products module example with feature keys/tags.
  - Notes: Include copyable folder tree.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/examples/auth-example/page.mdx`
  - Action: Add auth-adjacent pattern example.
  - Notes: Avoid provider-specific lock-in.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/migration/from-zsa/page.mdx`
  - Action: Add neutral migration table and behavior mapping.
  - Notes: No competitive framing.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/migration/from-next-safe-action/page.mdx`
  - Action: Add incremental migration guidance.
  - Notes: Focus on low-risk onboarding.

- [x] Task 10: Keep performance/advanced docs technically conservative
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/advanced/performance/page.mdx`
  - Action: Phrase benefits as predictable invalidation, less over-fetch, and simpler cache orchestration.
  - Notes: Avoid unverified benchmark claims.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/advanced/server-vs-client-cache/page.mdx`
  - Action: Clarify server cache vs React cache vs React Query responsibilities.
  - Notes: Include concrete decision table.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/why-zapaction/page.mdx`
  - Action: Add concise positioning page with key differences and migration links.
  - Notes: Keep tone neutral.

- [x] Task 11: Update home and getting started with high-conversion examples
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/page.mdx`
  - Action: Add 10-line end-to-end example (feature keys + defineAction + useActionQuery), badges, and CTA blocks.
  - Notes: Keep hero statement unchanged and prominent.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/getting-started/page.mdx`
  - Action: Use Nextra Tabs for npm/pnpm/yarn/bun install commands and preserve bootstrap flow.
  - Notes: Validate syntax against Nextra docs.

- [x] Task 12: Implement soft i18n (safe mode for Nextra 4)
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/lib/i18n.ts`
  - Action: Define locale constants and route helpers (`en`, `fr`, default `en`).
  - Notes: No full-route duplication in v0.2.1.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/middleware.ts`
  - Action: Redirect `/` to `/en` and keep locale-less fallback behavior predictable.
  - Notes: Exclude `_next`, assets, and API paths.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/en/page.mdx`
  - Action: Add explicit English landing route alias.
  - Notes: Keep EN as canonical content source.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/fr/page.mdx`
  - Action: Add French Home page.
  - Notes: Limited v0.2.1 translation scope.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/fr/getting-started/page.mdx`
  - Action: Add French Getting Started page.
  - Notes: Commands remain language-agnostic.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/fr/guide/feature-structure/page.mdx`
  - Action: Add French Feature Structure page.
  - Notes: Other FR routes can fallback to EN.

- [x] Task 13: Add language switcher and minimal brand assets
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/components/language-switcher.tsx`
  - Action: Implement locale switcher with fallback to locale home if current route translation is unavailable.
  - Notes: Avoid broken links.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/components/zapaction-logo.tsx`
  - Action: Add reusable logo component.
  - Notes: Keep SVG lightweight.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/theme.config.tsx`
  - Action: Wire logo, links, and switcher placement.
  - Notes: Keep sidebar depth shallow.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/public/logo.svg`
  - Action: Add logo asset.
  - Notes: Use primary `#6366f1` and accent `#22c55e`.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/public/favicon.svg`
  - Action: Add favicon asset.
  - Notes: Ensure legibility at small sizes.

- [x] Task 14: Add AI-consumable context artifacts for Context7 and agents
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/context7.md`
  - Action: Create canonical AI-facing summary covering value proposition, feature-first architecture, key/tag helpers, install matrix, docs map, and usage criteria.
  - Notes: Keep examples aligned with shipped APIs.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/SKILL.md`
  - Action: Add minimal optional skill marker describing ZapAction use cases.
  - Notes: Keep format simple and portable.

- [x] Task 15: Validate and lock release readiness for dev handoff
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/package.json`
  - Action: Verify scripts remain valid after new routes/pages.
  - Notes: Keep command interface unchanged.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/turbo.json`
  - Action: Verify task graph and outputs remain correct.
  - Notes: No pipeline redesign in this release.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/docs/implementation-artifacts/tech-spec-zapaction-adoption-structure-release-0-2-1.md`
  - Action: Finalize as implementation source of truth with runbook commands.
  - Notes: Ready for fresh-context `quick-dev`.

### Acceptance Criteria

- [x] AC 1: Given an existing codebase using `createQueryKeys`, when upgrading to `0.2.1`, then no existing query key callsites break and behavior remains unchanged.
- [x] AC 2: Given a feature name and strict factory map, when calling `createFeatureKeys`, then generated keys are deterministic readonly tuples prefixed by the feature segment.
- [x] AC 3: Given non-serializable key segments (e.g., functions/symbols), when helper keys are built, then runtime validation throws explicit errors.
- [x] AC 4: Given a feature name and tag factory, when calling `createFeatureTags`, then tags support `all/list/detail` style generation with deterministic string outputs.
- [x] AC 5: Given package installation with npm, yarn, pnpm, or bun, when following docs install commands, then dependency commands are valid and consistent.
- [x] AC 6: Given package manifests for `@zapaction/core`, `@zapaction/query`, and `@zapaction/react`, when consumers install in npm/yarn environments, then peer dependency warnings are minimized by package-specific minimal peer sets.
- [x] AC 7: Given release packaging, when publish scripts run, then published internal deps never contain `workspace:*` ranges and source manifests remain unchanged.
- [x] AC 8: Given docs navigation, when visiting the docs app, then Guide and Examples are surfaced before API-heavy references.
- [x] AC 9: Given the Project Setup and Architecture Guide pages, when reading implementation rules, then the flow `components -> hooks -> zapaction -> server actions` is explicit with at least one anti-pattern correction.
- [x] AC 10: Given the Getting Started page, when switching install tabs, then npm/pnpm/yarn/bun command blocks render correctly using Nextra Tabs.
- [x] AC 11: Given a request to `/` on docs, when no locale is present, then middleware redirects to `/en`.
- [x] AC 12: Given localized routes for `/en` and `/fr`, when loading Home, Getting Started, and Feature Structure pages, then both locales render and untranslated paths resolve safely to EN.
- [x] AC 13: Given the docs header, when opening the site, then logo, GitHub link, and version/badge area are present and non-broken.
- [x] AC 14: Given migration pages, when reading “From ZSA” and “From next-safe-action”, then mapping tables clearly explain old vs new patterns without hostile language.
- [x] AC 15: Given advanced cache/performance docs, when reviewing recommendations, then claims stay conservative (no unverified benchmark promises) and server cache, React cache, and React Query responsibilities are clearly separated with practical examples.
- [x] AC 16: Given the repository root, when AI assistants index project context, then `context7.md` is present and aligned with shipped APIs (`createFeatureKeys`, feature-first structure, package-manager matrix).

## Additional Context

### Dependencies

- Package runtime dependencies by concern:
  - Core: `zod` (required peer), `next` optional peer for tag revalidation integration
  - Query: `react` + `@tanstack/react-query` peers
  - React package: `react` peer
- Docs stack:
  - `nextra`
  - `nextra-theme-docs`
  - `nextra/components` (Tabs rendering in MDX)
- Build and quality:
  - `turbo`
  - `typescript`
  - `vitest`
- Knowledge dependencies validated in this step:
  - Next.js App Router i18n + redirect guidance via Context7 (`/vercel/next.js/v16.1.5`)
  - Next `transpilePackages` monorepo guidance via Context7 (`/vercel/next.js/v16.1.5`)
  - Nextra Tabs usage via Context7 (`/shuding/nextra`)

### Testing Strategy

- Unit tests:
  - Extend `packages/core/src/queryKeys.test.ts` for new feature helper behavior and guardrails.
  - Keep existing query/core test suites green to confirm non-breaking upgrade.
- Integration validation (workspace level):
  - `pnpm --filter @zapaction/core test`
  - `pnpm --filter @zapaction/query test`
  - `pnpm --filter @zapaction/react test`
  - `pnpm typecheck`
  - `pnpm build`
- Docs validation:
  - `pnpm --filter @zapaction/docs typecheck`
  - `pnpm --filter @zapaction/docs build`
  - Manual route checks: `/`, `/en`, `/fr`, `/en/getting-started`, `/fr/getting-started`, `/en/guide/feature-structure`
  - Manual Tabs check: install command tabs render and switch correctly.
- Release validation:
  - Dry-run publish pipeline to verify rewrite happens in temporary packaging workspace and no `workspace:*` remains in packed manifests.
  - Manual smoke check of README install commands across npm/yarn/pnpm/bun syntax.

### Notes

- Highest risk area: i18n + Nextra App Router integration can break page mapping; v0.2.1 now uses dynamic full locale routing with middleware rewrite and locale cookie persistence.
- Second risk area: peer dependency over-constraint can introduce install friction; enforce minimal peer set per package.
- Third risk area: release rewrite script for workspace deps must never mutate source manifests; isolate rewrite to temporary pack artifacts.
- Context quality risk: if `context7.md` drifts from shipped APIs, AI-generated integration snippets will degrade; keep it versioned with release updates.
- Keep this release non-breaking and adoption-first: ship incrementally, prioritize documentation clarity over framework complexity.
- Deferred to post-0.2.1: codegen, feature builder CLI, optimistic updates strategy, DevTools.

## Review Notes

- Adversarial review completed
- Findings processed: 12 total
- Resolution approach: targeted auto-fix + user-directed structural refactor
- Addressed:
  - docs IA reorganized to conventional sections (`Guide`, `Examples`, `API Reference`, `Advanced`, `Migration`)
  - legacy docs example route removed (`/full-example`)
  - i18n upgraded to full dynamic locale routing for `/en/*` and `/fr/*` with locale persistence cookie
  - release rewrite flow verified to avoid source manifest mutation
- Deferred by user request scope:
  - potential tag-segment collision hardening in `createFeatureTags`
  - deeper `next` runtime dependency fallback behavior in non-Next environments
