export function GET() {
  const content = `# __PROJECT_NAME__

> Built with Launchframe — opinionated Next.js 16 SaaS starter.

## Tech Stack

- Next.js 16 (App Router, React 19, TypeScript 5.9)
- Drizzle ORM + PostgreSQL
- Better Auth (email/password__AUTH_LLMS_EXTRA__)
- Tailwind CSS 4
- __BILLING_LLMS_LINE__
- __EMAIL_LLMS_LINE__
- Vitest + Playwright testing
- ESLint 9, Prettier

## Structure

- src/app/ — Next.js pages (App Router)
- src/lib/ — shared utilities (auth, db, billing, email, env)
- src/db/ — Drizzle schema and seeds
- AGENTS.md — AI agent rules
- ARCHITECTURE.md — project architecture

## Key Files

| File | Purpose |
|---|---|
| src/lib/auth.ts | Better Auth server config |
| src/lib/db.ts | Drizzle client |
| src/lib/billing.ts | Billing provider |
| src/lib/email.ts | Email client |
| src/lib/env.ts | Environment validation |
| src/middleware.ts | Route protection |
| drizzle.config.ts | Drizzle Kit config |

## Commands

| Command | Description |
|---|---|
| pnpm dev | Start dev server |
| pnpm build | Production build |
| pnpm lint | Lint with ESLint |
| pnpm typecheck | TypeScript check |
| pnpm test | Unit tests (Vitest) |
| pnpm test:e2e | E2E tests (Playwright) |
| pnpm db:push | Push schema to database |
| pnpm db:seed | Seed demo data |
| pnpm db:studio | Open Drizzle Studio |

## Full Documentation

See /llms-full.txt for the complete project context.
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
