# Launchframe Specification

## 1. Product Summary

Launchframe is an opinionated, type-safe SaaS starter for Next.js 16.

The goal is to reduce time-to-first-feature for new products by shipping a production-grade baseline with:

- modern Next.js App Router setup
- strict TypeScript and runtime validation
- authentication
- PostgreSQL + Drizzle ORM
- billing
- email
- quality gates
- clean DX

The starter should not try to be a universal low-code generator. It should provide a small number of strong, high-confidence defaults with a few carefully selected options.

## 2. Target Outcome

After running the init command, the user should get one of two outcomes:

1. `blank`
   A minimal SaaS shell with beautiful default UI, working auth, protected routes, account settings, billing scaffolding, and email integration.

2. `dashboard`
   A demo SaaS app with a polished dashboard layout, overview cards, settings, billing page, example forms, table/list content, and optional seed data.

## 3. Product Principles

- Opinionated over infinitely configurable
- Type-safe by default
- Server/client boundaries enforced
- Production-minded quality checks included
- Good default UI without heavy visual noise
- Clear upgrade path and maintainable architecture
- Stable tested dependency matrix instead of blindly installing latest every time

## 4. Scope

### In Scope for V1

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Zod
- React Hook Form
- Drizzle ORM
- PostgreSQL support
- Better Auth
- Resend
- Stripe
- Polar as optional billing provider
- GitHub Actions
- ESLint
- Prettier
- Vitest
- Playwright
- init CLI
- two templates: `blank` and `dashboard`
- one default architecture plus optional alternatives

### Out of Scope for V1

- advanced RBAC
- multi-org or complex workspace permissions
- usage-based billing
- file storage integrations
- background job infrastructure
- analytics vendors
- feature flags
- admin panel
- non-Postgres databases
- overly broad template explosion

## 5. Recommended Dependency Matrix

Pin to a tested stable matrix and update intentionally.

Recommended baseline as of April 1, 2026:

- `next@16.2.x`
- `react@19.2.x`
- `typescript@5.9.x`
- `tailwindcss@4.x`
- `zod@4.x`
- `react-hook-form@7.x`
- `@hookform/resolvers@5.x`
- `drizzle-orm@0.44.x`
- `drizzle-kit@0.31.x` or latest verified stable
- `better-auth@1.x`
- `resend@6.x`
- `stripe@18.x`
- `@stripe/stripe-js@7.x`
- `@polar-sh/sdk@0.34.x`
- `@polar-sh/better-auth@1.x`
- `eslint@9.x`
- `prettier@3.x`
- `vitest`
- `@testing-library/react`
- `playwright`

## 6. Default Technical Stack

### Framework

- Next.js with App Router
- React
- TypeScript

### Styling

- Tailwind CSS v4
- local design tokens via CSS variables
- reusable local UI primitives

### Validation and Forms

- Zod for runtime validation
- React Hook Form for forms
- `zodResolver` for form schema integration

### Database

- PostgreSQL
- Drizzle ORM
- Drizzle migrations and seed support

### Authentication

- Better Auth
- email/password enabled by default
- optional social providers

### Billing

- Stripe as the default billing provider
- Polar as an optional alternative
- adapter-based abstraction to support both cleanly

### Email

- Resend

### Quality

- ESLint
- Prettier
- Vitest
- Playwright
- GitHub Actions CI

## 7. Billing Provider Strategy

Billing should be implemented behind an internal provider contract rather than exposing vendor SDK calls everywhere in the app.

Example contract:

```ts
export interface BillingProvider {
  createCheckoutSession(input: {
    userId: string;
    customerEmail: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ url: string }>;

  createCustomerPortalSession(input: {
    userId: string;
    customerId: string;
    returnUrl: string;
  }): Promise<{ url: string }>;

  handleWebhook(input: {
    rawBody: string;
    signature?: string;
  }): Promise<void>;
}
```

Implementations:

- `stripe`
- `polar`

Benefits:

- keeps vendor lock-in isolated
- makes template code cleaner
- simplifies testing
- makes future provider additions safer

## 8. PostgreSQL Driver Options

The starter should support two PostgreSQL client options for Drizzle:

- `pg`
- `postgres` (`postgres.js`)

### Recommendation

- default: `pg`
- optional alternative: `postgres.js`

### Why `pg` as default

- most familiar to the widest audience
- mainstream and predictable
- easiest default for a public starter

### Why support `postgres.js`

- modern API
- popular with some Drizzle users
- useful as an advanced option for users who prefer it

## 9. Templates

### 9.1 `blank`

Purpose:
Minimal starting point for a real product.

Expected content:

- minimal marketing or home page
- auth pages
- protected app shell
- settings page
- billing page
- empty dashboard state
- email examples
- responsive layout

### 9.2 `dashboard`

Purpose:
Show a polished SaaS example with enough surface area to demonstrate real patterns.

Expected content:

