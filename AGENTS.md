# Repository Guidance

## Purpose

This repository builds `create-launchframe`, an opinionated SaaS starter generator for Next.js 16.

## Current Shape

- `apps/cli`: starter CLI
- `templates/blank`: minimal generated app template
- `templates/dashboard`: dashboard-oriented generated app template
- `doc`: product and implementation docs

## Working Rules

- keep route files thin
- keep template logic separate from generator logic
- prefer explicit placeholders over hidden code transforms
- generated projects should be easy for humans and coding agents to traverse

## Near-Term Priorities

1. make template generation reliable
2. keep placeholders explicit and documented
3. build out the `blank` template first
4. add auth, db, billing, testing, and CI incrementally
