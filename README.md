# Launchframe

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./apps/cli/package.json)
[![CLI Packaging](https://img.shields.io/badge/CLI-pack%20verified-success)](./doc/RELEASE.md)

Opinionated, type-safe SaaS starter for Next.js 16.

Launchframe is for people who want to start shipping product code immediately, without rebuilding the same auth, billing, email, database, testing, and CI baseline on every new app.

## Why

Most starter kits force a bad tradeoff:

- either they are too thin and you still spend days wiring the real product baseline
- or they are too bloated and you spend days deleting framework theater

Launchframe is trying to sit in the useful middle:

- strong defaults
- a small number of meaningful options
- verified generated output
- clean enough structure to keep extending after day one

## What You Get

- Next.js 16 with App Router
- strict TypeScript + Zod runtime validation
- PostgreSQL + Drizzle ORM
- Better Auth
- Stripe and Polar-ready billing architecture
- Resend email layer
- ESLint, Prettier, Husky, Vitest, Playwright, and GitHub Actions
- `blank` and `dashboard` templates
- package manager choice: `pnpm`, `npm`, `bun`
- Postgres driver choice: `pg`, `postgres.js`
- modular generator architecture for future modules and presets

## Feature Matrix

| Capability | Blank | Dashboard |
| --- | --- | --- |
| Next.js 16 + App Router | Yes | Yes |
| TypeScript + Zod | Yes | Yes |
| Better Auth | Yes | Yes |
| PostgreSQL + Drizzle | Yes | Yes |
| Billing surface | Yes | Yes |
| Email surface | Yes | Yes |
| Protected routes | Yes | Yes |
| Settings page | Module-ready | Yes |
| Dashboard UI shell | Minimal | Yes |
| Tests + CI | Yes | Yes |

## Templates

### `blank`

Minimal SaaS baseline with:

- polished landing page
- auth pages
- protected dashboard route
- billing page
- email page
- database and auth scaffolding

### `dashboard`

Starter SaaS app shell with:

- responsive dashboard layout
- stats and overview UI
- settings page
- billing and email surfaces
- same auth, DB, CI, and testing baseline

## Current Status

The project is already usable.

Verified paths:

- generated `blank` app passes `install`, `lint`, `typecheck`, `test`, and `build`
- generated `dashboard` app passes `install`, `lint`, `typecheck`, `test`, and `build`
- `postgres.js` profile passes the same verification path
- publishable CLI tarball was packed, installed outside the monorepo, and used successfully via `npx create-launchframe`

## Quick Start

### Local repo usage

```bash
node apps/cli/bin/create-launchframe.mjs my-app
```

### Non-interactive usage

```bash
node apps/cli/bin/create-launchframe.mjs my-app \
  --template dashboard \
  --architecture route-colocated \
  --package-manager pnpm \
  --database-driver pg \
  --billing stripe \
  --auth email-password \
  --email-provider resend \
  --deploy-target vercel \
  --seed-demo-data no
```

### After generation

```bash
cd my-app
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm dev
```

Future published usage target:

```bash
npx create-launchframe@latest my-app
```

If you generate a project inside this repository or another parent `pnpm` workspace, use:

```bash
pnpm install --ignore-workspace
```

## CLI Experience

Interactive mode supports:

- arrow-key selection in TTY terminals
- fully non-interactive flags for scripts and CI
- path-safe project name normalization

Available options:

- template
- architecture
- package manager
- Postgres driver
- billing provider
- auth mode
- email provider
- deploy target
- seed demo data

## Supported Options

### Package managers

- `pnpm` recommended
- `npm` fully supported
- `bun` available as an experimental option

### Database drivers

- `pg` recommended default
- `postgres.js` supported

### Billing

- `stripe`
- `polar`
- `both`
- `none`

### Auth

- `email-password`
- `email-password+github`

### Deploy target

- `vercel`
- `docker`

## Verification

Reusable local smoke generation:

```bash
pnpm smoke:blank
pnpm smoke:dashboard
pnpm smoke:postgresjs
```

End-to-end verification:

```bash
pnpm smoke:verify:blank
pnpm smoke:verify:dashboard
pnpm smoke:verify:postgresjs
```

These commands generate the app and run:

- install
- lint
- typecheck
- test
- build

## Why This Exists

Launchframe is optimized for a very specific use case:

- you start multiple Next.js product projects
- you want a real SaaS baseline, not a toy demo
- you care about architecture and quality gates from the first commit
- you still want the output to stay understandable after generation

It is not trying to be:

- a page builder
- a giant plugin marketplace on day one
- a universal template for every kind of app

## Packaging

The CLI is publish-ready locally.

Useful commands:

```bash
pnpm cli:pack
pnpm cli:publish:dry-run
```

What is already verified:

- the CLI tarball builds successfully
- the tarball can be installed outside the monorepo
- `npx create-launchframe` works from that installed tarball
- the generated app still passes runtime verification

## Roadmap

- finish public npm release of `create-launchframe`
- improve `auth=email-password+github` so missing OAuth env vars do not emit build warnings
- deepen generated app surfaces without bloating the baseline
- expand AI-first repo guidance in generated projects
- build a safe future `upgrade` path from `launchframe.json`

## Architecture

Launchframe is moving from template-copy scaffolding toward a modular assembly model:

- `templates/base-web` provides the shared baseline
- `presets/*` describe curated starter shapes such as `blank` and `dashboard`
- `modules/*` provide option-driven capabilities such as DB drivers, billing providers, deploy targets, and UI shells

This matters because it keeps future additions predictable instead of turning the CLI into a pile of `if/else`.

Current examples of real module-driven generation:

- `db-pg`
- `db-postgresjs`
- `billing-stripe`
- `billing-polar`
- `email-resend`
- `auth-github`
- `deploy-docker`
- `dashboard-shell`

## Design Goals

- opinionated over endlessly configurable
- production baseline over demo fluff
- small number of high-confidence choices
- codebases that are easy for humans and coding agents to extend
- tested dependency matrix over blind latest-version installs

## Documentation

- [Specification](./doc/SPEC.md)
- [Module System](./doc/MODULE_SYSTEM.md)
- [Release Guide](./doc/RELEASE.md)

## Contributing

The repository is still moving quickly, so the main rule is to preserve the verified generation path:

- keep the starter opinionated
- prefer incremental module extraction over rewrites
- do not merge changes that break smoke verification

Internal implementation backlog lives in [.internal](./.internal/README.md).

## License

MIT. The publishable CLI package metadata lives in [apps/cli/package.json](./apps/cli/package.json).

## Notes

- `auth=email-password+github` currently builds cleanly, but Better Auth warns until real `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are provided.
- The dependency policy is “tested matrix first”, not “install latest at any cost”.
