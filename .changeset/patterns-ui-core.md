---
"@edmi-ui/registry-react": minor
"@edmi-ui/registry-vue": minor
"@edmi-ui/registry-svelte": minor
---

UI patterns brand-neutral pass (`site-header`, `app-header`, `join-panel`, `index-row`, `leaderboard-podium`, `agent-card`, `stat-tile`, `ticker-strip`, `watchlist-item`, `layout-picker`) plus shared elevation helpers.

- `elevation` item: new exports `surfaceElevation` (surface class map by level) and `controlLevel(elevation)` (depth a container hands to its controls). Additive; patterns no longer carry local copies.
- Stockbreak defaults removed from the registry sources: `SiteHeader` / `SiteHeaderBrand` / `AppHeader` have no default `name` (the brand text is not rendered when empty), `AppHeader` has no default `network`, `JoinPanel` has no default `currency` (the unit is shown only when set), `AgentCard` `autopilot` is replaced by `status`.
- Neutral data names: `IndexRowData` `tokens` -> `avatars`, `creator` -> `owner`, `aum` -> `value`, `holders` -> `count`; `PodiumEntry` `creator` -> `owner`, `aum` -> `value`, `holders` -> `count`. `IndexRowHeader` takes a `labels` prop (`name`, `owner`, `price`, `change`, `value`, `count`, `trend`; defaults `Name`, `Owner`, `Price`, `Change`, `Value`, `Count`, `Trend`, replacing the hard-coded `Index`, `Creator`, `7d`, `AUM`, `Holders`, `30d`). `LeaderboardPodium` takes `valueLabel` / `countLabel` for the cards footer (defaults `Value` / `Count`, replacing `AUM` / `Holders`).
- `LeaderboardPodium` now renders the `Sparkline` of `index-row` and the `AllocationBar` of `allocation-bar` (new registry dependencies, same look). `AllocationBar` gains an additive `size` prop (`default` | `sm`).
- Declared `elevation`: `AgentCard`, `StatTile`, `StatStrip` and `TickerStrip` declare it in their own props in every port and forward it to the card. `index-row` is documented as flat only.
- Prop parity: `SiteHeader` / `SiteHeaderBrand` `name` and `lead`, `AppHeader` `name`, `network`, `connectLabel`, `JoinPanel` `label`, `maxLabel`, `joinLabel`, `footnote`, row labels and values, `StatTile` `deltaLabel`, `StatStripItem`, `AgentCard` `status` and stat values are slots in Vue and `string | Snippet` in Svelte (strings still work). `AgentCard` Svelte root exposes `ref`.
- Callbacks: Vue `LayoutPickerToast` uses `v-model` (`update:modelValue`) instead of the `value-change` event; Svelte `LayoutPickerToast` gets `bind:value` next to `onValueChange`.
- Fixes: `AppHeaderNavItem` padding is `px-3` in every port (Vue and Svelte were 11px); Svelte header marks use a transparent border like React and Vue. `"use client"` added to `site-header`, `app-header`, `join-panel` and `watchlist-item`.

Migration:
- Pass `name="Your brand"` to `SiteHeader`, `SiteHeaderBrand`, `AppHeader`, `network="..."` to `AppHeader` and `currency="..."` to `JoinPanel` where you relied on the old defaults.
- Rename data fields: `tokens` -> `avatars`, `creator` -> `owner`, `aum` -> `value`, `holders` -> `count` (IndexRow data and podium entries) and pass `labels` / `valueLabel` / `countLabel` for the old column names.
- Replace `<AgentCard autopilot />` with `<AgentCard status="Autopilot" />`.
- Vue: replace `@value-change` on `LayoutPickerToast` with `v-model`.
