# create-launchframe

Opinionated SaaS starter CLI for Next.js 16.

Usage:

```bash
npx create-launchframe@latest my-app
```

Interactive mode asks for:

- template
- package manager
- Postgres driver
- billing provider
- auth mode
- email provider
- deploy target
- seed demo data
- AI tools (multi-select: Cursor, Claude Code, Gemini, Copilot)

Non-interactive example:

```bash
npx create-launchframe@latest my-app \
  --template dashboard \
  --package-manager pnpm \
  --database-driver pg \
  --billing stripe \
  --auth email-password+github \
  --email-provider resend \
  --deploy-target vercel \
  --seed-demo-data yes \
  --ai-tools cursor,claude
```
