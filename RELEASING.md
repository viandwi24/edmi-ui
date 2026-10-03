# Releasing

Zero repository secrets: only `GITHUB_TOKEN` and npm Trusted Publishing (OIDC).

## Normal flow
1. Merge PRs that contain changesets into `main`.
2. `release.yml` opens/updates the "Version Packages" PR.
3. Merge it: the workflow runs `gen:strict`, `build:registry`, `pack:registries`, `changeset publish`
   (4 packages: `@edmi-ui/tokens`, `@edmi-ui/registry-{react,vue,svelte}`, with provenance), then creates ONE GitHub
   Release `v<version>` (tag + title `v<version>`, body from `bun run release:notes <version> <file>`, which merges the
   four CHANGELOGs). Changesets' per-package tags/releases are disabled (`create-github-releases: false`,
   `push-git-tags: false`). Old per-package releases/tags (`@edmi-ui/registry-*@0.1.0`, tokens) can be deleted
   manually in the GitHub UI. `pages.yml` redeploys the docs and latest registries.

Registries via CDN: `https://cdn.jsdelivr.net/npm/@edmi-ui/registry-<fw>@<major>/r/<name>.json`.

## One-time setup (manual, in this order)
1. **Git remote** (none exists yet):
   `git remote add origin git@github.com:viandwi24/edmi-ui.git && git push -u origin main`.
2. **Pages**: repo Settings, Pages, Source = **GitHub Actions**.
3. **First publish of each package, locally** (a package must exist on npm before a Trusted Publisher can be
   configured). Log in with `bunx npm login`, then:
   ```bash
   bun install --frozen-lockfile
   bun run gen:strict && bun run build:registry && bun run pack:registries
   (cd packages/tokens && bunx npm publish --access public)
   (cd packages/registry-react && bunx npm publish --access public)
   (cd packages/registry-vue && bunx npm publish --access public)
   (cd packages/registry-svelte && bunx npm publish --access public)
   ```
   The `@edmi-ui` npm org must exist and you must own it (the org `edmi` is taken; the shadcn registry namespace `@edmi` is unrelated to npm).
4. **Trusted Publisher** for each of the 4 packages: npmjs.com, package, Settings, Trusted Publisher,
   GitHub Actions: owner `viandwi24`, repository `edmi-ui`, workflow `release.yml`. (4 packages, 4 forms, no tokens.)
5. Verify Settings, Secrets stays empty, the packages show the provenance badge after the first CI release,
   and `shadcn add https://cdn.jsdelivr.net/npm/@edmi-ui/registry-react@0/r/button.json` works.

Note: `release.yml` uses `actions/setup-node` + `npm i -g npm@latest` solely for the OIDC publish
(Trusted Publishing needs npm >= 11.5.1). Everything else is bun.
