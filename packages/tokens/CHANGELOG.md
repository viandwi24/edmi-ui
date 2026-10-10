# @edmi-ui/tokens

## 0.5.0

### Minor Changes

- f3ff650: Edmi Chart Kit core (handoff v6): `chart` is restyled in all three ports with the floating tooltip (`indicator` dot, line, dashed, none), the centered legend, a solid hairline grid, 12px sans axis text and the validated dark chart palette. New additive export `ChartStatWell` to switch the series of interactive charts. `@edmi-ui/tokens` ships the new `chart.css` reference export.
- 78e2d40: Dark mode chart colours are now validated global tokens: `--chart-1…5` in `.dark` are re-stepped to one lightness (green `#3eab5e`, blue `#5a8ff3`, amber `#c0851f`, violet `#957ee5`, rose `#e75e6a`) so series stay distinct and readable on dark surfaces, including for colour-blind readers. The Ocean theme gets its own validated dark set (`#5a8ff3`, `#00aaab`, `#c0851f`, `#957ee5`, `#e75e6a`). Theme items (`theme`, `theme-<base>-<accent>`) carry the new values; re-run `add @edmi-ui/theme --overwrite` (and your theme item) to pick them up. Anything else using `--chart-N` in dark (sparklines, avatar colours, code highlighting) uses the new colours too.

## 0.4.0

### Minor Changes

- 67cdd10: Elevation system v4 (foundation). New tokens (`--bv-*` bevel, `--sk-*` sunken, `--r1-*` / `--fl-*` button faces), dark ladder B for the stone base, and the new Tailwind shadow utilities (`shadow-raised`, `shadow-floating`, `shadow-sunken`, `shadow-btn-raised-*`, `shadow-btn-float-*`, `shadow-pressed`, ...). New item `@edmi-ui/elevation` (`ElevationProvider`, `useElevation`, `resolveElevation`, `ROLE_LEVEL`) that components use to resolve their `elevation` prop; wrap an app or subtree in `<ElevationProvider mode="layered">` to give every role its default depth.
  
  Migration (breaking, 0.x): the boolean `raised` prop is replaced by `elevation="auto" | "sunken" | "flat" | "raised" | "floating"` as components are updated (`raised` becomes `elevation="raised"`); hard lips are replaced by a bevel, and the legacy lip tokens stay only for compatibility. The `theme` item's base rule now targets `[data-elevation=raised], [data-elevation=floating]` instead of `[data-raised]`. Re-run `add @edmi-ui/theme --overwrite` and your component installs.
- 081cdb8: Elevation guide, migration notes and the v4 cleanup. This release replaces the boolean `raised` prop with the elevation system across every component (see the foundation and component changesets); this change documents it and finishes the rollout.
  
  How elevation works. Depth is one prop, `elevation="auto" | "sunken" | "flat" | "raised" | "floating"` (default `auto`), with four levels: `sunken` (-1, a soft inset well), `flat` (0, the plain shadcn look and still the default), `raised` (+1, a bevel: inner rim, top highlight and a hairline, no hard lip) and `floating` (+2, the bevel plus one soft drop). `auto` resolves from the component's own prop, then the nearest `ElevationProvider`, then flat. Depth expresses role, not decoration: filled buttons, cards and handles rise, fields sink, popovers, menus, dialogs and the chat composer float, everything else stays flat. Wrap an app or subtree in `<ElevationProvider mode="layered">` and every role takes its default level; an explicit prop always wins. Levels are relative to the parent (a card inside a raised card drops to flat), and only the active part of tabs, toggle groups, pagination, calendars, switches and sliders rises. A button group at `floating` floats as one plate. Pressed sinks 1px, and dark mode uses a clearer surface ladder.
  
  Migration from 0.2 (breaking, no alias): replace `raised` with `elevation="raised"` (Vue `:raised="x"` becomes `:elevation="x ? 'raised' : 'flat'"`, Svelte `raised={x}` becomes `elevation={x ? "raised" : "flat"}`), `<Toaster raised />` with `<Toaster elevation="raised" />`, a raised composer with `elevation="floating"`, and an app that was raised by hand with one `<ElevationProvider mode="layered">`. Delete hand-written lip shadows and `-lip` border colours. Re-run `add @edmi-ui/theme @edmi-ui/elevation --overwrite` and re-add the components you use with `--overwrite`; the `theme` base rule now keys off `[data-elevation=raised], [data-elevation=floating]`. Docs and demo names moved from `<name>-raised` to `<name>-elevation`.
  
  Docs and tooling: new Getting Started guide "Elevation" (philosophy first), updated Rules, Theming (new `--bv-*`, `--sk-*`, `--r1-*`, `--fl-*` tokens and the dark ladder), Installation and Upgrading pages; the landing page and Themes page toggle is now Flat / Layered; the agent skill reference `raised.md` became `elevation.md`; the example apps (Stockbreak layered, Layerbeat with explicit levels) and every docs example thumbnail were regenerated.

