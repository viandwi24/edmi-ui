# Releasing

Zero repository secrets: only `GITHUB_TOKEN` and npm Trusted Publishing (OIDC).

## Normal flow
1. Merge PRs that contain changesets into `main`.
2. `release.yml` opens/updates the "Version Packages" PR.
3. Merge it: the workflow runs `gen:strict`, `build:registry`, `pack:registries`, `changeset publish`
   (4 packages: `@edmi-ui/tokens`, `@edmi-ui/registry-{react,vue,svelte}`, with provenance), then creates ONE GitHub
   Release `v<version>` (tag + title `v<version>`, body from `bun run release:notes <version> <file>`, which merges the
   four CHANGELOGs). Changesets' per-package tags/releases are disabled (`create-github-releases: false`,
   `push-git-tags: false`). `pages.yml` redeploys the docs and latest registries.

Registries via CDN: `https://cdn.jsdelivr.net/npm/@edmi-ui/registry-<fw>@<major>/r/<name>.json`.

## One-time setup (done)

The repository is `viandwi24/edmi-ui`, GitHub Pages uses the **GitHub Actions** source, the four packages were
published once by hand (a package must exist on npm before a Trusted Publisher can be configured; the `@edmi-ui` npm org
is owned by the maintainer) and each has an npm Trusted Publisher (owner `viandwi24`, repository `edmi-ui`, workflow
`release.yml`). Version 0.6.0 is published. Repository secrets stay empty.

After a release, check that the packages show the provenance badge and that
`shadcn add https://cdn.jsdelivr.net/npm/@edmi-ui/registry-react@0/r/button.json` works.

Note: `release.yml` uses `actions/setup-node` + `npm i -g npm@latest` solely for the OIDC publish
(Trusted Publishing needs npm >= 11.5.1). Everything else is bun.
