# __PROJECT_NAME__

Generated with Launchframe using the `__TEMPLATE_NAME__` template.

## Quick Start

```bash
__INSTALL_COMMAND__
__RUN_DEV_COMMAND__
```

Generated settings:

- package manager: `__PACKAGE_MANAGER_NAME__`
- database driver: `__DATABASE_DRIVER__`
- billing provider: `__BILLING_PROVIDER__`
- email provider: `__EMAIL_PROVIDER__`
- deploy target: `__DEPLOY_TARGET__`
- demo seed data: `__SEED_DEMO_DATA__`

## Current State

This is the __README_STATE_COPY__.

Included:

- Next.js 16 app shell
- strict TypeScript baseline
- __README_HIGHLIGHT_BULLET__
- flat ESLint config with strict rules
- Prettier config
- validated env entrypoint with Zod
- Drizzle ORM baseline with PostgreSQL via `__DATABASE_DRIVER__`
- migration and seed scripts
- Better Auth baseline with email/password sign-in and sign-up
- __README_PROTECTED_ROUTES_BULLET__
- billing provider abstraction with `__BILLING_PROVIDER__` as the configured default
- billing page and webhook route skeletons
- `__EMAIL_PROVIDER__` email service layer and email template placeholders
- protected `/email` page for test sends
- Vitest and Playwright baseline with example tests
- GitHub Actions CI workflow for lint, typecheck, test, and build
