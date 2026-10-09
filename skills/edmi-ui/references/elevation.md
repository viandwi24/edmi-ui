# Elevation: depth by role

Edmi is flat by default. Depth is **elevation**: one prop, `elevation?: "auto" | "sunken" | "flat" | "raised" | "floating"` (default `"auto"`, same name in React, Vue and Svelte), plus an `ElevationProvider` that applies it to a whole subtree. The boolean `raised` was removed in 0.3 (see [upgrading.md](upgrading.md)).

## Philosophy (read this first)

- **Flat is the default.** The plain shadcn look is a calm, editorial base: solid fill, 1px border. Dense app UI stays quiet and readable. Depth is opt-in.
- **Depth expresses role and hierarchy, not decoration.** Things you act on rise (filled buttons, key cards, the thumb you drag). Things that receive input sink (fields are wells). Things above the page float (popovers, menus, dialogs, the chat composer). Everything else stays flat.
- **Levels are relative to the parent.** A child is at most one step above what holds it. A card inside a raised card drops to flat and keeps its border: no bevel on bevel. Buttons and fields are exempt.
- **One step only, and only the part that is active.** Tabs, toggle groups, pagination, calendars, switches and sliders never bevel their track; only the active tab, the selected day, the checked box and the thumb rise. Alerts, toasts, tooltips and brand badges stay soft fill with a tinted border.
- **A bevel, not a lip.** Raised is a top highlight, an inner rim and a dark hairline. Floating adds one soft drop to the same bevel. Sunken is a soft inset (focus swaps its edge for the ring). Pressed sinks 1px. Elevation never changes size.
- **Layered mode applies the policy to a page.** `ElevationProvider mode="layered"` gives each role its level; an explicit prop still wins.

## Levels

| Value | Level | Look |
| --- | --- | --- |
| `sunken` | -1 | soft inset well |
| `flat` | 0 | fill and 1px border (default) |
| `raised` | +1 | bevel: rim, top highlight, hairline |
| `floating` | +2 | the bevel plus one soft drop |

`auto` resolves: the component's own prop, then the nearest `ElevationProvider`, then `flat`. A hero action is `floating`; use one per view.

## Roles and layered defaults

| Role | Components | Layered level |
| --- | --- | --- |
| filled action | Button default, secondary, destructive, brand | raised (+1) |
| quiet action | Button outline, ghost, link | flat |
| field | Input, Textarea, Select trigger, Input OTP, Input Group, Native Select | sunken (-1); also `raised` / `floating` when set explicitly (bevel face, focus swaps it for the ring) |
| control | Checkbox, Radio, Tabs, Toggle group, Pagination, Badge | flat; the active part rises when `raised` |
| handle | Switch thumb, Slider thumb, calendar selected day, Kbd, Empty media | raised (+1) |
| surface | Card, Inset panel body, AI cards and nodes | raised (+1) |
| container | Inset panel shell, nested card, Alert, Toast, Tooltip | flat |
| overlay | Popover, Dropdown, Select menu, Dialog, chat composer | floating (+2) |

## Flat page or layered page?

- **Flat (default)** for dense apps: forms, tables, settings, admin, most chat and agent screens. Raise at most one or two things with the prop (the primary submit, a hero card).
- **Layered** for pages that should feel tactile and readable by role: dashboards, marketing and product pages. Wrap the page once; do not also hand-raise random controls.
- Pick one per page. Override single components with the prop (`elevation="floating"` on the hero CTA, `elevation="flat"` on one filled button).

## Layered mode: the provider

Installed automatically with any component that takes `elevation`, or alone with `add @edmi-ui/elevation`.

React (`@/components/ui/elevation`):

```tsx
import { ElevationProvider } from "@/components/ui/elevation";

<ElevationProvider mode="layered">
  <App />
</ElevationProvider>
```

Vue (`@/components/ui/elevation`):

```vue
<ElevationProvider mode="layered">
  <App />
</ElevationProvider>
```

Svelte (`$lib/components/ui/elevation`):

```svelte
<ElevationProvider mode="layered">
  {@render children()}
</ElevationProvider>
```

- `mode="layered"` gives each role its default; `mode="flat"` is the default.
- `level="raised"` (or `sunken`, `flat`, `floating`) forces one level for the subtree and wins over `mode`.
- The provider is layout-neutral (`display: contents`) unless given a class, and renders `data-elevation`. Scopes nest.
- `useElevation(prop, role)` is for custom components: React returns the level, Vue a computed, Svelte `{ current }`.

