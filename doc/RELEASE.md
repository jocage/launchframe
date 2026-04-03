# Launchframe Release Guide

## Goal

Release `create-launchframe` in a controlled way without depending on blind latest-version drift.

## Version Policy

- version the published CLI package in `apps/cli/package.json`
- treat dependency updates as intentional maintenance, not as part of every release
- only publish after the verified matrix is green
- use semver conservatively:
  - patch: packaging fixes, docs, non-breaking template fixes
  - minor: new scaffold options, new modules, new templates, additive generated files
  - major: breaking generated output contracts, removed options, incompatible module model changes

## Tested Matrix Contract

Before release, verify at minimum:

- `pnpm smoke:verify:blank`
- `pnpm smoke:verify:dashboard`
- `pnpm smoke:verify:postgresjs`

And verify publish packaging:

- `pnpm cli:pack`
- tarball install outside the monorepo
- generated app from tarball passes `install`, `lint`, `typecheck`, `test`, and `build`

## Release Checklist

1. Update `apps/cli/package.json` version.
2. Review dependency changes and confirm the tested matrix still matches reality.
3. Run:

```bash
pnpm smoke:verify:blank
pnpm smoke:verify:dashboard
pnpm smoke:verify:postgresjs
pnpm cli:pack
pnpm cli:publish:dry-run
```

4. Inspect the tarball contents.
5. Confirm README and docs match the shipped behavior.
6. Create or update release notes.
7. Trigger the GitHub Actions release workflow in dry-run mode.
8. Trigger the same workflow with publish enabled once dry-run is clean.

## Publish Inputs

Required GitHub Actions secret:

- `NPM_TOKEN`

Recommended repository settings:

- npm provenance enabled
- package visibility intended for public install

## Upgrade Strategy

Do not auto-upgrade generated apps by guessing.

Near-term strategy:

- maintain a tested dependency matrix in repo docs
- ship manual upgrade notes in release notes
- keep `launchframe.json` as the future contract for a real `upgrade` command

Future upgrade command should:

- read `launchframe.json`
- detect installed base/preset/modules
- apply only compatible file transforms
- report manual follow-ups clearly

## Dry-Run Commands

Local packaging dry run:

```bash
pnpm cli:pack
pnpm cli:publish:dry-run
```

## Current Known Caveat

If `auth=email-password+github` is selected without real GitHub OAuth env vars, Better Auth will warn during `next build`. This does not currently fail the build.
