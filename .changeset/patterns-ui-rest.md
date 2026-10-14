---
"@edmi-ui/registry-react": minor
"@edmi-ui/registry-vue": minor
"@edmi-ui/registry-svelte": minor
---

Patterns standardisation (kanban-column, feed-post, code-block, task-list, pricing-plan, feature-row, step-card, site-footer, allocation-bar).

Migration:
- `footer` is now `site-footer` (component `SiteFooter` and `data-slot` unchanged). `add @edmi-ui/footer` still works for one version as a deprecated alias that installs `site-footer`. Update imports: React `components/site-footer/site-footer`, Vue/Svelte `site-footer` folder (was `footer`).
- React `KanbanColumn` gains `elevation` and hands it to `KanbanItem` through context (item prop, then column, then scope), like Vue and Svelte. Vue's injection key is now the exported symbol `KANBAN_COLUMN_KEY` (new file `kanban-column/context.ts`) instead of the string `'kanbanColumn'`.
- Every card-based pattern declares `elevation` in its own props in all ports. React pattern files are `registry:block` files (previously `registry:component` for the second half).
- Vue/Svelte parity: `FeedPostIndex` title, `CodeBlock` title and `Task` title/agent accept rich content (Vue slots `title` / `agent`, Svelte `string | Snippet`). Svelte pattern roots expose a bindable `ref`.
