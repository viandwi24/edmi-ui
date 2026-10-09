# @edmi-ui/registry-svelte

## 0.5.0

### Minor Changes

- f3ff650: Edmi Chart Kit core (handoff v6): `chart` is restyled in all three ports with the floating tooltip (`indicator` dot, line, dashed, none), the centered legend, a solid hairline grid, 12px sans axis text and the validated dark chart palette. New additive export `ChartStatWell` to switch the series of interactive charts. `@edmi-ui/tokens` ships the new `chart.css` reference export.
- 78e2d40: Dark mode chart colours are now validated global tokens: `--chart-1…5` in `.dark` are re-stepped to one lightness (green `#3eab5e`, blue `#5a8ff3`, amber `#c0851f`, violet `#957ee5`, rose `#e75e6a`) so series stay distinct and readable on dark surfaces, including for colour-blind readers. The Ocean theme gets its own validated dark set (`#5a8ff3`, `#00aaab`, `#c0851f`, `#957ee5`, `#e75e6a`). Theme items (`theme`, `theme-<base>-<accent>`) carry the new values; re-run `add @edmi-ui/theme --overwrite` (and your theme item) to pick them up. Anything else using `--chart-N` in dark (sparklines, avatar colours, code highlighting) uses the new colours too.
- 2a98b16: Fields now accept `elevation="raised"` and `"floating"` with a bevel face: Input, Textarea, Input Group, Input OTP (the group becomes one plate with 1px slot separators), Select trigger and Native Select. Input Group addons (e.g. a trailing `USDC` text) turn transparent at sunken, raised and floating, so the whole group reads as one plate. Focus swaps the bevel for the ring and invalid fields keep their destructive border at every level.

## 0.4.0

### Minor Changes

- 67cdd10: Elevation system v4 (foundation). New tokens (`--bv-*` bevel, `--sk-*` sunken, `--r1-*` / `--fl-*` button faces), dark ladder B for the stone base, and the new Tailwind shadow utilities (`shadow-raised`, `shadow-floating`, `shadow-sunken`, `shadow-btn-raised-*`, `shadow-btn-float-*`, `shadow-pressed`, ...). New item `@edmi-ui/elevation` (`ElevationProvider`, `useElevation`, `resolveElevation`, `ROLE_LEVEL`) that components use to resolve their `elevation` prop; wrap an app or subtree in `<ElevationProvider mode="layered">` to give every role its default depth.
  
  Migration (breaking, 0.x): the boolean `raised` prop is replaced by `elevation="auto" | "sunken" | "flat" | "raised" | "floating"` as components are updated (`raised` becomes `elevation="raised"`); hard lips are replaced by a bevel, and the legacy lip tokens stay only for compatibility. The `theme` item's base rule now targets `[data-elevation=raised], [data-elevation=floating]` instead of `[data-raised]`. Re-run `add @edmi-ui/theme --overwrite` and your component installs.
- 23a4d1e: Elevation (v4) for actions and forms: Button, Button Group, Toggle, Toggle Group, Badge, Kbd, Input, Textarea, Input Group, Input OTP, Native Select, Select trigger, Checkbox, Switch, Slider, Calendar, Date Picker and choice cards (`FieldLabel`) replace the boolean `raised` prop with `elevation="auto | sunken | flat | raised | floating"`. Depth is a bevel (no hard lips); only the active part rises on toggle groups, checkboxes, switches, sliders and calendars (elevation sits on the calendar shell). A floating Button Group floats as one plate.
  
  Migration: `<Button raised>` becomes `<Button elevation="raised">`; wrap an app area in `ElevationProvider mode="layered"` to give every role its default level. Installing these items now also installs the new `elevation` item.