### Patch Changes

- e930b30: Docs: v4 README hero image (flat vs layered elevation) and an OpenGraph/Twitter social card for every docs page.
- 9498e7d: Docs: the Themes page is now a theme builder with extra base colors and accents plus a custom accent colour (docs only; the shipped themes are unchanged).
- 75e0344: Docs: the Themes page Customize panel is now an inset panel with segmented two-option controls, and the live preview has consistent spacing.
- baa239e: Docs: compact example viewer bar (Back link, icon controls with tooltips, theme popover, more menu).
- 49afa76: Docs and installed example apps: the inset sidebar shell now keeps the viewport fixed and scrolls only inside the rounded panel.
- 5aa1432: Docs site fixes: portalled overlays clickable over the right sidebar, inline code in page subtitles, consumer-accurate component source, hash anchors after hydration, inert index thumbnails.
- f905300: Docs landing page rebuilt from the v4 handoff: cleaner hero, live preview toolbar with Flat / Layered, canonical links.
- 3169b00: Docs: the Themes page is a one-screen two-column app (floating customizer sidebar with option rows, Copy CSS and Install, plus an internally scrolling preview) and the example viewer is full screen with a floating top bar, Code drawer and Info popover.

## 0.3.0

### Minor Changes

- af4dbae: Add the `edmi-ui` agent skill (`npx skills add viandwi24/edmi-ui`) for Claude Code, Cursor, Codex and other agents: install flows, theming, when to use `raised`, the component catalog, the AI pack and upgrading. New docs pages: Agent skills and Upgrading.
- 5575840: v3 tokens: white light card, solid soft tints

### Patch Changes

- 637c3d4: Tokens: explicit `base/stone.css` and `themes/green.css` (the default values) so a nested scope can switch back to the defaults. Vue: `Switch` and `Checkbox` honour a bare `default-value` attribute.
- 0ef4b2e: Select: vertically center leading icons/dots in item text.

## 0.2.0

### Minor Changes

- 0027f42: The shadcn registry namespace is now `@edmi-ui` (was `@edmi`), matching the npm scope: `shadcn add @edmi-ui/button`, `registries: { "@edmi-ui": "…/r/react/{name}.json" }`. Breaking for existing installs: rename the `@edmi` key in your `components.json` registries to `@edmi-ui`.
- 05abb58: Edmi UI spec v2.1. New tokens `outline-hi/face/lip` and `success-soft/text`; dark `lip`, `lip-strong`, `secondary-lip` are now visible grays instead of near-black. Outline `raised` (Button, Toggle, toggle-group) uses the outline gradient and gray lip. New `success` variant on Badge and Alert; positive values (table `trend="up"`, deltas, success toast, done states) use `success` instead of `brand`. New `base/slate.css` and `themes/ocean.css` (exports `@edmi-ui/tokens/base/slate.css`, `@edmi-ui/tokens/themes/ocean.css`).
- 0b5a035: Registry themes for every base x accent: `theme-stone-green`, `theme-stone-ocean`, `theme-slate-green`, `theme-slate-ocean` (`registry:theme`, complete light + dark color tokens, replace `:root`/`.dark` on install; radius is left alone). Bases and accents are auto-discovered from `src/base/*.css` and `src/themes/*.css`. `@edmi-ui/tokens/css-vars` gains `listBases`, `listThemes`, `composeCssVars`, `themeItemCssVars` and `themeToCss`. Docs get a Themes customizer page and a runtime theming guide.

## 0.1.0

### Minor Changes