- sidebar app shell
- overview cards
- activity list or table
- settings pages
- billing page
- example forms
- seeded demo content
- responsive desktop/mobile layout

## 10. CLI

Recommended command:

```bash
pnpm create launchframe
```

## 10.1 Modular Direction

The current implementation uses templates plus option-aware generation, but the target architecture should be modular.

That means:

- a `base` project skeleton
- installable `modules` for capabilities such as DB, billing, auth, email, and UI shells
- named `presets` such as `blank` and `dashboard`

This direction is specified in:

- [doc/MODULE_SYSTEM.md](./MODULE_SYSTEM.md)

The migration should be incremental and preserve the current verified template flow while modules are introduced.

The CLI should scaffold a project from templates and selected options.

### Init Questions

- project name
- template: `blank` or `dashboard`
- architecture: `route-colocated`, `feature-first`, or `monorepo-ready`
- package manager: `pnpm`, `npm`, or `bun`
- database provider: `postgres`, `neon`, or `supabase`
- Drizzle driver: `pg` or `postgres.js`
- billing provider: `stripe`, `polar`, `both`, or `none`
- auth providers: `email-password`, `github`, `google`
- email provider: `resend` or `none`
- deploy target: `vercel` or `docker`
- seed demo data: `yes` or `no`

### Recommended Defaults

- template: `blank`
- architecture: `route-colocated`
- package manager: `pnpm`
- database provider: `postgres`
- Drizzle driver: `pg`
- billing provider: `stripe`
- auth providers: `email-password` + `github`
- email provider: `resend`
- deploy target: `vercel`
- seed demo data: `no`

### Package Manager Strategy

The starter should support:

- `pnpm`
- `npm`
- `bun`

Recommendation:

- default: `pnpm`
- mainstream fallback: `npm`
- advanced option: `bun`

What package manager choice should affect:

- install instructions in generated docs
- lockfile generation
- CI install step
- `packageManager` field in `package.json` where appropriate
- helper command suggestions such as `pnpm dlx`, `npx`, or `bunx`

V1 recommendation:

- fully support `pnpm`
- fully support `npm`
- support `bun` as experimental or best-effort until runtime verification proves parity

## 11. Recommended App Architecture

The default recommended architecture for V1 should be `route-colocated`.

### 11.1 Default: `route-colocated`

```txt
src/
  app/
    (marketing)/
      page.tsx
    (auth)/
      login/page.tsx
      register/page.tsx
      reset-password/page.tsx
    (app)/
      layout.tsx
      dashboard/
        page.tsx
        _components/
      settings/
        page.tsx
      billing/
        page.tsx
      _actions/
  components/
    ui/
    shared/
  features/
    auth/
    billing/
    dashboard/
    settings/
  lib/
    env/
    utils/
    validations/
  server/
    auth/
    billing/
    db/
    email/
  db/
    schema/
    migrations/
    seeds/
  hooks/
  styles/
  types/
```

Why this should be the default:

- aligns well with App Router
- keeps route-specific pieces near routes
- still allows domain modules in `features`
- gives a clean place for server-only code

### 11.2 Optional: `feature-first`

```txt
src/
  app/
  features/
    auth/
    billing/
    dashboard/
    settings/
  components/
    ui/
    shared/
  lib/
  server/
  db/
```

Good fit for:

- products expected to grow in domain complexity
- teams that prefer feature ownership boundaries

### 11.3 Optional: `monorepo-ready`

```txt
apps/
  web/
packages/
  ui/
  config/
  db/
  auth/
```

Good fit for:

- teams expecting multiple apps or shared packages
- future expansion into a multi-package setup

## 12. Architectural Rules

The starter should encode a small set of enforceable rules:

- direct `process.env` access is forbidden outside the env layer
- database code is server-only
- billing provider access goes through a provider abstraction
- server modules must not be imported into client components
- Zod is the runtime boundary for env, forms, and API inputs
- reusable domain logic should live outside route files
- route files should stay thin

## 13. TypeScript Standards

TypeScript should be strict by default.

Recommended compiler settings:

- `"strict": true`
- `"noUncheckedIndexedAccess": true`
- `"exactOptionalPropertyTypes": true`
- `"verbatimModuleSyntax": true`
- path aliases via `@/*`

Type-safety strategy:

- TypeScript for compile-time safety
- Zod for runtime input validation
- Drizzle for typed database access
- typed contracts for auth and billing

## 14. ESLint Strategy

ESLint must be part of the product, not an afterthought.

### Tooling

- flat config via `eslint.config.mjs`
- `typescript-eslint`
- `@next/eslint-plugin-next`
- `eslint-plugin-react-hooks`
- `eslint-plugin-import`
- `eslint-plugin-unused-imports`
- `eslint-config-prettier`

### Required Best-Practice Rules

