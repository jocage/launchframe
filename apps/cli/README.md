# create-launchframe

Opinionated SaaS starter CLI for Next.js 16.

Usage:

```bash
npx create-launchframe@latest my-app
```

Interactive mode asks for:

- template
- architecture
- package manager
- Postgres driver
- billing provider
- auth mode
- email provider
- deploy target
- seed demo data

Non-interactive example:

```bash
npx create-launchframe@latest my-app \
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
