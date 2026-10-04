# Contributing to Edmi UI

Bun (1.4+) is the only package manager and runtime for developing this repo (`bun install`, `bunx <cli>`); Node, npm, pnpm and yarn are not used here. Users of Edmi UI may use any package manager.

## Layout
- `packages/tokens` — published tokens, Tailwind theme, recipes.
- `packages/{react,vue,svelte}` — private registry sources (never published; users get files via the shadcn CLIs).
- `packages/registry-{react,vue,svelte}` — publish wrappers holding the built `r/*.json` (generated, gitignored).
- `registry.manifest/` — single source of truth for items; `bun run gen` writes each port's `registry.json`.
- `apps/docs` — Astro/Starlight docs, `examples/*` — example apps, `scripts/smoke/*` — install smoke tests.

Per-port rules: [packages/react/CONTRIBUTING.md](packages/react/CONTRIBUTING.md) (and the Vue/Svelte equivalents
where present). Design rules are on the docs [Rules page](https://viandwi24.github.io/edmi-ui/getting-started/rules/). Repo conventions, the decisions log, the new-component playbook and guidance for AI agents are in [AGENTS.md](AGENTS.md).

## Everyday commands
`bun run gen:strict` · `bun run typecheck` · `bun run lint` · `bun test` · `bun run build:registry` · `bash scripts/smoke/all.sh`

## Working in parallel
Keep changes scoped to what your task needs; avoid editing shared files (`package.json`, `bun.lock`,
`.github/**`, `registry.manifest/index.ts`) unless the task is about them. Stage explicit paths (no
`git add -A`), one commit per component. Generated `registry.json` and `apps/docs/public/r/**` are
gitignored and never hand-edited.

## Versioning (Changesets)
Every user-visible change needs a changeset: `bunx changeset`. Tokens and the three registry packages are one
fixed group, so they always share a version. Pick the bump by impact:

- **patch** — styling fix inside a component, docs, a new ✦ variant that only adds a value.
- **minor** — new component, new token, new prop/variant.
- **major** — token renamed/removed, variant/prop removed, a default look change that breaks existing layouts,
  primitive library change (e.g. Radix to Base UI).

Pre-1.0 (`0.x`): minor may be breaking. Private source packages, docs and examples are in the changeset
`ignore` list; list `@edmi-ui/tokens` (or a `@edmi-ui/registry-*`) in your changeset, not those.

Release process: see [RELEASING.md](RELEASING.md).
