# Component catalog

Every item below installs with `add @edmi-ui/<name>` (React, Vue) or `add <registry-url>/<name>.json` (Svelte, see [install.md](install.md)). Names, anatomy and props match stock shadcn; ✦ marks Edmi additions (additive, never replacing stock props). `[elevation]` means the item accepts the `elevation` prop ([elevation.md](elevation.md)). Every item exists in all three frameworks unless noted. Live demos and API tables: https://viandwi24.github.io/edmi-ui/components/

Choose by "use when". If two items fit, prefer the more specific one (`field` over label + input, `data-table` over table for interactive data, `ai-chat-composer` over assembling `ai-prompt-input`).

## Catalog

<!-- BEGIN GENERATED: catalog -->
### Entry items (install these, not components)

- `ai-all`: every AI component, installed into `components/ai/`. Not part of `all`; pair with `theme`.
- `all`: restyle a whole shadcn project in one command (every UI component, no patterns, no AI).
- `edmi`: new React project only (`init` base): theme, fonts, utils and every component in one go.
- `font-instrument-sans`: React only: Instrument Sans (UI text). Vue and Svelte get fonts through `theme`. (React only)
- `font-jetbrains-mono`: React only: JetBrains Mono (every number). Vue and Svelte get fonts through `theme`. (React only)
- `font-sora`: React only: Sora 600, exposed as `--font-brand`, for wordmarks only. (React only)
- `patterns`: every ✦ pattern block (headers, stat tiles, tickers, feeds, pricing, kanban, footer). Not part of `all`.
- `theme`: always first: tokens, Tailwind v4 theme map, fonts and the base layer. Install it before any component.
- `utils`: React only: the `cn` helper at `@/lib/utils`. Pulled in by `edmi`. (React only)

### Actions

- `badge` [elevation]: status, count or tag. Variants include brand, success, warning, info; `shape="pill|number"` ✦.
- `button` [elevation]: every action. Variants default, secondary, outline, ghost, destructive, link, brand ✦; sizes xs, sm, default, lg, icon*. One primary per region.
- `button-group` [elevation]: join related buttons, an input and a button, or a button and a label into one control.
- `kbd` [elevation]: show a keyboard shortcut; `KbdGroup` for combinations.
- `toggle` [elevation]: a two-state button (bold, mute, pin).
- `toggle-group` [elevation]: a set of toggles; `variant="segmented"` ✦ for a flat segmented control; `spacing={0}` joins them.

### Forms

- `calendar` [elevation]: month grid for a date or range; used by the date pickers.
- `checkbox` [elevation]: one option on/off or an indeterminate group parent.
- `combobox`: searchable select, with chips for multiple values.
- `date-picker` [elevation]: `DatePicker` for one date, `DateRangePicker` for a range (✦ presets).
- `field`: a form row: label + control + description + error, vertical, horizontal or responsive. Prefer it over hand-built rows.
- `input` [elevation]: single-line text, email, password, search.
- `input-group` [elevation]: input with icons, units, buttons or keys inside one shared focus ring.
- `input-otp` [elevation]: one-time codes and PINs.
- `label`: label a control (Field already includes one).
- `native-select` [elevation]: simple or long lists, mobile-friendly browser select.
- `radio-group` [elevation]: exactly one of a few visible options.
- `select` [elevation]: pick one value from a short list in a popover.
- `slider` [elevation]: pick a value or a range by dragging.
- `switch` [elevation]: instant on/off setting (brand colored when on).
- `textarea` [elevation]: multi-line text that grows with content.

### Display

- `aspect-ratio`: lock media to a ratio.
- `attachment`: a file or image with upload state (idle, uploading, processing, error, done).
- `avatar`: user or entity image with initials fallback; `AvatarGroup` for stacks.
- `card` [elevation]: the default container for grouped content. `elevation` raises (+1) or floats (+2) a hero or key card; sunken (-1) for wells.
- `empty` [elevation]: empty states: icon media, title, description, actions.
- `inset-panel` [elevation]: ✦ a panel with header and footer on a muted shell and a card body edge to edge (tool and chat panels).
- `item`: a generic row with media, title, description and actions (lists, settings).
- `progress`: task progress; `brand` variant, label and value parts.
- `separator`: a thin divider.
- `skeleton`: placeholder shaped like content that is loading.
- `spinner`: inline loading indicator.

### Overlays

- `alert`: an inline message in the page flow (default, destructive, brand, success, warning, info).
- `alert-dialog` [elevation]: a blocking confirmation for destructive or irreversible actions.
- `dialog` [elevation]: a modal for one focused task.
- `drawer`: a swipeable bottom or side panel for touch layouts.
- `hover-card`: a preview behind a link, shown on hover.
- `popover` [elevation]: rich content in a floating panel opened by a button.
- `sheet`: a panel that slides in from an edge (filters, details, mobile nav).
- `sonner` [elevation]: toasts. Mount `<Toaster />` once and call `toast(...)`; `<Toaster elevation="raised" />` for beveled toasts.
- `tooltip`: a short label on hover or focus; never for essential information.

