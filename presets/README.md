# Presets

Presets are curated bundles of modules.

Current presets:

- `blank`
- `dashboard`

For now, the CLI still copies the matching verified template, but preset resolution already determines the module manifest written into generated apps.

Each preset now also tracks its `overrideFiles` relative to `templates/base-web`, which makes the shared-vs-specific boundary explicit before full preset assembly is introduced.
