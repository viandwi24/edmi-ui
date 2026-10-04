# @edmi-ui/registry-react

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