### Navigation

- `breadcrumb`: location trail in a hierarchy.
- `command`: command palette and searchable lists (⌘K).
- `context-menu` [elevation]: right-click menu.
- `dropdown-menu` [elevation]: actions menu opened by a button.
- `menubar` [elevation]: a persistent row of menus (desktop-app style).
- `navigation-menu`: top-level site navigation with rich dropdown panels.
- `pagination` [elevation]: page navigation for lists and tables.
- `sidebar`: the app frame: variants sidebar, floating, inset; collapsible offcanvas, icon, none.
- `tabs` [elevation]: switch views in place. `TabsList variant="default|line|pills"`, `elevation="raised"` on the list lifts the active trigger.
- `use-mobile`: React only: hook that is true below 768px (used by the sidebar). (React + Svelte only)

### Layout

- `accordion`: stacked collapsible sections; `variant="card"` ✦ for a carded list (FAQ).
- `carousel`: swipeable slides; `CarouselDots` ✦ for position dots.
- `collapsible`: one expandable panel.
- `direction`: LTR / RTL provider.
- `elevation`: Layered depth mode: wrap a subtree in `ElevationProvider mode="layered"` so each component takes its role level (or force one level).
- `resizable`: draggable split panes.
- `scroll-area`: thin custom scrollbars over native scrolling.

### Data

- `chart`: charts; series map to `--chart-1…5` so they follow the theme.
- `data-table` [elevation]: sortable, filterable, selectable, paginated tables.
- `table`: static tabular data. Numbers are mono and right-aligned (`numeric`, `trend` props).

### Conversation

- `bubble` [elevation]: chat bubble: default, secondary, muted, tinted, outline, ghost, destructive; `BubbleReactions`.
- `marker`: inline status, system note or labeled separator inside a conversation.
- `message`: a chat row (avatar, header, content, footer), top-aligned and mirrored with `align`.
- `message-scroller`: the chat viewport: anchors turns, follows streaming, Jump to latest.
- `questionnaire` [elevation]: multi-step questions with keyboard shortcuts and freeform answers.

### Patterns ✦ (Edmi-only app and marketing blocks)

- `agent-card` [elevation]: an AI agent card with identicon, badges and stats.
- `allocation-bar`: proportional weights with a legend.
- `app-header` [elevation]: app top bar for the navbar layout: nav pills, search, actions.
- `code-block` [elevation]: a static code card with copy button for docs and marketing (chat code uses `ai-code-block`).
- `feature-row` [elevation]: numbered feature list row (landing pages).
- `feed-post` [elevation]: a social post card with an attached item and stats.
- `footer` [elevation]: site footer: brand, link columns, legal line.
- `index-row`: a market-table row: avatars, tags, mono price, delta, sparkline.
- `join-panel` [elevation]: amount input with Max, summary rows and a primary action.
- `kanban-column` [elevation]: a kanban stage column with cards.
- `layout-picker` [elevation]: dashboard or navbar choice cards that persist the choice in a cookie.
- `leaderboard-podium` [elevation]: top-three podium cards.
- `pricing-plan` [elevation]: a pricing plan card.
- `site-header` [elevation]: marketing top bar: brand, links, one call to action.
- `stat-tile` [elevation]: a KPI with mono value and delta; `StatStrip` groups several.
- `step-card` [elevation]: numbered step card (how it works).
- `task-list` [elevation]: agent or project tasks grouped by status.
- `ticker-strip` [elevation]: a horizontal strip of live prices.
- `watchlist-item` [elevation]: a compact sidebar row: letter tile, symbol, price, change.

### AI · Chat

- `ai-attachments`: files and images attached to a prompt or message.
- `ai-context`: context-window usage ring with token and cost breakdown.
- `ai-conversation`: the chat viewport: stick-to-bottom, empty and home states, scroll button, transcript download.
- `ai-message`: one chat turn: `Message`, `MessageContent`, `MessageResponse` (streaming markdown), actions, branches.
- `ai-model-selector`: searchable model picker dialog with provider logos.
- `ai-prompt-input` [elevation]: the composer: textarea, attachments, tools, selects, submit with streaming status.
- `ai-shimmer`: animated text for streaming and loading status lines.
- `ai-suggestion` [elevation]: suggested prompts; `variant="chip"` (default) or `"card"` ✦ for the home state.

### AI · Agent

- `ai-chain-of-thought`: step-by-step reasoning timeline.
- `ai-checkpoint`: marks a point in the conversation with a restore action.
- `ai-confirmation` [elevation]: tool approval request: requested, accepted, rejected.
- `ai-inline-citation`: inline source chip with a hover card.
- `ai-plan` [elevation]: a plan card with streaming title and collapsible steps.
- `ai-queue`: queued messages and todos with status dots.
- `ai-reasoning`: collapsible thinking block that streams then closes itself.
- `ai-sources`: collapsible list of sources a response used.
- `ai-task`: a collapsible task row with file chips.
- `ai-tool` [elevation]: a tool call: state badge, input parameters, output or error.

