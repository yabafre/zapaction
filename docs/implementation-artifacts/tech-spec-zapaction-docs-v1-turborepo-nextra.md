---
title: 'ZapAction Docs v1 (Turborepo + Nextra)'
slug: 'zapaction-docs-v1-turborepo-nextra'
created: '2026-02-15T17:03:06+01:00'
status: 'Completed'
stepsCompleted: [1, 2, 3, 4, 5, 6]
tech_stack:
  - 'TypeScript 5.7.3 (strict)'
  - 'pnpm workspaces'
  - 'Turborepo (to be introduced)'
  - 'Next.js 15.5.x'
  - 'React 19.1.x'
  - 'Nextra 4.6.1'
  - 'nextra-theme-docs 4.6.1'
  - 'MDX'
  - 'Vercel'
  - 'tsup 8.4.x'
  - 'Vitest 2.1.x'
  - 'Zod 4.3.x'
files_to_modify:
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/pnpm-workspace.yaml'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/package.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/turbo.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/package.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/next.config.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/theme.config.tsx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/layout.tsx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/_meta.js'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/getting-started/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/core/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/cache-tags/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/react-query/page.mdx'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/full-example/page.mdx'
code_patterns:
  - 'Root TS config uses moduleResolution Bundler with @zapaction/* path aliases to package source entrypoints'
  - 'Packages expose barrel exports from src/index.ts and publish dist via tsup + exports map'
  - 'Workspace package dependencies use workspace:* linking'
  - 'Next example separates server/client bootstrap for setActionContext and setTagRegistry'
  - 'Current example uses default Next config (no next.config file)'
test_patterns:
  - 'Vitest unit tests colocated in packages/*/src/*.test.ts'
  - 'Extensive use of vi.mock and deterministic behavior assertions'
  - 'Per-package scripts run vitest in non-watch mode'
---

# Tech-Spec: ZapAction Docs v1 (Turborepo + Nextra)

**Created:** 2026-02-15T17:03:06+01:00

## Overview

### Problem Statement

ZapAction needs online documentation that accelerates OSS adoption with clear onboarding and usage guidance. The current repository has core packages and examples, but no dedicated docs app, no Turborepo task orchestration, and no structured docs information architecture for the v1 user journey.

### Solution

Create a docs application at `apps/docs` using Next.js 15 + Nextra + MDX, integrated in a Turborepo monorepo and deployed on Vercel. The docs will provide a focused adoption-first path covering setup, core APIs, cache tags, React Query integration, and one end-to-end example.

### Scope

**In Scope:**
- Add Turborepo to the existing monorepo with minimal root tasks: `dev`, `build`, `lint`, `typecheck`
- Add docs app at `apps/docs` with Next.js 15, Nextra, and MDX
- Ensure docs can consume local workspace packages (`@zapaction/core`, `@zapaction/react`, `@zapaction/query`)
- Define docs IA and content for six v1 pages:
  - Home
  - Getting Started
  - Core
  - Cache Tags
  - React Query
  - Full Example
- Configure docs build path for Vercel (`apps/docs`)

**Out of Scope:**
- Docs versioning system
- Algolia/search integration
- Blog and changelog site sections
- Auto-generated API reference
- Multi-framework documentation
- Advanced theming/dark-mode customization

## Context for Development

### Codebase Patterns

- Confirmed clean slate for docs platform: no existing `apps/docs` and no existing `turbo.json`.
- Root TypeScript baseline (`tsconfig.base.json`) is strict and already compatible for Next.js source consumption:
  - `moduleResolution: "Bundler"`
  - `paths` aliases for `@zapaction/core|react|query` pointing to `packages/*/src/index.ts`
- Package distribution pattern is stable and consistent:
  - `tsup` build to `dist/`
  - explicit `exports` map for ESM/CJS/types
  - workspace linking via `workspace:*`
- Existing Next example (`examples/next-app`) establishes runtime conventions for docs examples:
  - server bootstrap via `bootstrap.server.ts` (`setActionContext`)
  - client bootstrap via `bootstrap.client.ts` (`setTagRegistry`)
  - App Router usage with no custom `next.config.*` override