- 6e0ab1e: Vue and Svelte ports of button-group, toggle, toggle-group and kbd.
- 6e0ab1e: Svelte port of the conversation group: bubble, message, marker, message-scroller, questionnaire (built from the recipes on Svelte 5 runes; no shadcn-svelte equivalent).
- 6e0ab1e: Vue port of the conversation group: bubble, message, marker, message-scroller, questionnaire.
- 6e0ab1e: Vue and Svelte ports of table, chart and data-table.
- 6e0ab1e: Vue and Svelte ports of skeleton, progress, aspect-ratio, avatar, item, empty and attachment.
- 6e0ab1e: Vue and Svelte ports of separator and spinner.
- 6e0ab1e: Vue and Svelte ports of checkbox, radio-group, switch, slider, calendar (with RangeCalendar) and date-picker (DatePicker, DateRangePicker).
- 6e0ab1e: Vue and Svelte ports of the forms-text group: label, textarea, native-select, input-otp, input-group, field, select, combobox.
- 6e0ab1e: Port the layout group (accordion, collapsible, resizable, scroll-area, carousel, direction) to Vue and Svelte.
- 6e0ab1e: Port the navigation group to Vue and Svelte: breadcrumb, pagination, dropdown-menu, context-menu, menubar, navigation-menu, command, sidebar and the use-mobile hook (Svelte only; Vue uses `useMediaQuery` from @vueuse/core).
- 6e0ab1e: Vue and Svelte ports of popover and dialog.
- 6e0ab1e: Svelte ports of alert, alert-dialog, sheet, drawer (vaul-svelte), sonner, tooltip and hover-card.
- 6e0ab1e: Vue ports of alert, alert-dialog, sheet, drawer (Reka), sonner, tooltip and hover-card.
- 6e0ab1e: Vue and Svelte ports of the first patterns blocks: site-header, app-header, stat-tile, ticker-strip, index-row, watchlist-item, allocation-bar, join-panel, leaderboard-podium, layout-picker.
- 6e0ab1e: React actions: button-group, toggle, toggle-group, kbd.
- 6e0ab1e: React conversation: bubble, message, marker, message-scroller, questionnaire.
- 6e0ab1e: React `table` and `chart` components (data group): mono right-aligned numeric cells with up/down trend colours, and a Recharts ChartContainer with Edmi tooltip/legend.
- 6e0ab1e: React display: aspect-ratio.
- 6e0ab1e: React display: attachment.
- 6e0ab1e: React display: avatar.
- 6e0ab1e: React display: card.
- 6e0ab1e: React display: empty.
- 6e0ab1e: React display: inset-panel.
- 6e0ab1e: React display: item.
- 6e0ab1e: React display: progress.
- 6e0ab1e: React display: separator.
- 6e0ab1e: React display: skeleton.
- 6e0ab1e: React display: spinner.
- 6e0ab1e: Add the React `calendar` component (forms-choice group).
- 6e0ab1e: Add the React `checkbox` component (forms-choice group).
- 6e0ab1e: Add the React `date-picker` block (DatePicker, DateRangePicker with presets).
- 6e0ab1e: Add the React `radio-group` component (forms-choice group).
- 6e0ab1e: Add the React `slider` component (forms-choice group).
- 6e0ab1e: Add the React `switch` component (forms-choice group).
- 6e0ab1e: React forms-text: combobox.
- 6e0ab1e: React forms-text: field.
- 6e0ab1e: React forms-text: input-group.
- 6e0ab1e: React forms-text: input-otp.
- 6e0ab1e: React forms-text: label.
- 6e0ab1e: React forms-text: native-select.
- 6e0ab1e: React forms-text: select.
- 6e0ab1e: React forms-text: textarea.
- 6e0ab1e: Add React layout components: accordion, collapsible, resizable, scroll-area, carousel, direction.
- 6e0ab1e: React navigation: command (cmdk palette and dialog).
- 6e0ab1e: React navigation: breadcrumb, pagination, dropdown-menu, context-menu, menubar, navigation-menu.
- 6e0ab1e: React navigation: sidebar (variants sidebar, floating, inset; collapsible offcanvas, icon, none) and the use-mobile hook.
- 6e0ab1e: React overlays: alert-dialog.
- 6e0ab1e: React overlays: alert.
- 6e0ab1e: React overlays: dialog.
- 6e0ab1e: React overlays: drawer.
- 6e0ab1e: React overlays: hover-card.
- 6e0ab1e: React overlays: popover.
- 6e0ab1e: React overlays: sheet.
- 6e0ab1e: React overlays: sonner.
- 6e0ab1e: React overlays: tooltip.
- 6e0ab1e: React patterns: allocation-bar block.
- 6e0ab1e: React patterns: app-header block.
- 6e0ab1e: React patterns: index-row block.
- 6e0ab1e: React patterns: join-panel block.
- 6e0ab1e: React patterns: layout-picker block.
- 6e0ab1e: React patterns: leaderboard-podium block.
- 6e0ab1e: React patterns: site-header block.
- 6e0ab1e: React patterns: stat-tile block.
- 6e0ab1e: React patterns: ticker-strip block.
- 6e0ab1e: React patterns: watchlist-item block.
- 6e0ab1e: React patterns: agent-card block.
- 6e0ab1e: React patterns: code-block block.
- 6e0ab1e: React patterns: feature-row block.
- 6e0ab1e: React patterns: feed-post block.
- 6e0ab1e: React patterns: footer block.
- 6e0ab1e: React patterns: kanban-column block.
- 6e0ab1e: React patterns: pricing-plan block.
- 6e0ab1e: React patterns: step-card block.
- 6e0ab1e: React patterns: task-list block.
- 6e0ab1e: React pilot components (button, badge, card, inset-panel, tabs, input), the `utils` lib item and the React registry build. Bumps `@edmi-ui/tokens` because it is the only published package until plan 10 adds the registry packages.
- 6e0ab1e: Svelte registry pilot: button, badge, card, inset-panel, tabs and input for shadcn-svelte (Bits UI, tailwind-variants).
- 6e0ab1e: Edmi UI spec v2: tokens, Tailwind theme, `recipes.ts` and `kit.css` now come from `refs/edmi-ui`. Breaking default look: every component recipe is flat by default (no gradient, lip or hard shadow) and the one-step 3D look is opt-in with a `raised` variant. `--shadow-btn-*` tokens lost the inner bottom shade, control height is 36px (`h-9`), and Tabs gained a `pills` list variant.
- 6e0ab1e: Spec v2 finalize: WatchlistItem accepts `raised` in Vue and Svelte (parity with React), raised demos for every component.
- 6e0ab1e: React registry v2: components are flat by default; `raised` opt-in adds the one-step 3D look (Button, Toggle, ToggleGroup, Kbd, Select, NativeSelect, Checkbox, Switch, Slider, Calendar, Card, InsetPanel, Empty, Dialog, AlertDialog, Popover, Toaster, Menubar, Pagination, Tabs incl. new `pills` list variant, Questionnaire, BubbleReactions, DataTable and patterns). Control height is now h-9.
- 6e0ab1e: Svelte port follows Edmi UI spec v2: every component is flat by default and gains an opt-in `raised` prop (Button, Toggle, ToggleGroup, Kbd, Select/NativeSelect, Checkbox, Switch, Slider, Calendar/RangeCalendar, choice cards via FieldLabel/Questionnaire/LayoutPicker, Card, InsetPanel, Empty media, Dialog, AlertDialog, Popover, Toaster, Menubar, Pagination, Tabs (+ `TabsList variant="pills"`), Bubble reactions, and the ✦ patterns). Control height is now `h-9`.
- 6e0ab1e: Vue port follows Edmi UI spec v2: every component is flat by default (h-9 controls, no gradients/lips/shadows) and gains an opt-in `raised` prop (Button, Toggle, ToggleGroup, Kbd, NativeSelect, SelectTrigger, Checkbox, Switch, Slider, Calendar/RangeCalendar, FieldLabel choice cards, Questionnaire, Card, InsetPanel, EmptyMedia, DialogContent, AlertDialogContent, PopoverContent, Toaster, Menubar, Pagination, TabsList/TabsTrigger, BubbleReactions and every pattern). `TabsList` gains `variant="pills"`.
- 6e0ab1e: Vue pilot: button, badge, card, inset-panel, tabs, input and the Vue registry build.

### Patch Changes

- 6e0ab1e: QA pass: slider thumb gets `background-origin: border-box`; dropdown-menu and context-menu radio/checkbox indicators move to the left slot (as in menubar and the kit board).
- 6e0ab1e: Svelte QA: sheet content styles (was empty, sheet rendered transparent), data-table page size always an option, slider thumb background-origin, lint cleanups.
- 6e0ab1e: React v2 QA: DatePicker/DateRangePicker `raised`, FieldLabel choice-card v2 look and `raised`, raised header marks use a single lip colour.
- 6e0ab1e: v2 QA: raised app-header / site-header logo mark uses the lip colour for its bottom border.
- 6e0ab1e: Vue v2 QA: DatePicker/DateRangePicker forward `raised`, FieldLabel choice card follows the v2 recipe, Menubar trigger padding, DataTable `raised`, header marks use `shadow-btn-primary`.
- 6e0ab1e: React forms-text: input docs demo and page.
- 6e0ab1e: Vue: icon imports resolve in the shadcn-vue icon map for every iconLibrary (checked by `scripts/smoke/vue-icons.ts`); `LayoutPickerToast` opens on the first visit.