### AI · Code

- `ai-agent` [elevation]: agent configuration card: model, instructions, tools, output schema.
- `ai-artifact` [elevation]: container for generated output with header, actions and scrollable body.
- `ai-code-block`: syntax-highlighted code with header, copy, language select. The canonical code block.
- `ai-commit`: commit summary with hash, author and changed files.
- `ai-environment-variables`: env var list with masked values and copy.
- `ai-file-tree`: expandable file and folder tree.
- `ai-jsx-preview`: live preview of streamed JSX/template markup that tolerates unclosed tags.
- `ai-package-info`: package name, version change and dependencies.

### AI · Runtime

- `ai-sandbox`: code execution sandbox: state header with code and output tabs.
- `ai-schema-display`: API endpoint with method, path, parameters and schemas.
- `ai-snippet`: a one-line command or value with a copy button.
- `ai-stack-trace`: collapsible error stack with file links.
- `ai-terminal`: streaming terminal output with ANSI colors. Always dark, never themed.
- `ai-test-results`: test run summary with suites and failing tests.
- `ai-web-preview`: browser frame with URL bar, iframe body and console.

### AI · Voice

- `ai-audio-player`: audio player: play, seek, time, volume.
- `ai-mic-selector`: microphone picker.
- `ai-persona`: animated agent persona that reacts to idle, listening, thinking, speaking, asleep.
- `ai-speech-input` [elevation]: dictation button with listening and processing states.
- `ai-transcription`: time-synced transcript with click-to-seek segments.
- `ai-voice-selector`: voice picker dialog with search, groups and preview.

### AI · Workflow

- `ai-canvas`: workflow canvas (node graph) with the dotted Edmi background.
- `ai-connection`: the connection line shown while dragging a new edge.
- `ai-controls`: zoom and fit controls for the canvas.
- `ai-edge`: animated and temporary edges for the canvas.
- `ai-image`: show an AI-generated image from base64 or bytes.
- `ai-node` [elevation]: a workflow node card with handles.
- `ai-open-in-chat`: dropdown that opens a prompt in another chat product.
- `ai-panel`: an overlay panel in a canvas corner.
- `ai-toolbar`: a floating toolbar attached to a selected node.

### AI · Patterns

- `ai-agent-avatar`: ✦ 5x5 pixel identicon generated from an agent id.
- `ai-artifact-card` [elevation]: ✦ a file card for generated output (paper thumbnail, Download, generating state).
- `ai-artifact-stack`: ✦ a group of artifact cards with Download all.
- `ai-artifact-viewer`: ✦ side panel that shows one artifact; documents render as paper.
- `ai-chat-composer` [elevation]: ✦ ready-made composer: attach, speech, disclaimer, model + effort, mode. Start here for a chat app.
- `ai-chat-header`: ✦ conversation header: title, project/model, share, more.
- `ai-prompt-input-agent` [elevation]: ✦ agent composer with agent chip, @ mentions and a floating plate.
- `ai-session-panel`: ✦ chat side panel: Progress, Outputs, used in this session.

### AI · Utilities

- `ai-use-controllable-state`: React only: controlled/uncontrolled state hook the AI components share (installed automatically). (React only)
<!-- END GENERATED: catalog -->

## ✦ Edmi additions to know

- Button: `variant="brand"`; sizes `xs`, `icon-xs`, `icon-sm`, `icon-lg`; `elevation`.
- Badge: variants `brand`, `success`, `warning`, `info`; `shape="default|pill|number"`.
- Alert: soft variants `brand`, `success`, `warning`, `info`.
- Toggle Group: `variant="segmented"` (flat segmented track; the ON item rises with `elevation="raised"` on the group).
- Tabs: `TabsList variant="default|line|pills"` and `elevation` on the list (the active trigger rises).
- Accordion: `variant="card"`.
- Carousel: `CarouselDots`.
- Inset Panel: its own item (header and footer on a muted shell, card body edge to edge).
- Date Picker: `DateRangePicker` with optional presets.
- Table: `numeric` and `trend` helpers for mono right-aligned numbers.
- Conversation group (`bubble`, `message`, `marker`, `message-scroller`, `questionnaire`) is Edmi-only anatomy for chat UIs.
- AI: `ai-suggestion` `variant="chip|card"`, `ai-conversation` home state, the `ai-patterns` set (artifact card/stack/viewer, session panel, agent avatar, agent composer, chat composer, chat header).

## Patterns

Pattern items are app-level blocks built from the UI items. They forward `elevation` to the Card or Button they render, take callbacks as props (React), emits (Vue) or `on*` props (Svelte), and replace ReactNode props with slots (Vue) or snippets (Svelte). Install `patterns` for all of them, or one by name.

## Not in the catalog

Stock shadcn items Edmi does not restyle are installed from the stock registry as usual; they follow the same tokens.