- Existing root scripts are `pnpm -r` oriented and must be replaced/realigned with Turbo orchestration.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/tsconfig.base.json` | Validates source-first compatibility (`Bundler` + `paths`) for docs imports |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/pnpm-workspace.yaml` | Workspace globs currently missing `apps/*` |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/package.json` | Root scripts, dependency versions, and migration anchor to Turbo tasks |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/package.json` | Build/export pattern to mirror for docs integration |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/package.json` | React Query peer/version constraints and build pattern |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/package.json` | React peer/version constraints and export pattern |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/index.ts` | Public API surface to document for Core |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/index.ts` | Public API surface to document for Query |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/src/index.ts` | Public API surface to document for React |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/examples/next-app/package.json` | Version alignment baseline for Next/React/Zod in example stack |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/examples/next-app/tsconfig.json` | Confirms inheritance of root TS config in Next app |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/examples/next-app/app/actions.ts` | Canonical defineAction usage and tags behavior for docs examples |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/examples/next-app/app/bootstrap.server.ts` | Canonical `setActionContext` bootstrap usage |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/examples/next-app/app/bootstrap.client.ts` | Canonical `setTagRegistry` bootstrap usage |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/examples/next-app/README.md` | Existing example narrative and messaging baseline |

### Technical Decisions

- Monorepo orchestration will use Turborepo
- Docs app target is `apps/docs`
- Docs stack is fixed: Next.js 15 + Nextra + MDX
- Nextra integration must use Next.js App Router (not Pages Router legacy)
- `transpilePackages` is mandatory in docs Next config with explicit internal package names:
  - `@zapaction/core`
  - `@zapaction/react`
  - `@zapaction/query`
- Source-first dev contract:
  - docs consume `@zapaction/*` from workspace source
  - no prebuild required for packages during local `dev`
  - production build still relies on Turbo workspace build graph ordering
- Turborepo task scope is minimal and explicit for v1: `dev`, `build`, `lint`, `typecheck`
- Turbo pipeline constraints:
  - `build` depends on `^build`
  - `build` outputs include `.next/**`, `!.next/cache/**`, and `dist/**` for cache correctness
  - `dev` has `cache: false` and `persistent: true`
  - `dev` outputs are explicitly empty (`[]`)
  - `dev` must not depend on `^build`
  - docs build participates in dependency-aware build ordering (`^build`) for production reliability
- Workspace config must be extended to include `apps/*`
- Deployment target is Vercel with:
  - Root Directory: repository root
  - Build command: `pnpm turbo build --filter=@zapaction/docs...`
  - Output Directory: `apps/docs/.next`
- Docs content objective is "technical marketing + practical usage guide", not exhaustive platform docs
- Version alignment baseline to keep for docs app:
  - Next `^15.5.6`
  - React/React DOM `^19.1.1`
  - TypeScript `^5.7.3`
  - Zod `^4.3.6`
  - Nextra `4.6.1` + `nextra-theme-docs 4.6.1` (compatible with Next 15)

## Implementation Plan

### Tasks

- [x] Task 1: Add Turborepo orchestrator at repository root
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/package.json`
  - Action: Add `turbo` dev dependency and replace root scripts with Turbo equivalents (`dev`, `build`, `lint`, `typecheck`) while keeping `test` available.
  - Notes: Keep script names stable to avoid breaking contributor workflows.

- [x] Task 2: Create Turbo pipeline with minimal v1 tasks
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/turbo.json`
  - Action: Define pipeline tasks with `build` depending on `^build` and outputs `[".next/**", "!.next/cache/**", "dist/**"]`; define `dev` as `cache: false`, `persistent: true`, `outputs: []`, and no `^build` dependency.
  - Notes: Ensure docs production build participates in dependency-aware ordering via `build` graph while keeping dev loop free from prebuild coupling.

- [x] Task 3: Extend workspace layout to include applications
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/pnpm-workspace.yaml`
  - Action: Add `apps/*` to workspace packages without removing existing `packages/*` and `examples/*`.
  - Notes: Avoid exclusions/filters that would hide `apps/docs` from install/build graph.

- [x] Task 4: Scaffold docs app package and scripts
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/package.json`
  - Action: Create package manifest for docs app (workspace name `@zapaction/docs`) with scripts (`dev`, `build`, `start`, `lint`, `typecheck`) and dependencies (`next`, `react`, `react-dom`, `nextra`, `nextra-theme-docs`, local `@zapaction/*` packages).
  - Notes: Align versions with repo baseline (Next 15, React 19, TypeScript 5.7, Zod 4.3).

- [x] Task 5: Configure Next + Nextra with mandatory transpilePackages
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/next.config.ts`
  - Action: Configure Nextra and set `transpilePackages: ["@zapaction/core", "@zapaction/react", "@zapaction/query"]`.
  - Notes: Explicit internal package coverage is mandatory to support source-first workspace imports without drift.

- [x] Task 6: Define docs theme, navigation, and global metadata
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/theme.config.tsx`
  - Action: Add site title, project links, edit links, and top-level navigation for the six v1 pages.
  - Notes: Messaging must foreground the cache-sync value proposition.

- [x] Task 7: Create docs information architecture and route metadata
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/_meta.js`
  - Action: Define page ordering and labels for Home, Getting Started, Core, Cache Tags, React Query, Full Example using Nextra App Router metadata convention.
  - Notes: Keep IA intentionally shallow for fast first-time onboarding.

- [x] Task 8: Author Home and Getting Started pages
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/page.mdx`
  - Action: Write product narrative with before/after snippet showing manual invalidation vs tags-driven automation.
  - Notes: Include a 5-line “fast path” example.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/getting-started/page.mdx`
  - Action: Provide install/setup sequence including `setActionContext` and `setTagRegistry` bootstrap.
  - Notes: Use copy-paste-ready code blocks.

- [x] Task 9: Author Core and Cache Tags pages
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/core/page.mdx`
  - Action: Document `defineAction` contract, Zod validation, context lifecycle, and error passthrough policy.
  - Notes: Include explicit note that errors are not wrapped.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/cache-tags/page.mdx`
  - Action: Document tag registry design and server/client invalidation flow (`revalidateTags` + `invalidateTags`).
  - Notes: Include no-tags behavior and expected outcomes.

- [x] Task 10: Author React Query and Full Example pages
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/react-query/page.mdx`
  - Action: Document `useActionMutation` and `useActionQuery` with explicit read-only rule for queries.
  - Notes: Include one anti-pattern example and corrected version.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/full-example/page.mdx`
  - Action: Build end-to-end walkthrough based on `examples/next-app` with links to key source files.
  - Notes: Keep example aligned with published v0.1 API names.

- [x] Task 11: Add docs app TypeScript config and baseline app shell
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/tsconfig.json`
  - Action: Extend root `tsconfig.base.json` and configure Next/Nextra compatible options.
  - Notes: Ensure compatibility with workspace path aliases.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/apps/docs/app/layout.tsx`
  - Action: Provide App Router root layout using Nextra docs theme (`Layout`, `Navbar`, `Footer`, `Head`, `getPageMap`).
  - Notes: Keep implementation minimal and aligned with Nextra App Router conventions.

- [x] Task 12: Document local/CI/Vercel runbooks for docs
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/README.md`
  - Action: Add monorepo commands for Turbo (`pnpm turbo dev`, `pnpm turbo build`) and docs-specific usage.
  - Notes: Include Vercel settings: Root Directory repository root, build command `pnpm turbo build --filter=@zapaction/docs...`, output `apps/docs/.next`.

### Acceptance Criteria

- [x] AC 1: Given the monorepo root, when dependencies are installed, then `apps/docs` is included in the workspace graph via `pnpm-workspace.yaml`.
- [x] AC 2: Given root scripts, when running `pnpm run dev`, then Turbo orchestrates workspace dev tasks instead of `pnpm -r`.
- [x] AC 3: Given Turbo config, when running `pnpm turbo build --filter=@zapaction/docs...`, then upstream package build tasks run before docs build.
- [x] AC 4: Given Turbo dev config, when running `pnpm turbo dev`, then dev tasks are persistent and uncached, and do not force `^build`.
- [x] AC 5: Given `apps/docs/next.config.ts`, when docs imports internal workspace packages under `@zapaction/*`, then Next transpilation coverage explicitly includes `@zapaction/core`, `@zapaction/react`, and `@zapaction/query`.
- [x] AC 6: Given docs App Router structure, when the app is built, then routes are defined under `app/**/page.mdx` and no `pages/_app.tsx` is used.
- [x] AC 7: Given docs app startup, when running `pnpm turbo dev --filter=@zapaction/docs`, then docs app boots without requiring prebuilt package `dist/` artifacts.
- [x] AC 8: Given Home page content, when a developer lands on docs, then a complete working example (defineAction + tags + React Query) is visible above the fold.
- [x] AC 9: Given Getting Started page, when a user follows setup steps, then `setActionContext` and `setTagRegistry` bootstrapping are both documented with runnable snippets.
- [x] AC 10: Given Core page, when reading API behavior, then `defineAction` signature, validation flow, context behavior, and passthrough error policy are explicitly documented.
- [x] AC 11: Given Cache Tags page, when reading cache orchestration, then server revalidation, client invalidation, registry mapping, and no-tags/no-invalidation behavior are documented.
- [x] AC 12: Given React Query page, when using query hooks, then `useActionQuery` read-only usage constraints and mutation invalidation behavior are clearly stated.
- [x] AC 13: Given Full Example page, when following the guide, then the reader can map each step to concrete files in `examples/next-app`.
- [x] AC 14: Given Vercel deployment settings, when project is configured from repository root, then build succeeds with `pnpm turbo build --filter=@zapaction/docs...` and serves `apps/docs/.next`.
- [x] AC 15: Given Turbo build task, when cache is computed, then outputs include `.next/**`, `!.next/cache/**`, and `dist/**`.
- [x] AC 16: Given docs v1 scope, when reviewing the docs app, then no versioning/search/blog/auto-generated API/multi-framework features are introduced.
- [x] AC 17: Given repository root README, when contributors onboard, then Turbo and docs commands are documented for local and CI use.

## Additional Context

### Dependencies

- Runtime/Build:
  - `turbo` at root for task graph orchestration
  - `next@^15.5.6`, `react@^19.1.1`, `react-dom@^19.1.1`
  - `nextra@4.6.1`, `nextra-theme-docs@4.6.1`
- Local workspace deps consumed by docs:
  - `@zapaction/core` (workspace)
  - `@zapaction/react` (workspace)
  - `@zapaction/query` (workspace)
- Existing baseline dependencies to preserve:
  - `typescript@^5.7.3`
  - `zod@^4.3.6`
  - `@tanstack/react-query@^5.90.1`

### Testing Strategy

- Unit/Config validation:
  - Verify `turbo.json` task graph behavior (`build` dependency chain, `dev` persistence/no cache)
  - Verify `apps/docs/next.config.ts` contains required `transpilePackages`
- Integration validation:
  - Run `pnpm turbo dev --filter=@zapaction/docs` and confirm imports from `@zapaction/*` work without package prebuild
  - Run `pnpm turbo build --filter=@zapaction/docs...` and confirm dependency-order build success
  - Run `pnpm turbo typecheck` to validate cross-workspace types
- Manual validation:
  - Validate page navigation order and content completeness for six v1 pages
  - Validate code snippets compile conceptually against current API names
  - Smoke-test docs production build with Vercel-equivalent command
- Non-regression:
  - Ensure existing package tests continue to pass (`pnpm test`)

### Notes

- Scope discipline is critical: keep docs v1 intentionally narrow and adoption-focused.
- Turborepo integration must not break current package/example workflows.
- High-risk item: missing `transpilePackages` can break workspace TS imports in docs app runtime.
- High-risk item: adding `dependsOn: ["^build"]` to `dev` will degrade DX and can cause rebuild loops.
- High-risk item: inconsistent Vercel root/build configuration can pass locally but fail in hosted builds.
- Source-first contract (normative): local docs dev must resolve workspace source without `dist/`; production correctness comes from Turbo `build` dependency graph, not ad-hoc prebuild scripts.
- Future considerations (out of scope v1): docs versioning, search, API generation, multi-framework adapters.

## Review Notes

- Adversarial review completed
- Findings: 10 total, 6 fixed, 4 skipped
- Resolution approach: walk-through
