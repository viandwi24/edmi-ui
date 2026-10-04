# Upgrading Edmi UI

Components are copied into the project by the framework's shadcn CLI, so there is no `npm update` for them. The Pages registry URL (`https://viandwi24.github.io/edmi-ui/r/<framework>/{name}.json`) always serves the latest release. Pinned CDN URLs serve a fixed range: `https://cdn.jsdelivr.net/npm/@edmi-ui/registry-<framework>@0/r/<name>.json` is the latest 0.x, `@0.3.0` is exactly 0.3.0. The `@edmi-ui/tokens` npm package updates with the package manager as usual (`npm update @edmi-ui/tokens`, `pnpm update`, `yarn up`, `bun update`).

Before 1.0 a minor bump (0.2 to 0.3) may contain breaking changes. Always read the changelog first: https://viandwi24.github.io/edmi-ui/changelog/ (also GitHub Releases `v<version>`).

## Flow

1. Working tree clean (commit or stash user work). Upgrades are reviewed through `git diff`.
2. Read the changelog entries between the installed and the target version. Note removed or renamed items, changed props and token changes.
3. Preview (optional):
   - React (`shadcn`): `npx shadcn@latest add @edmi-ui/<name> --dry-run` previews without writing; `--diff` shows a diff for a file; `--view` shows file contents. Check `npx shadcn@latest add --help` for the installed CLI version.
   - Vue (`shadcn-vue`) and Svelte (`shadcn-svelte`) have no diff or dry-run flag. Do the upgrade on a scratch branch and use `git diff`.
4. Re-add with `--overwrite`:
   - Single items: `npx shadcn@latest add @edmi-ui/button @edmi-ui/card --overwrite`
   - Everything the project uses: `add @edmi-ui/theme @edmi-ui/all @edmi-ui/patterns @edmi-ui/ai-all --overwrite` (only the entry items it already installed).
   - Color theme: install `theme-<base>-<accent>` again after `theme` (it replaces the color variables, keeps the radius).
   - Vue: `npx shadcn-vue@latest add @edmi-ui/... --overwrite`.
   - Svelte (URLs): `npx shadcn-svelte@latest add https://viandwi24.github.io/edmi-ui/r/svelte/theme.json https://viandwi24.github.io/edmi-ui/r/svelte/all.json --overwrite` (`bunx --bun` with bun).
   - Use the project's package manager (`pnpm dlx`, `yarn dlx`, `bunx`).
5. Review `git diff`: re-apply local customisations to overwritten files, check changelog-listed renamed/removed items and prop changes in call sites.
6. Run typecheck and build; check light and dark and any raised surfaces.
7. Pinned CDN users: change the version in the URL (`@0.2.0` to `@0.3.0`, or the range `@0`). React and Vue that pinned the namespace in `components.json` `registries` change the URL there too.

## Rules for the agent

- Never overwrite blindly over files the user edited: show the diff first, or work on a branch.
- Keep the same `iconLibrary` (`components.json`) so icons are rewritten the same way.
- New dependencies of newer versions are installed by the CLI; if install is skipped (`--no-deps-install` on Svelte), run the package manager.
- To make future upgrades painless, customise through wrapper components or `className` at call sites instead of editing installed files.
- After a theme change, also update `@edmi-ui/tokens` if the project imports it directly.
