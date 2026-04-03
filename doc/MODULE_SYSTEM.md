# Launchframe Module System

## Goal

Launchframe should evolve from a template copier into a modular scaffolder.

The point is not to make the product infinitely configurable. The point is to make future additions predictable:

- new database drivers
- new billing providers
- new email providers
- new auth providers
- new deploy targets
- future product modules such as teams, admin, AI, storage, or analytics

## Design Principle

The system should be built from three layers:

1. `base`
   The minimal Next.js app skeleton and shared project baseline.

2. `modules`
   Self-contained capability units such as auth, database, billing, email, UI shells, and deploy support.

3. `presets`
   Curated bundles of modules such as `blank` and `dashboard`.

`blank` and `dashboard` should stop being the only source of truth. They should become named presets assembled from modules.

## Target Repository Shape

Recommended future shape:

```txt
apps/
  cli/
packages/
  scaffold-core/
  module-registry/
templates/
  base-web/
modules/
  auth-core/
  db-pg/
  db-postgresjs/
  billing-stripe/
  billing-polar/
  email-resend/
  deploy-docker/
  dashboard-shell/
  quality-baseline/
  testing-baseline/
  ai-dx/
  ai-dx-cursor/
  ai-dx-claude/
  ai-dx-gemini/
presets/
  blank.json
  dashboard.json
```

This does not need to be implemented in one rewrite. It is the target architecture.

## Assembly Model

The generator should work like this:

1. load the selected base
2. resolve the selected preset
3. add or remove modules from explicit CLI options
4. validate dependencies and conflicts
5. assemble files and config patches in deterministic order
6. write the final project
7. write a manifest describing what was installed

## Module Contract

Each module should declare metadata and a bounded set of operations.

Suggested structure:

```txt
modules/
  billing-stripe/
    module.json
    files/
    patches/
```

Suggested `module.json`:

```json
{
  "name": "billing-stripe",
  "kind": "billing",
  "description": "Stripe billing provider integration",
  "dependsOn": ["auth-core"],
  "conflictsWith": [],
  "replaces": [],
  "tokens": ["STRIPE_SECRET_KEY", "STRIPE_PRICE_ID", "STRIPE_WEBHOOK_SECRET"],
  "operations": [
    "addFiles",
    "mergePackageJson",
    "mergeEnv",
    "patchText"
  ]
}
```

Current implemented subset:

- metadata-based dependency resolution
- token replacement contribution
- file pruning
- file overlays via `modules/<name>/files/**`

## Supported Operation Types

The scaffolder should support a small and explicit operation set.

Recommended operations:

- `addFiles`
- `removeFiles`
- `mergeJson`
- `mergePackageJson`
- `mergeEnv`
- `appendText`
- `patchText`
- `registerScript`
- `registerDependency`
- `registerDevDependency`

Avoid arbitrary module-side scripting unless absolutely necessary. The more the system looks like unrestricted JS hooks, the harder it becomes to reason about output stability.

Current first practical capability:

- a module may declare `template.copyFiles`
- each file is copied from `modules/<moduleName>/files/<relativePath>`
- this is now used by `dashboard-shell` to provide `/settings` and its `globals.css` theme/layout layer

## Resolver Rules

The module resolver should be deterministic.

Recommended rules:

- install `base` first
- install preset modules next
- install explicit option-driven modules after that
- sort by dependency depth
- reject unresolved conflicts before any file writes happen
- fail fast on incompatible combinations

Examples:

- `db-pg` conflicts with `db-postgresjs`
- `billing-stripe` can coexist with `billing-polar` only if a shared `billing-core` model exists
- `email-none` should not exist as a full module; absence of `email-resend` is enough

## Preset Model

Presets should be data, not hidden logic.

Example `presets/blank.json`:

```json
{
  "name": "blank",
  "base": "base-web",
  "modules": [
    "quality-baseline",
    "testing-baseline",
    "auth-core",
    "db-pg",
    "billing-stripe",
    "email-resend"
  ]
}
```

Example `presets/dashboard.json`:

```json
{
  "name": "dashboard",
  "base": "base-web",
  "modules": [
    "quality-baseline",
    "testing-baseline",
    "auth-core",
    "db-pg",
    "billing-stripe",
    "email-resend",
    "dashboard-shell"
  ]
}
```

## CLI Integration

The CLI should move from directly mapping options onto template token replacement to resolving modules.

Near-term CLI flow:

1. select preset
2. select database driver
3. select billing provider
4. select email provider
5. select package manager
6. resolve module set
7. render project

Longer-term additions:

- auth provider modules
- deploy target modules
- feature modules such as teams or admin

## Manifest Output

Every generated project should contain a machine-readable manifest.

Current file:

```txt
launchframe.json
```

Future shape:

```json
{
  "starter": "launchframe",
  "version": 2,
  "base": "base-web",
  "preset": "dashboard",
  "modules": [
    "quality-baseline",
    "testing-baseline",
    "auth-core",
    "db-postgresjs",
    "billing-stripe"
  ]
}
```

This becomes the upgrade and introspection contract.

## Migration Strategy

Do not rewrite everything at once.

Recommended migration path:

### Phase 1

Keep `templates/blank` and `templates/dashboard` working as they are today.

Add an internal module system for the most duplicated option-driven areas first:

- `db-pg`
- `db-postgresjs`
- `billing-stripe`
- `billing-polar`
- `email-resend`

### Phase 2

Extract shared baseline modules:

- `quality-baseline`
- `testing-baseline`
- `auth-core`

### Phase 3

Convert `dashboard` UI into `dashboard-shell`.

At that point:

- `blank` becomes a preset
- `dashboard` becomes a preset
- the old direct template duplication can be reduced or removed

## Testing Strategy For Modules

The module system must be verifiable the same way the current templates are verifiable.

Minimum testing layers:

- resolver unit tests
- package/env merge tests
- smoke generation per preset
- smoke verification per profile

Recommended smoke matrix:

- `blank + pg + stripe + resend`
- `dashboard + pg + stripe + resend`
- `blank + postgres.js + none + none`

## What Not To Do

- do not let modules run arbitrary side effects during generation
- do not encode all logic in one giant CLI file
- do not create dozens of tiny modules with unclear ownership
- do not make every single feature user-configurable

The system should stay opinionated even after it becomes modular.

## Immediate Next Implementation Targets

The first extractions should be:

1. database driver modules
2. billing provider modules
3. email provider module handling
4. preset manifest resolution

This gives the biggest payoff with the least amount of rewrite risk.