## Nesting and the active-part rule

- A surface inside a raised or floating surface resolves flat automatically. Do not force `raised` on a card inside a raised card.
- An Inset panel: the shell stays flat, the body is the raised plate (inset 2px), a card inside it drops to flat.
- Only the active part rises: Tabs (`line` never), Toggle group and segmented (the ON item), Pagination (active link), Calendar and Date picker (selected day; the level sits on the shell), Switch and Slider (thumbs), Checkbox (checked box), default Toggle (only when ON).
- ButtonGroup: `raised` raises each item; `floating` floats the whole group as one plate while items stay raised. Never a drop per item.
- Filled buttons keep their colour when sunken. `link` never takes depth; `ghost` follows the neutral faces. Badges keep their fill at every level.

## Do and don't

Do: let roles decide, one floating hero action, a layered page with one explicit override.

```tsx
<ElevationProvider mode="layered">
  <Card>
    <Input placeholder="Amount" />          {/* sinks */}
    <Button variant="ghost">Cancel</Button> {/* quiet, stays flat */}
    <Button elevation="floating">Create</Button> {/* the one hero action */}
  </Card>
</ElevationProvider>
```

Do: on a flat page, raise only the key elements.

```tsx
<Card elevation="raised">{/* pricing plan */}</Card>
<Button elevation="raised" size="lg">Get started</Button>
```

Don't: raise every control, stack bevels, or fake it.

```tsx
{/* noisy: nothing is primary */}
<Button elevation="raised" variant="outline">Filter</Button>
<Button elevation="raised" variant="outline">Sort</Button>
<Button elevation="raised">Save</Button>

{/* bevel on bevel: the inner card should stay flat */}
<Card elevation="raised"><Card elevation="raised" /></Card>

{/* hand-made depth: use the prop or the tokens */}
<div className="shadow-[0_2px_0_#999]" />
```

Don't forward `elevation` to a primitive yourself and don't wrap in a "raise everything" flag; use the provider.

## Never take depth

Sheet, Drawer, HoverCard, Tooltip, Alert, NavigationMenu and Command popups, Sidebar, Accordion, Table (the container; toolbar and pagination follow Button and Input), Chart, Bubble (only reaction chips take it), Combobox, Attachment.

## Pressed and states

- Raised pressed: `translateY(1px)` plus a pressed inset shadow. Flat pressed: slightly darker fill.
- Sunken focus swaps the edge for the ring. Disabled drops to 50%.
- Dark mode: the bevel is a hairline and a faint top highlight on a clearer surface ladder; never black blocks.

## Components that accept `elevation` (generated from the source)

<!-- BEGIN GENERATED: elevation-list -->
UI and patterns (50): `agent-card`, `alert-dialog`, `app-header`, `badge`, `bubble`, `button`, `button-group`, `calendar`, `card`, `checkbox`, `code-block`, `context-menu`, `data-table`, `date-picker`, `dialog`, `dropdown-menu`, `empty`, `feature-row`, `feed-post`, `footer`, `input`, `input-group`, `input-otp`, `inset-panel`, `join-panel`, `kanban-column`, `kbd`, `layout-picker`, `leaderboard-podium`, `menubar`, `native-select`, `pagination`, `popover`, `pricing-plan`, `questionnaire`, `radio-group`, `select`, `site-header`, `slider`, `sonner`, `stat-tile`, `step-card`, `switch`, `tabs`, `task-list`, `textarea`, `ticker-strip`, `toggle`, `toggle-group`, `watchlist-item`

AI (12): `ai-agent`, `ai-artifact`, `ai-artifact-card`, `ai-chat-composer`, `ai-confirmation`, `ai-node`, `ai-plan`, `ai-prompt-input`, `ai-prompt-input-agent`, `ai-speech-input`, `ai-suggestion`, `ai-tool`
<!-- END GENERATED: elevation-list -->

Syntax is the same in all three frameworks: `<Button elevation="raised">`; compound components take it on the root or the part named in the table (`<Card.Root elevation="raised">`, `<Tabs.List elevation="raised">`, `<Toaster elevation="raised" />`). Each component docs page has an **Elevation ✦** section and demo, and the guide lives at https://viandwi24.github.io/edmi-ui/getting-started/elevation/.
