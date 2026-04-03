export function GET() {
  const content = `# __PROJECT_NAME__ — Full Project Context

> Built with Launchframe — opinionated Next.js 16 SaaS starter.

---

## Tech Stack

- Framework: Next.js 16.2.x (App Router, React 19, TypeScript 5.9)
- Database: PostgreSQL + Drizzle ORM 0.44.x
- Auth: Better Auth 1.x (email/password__AUTH_LLMS_EXTRA__)
- Billing: __BILLING_LLMS_LINE__
- Email: __EMAIL_LLMS_LINE__
- Styling: Tailwind CSS 4
- Validation: Zod 4 + React Hook Form
- Testing: Vitest 3.2 (unit) + Playwright 1.55 (E2E)
- Quality: ESLint 9, Prettier, Husky + lint-staged

---

## Project Structure

\`\`\`
src/
├── app/
│   ├── page.tsx              # Landing / marketing page
│   ├── dashboard/page.tsx    # Protected dashboard
│   ├── settings/page.tsx     # Account settings
│   ├── billing/page.tsx      # Billing management
│   ├── email/page.tsx        # Email demo
│   ├── sign-in/page.tsx      # Sign in
│   ├── sign-up/page.tsx      # Sign up
│   ├── api/
│   │   ├── auth/[...all]/route.ts    # Auth API
│   │   ├── billing/checkout/route.ts # Checkout session
│   │   ├── billing/portal/route.ts   # Customer portal
│   │   ├── webhooks/stripe/route.ts  # Stripe webhooks
│   │   └── email/test/route.ts       # Email test
│   ├── llms.txt/route.ts    # LLM summary (this file)
│   └── llms-full.txt/route.ts
├── lib/
│   ├── auth.ts               # Better Auth server config
│   ├── auth-client.ts        # Client auth utilities
│   ├── auth-session.ts       # Server session helper
│   ├── db.ts                 # Drizzle client
│   ├── billing.ts            # Billing provider abstraction
│   ├── email.ts              # Email client
│   └── env.ts                # Environment validation (Zod)
├── db/
│   ├── schema.ts             # Drizzle table definitions
│   └── seed.ts               # Demo data seeder
└── middleware.ts              # Route protection
\`\`\`

---

## Authentication

Uses Better Auth. Sessions stored in the database.

Server-side session access:
\`\`\`ts
import { getSession } from "@/lib/auth-session";
const session = await getSession();
if (!session) redirect("/sign-in");
\`\`\`

Client-side session access:
\`\`\`ts
import { useSession } from "@/lib/auth-client";
const { data: session } = useSession();
\`\`\`

Protected routes defined in src/middleware.ts:
- /dashboard, /settings, /billing — redirect to /sign-in if unauthenticated

---

## Database

Drizzle ORM with PostgreSQL. Schema in src/db/schema.ts.

Commands:
- pnpm db:push — push schema to database
- pnpm db:migrate — run migrations
- pnpm db:seed — seed demo data
- pnpm db:studio — open Drizzle Studio

---

## Billing

Provider abstraction interface:
- createCheckoutSession() — create a payment session
- createCustomerPortalSession() — customer self-service portal
- handleWebhook() — process billing events

Configured via BILLING_PROVIDER env var.

---

## Email

Resend integration. Usage:
\`\`\`ts
import { sendEmail } from "@/lib/email";
await sendEmail({ to: "user@example.com", subject: "Welcome!", html: "<p>Hello</p>" });
\`\`\`

---

## Environment Variables

All validated via src/lib/env.ts. Never use process.env directly.

Required: DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL
Billing: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_PRICE_ID, STRIPE_WEBHOOK_SECRET
Email: RESEND_API_KEY, EMAIL_FROM

---

## Conventions

- Server components by default; add "use client" only when needed
- All env access through src/lib/env.ts
- Database queries in server components or server actions
- Auth checks: middleware for routes, getSession() for pages/API
- File naming: kebab-case for files, PascalCase for components
- Imports: use @/ path alias
- No barrel exports (index.ts re-exports)

---

## Testing

Unit tests: src/**/*.test.ts (Vitest)
E2E tests: tests/**/*.spec.ts (Playwright)

Commands:
- pnpm test — run unit tests
- pnpm test:e2e — run E2E tests

---

## AI Agent Configuration

- AGENTS.md — primary rules for all agents
- CLAUDE.md — Claude Code specific workflow
- .cursor/rules/*.mdc — Cursor auto-activated rules
- .gemini/GEMINI.md — Gemini Code Assist
- ARCHITECTURE.md — project architecture and extension points
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
