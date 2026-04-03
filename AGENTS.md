# Repository Guidance

## Purpose

This repository builds `create-launchframe`, an opinionated SaaS starter generator for Next.js 16.

## Current Shape

- `apps/cli`: CLI generator (`create-launchframe`, published to npm)
- `apps/docs`: documentation site (Fumadocs)
- `templates/base-web`: shared project skeleton with token placeholders
- `presets/`: curated module bundles (`blank.json`, `dashboard.json`)
- `modules/`: composable capabilities (auth, db, billing, email, deploy, AI DX, dashboard-shell)
- `scripts/`: smoke generation + verification
- `doc/`: product spec and design docs

## Working Rules

- keep route files thin
- keep template logic separate from generator logic
- prefer explicit placeholders over hidden code transforms
- generated projects should be easy for humans and coding agents to traverse
- do not change import order in existing files

## Near-Term Priorities

1. AI features module (Vercel AI SDK, streaming chat, provider abstraction)
2. improve social-auth path (suppress warnings when OAuth envs are absent)
3. deepen generated product surfaces without bloating the baseline
4. safe `upgrade` path from `launchframe.json` manifest
