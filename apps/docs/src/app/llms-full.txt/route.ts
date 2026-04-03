export function GET() {
  const content = `# Launchframe — Full Documentation

> Opinionated Next.js 16 SaaS starter with auth, billing, email, database, and AI-first developer experience.

---

# Getting Started

## What is Launchframe?

Launchframe is an opinionated SaaS starter for Next.js 16. One CLI command scaffolds a production-ready project with auth, billing, email, database, testing, CI/CD, and AI-first developer experience.

Two templates ship today:
- **blank** — minimal SaaS baseline: landing page, auth, billing, email, database
- **dashboard** — product-facing starter: marketing page, demo dashboard, polished UI, dark design system

## Prerequisites

- Node.js 22+ (LTS recommended)
- pnpm (or npm / bun)
- PostgreSQL database (local or hosted)

## Install

\`\`\`bash
npx create-launchframe my-app
\`\`\`

## Non-interactive (CI-friendly)

\`\`\`bash
npx create-launchframe my-app \\
  --template dashboard \\
  --database-driver pg \\
  --billing stripe \\
  --auth email-password+github \\
  --email-provider resend \\
  --deploy-target docker \\
  --package-manager pnpm
\`\`\`

## Run

\`\`\`bash
cd my-app
cp .env.example .env.local
pnpm install
pnpm dev
\`\`\`

---

# CLI Options

| Option | Choices | Default |
|---|---|---|
| --template | blank, dashboard | blank |
| --package-manager | pnpm, npm, bun | pnpm |
| --database-driver | pg, postgres.js | pg |
| --billing | stripe, polar, both, none | stripe |
| --auth | email-password, email-password+github | email-password |
| --email-provider | resend, none | resend |
| --deploy-target | vercel, docker | vercel |
| --seed-demo-data | yes, no | no |

---

# Templates

## blank
Minimal SaaS baseline. Landing page, auth pages, protected dashboard, billing, email, database scaffolding. All infrastructure wired up, clean UI for full control.

## dashboard
Product-facing starter. Everything in blank plus: polished marketing landing page, demo dashboard with overview cards and activity feed, sidebar navigation, settings with form patterns, dark design system with glass morphism and micro-animations.

---

# Module System

Launchframe is built from composable modules rather than monolithic templates.

Three layers:
1. **templates/base-web/** — shared skeleton
2. **presets/*.json** — curated module bundles
3. **modules/*/** — composable capabilities

## Available Modules

| Module | Kind | Description |
|---|---|---|
| quality-baseline | developer-experience | ESLint 9, Prettier, Husky + lint-staged |
| testing-baseline | developer-experience | Vitest 3.2, Playwright 1.55, CI config |
| ai-dx | developer-experience | AGENTS.md, CLAUDE.md, .cursor/rules, ARCHITECTURE.md |
| auth-core | auth | Better Auth baseline (email/password, sessions) |
| auth-github | auth | GitHub OAuth provider |
| db-pg | database | node-postgres driver for Drizzle |
| db-postgresjs | database | postgres.js driver for Drizzle |
| billing-stripe | billing | Stripe checkout, portal, webhooks |
| billing-polar | billing | Polar checkout, portal, webhooks |
| email-resend | email | Resend transactional email |
| deploy-docker | deploy | Dockerfile + .dockerignore |
| dashboard-shell | ui | Dashboard CSS layer + settings page |

## Module Anatomy

Each module has a module.json with: name, kind, description, dependsOn, conflictsWith, replaces, and template operations (copyFiles, tokenReplacements).

## Assembly Pipeline

1. Load base template
2. Resolve preset
3. Override from CLI flags
4. Validate dependencies
5. Apply token replacements
6. Copy module files
7. Prune unused files
8. Write launchframe.json manifest

---

# Authentication

Uses Better Auth — email/password by default, optional GitHub OAuth.

Key files:
- src/lib/auth.ts — server config
- src/lib/auth-client.ts — client utilities
- src/lib/auth-session.ts — server session helper
- src/app/api/auth/[...all]/route.ts — API catch-all
- src/middleware.ts — route protection

Session access (server):
\`\`\`ts
import { getSession } from '@/lib/auth-session';
const session = await getSession();
\`\`\`

Session access (client):
\`\`\`ts
import { useSession } from '@/lib/auth-client';
const { data: session } = useSession();
\`\`\`

---

# Database

PostgreSQL + Drizzle ORM. Two driver options: pg (default) and postgres.js.

Key files:
- src/lib/db.ts — Drizzle client
- src/db/schema.ts — table definitions
- src/db/seed.ts — demo data
- drizzle.config.ts — Drizzle Kit config

Commands: pnpm db:push, pnpm db:migrate, pnpm db:seed, pnpm db:studio

---

# Billing

Provider abstraction: Stripe (default) or Polar. Both implement the same interface:
- createCheckoutSession()
- createCustomerPortalSession()
- handleWebhook()

Key files: src/lib/billing.ts, src/app/billing/page.tsx, src/app/api/billing/webhook/route.ts

---

# Email

Resend integration for transactional email.

Key files: src/lib/email.ts, src/app/email/page.tsx

---

# AI-First DX

Every generated project ships with AI agent configuration:
- AGENTS.md — tech stack, commands, rules, patterns (Cursor, Copilot, Codex, Windsurf)
- CLAUDE.md — Claude Code specific workflow
- .cursor/rules/*.mdc — modular auto-activated rules
- .gemini/GEMINI.md — Gemini Code Assist
- ARCHITECTURE.md — directory tree, data flow, extension points

---

# Environment Variables

Required: DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL

Stripe: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_PRICE_ID, STRIPE_WEBHOOK_SECRET
Polar: POLAR_ACCESS_TOKEN, POLAR_ORGANIZATION_ID, POLAR_WEBHOOK_SECRET
Email: RESEND_API_KEY, EMAIL_FROM
GitHub OAuth: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

All validated through src/lib/env.ts. Never use process.env directly.

---

# Deploy

## Vercel (default)
Zero-config. Works with vercel deploy or Git-connected deploys.

## Docker
Multi-stage Dockerfile: deps → build → runner. Run: docker build -t my-saas . && docker run -p 3000:3000 --env-file .env.local my-saas

---

# Architecture

Three-layer generation: base-web → presets → modules.
Token replacement for simple, predictable code generation.
File-based modules instead of runtime feature flags.
launchframe.json manifest for introspection and future upgrade path.

## Project Structure (generated)

src/app/ — Next.js pages (landing, dashboard, settings, billing, email, auth)
src/lib/ — shared utilities (auth, db, billing, email, env)
src/db/ — Drizzle schema and seeds
AGENTS.md, CLAUDE.md, ARCHITECTURE.md — AI agent configuration
launchframe.json — generation manifest

## Repository Structure

apps/cli/ — CLI generator
apps/docs/ — documentation site
templates/base-web/ — shared project skeleton
presets/ — blank.json, dashboard.json
modules/ — composable capabilities
scripts/ — smoke generation + verification
doc/ — internal spec and design docs
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
