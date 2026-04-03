export function GET() {
  const content = `# Launchframe

> Opinionated Next.js 16 SaaS starter with auth, billing, email, database, and AI-first developer experience.

## Links

- Docs: https://launchframe.dev/docs
- GitHub: https://github.com/jocage/launchframe
- Full docs for LLMs: https://launchframe.dev/llms-full.txt

## Tech Stack

- Next.js 16 (App Router, React 19, TypeScript 5.9)
- Drizzle ORM + PostgreSQL
- Better Auth (email/password, GitHub OAuth)
- Stripe / Polar billing
- Resend email
- Vitest + Playwright testing
- ESLint 9, Prettier, Husky
- GitHub Actions CI/CD
- AI agent rules (AGENTS.md, CLAUDE.md, .cursor/rules, ARCHITECTURE.md)

## Docs

- [Getting Started](/docs)
- [Quick Start](/docs/quick-start)
- [CLI Options](/docs/cli-options)
- [Templates](/docs/templates): blank, dashboard
- [Modules](/docs/modules): auth, database, billing, email, deploy, ai-dx
- [Guides](/docs/guides): env variables, adding pages, adding DB tables, protected routes, deploy
- [Architecture](/docs/architecture)
- [Contributing](/docs/contributing)

## CLI

\`\`\`bash
npx create-launchframe my-app
\`\`\`

Options: --template, --database-driver, --billing, --auth, --email-provider, --deploy-target, --package-manager, --seed-demo-data

## Templates

- **blank**: minimal SaaS baseline — landing, auth, billing, email, database
- **dashboard**: product-facing starter — marketing page, demo dashboard, dark design system

## Modules

| Module | Kind | Description |
|---|---|---|
| quality-baseline | dx | ESLint, Prettier, Husky |
| testing-baseline | dx | Vitest, Playwright, CI |
| ai-dx | dx | AGENTS.md, CLAUDE.md, .cursor/rules, ARCHITECTURE.md |
| auth-core | auth | Better Auth baseline |
| auth-github | auth | GitHub OAuth |
| db-pg | database | node-postgres driver |
| db-postgresjs | database | postgres.js driver |
| billing-stripe | billing | Stripe checkout + webhooks |
| billing-polar | billing | Polar checkout + webhooks |
| email-resend | email | Resend transactional email |
| deploy-docker | deploy | Dockerfile + .dockerignore |
| dashboard-shell | ui | Dashboard CSS + settings page |
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
