# Modules

This directory contains the first module registry for Launchframe.

Current status:

- modules are resolved and written into `launchframe.json`
- generation still uses the verified template flow
- modules can now contribute token replacements, pruning rules, and file overlays
- `dashboard-shell` is the first module that contributes actual app files, currently `/settings` and its dashboard visual theme layer

The first module slice is intentionally small:

- `quality-baseline`
- `testing-baseline`
- `auth-core`
- `db-pg`
- `db-postgresjs`
- `billing-stripe`
- `billing-polar`
- `email-resend`
- `dashboard-shell`
