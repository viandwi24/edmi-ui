# Edmi UI - React example (Stockbreak Markets)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/viandwi24/edmi-ui/tree/main/examples/react)

- Run: `bun install && bun run dev` (from the repo root or this folder).
- Scaffold: `bun create vite react --template react-ts`, then `shadcn init --base base --preset nova` (icon library set to phosphor).
- Edmi was installed with the CLI only, via `examples/install.sh react` (`shadcn registry add @edmi=...`, `shadcn add @edmi/theme @edmi/all ... --overwrite`).
- Shell: Dashboard (Sidebar `collapsible="icon"`) and Navbar layouts, picked from a first-visit toast and kept in a cookie; theme toggle sets `.dark` and a cookie.
- Page: `src/pages/markets.tsx` with mock data in `src/data/markets.ts`; it does not depend on the shell.
