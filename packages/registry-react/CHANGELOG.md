# @edmi-ui/registry-react

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

- 5c7026f: Add the React AI · Agent items: `ai-reasoning`, `ai-chain-of-thought`, `ai-tool` (raised), `ai-confirmation` (raised), `ai-sources`, `ai-inline-citation`, `ai-plan` (raised), `ai-task`, `ai-queue` and `ai-checkpoint`.
- 2e52228: Add AI · Code for React: `ai-agent`, `ai-artifact` (both support `raised`), `ai-code-block` (the canonical code block, Shiki highlighting through chart tokens), `ai-commit`, `ai-environment-variables`, `ai-file-tree`, `ai-jsx-preview` and `ai-package-info`.
- 38b47b5: Add the Edmi AI pack: items named `ai-<name>` (chat, agent, code, runtime, voice and workflow components plus Edmi additions) and the `ai-all` aggregate, installed into `components/ai/`. React ships AI · Chat (`ai-conversation`, `ai-message`, `ai-prompt-input`, `ai-suggestion`, `ai-attachments`, `ai-model-selector`, `ai-context`, `ai-shimmer`) and the `ai-use-controllable-state` hook; Vue and Svelte ports follow. `all` and `edmi` never include AI items.
- 6afea0b: AI · Patterns (React): ai-artifact-card, ai-artifact-stack, ai-artifact-viewer, ai-session-panel, ai-agent-avatar, ai-prompt-input-agent, ai-chat-composer, ai-chat-header.
- f2d6b2f: Add AI · Runtime for React: `ai-sandbox`, `ai-schema-display`, `ai-snippet`, `ai-stack-trace`, `ai-terminal` (always dark), `ai-test-results` and `ai-web-preview`.
- d223958: Add AI · Voice for React: `ai-audio-player` (media-chrome), `ai-mic-selector`, `ai-persona` (Rive), `ai-speech-input` (supports `raised`), `ai-transcription` and `ai-voice-selector`.
- f1b86b7: Add the Edmi AI Workflow items for React: `ai-canvas`, `ai-node` (with `raised`), `ai-edge`, `ai-connection`, `ai-controls`, `ai-panel`, `ai-toolbar`, `ai-image` and `ai-open-in-chat`, built on `@xyflow/react`.
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
- 0ef4b2e: Select: vertically center leading icons/dots in item text.

## 0.2.0

### Minor Changes

- 8679462: Add the `patterns` aggregate item (every pattern block). Docs and READMEs now show npm, pnpm, yarn and bun commands.

## 0.1.0

### Minor Changes

- 6e0ab1e: React registry v2: components are flat by default; `raised` opt-in adds the one-step 3D look (Button, Toggle, ToggleGroup, Kbd, Select, NativeSelect, Checkbox, Switch, Slider, Calendar, Card, InsetPanel, Empty, Dialog, AlertDialog, Popover, Toaster, Menubar, Pagination, Tabs incl. new `pills` list variant, Questionnaire, BubbleReactions, DataTable and patterns). Control height is now h-9.
