---
title: 'ZapAction MVP v0.1 - Next.js 15+'
slug: 'zapaction-mvp-v0-1-next-15-plus'
created: '2026-02-15T13:17:27Z'
status: 'Completed'
stepsCompleted: [1, 2, 3, 4]
tech_stack:
  - 'TypeScript (strict)'
  - 'pnpm workspaces'
  - 'tsup'
  - 'Zod >= 3'
  - 'Next.js >= 15 (App Router + Server Actions)'
  - 'React >= 18.3'
  - '@tanstack/react-query >= 5'
files_to_modify:
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/package.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/pnpm-workspace.yaml'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/tsconfig.base.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/package.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/index.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/defineAction.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/context.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/queryKeys.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/revalidateTags.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/package.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/src/index.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/src/useAction.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/package.json'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/index.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/useActionQuery.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/useActionMutation.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/invalidateTags.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/tagRegistry.ts'
  - '/Users/fredyaba/Documents/Saas-projects/zapaction/examples/next-app'
code_patterns:
  - 'Clean slate: aucune contrainte legacy, architecture cible à définir.'
  - 'Monorepo modulaire: packages/core, packages/react, packages/query.'
  - 'Public API first: exports explicites et stables pour éviter les breaking changes.'
  - 'Action pattern: defineAction(...) côté serveur + useActionMutation(action) côté client.'
  - 'Cache pattern: tags unifiés -> revalidateTag serveur + invalidateQueries client.'
  - 'Action metadata runtime: `DefinedAction` expose `tags` pour invalidation automatique.'
  - 'Query keys typesafe via createQueryKeys.'
  - 'MVP guardrails: pas d''optimistic, retry/timeouts, FormData, RBAC, plugins.'
test_patterns:
  - 'Confirmed Clean Slate: aucun test existant.'
  - 'Tests unitaires par package sur les exports publics.'
  - 'Tests de hooks pour react/query.'
  - 'Smoke test d''intégration dans examples/next-app pour invalidation cross-layer.'
---

# Tech-Spec: ZapAction MVP v0.1 - Next.js 15+

**Created:** 2026-02-15T13:17:27Z

## Overview

### Problem Statement

Les solutions existantes couvrent partiellement les Server Actions typesafe, mais ne proposent pas un standard simple et cohérent pour Next.js 15+ avec invalidation de cache unifiée serveur + client.

### Solution

Construire ZapAction comme un monorepo open source (`core`, `react`, `query`) focalisé MVP: `defineAction`, validation Zod, inférence TypeScript de bout en bout, hooks React Query, query key factory, et tags de cache cross-layer (`revalidateTag` côté serveur et `invalidateQueries` côté client).

### Scope

**In Scope:**
- Framework: Next.js 15+ uniquement, App Router requis, Server Actions requises
- Packaging: `packages/core`, `packages/react`, `packages/query`
- Fonctionnalités MVP: `defineAction`, `setActionContext`, validation Zod, typage end-to-end, server context, tags, invalidation cross-layer, `setTagRegistry`, `useActionQuery`, `useActionMutation`, query key factory
- Livrables spec: architecture globale, design API, stories d'implémentation, AC Given/When/Then, plan de tests
- Support adoption: exemple Next.js, exemples DX, benchmark perf simple

**Out of Scope:**
- Optimistic updates
- Retry / timeouts
- FormData
- RBAC avancé
- Metrics / tracing
- OpenAPI / codegen
- Multi-framework

## Context for Development

### Codebase Patterns