- 4fc62ba: Display, overlay and navigation components move from `raised` to the v4 `elevation` prop (`sunken | flat | raised | floating`, default `auto`): Card, InsetPanel (body plate inset 2px from the shell, footer on the shell without a divider), EmptyMedia, Popover, Dialog, AlertDialog, DropdownMenu and ContextMenu content, Select content, Sonner Toaster, Tabs (only the active trigger rises), Pagination (only the active link rises) and Menubar. Hard lips are gone; raised is a bevel and floating adds one soft drop. A card inside a raised or floating surface resolves flat.
  
  Migration: replace `raised` with `elevation="raised"` (or `floating` for popovers, dialogs and toasts), or wrap a subtree in `ElevationProvider mode="layered"`. Components now depend on the `elevation` item.
- 5ee45ae: Elevation (v4) for conversation, patterns and data: `BubbleReactions` (chips), `Questionnaire` (every choice card and the text input), `DataTable` (toolbar and pagination controls; the table container stays flat) and every pattern (`AppHeader`, `SiteHeader`, `LayoutPicker`, `LayoutPickerToast`, `WatchlistItem`, `JoinPanel`, `LeaderboardPodium`, `TickerStrip`, `StatTile`, `StatStrip`, `PricingPlan`, `StepCard`, `TaskList`, `FeedPost`, `SiteFooter`, `FeatureRow`, `CodeBlock`, `AgentCard`, `KanbanColumn`) replace the boolean `raised` prop with `elevation="auto | sunken | flat | raised | floating"`. Patterns forward it to the Card and Button they render; the hard lips and the legacy `shadow-card`, `shadow-btn-*` and `shadow-sunk` classes are gone (kanban columns and layout wireframes use the sunken well tokens). Svelte `SiteHeader`'s `action` snippet now receives `{ elevation }` instead of `{ raised }`.
  
  Migration: `<StatTile raised>` becomes `<StatTile elevation="raised">`, `<BubbleReactions raised>` becomes `<BubbleReactions elevation="raised">`; wrap a page in `ElevationProvider mode="layered"` and drop the per-component props where the role default is what you want. These items now also install the `elevation` item.
- 4e1f6ed: The AI pack moves from `raised` to the v4 `elevation` prop (`sunken | flat | raised | floating`, default `auto`): PromptInput and ChatComposer (the composer plate is an overlay surface, floating in layered mode), Tool, Plan, Agent, Artifact, ArtifactCard and Node (cards, surface role), Confirmation (forwarded to the action buttons), Suggestion, SpeechInput and PromptInputSubmit (follow the Button levels). Hard lips and shadow tokens are gone from the AI sources; PromptInputSubmit no longer inherits depth from the composer.
  
  Migration: replace `raised` with `elevation="raised"` (the composer: `elevation="floating"`), or wrap the chat in `ElevationProvider mode="layered"` so every role takes its default. AI items now depend on the `elevation` item.
- 081cdb8: Elevation guide, migration notes and the v4 cleanup. This release replaces the boolean `raised` prop with the elevation system across every component (see the foundation and component changesets); this change documents it and finishes the rollout.
  
  How elevation works. Depth is one prop, `elevation="auto" | "sunken" | "flat" | "raised" | "floating"` (default `auto`), with four levels: `sunken` (-1, a soft inset well), `flat` (0, the plain shadcn look and still the default), `raised` (+1, a bevel: inner rim, top highlight and a hairline, no hard lip) and `floating` (+2, the bevel plus one soft drop). `auto` resolves from the component's own prop, then the nearest `ElevationProvider`, then flat. Depth expresses role, not decoration: filled buttons, cards and handles rise, fields sink, popovers, menus, dialogs and the chat composer float, everything else stays flat. Wrap an app or subtree in `<ElevationProvider mode="layered">` and every role takes its default level; an explicit prop always wins. Levels are relative to the parent (a card inside a raised card drops to flat), and only the active part of tabs, toggle groups, pagination, calendars, switches and sliders rises. A button group at `floating` floats as one plate. Pressed sinks 1px, and dark mode uses a clearer surface ladder.
  
  Migration from 0.2 (breaking, no alias): replace `raised` with `elevation="raised"` (Vue `:raised="x"` becomes `:elevation="x ? 'raised' : 'flat'"`, Svelte `raised={x}` becomes `elevation={x ? "raised" : "flat"}`), `<Toaster raised />` with `<Toaster elevation="raised" />`, a raised composer with `elevation="floating"`, and an app that was raised by hand with one `<ElevationProvider mode="layered">`. Delete hand-written lip shadows and `-lip` border colours. Re-run `add @edmi-ui/theme @edmi-ui/elevation --overwrite` and re-add the components you use with `--overwrite`; the `theme` base rule now keys off `[data-elevation=raised], [data-elevation=floating]`. Docs and demo names moved from `<name>-raised` to `<name>-elevation`.
  
  Docs and tooling: new Getting Started guide "Elevation" (philosophy first), updated Rules, Theming (new `--bv-*`, `--sk-*`, `--r1-*`, `--fl-*` tokens and the dark ladder), Installation and Upgrading pages; the landing page and Themes page toggle is now Flat / Layered; the agent skill reference `raised.md` became `elevation.md`; the example apps (Stockbreak layered, Layerbeat with explicit levels) and every docs example thumbnail were regenerated.

