# @edmi-ui/registry-vue

## 0.3.0

### Minor Changes

- 032c7ad: Add the Vue AI · Agent items: `ai-reasoning`, `ai-chain-of-thought`, `ai-tool` (raised), `ai-confirmation` (raised), `ai-sources`, `ai-inline-citation`, `ai-plan` (raised), `ai-task`, `ai-queue` and `ai-checkpoint`.
- 6016489: Add AI · Chat for Vue and Svelte: `ai-conversation`, `ai-message`, `ai-prompt-input`, `ai-suggestion`, `ai-attachments`, `ai-model-selector`, `ai-context` and `ai-shimmer`, ported from the React items (same anatomy, props and recipes; `raised` on prompt input and suggestion).
- a82da91: Add AI · Code for Vue: `ai-agent`, `ai-artifact` (both support `raised`), `ai-code-block`, `ai-commit`, `ai-environment-variables`, `ai-file-tree`, `ai-package-info` and `ai-jsx-preview` (a sandboxed markup renderer).
- 38b47b5: Add the Edmi AI pack: items named `ai-<name>` (chat, agent, code, runtime, voice and workflow components plus Edmi additions) and the `ai-all` aggregate, installed into `components/ai/`. React ships AI · Chat (`ai-conversation`, `ai-message`, `ai-prompt-input`, `ai-suggestion`, `ai-attachments`, `ai-model-selector`, `ai-context`, `ai-shimmer`) and the `ai-use-controllable-state` hook; Vue and Svelte ports follow. `all` and `edmi` never include AI items.
- 77af942: AI · Patterns (Vue): ai-artifact-card, ai-artifact-stack, ai-artifact-viewer, ai-session-panel, ai-agent-avatar, ai-prompt-input-agent, ai-chat-composer, ai-chat-header.
- 83b5482: Add AI · Runtime for Vue: `ai-sandbox`, `ai-schema-display`, `ai-snippet`, `ai-stack-trace`, `ai-terminal` (always dark), `ai-test-results` and `ai-web-preview`.
- d5dfa9a: Add AI · Voice for Vue: `ai-audio-player`, `ai-mic-selector`, `ai-persona`, `ai-speech-input`, `ai-transcription`, `ai-voice-selector`.
- 0427fcd: Add the Edmi AI Workflow items for Vue: `ai-canvas`, `ai-node` (with `raised`), `ai-edge`, `ai-connection`, `ai-controls`, `ai-panel`, `ai-toolbar`, `ai-image` and `ai-open-in-chat`, built on Vue Flow.
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
- 637c3d4: Tokens: explicit `base/stone.css` and `themes/green.css` (the default values) so a nested scope can switch back to the defaults. Vue: `Switch` and `Checkbox` honour a bare `default-value` attribute.
- 942e520: Fix button group divider (uses the neighbouring variant's lip colour instead of a harsh `--input` line, Button now exposes `data-variant`) and input group controls (the control's own focus ring no longer paints a stray line over the inner divider; the outer group border and ring still change on focus).
- 502f48a: `ai-persona` (Vue, Svelte): load `@rive-app/webgl2` on the client only, so server rendering under Node (Nuxt, SvelteKit, Astro) no longer fails with "Named export 'Rive' not found".
- 0ef4b2e: Select: vertically center leading icons/dots in item text.

## 0.2.0

### Minor Changes

- 8679462: Add the `patterns` aggregate item (every pattern block). Docs and READMEs now show npm, pnpm, yarn and bun commands.

## 0.1.0

### Minor Changes

- 6e0ab1e: Add patterns blocks (feed-post, agent-card, feature-row, step-card, pricing-plan, task-list, kanban-column, code-block, footer) for Vue and Svelte.
- 6e0ab1e: Vue port follows Edmi UI spec v2: every component is flat by default (h-9 controls, no gradients/lips/shadows) and gains an opt-in `raised` prop (Button, Toggle, ToggleGroup, Kbd, NativeSelect, SelectTrigger, Checkbox, Switch, Slider, Calendar/RangeCalendar, FieldLabel choice cards, Questionnaire, Card, InsetPanel, EmptyMedia, DialogContent, AlertDialogContent, PopoverContent, Toaster, Menubar, Pagination, TabsList/TabsTrigger, BubbleReactions and every pattern). `TabsList` gains `variant="pills"`.

### Patch Changes

- QA fixes: menu checkbox/radio indicators on the left, slider thumb background-origin, layout-picker radio dot, drawer attr warning, lint cleanups; preview now covers every group.
