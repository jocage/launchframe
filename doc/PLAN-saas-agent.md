# SaaS Agent — Plan

> Universal AI agent prompt that builds a production-ready Next.js 16 SaaS project from scratch through a conversational flow. Separate repo.

## Purpose

A standalone system prompt (`PROMPT.md`) that turns any AI coding agent into a SaaS project builder. The agent asks the user a series of questions, then assembles the project step by step — no CLI, no generator, just the agent + the prompt.

Think of it as "create-launchframe knowledge" extracted into a prompt.

## Repo structure

```
saas-agent/
  README.md       # What it is + usage per AI tool
  PROMPT.md       # The system prompt (~500 lines, ~5000 tokens)
```

## How it works

### Phase 1: Discovery (agent asks questions)

The agent asks the user these questions in order. If the user gives a vague answer ("just make me a SaaS"), use the recommended defaults.

| # | Question | Options | Default |
|---|----------|---------|---------|
| 1 | Project name | free text | `my-saas-app` |
| 2 | Template style | minimal, dashboard | `dashboard` |
| 3 | Package manager | pnpm, npm, bun | `pnpm` |
| 4 | Database | PostgreSQL (pg driver), SQLite (better-sqlite3), Turso (libsql) | `pg` |
| 5 | Billing provider | Stripe, Polar, both, none | `stripe` |
| 6 | Auth methods | email-password, email-password+github, email-password+google | `email-password` |
| 7 | Email provider | Resend, Nodemailer, console (dev only), none | `resend` |
| 8 | Deploy target | Docker, Vercel, manual | `docker` |
| 9 | AI tools config | Cursor rules, Claude Code config, Gemini config, Copilot config | all |
| 10 | Seed demo data | yes, no | `yes` |

### Phase 2: Scaffold (agent builds the project)

After gathering answers, the agent executes these steps in order:

1. **Create Next.js 16 project** — `npx create-next-app@latest <name> --app --ts --tailwind --eslint --src-dir --import-alias "@/*"` then upgrade to Next.js 16 if needed
2. **TypeScript 5.9 strict** — update `tsconfig.json` with strict, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
3. **Install Drizzle ORM** — `drizzle-orm` + chosen driver + `drizzle-kit`, create `drizzle.config.ts`, `src/db/index.ts`, `src/db/schema/`
4. **Install Better Auth** — `better-auth`, create `src/lib/auth.ts`, `src/lib/auth-client.ts`, `src/lib/auth-session.ts`, `proxy.ts` middleware
5. **Wire billing** — install chosen provider SDK, create `src/lib/billing/` with provider abstraction pattern (interface + implementation)
6. **Wire email** — install chosen provider, create `src/lib/email/` with send abstraction + templates
7. **Env validation** — create `src/lib/env.ts` with Zod schema for all env vars, `.env.example`
8. **ESLint 9 flat config** — `eslint.config.mjs` with strict rules, no-process-env rule (except env.ts)
9. **Prettier** — `prettier.config.mjs` (double quotes, no trailing commas, 88 chars)
10. **Testing** — Vitest + jsdom for unit, Playwright for e2e, `pnpm check` script
11. **CI** — `.github/workflows/ci.yml` (lint + typecheck + test + build)
12. **Deploy config** — Dockerfile (multi-stage, standalone output) or `vercel.json` based on choice
13. **Auth pages** — sign-in, sign-up pages with form component
14. **Dashboard shell** — if dashboard template: sidebar nav, overview page, settings page
15. **Seed script** — if yes: `src/db/seeds/index.ts` with demo users, plans, etc.
16. **AI tools config** — based on selection: `AGENTS.md` (always), `.cursor/rules/*.mdc`, `CLAUDE.md`, `.gemini/`, `ARCHITECTURE.md`
17. **Verify** — run `pnpm typecheck && pnpm lint:fix && pnpm build`

### Phase 3: Handoff

After building, the agent:
- Prints a summary of what was created
- Lists the env vars that need real values
- Suggests next steps (run dev, set up DB, configure billing keys)

## What makes this different from create-launchframe

| | create-launchframe (CLI) | saas-agent (prompt) |
|---|---|---|
| **How** | Template + token replacement | Agent writes every file |
| **Speed** | Instant (copies files) | Minutes (agent generates) |
| **Customization** | Fixed options | Infinite (user can steer mid-build) |
| **Learning** | Opaque (generated code) | Transparent (user watches each step) |
| **Dependencies** | Requires npm/npx | Requires any AI tool |
| **Maintenance** | Update templates | Update prompt |

## Notes

- The prompt should be self-contained — no external dependencies or files to download
- Target under 500 lines / 5000 tokens to fit in any context window
- Code templates should be minimal but correct — the agent fills in details based on user choices
- This is intentionally NOT a Launchframe product — it's a standalone open-source agent that happens to encode similar knowledge