- type-aware linting
- `no-floating-promises`
- `no-misused-promises`
- `consistent-type-imports`
- `unused-imports/no-unused-imports`
- `import/order`
- React Hooks rules
- Next.js rules
- `no-restricted-imports` for architecture boundaries

### Enforced Boundaries

- prevent importing server-only code into client modules
- prevent bypassing env validation layer
- prevent careless cross-feature imports where needed

## 15. Testing Strategy

Testing should be included from day one.

### 15.1 Unit Tests

Tools:

- Vitest

Targets:

- utility functions
- Zod schemas
- env parsing
- auth helpers
- billing mappers

### 15.2 Integration Tests

Targets:

- route handlers
- server actions
- webhook handlers
- Drizzle queries
- auth flow helpers

### 15.3 Component Tests

Tools:

- React Testing Library

Targets:

- forms
- auth UI
- billing UI
- important reusable components

### 15.4 End-to-End Tests

Tools:

- Playwright

Targets:

- sign up and sign in
- protected route access
- logout
- billing redirect or portal access
- basic dashboard smoke flow

### Minimum Included in V1

- 2-3 unit tests
- 1 integration example
- 2 e2e smoke tests

## 16. CI and GitHub Actions

The starter should include GitHub Actions by default.

### Minimum CI Jobs

- `lint`
- `typecheck`
- `test`
- `build`

Optional later:

- `e2e-smoke`
- migration validation
- dependency audit

## 17. Scripts

Recommended scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:push": "drizzle-kit push",
  "db:seed": "tsx src/db/seeds/index.ts"
}
```

## 18. Generated Files

At minimum, the scaffolded project should generate:

- `README.md`
- `.env.example`
- `eslint.config.mjs`
- `prettier.config.mjs`
- `tsconfig.json`
- `drizzle.config.ts`
- `vitest.config.ts`
- `playwright.config.ts`
- GitHub Actions workflows
- `src/lib/env.ts`
- auth setup
- billing provider layer
- email service layer
- database schema and migration setup

## 19. UX Expectations

The generated app should feel intentional and polished.

Guidelines:

- clean typography
- restrained but not generic visual style
- responsive layouts
- attractive empty states
- sensible loading and error states
- consistent spacing and hierarchy

For `blank`, the UI should feel minimal and premium.

For `dashboard`, the UI should feel practical, polished, and real enough to use as a starting point for a SaaS app.

## 20. AI-First Ecosystem Strategy

Launchframe should explicitly support modern AI-assisted development workflows.

This should not mean adding shallow AI gimmicks. It should mean making the generated codebase easier for humans and coding agents to understand, change, test, and extend.

### AI-First Product Principles

- codebase structure should be predictable and easy to traverse
- domain boundaries should be explicit
- docs should be concise and machine-readable
- setup should minimize hidden magic
- generated projects should be easy for agents to safely modify

### AI-First Features for the Starter Itself

- generate a short `AGENTS.md` or equivalent contributor guidance file
- include architecture notes for where auth, billing, db, env, and routes live
- include clear script names and task entry points
- include strong lint and test automation so agents can validate changes
- keep config filenames conventional and discoverable

### AI-First Features for Generated Apps

- route files stay thin and readable
- reusable business logic lives in named modules
- env access is centralized
- API and form schemas are explicit and colocated
- server-only and client-only layers are easy to infer
- example tests demonstrate how to safely modify behavior

### Optional AI Integrations for V1 or V1.1

- `AGENTS.md` with repository guidance for coding agents
- pre-written prompts for common tasks such as adding a page or billing plan
- issue templates that guide AI-friendly task decomposition
- optional OpenAI or Vercel AI SDK example in the `dashboard` template

### Suggested Positioning

Launchframe should be marketed as:

- AI-friendly
- agent-editable
- type-safe
- production-minded

It should not be marketed as an "AI app starter" unless AI product features are actually part of the generated app.

## 21. V1 Delivery Recommendation

To avoid over-scoping the first release, ship V1 in phases.

### V1.0

- `blank`
- `dashboard`
- default architecture: `route-colocated`
- PostgreSQL with `pg`
- Better Auth
- Resend
- Stripe
- ESLint
- Vitest
- Playwright
- GitHub Actions

### V1.1

- Polar
- `feature-first` architecture option
- `postgres.js` option

### V1.2

- `monorepo-ready`
- richer dashboard demo
- more auth providers
- more billing presets

## 22. Success Criteria

The starter is successful if it gives users:

- a fast path from zero to production-ready baseline
- confidence in architecture and quality
- modern defaults without constant rework
- enough flexibility to choose key integrations
- a clean foundation for real product development

## 23. Summary

Launchframe should be positioned as a high-confidence, production-minded SaaS starter for Next.js 16, not as an everything generator.

The strongest V1 is:

- two templates
- one default architecture
- strict quality gates
- tested stable dependency matrix
- PostgreSQL + Drizzle
- Better Auth
- Stripe first, Polar optional
- Resend
- great DX