- Confirmed Clean Slate: aucun code produit à rétrofitter, aucune convention legacy à respecter.
- Architecture cible imposée: monorepo pnpm avec workspaces (`core`, `react`, `query`) et un example Next.
- Tooling cible figé: TypeScript strict, build `tsup`, publication npm orientée tree-shaking.
- Contrats publics d'abord: figer les exports MVP avant toute implémentation interne.
- Pattern produit central: tags de cache unifiés serveur + client sans configuration lourde.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/docs/initial-context.md` | Source de vérité produit, scope MVP v0.1, exclusions explicites |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/docs/implementation-artifacts/tech-spec-wip.md` | WIP spec active et état de progression |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/package.json` | Workspace root, scripts globaux, metadata npm |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/pnpm-workspace.yaml` | Déclaration monorepo pnpm |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/tsconfig.base.json` | Baseline TypeScript strict commune |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/defineAction.ts` | Contrat serveur principal (signature critique) |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/context.ts` | Registry global pour factory de `ctx` (`setActionContext`) |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/queryKeys.ts` | Query key factory typesafe |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/revalidateTags.ts` | Helper cache serveur `revalidateTag` |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/src/useAction.ts` | Hook React de base (sans React Query) |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/useActionQuery.ts` | Binding query typesafe |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/useActionMutation.ts` | Binding mutation typesafe |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/tagRegistry.ts` | Registry global tags -> query keys (`setTagRegistry`) |
| `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/invalidateTags.ts` | Bridge cache tags -> invalidateQueries |

### Technical Decisions

- Compatibilité MVP verrouillée: Next.js >= 15, App Router obligatoire, Server Actions obligatoires.
- Peer deps recommandées: `next >= 15`, `react >= 18.3`, `@tanstack/react-query >= 5`, `zod >= 3`.
- Tooling repo verrouillé: pnpm + workspaces, TypeScript strict, build `tsup`.
- Public exports MVP à implémenter:
  - Core: `defineAction`, `setActionContext`, `createQueryKeys`, `revalidateTags`
  - React: `useAction`
  - Query: `useActionQuery`, `useActionMutation`, `setTagRegistry`, `invalidateTags`
- Contrat public figé pour `defineAction` (breaking si modifié post-v0.1):

  ```ts
  type DefinedAction<TInput, TOutput> = {
    (input: TInput): Promise<TOutput>
    tags?: readonly string[]
  }

  type DefineActionOptions<TInput, TOutput, TContext> = {
    input: ZodSchema<TInput>
    output?: ZodSchema<TOutput>
    tags?: readonly string[]
    handler: (args: {
      input: TInput
      ctx: TContext
    }) => Promise<TOutput>
  }

  declare function defineAction<
    TInput,
    TOutput,
    TContext = unknown
  >(options: DefineActionOptions<TInput, TOutput, TContext>): DefinedAction<TInput, TOutput>

  declare function setActionContext<TContext>(
    factory: () => Promise<TContext> | TContext
  ): void
  ```
- Exécution `defineAction`: retourne une fonction async standard compatible Server Actions Next.js (pas de proxy objet). Toute logique runtime (validation/context) s'exécute dans cette fonction retournée; aucune couche intermédiaire supplémentaire.
- Politique d'erreurs (passthrough only):
  - Les erreurs Zod sont propagées telles quelles.
  - Les erreurs du handler sont propagées telles quelles.
  - Aucun envelope custom (`{ success, error }`) et aucun error-mapper en v0.1.
- Design registry tags (contrat v0.1) pour `invalidateTags`:

  ```ts
  type TagRegistry = Record<
    string,
    readonly QueryKey[] | ((args: { input?: unknown; result?: unknown }) => readonly QueryKey[])
  >

  declare function setTagRegistry(registry: TagRegistry): void

  declare function invalidateTags(
    queryClient: QueryClient,
    tags?: readonly string[]
  ): Promise<void>
  ```

  - Mapping par tag exact.
  - Tag inconnu: ignoré (pas d'erreur runtime).
  - Résolution des clés: déterministe.
  - Registry global configurable via `setTagRegistry`.
  - Multi-enregistrement autorisé, mais non recommandé.
  - Règle de résolution: last registration wins.
- Stratégie server-only pour `revalidateTags`: importer `"server-only"` et ajouter un guard runtime (`if (typeof window !== "undefined") throw ...`).
- Stratégie server-only pour `setActionContext`: configuration et exécution strictement côté serveur.
- Restriction usage `useActionQuery`: réservé aux actions de lecture (side-effect free). Les write-actions passent par `useActionMutation`.
- Scope guardrail explicite: ne pas introduire optimistic/retry/FormData/RBAC/plugins en v0.1.
- Principe produit: server-first. Les hooks client ne doivent pas dupliquer la logique serveur.

## Implementation Plan

### Tasks

- [x] Task 1: Bootstrap the monorepo workspace and strict TypeScript baseline
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/package.json`
  - Action: Create root package metadata and scripts (`build`, `typecheck`, `test`, `lint`) with `pnpm` workspace orchestration.
  - Notes: Keep scripts package-agnostic and avoid framework-specific behavior at root.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/pnpm-workspace.yaml`
  - Action: Define workspace packages for `packages/*` and `examples/*`.
  - Notes: Keep workspace globs minimal to avoid accidental package pickup.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/tsconfig.base.json`
  - Action: Define strict compiler options shared by all packages.
  - Notes: Enable `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, and declaration output compatibility.

- [x] Task 2: Create package scaffolding and public entry points
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/package.json`
  - Action: Declare `@zapaction/core` package exports, build entry points, and dependency on `zod`.
  - Notes: Mark `next` as peer dependency because cache API is framework-bound.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/package.json`
  - Action: Declare `@zapaction/react` exports and React peer dependency.
  - Notes: Keep this package independent from React Query.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/package.json`
  - Action: Declare `@zapaction/query` exports with React, Next, and TanStack Query peer dependencies.
  - Notes: Query package depends on `@zapaction/core` contracts.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/index.ts`
  - Action: Export only `defineAction`, `setActionContext`, `createQueryKeys`, and `revalidateTags`.
  - Notes: This export list is the MVP public contract for core.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/src/index.ts`
  - Action: Export only `useAction`.
  - Notes: Prevent leaking internal hook helpers.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/index.ts`
  - Action: Export only `useActionQuery`, `useActionMutation`, `setTagRegistry`, and `invalidateTags`.
  - Notes: Do not export optimistic/retry APIs in v0.1.

- [x] Task 3: Freeze and implement the `defineAction` public signature
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/defineAction.ts`
  - Action: Implement `defineAction` with the exact `DefineActionOptions<TInput, TOutput, TContext>`/`DefinedAction<TInput, TOutput>` public signature defined in Technical Decisions.
  - Notes: `DefinedAction` must expose runtime metadata `tags?: readonly string[]` for automatic invalidation.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/context.ts`
  - Action: Implement `setActionContext(factory)` global registry used by `defineAction` to resolve `ctx`.
  - Notes: Keep registration API server-only and singleton for MVP.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/index.ts`
  - Action: Re-export the finalized types (`ActionContext`, `ActionResult`, `DefinedAction`) required by `react` and `query`.
  - Notes: Reject API drift; any signature change after release is a semver major.

- [x] Task 4: Implement typed query key factory in core
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/queryKeys.ts`
  - Action: Implement `createQueryKeys` that returns strongly-typed key builders and stable tuple outputs.
  - Notes: Keys must be serializable and deterministic for TanStack Query compatibility.

- [x] Task 5: Implement server-side tag revalidation bridge
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/revalidateTags.ts`
  - Action: Implement `revalidateTags(tags)` wrapper over `revalidateTag` for Next.js 15+ server runtime.
  - Notes: Enforce server-only via `import "server-only"` + runtime guard; for empty/undefined tags, return no-op (zero invalidation).
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/context.ts`
  - Action: Apply the same server-only boundary strategy to `setActionContext`.
  - Notes: Throw explicit runtime error if called in client runtime.

- [x] Task 6: Implement framework-agnostic React action hook
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/src/useAction.ts`
  - Action: Implement typed `useAction` hook exposing execution status (`idle`, `pending`, `success`, `error`) and result/error states.
  - Notes: Keep API minimal; no retry, no optimistic, no FormData in MVP.

- [x] Task 7: Implement typed React Query bindings for actions
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/useActionQuery.ts`
  - Action: Implement `useActionQuery` that infers input/output types from the action contract and integrates typed query keys.
  - Notes: Enforce explicit query key usage from `createQueryKeys` and document hard rule: read actions only.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/useActionMutation.ts`
  - Action: Implement `useActionMutation` that executes actions and exposes typed mutation states.
  - Notes: Wire post-success invalidation hooks to tag invalidation helper without optimistic behavior.

- [x] Task 8: Implement client-side tag invalidation bridge
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/tagRegistry.ts`
  - Action: Implement `setTagRegistry(registry)` as a global registry setter for tag -> query key resolution.
  - Notes: Last registration wins; validate shape eagerly in dev mode.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/invalidateTags.ts`
  - Action: Implement `invalidateTags(queryClient, tags)` using the global registry configured by `setTagRegistry`.
  - Notes: Support multi-tag invalidation, ignore unknown tags, and guarantee zero invalidation when no tags are provided.

- [x] Task 9: Create Next.js 15+ example app proving end-to-end flow
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/examples/next-app`
  - Action: Add minimal App Router example showing `defineAction` + `useActionMutation` + unified tag invalidation.
  - Notes: Example must demonstrate server revalidation and client query invalidation for the same `users` tag.

- [x] Task 10: Add contract tests and integration smoke tests
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/src/defineAction.test.ts`
  - Action: Validate type inference, input validation behavior, and output schema enforcement.
  - Notes: Include invalid input and edge cases for empty tags.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/src/useActionMutation.test.ts`
  - Action: Validate typed mutation behavior and invalidation callback integration.
  - Notes: Assert no optimistic/retry behavior is present by default.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/examples/next-app`
  - Action: Add smoke integration scenario covering server + client cache consistency.
  - Notes: Keep test fixture lightweight and deterministic.

- [x] Task 11: Publish-ready documentation and compatibility policy
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/README.md`
  - Action: Document install, compatibility (`Next.js 15+`), public APIs, and first example.
  - Notes: Include explicit non-goals for v0.1 to protect scope.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/core/README.md`
  - Action: Document `defineAction`, `createQueryKeys`, and `revalidateTags`.
  - Notes: Include API signatures and migration guidance placeholder for future versions.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/react/README.md`
  - Action: Document `useAction` usage and lifecycle states.
  - Notes: Clarify that React Query integration lives in `@zapaction/query`.
  - File: `/Users/fredyaba/Documents/Saas-projects/zapaction/packages/query/README.md`
  - Action: Document query/mutation hooks and tag invalidation mapping contract.
  - Notes: Provide best-practice pattern for query key factory usage.

### Acceptance Criteria

- [ ] AC 1: Given a Next.js 15+ App Router project, when `@zapaction/core` is installed and imported, then `defineAction`, `setActionContext`, `createQueryKeys`, and `revalidateTags` are available as public exports.
- [ ] AC 2: Given an action defined with Zod input schema, when invalid input is provided, then the action rejects with a typed validation error and does not call the handler.
- [ ] AC 3: Given an action with output schema configured, when the handler returns an invalid payload, then output validation fails with a typed error.
- [ ] AC 4: Given a typed context factory for actions, when a handler executes, then the handler receives a fully inferred `ctx` type without manual casting.
- [ ] AC 5: Given a query key factory created via `createQueryKeys`, when keys are generated, then keys are deterministic tuples and TypeScript-enforced.
- [ ] AC 6: Given server-side tags on a mutation action, when the mutation succeeds on the server, then `revalidateTag` is invoked for each tag via `revalidateTags` from a server-only boundary.
- [ ] AC 7: Given `setTagRegistry` has registered tag mappings, when `invalidateTags` is called after a successful mutation, then the corresponding TanStack Query keys are invalidated.
- [ ] AC 8: Given an action contract, when `useActionQuery` or `useActionMutation` is used, then input/output types are inferred automatically from the action definition.
- [ ] AC 9: Given `useActionQuery` is used in application code, when the hooked action is not read-only, then usage is flagged as invalid by package documentation and test coverage policy.
- [ ] AC 10: Given the MVP scope, when developers inspect public exports of all packages, then no optimistic/retry/FormData/RBAC/plugin APIs are exposed.
- [ ] AC 11: Given the example app flow for `users`, when a create-user mutation completes, then server data is revalidated and client cached queries refresh using the same tag vocabulary.
- [ ] AC 12: Given package installation in a project using Next.js < 15, when type checks run, then compatibility constraints are documented and unsupported usage is clearly signaled.
- [ ] AC 13: Given an action with no tags, when the action succeeds, then no server revalidation and no client invalidation occurs.
- [ ] AC 14: Given the repository test suite, when tests run, then unit and smoke tests pass for core contracts and cross-layer invalidation behavior.
- [ ] AC 15: Given an action is created with tags, when developers inspect the returned action contract at runtime, then `DefinedAction.tags` exposes these tags for hook-level automation.

## Additional Context

### Dependencies

- Runtime dependencies:
  - `zod >= 3` (schema validation and type inference anchor)
- Peer dependencies:
  - `next >= 15` (App Router + Server Actions + cache revalidation API)
  - `react >= 18.3` (hook runtime and compatibility baseline)
  - `@tanstack/react-query >= 5` (query/mutation orchestration in query package)
- Development/tooling dependencies:
  - `typescript` (strict mode)
  - `tsup` (package build)
  - `vitest` (unit tests)
  - `@types/react` (type coverage for hooks)
- Internal dependencies:
  - `@zapaction/react` and `@zapaction/query` depend on `@zapaction/core` public types/contracts.

### Testing Strategy

- Unit tests (`core`):
  - `defineAction` input/output validation, typed context propagation, empty-tags edge case.
  - `defineAction` exposes `DefinedAction.tags` metadata when tags are configured.
  - `setActionContext` registers and resolves `ctx` factory for all actions.
  - `createQueryKeys` deterministic and strongly typed tuple generation.
  - `revalidateTags` server bridge behavior and empty-array no-op.
- Hook tests (`react`, `query`):
  - `useAction` lifecycle states for success and error paths.
  - `useActionQuery`/`useActionMutation` type inference and integration with query keys.
  - `useActionQuery` read-only policy is enforced via docs examples and test fixtures (no mutation-style examples accepted).
  - `setTagRegistry` + `invalidateTags` mapping correctness across single and multiple tags.
- Integration smoke (`examples/next-app`):
  - Manual/automated scenario: create entity via mutation, verify same tag triggers server revalidation and client invalidation.
  - Manual/automated scenario: action without tags completes successfully and triggers zero invalidation.
- Quality gates:
  - `pnpm typecheck` must pass in strict mode for all packages.
  - `pnpm test` must pass before marking release candidate.

### Notes

- Highest-risk contract: `defineAction` signature stability. Any post-release signature change is a breaking change.
- Cross-layer mapping risk: tag-to-query-key registry drift can create stale UI; enforce explicit registration patterns.
- Runtime boundary risk: `revalidateTags` must remain server-only to avoid client bundle/runtime failures.
- Bootstrap recommendation: `setActionContext` and `setTagRegistry` must run during app bootstrap in a server-only module imported once.
- Runtime recommendation: avoid repeated registration during request handling; initialize once per app boot path.
- Registration policy: last registration wins; multiple registrations are allowed but not recommended.
- Scope guardrail: reject PRs introducing optimistic updates, retries/timeouts, FormData, RBAC, plugins before v0.2 planning.
- Design principle: actions are pure contracts; metadata (`tags`, schemas) must stay accessible at runtime.
- Killer feature v0.1 remains the product anchor: unified cache tags across server and client with minimal configuration.

## Review Notes

- Adversarial review completed.
- Findings: 10 total, 10 fixed, 0 skipped.
- Resolution approach: auto-fix.
- F3 release-hardening validation executed on production mode:
  - `next build` passed for `examples/next-app`.
  - `next start` runtime check passed.
  - Client Component invocation produced successful Server Action POST requests (HTTP 200) with no console/runtime errors.