### Patch Changes

- 4529efd: Fix Questionnaire inactive steps and buttons rendering despite `hidden`, Vue calendar weekday header (Su Mo Tu), date picker closing on select, and demo fixes (React Select labels, checkbox indeterminate, field error value, toggle-group range).
- ac394fc: QA batch 2: Svelte Button open-state selector (no gray Close/Cancel), left-slot menu indicators in Svelte, Vue checkbox/radio items keep the menu open and the dropdown aligns to start, React tabs activate on focus, Vue command separator hides while searching, breadcrumb/pagination ellipsis icon, docs demo parity.
- 66425df: QA batch 3: data-table faceted filters use the scalar-safe `arrHas` filter fn, Vue rows-per-page shows the initial size, column labels via `meta.label`; layout-picker toast `defaultValue`; join-panel sanitises the amount input; React feature-row icon rotates when open, scroll-area bars show on hover; Vue carousel focus ring; app-header search hides by container width; site-header nav no longer wraps.
- 135aca0: AI pack QA fixes: inline citation trigger is an inline element in Vue, environment variable columns stay aligned without a Required badge, folder labels in file tree toggle on click, Vue message response renders without the fade by default, code block and JSX preview no longer trigger React hydration and render-phase warnings, artifact action forwards click handlers in Vue.
  
  Vue `MessageResponse` gains a `mode` prop (`"static"` default, `"streaming"` restores the word fade-in): pass `mode="streaming"` when you stream responses.
- a250849: QA batch 5 fixes for the AI pack: artifact card thumbnail is an inset tile, web preview and open-in-chat labels, Vue voice selector search and chat header menu alignment, Vue flow controls labels, snippet ellipsis.

## 0.3.0

### Minor Changes

- 788eb2c: Add the Svelte AI · Agent items: `ai-reasoning`, `ai-chain-of-thought`, `ai-tool` (raised), `ai-confirmation` (raised), `ai-sources`, `ai-inline-citation`, `ai-plan` (raised), `ai-task`, `ai-queue` and `ai-checkpoint`.
- 6016489: Add AI · Chat for Vue and Svelte: `ai-conversation`, `ai-message`, `ai-prompt-input`, `ai-suggestion`, `ai-attachments`, `ai-model-selector`, `ai-context` and `ai-shimmer`, ported from the React items (same anatomy, props and recipes; `raised` on prompt input and suggestion).
- 7567a68: Add AI · Code for Svelte: `ai-agent`, `ai-artifact` (both support `raised`), `ai-code-block`, `ai-commit`, `ai-environment-variables`, `ai-file-tree`, `ai-package-info` and `ai-jsx-preview` (a sandboxed markup renderer).
- 38b47b5: Add the Edmi AI pack: items named `ai-<name>` (chat, agent, code, runtime, voice and workflow components plus Edmi additions) and the `ai-all` aggregate, installed into `components/ai/`. React ships AI · Chat (`ai-conversation`, `ai-message`, `ai-prompt-input`, `ai-suggestion`, `ai-attachments`, `ai-model-selector`, `ai-context`, `ai-shimmer`) and the `ai-use-controllable-state` hook; Vue and Svelte ports follow. `all` and `edmi` never include AI items.
- 280c4b0: AI · Patterns (Svelte): ai-artifact-card, ai-artifact-stack, ai-artifact-viewer, ai-session-panel, ai-agent-avatar, ai-prompt-input-agent, ai-chat-composer, ai-chat-header.
- e39b4a9: Add AI · Runtime for Svelte: `ai-sandbox`, `ai-schema-display`, `ai-snippet`, `ai-stack-trace`, `ai-terminal` (always dark), `ai-test-results` and `ai-web-preview`.
- 6632b7a: Add AI · Voice for Svelte: `ai-audio-player`, `ai-mic-selector`, `ai-persona`, `ai-speech-input`, `ai-transcription`, `ai-voice-selector`.
- 4f422ae: Add the Edmi AI Workflow items for Svelte: `ai-canvas`, `ai-node` (with `raised`), `ai-edge`, `ai-connection`, `ai-controls`, `ai-panel`, `ai-toolbar`, `ai-image` and `ai-open-in-chat`, on Svelte Flow (`@xyflow/svelte`) and Bits UI.
- 74b9a7e: Additive ✦ features found while building the docs examples, in all three ports:
  
  - Queue: `variant="flat"`, `chevron={false}` on `QueueSectionLabel`, and the `QueueItemAvatar` / `QueueItemStatus` slots.
  - IndexRow: optional `rank` column (with `IndexRowHeader rank`) and `delta="pill"` for a soft tinted 7d delta.
  - LeaderboardPodium: `variant="cards"` (the Stockbreak top three) with optional `symbol`, `creator`, `change`, `spark`, `allocation`, `aum` and `holders` entry fields.
  - JoinPanel: Join / Redeem `tabs`, `quickAmounts` chips, `footnote`, `amountSize="lg"` and `maxLabel`; now depends on `tabs`.
  - AgentCard: footer content (React children, Vue default slot, Svelte `children` snippet).
  - PricingPlan: `featuresLead` row, and rich feature rows (Vue scoped slot `feature`, Svelte `feature` snippet).

### Patch Changes

- e884d95: AI items no longer carry a per-file header comment; third-party attribution stays in the repository's NOTICE and licenses.
- 6542242: Calendar: the "today" highlight is painted on the day button itself (same square and radius as the selected day) instead of the table cell, so it can no longer mismatch when a surrounding table style stretches or pads the cells.
- 942e520: Fix button group divider (uses the neighbouring variant's lip colour instead of a harsh `--input` line, Button now exposes `data-variant`) and input group controls (the control's own focus ring no longer paints a stray line over the inner divider; the outer group border and ring still change on focus).
- 502f48a: `ai-persona` (Vue, Svelte): load `@rive-app/webgl2` on the client only, so server rendering under Node (Nuxt, SvelteKit, Astro) no longer fails with "Named export 'Rive' not found".
- 0ef4b2e: Select: vertically center leading icons/dots in item text.

## 0.2.0

### Minor Changes

- 8679462: Add the `patterns` aggregate item (every pattern block). Docs and READMEs now show npm, pnpm, yarn and bun commands.

## 0.1.0

### Minor Changes

- 6e0ab1e: Add patterns blocks (feed-post, agent-card, feature-row, step-card, pricing-plan, task-list, kanban-column, code-block, footer) for Vue and Svelte.
- 6e0ab1e: Svelte port follows Edmi UI spec v2: every component is flat by default and gains an opt-in `raised` prop (Button, Toggle, ToggleGroup, Kbd, Select/NativeSelect, Checkbox, Switch, Slider, Calendar/RangeCalendar, choice cards via FieldLabel/Questionnaire/LayoutPicker, Card, InsetPanel, Empty media, Dialog, AlertDialog, Popover, Toaster, Menubar, Pagination, Tabs (+ `TabsList variant="pills"`), Bubble reactions, and the ✦ patterns). Control height is now `h-9`.
