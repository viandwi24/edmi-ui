# `raised`: when to use it, when not

`raised` is an opt-in boolean prop (default `false`, same name in React, Vue and Svelte). It gives one step of 3D: a vertical gradient face, a 1px top highlight and **one hard lip** under the element (`0 2px 0` for cards and controls, `0 4px 0` for dialogs and popovers; no blur). Pressing a raised control moves it down 2px and the lip collapses. Flat is the plain shadcn look: solid fill, 1px border, no gradient, no lip.

Raised is emphasis. Emphasis only works when most things are not emphasised. Default to flat; add `raised` deliberately.

## Decision rules

1. **One raised primary action per view or region.** The hero CTA, the form's submit, the dialog's confirm. Secondary actions next to it stay flat (`outline`, `secondary`, `ghost`).
2. **Raised for hero and marketing surfaces.** Landing pages, pricing, feature rows, step cards, site headers, hero CTAs and key cards benefit from tactile depth.
3. **Raised for a few key containers in an app.** Summary cards, stat tiles, the ticker strip, a join/checkout panel, the app header nav pills. Not every card on the page by default; choose the ones that carry the page.
4. **Flat for density.** Forms, tables, data tables, toolbars, filters, menus, command palettes, sidebars, lists of many items, and dialog footers stay flat. Many raised controls in a row or grid compete and look noisy.
5. **Flat for chat, agent and workflow screens.** The reference chat thread, agent home, IDE, library and workflow pages are fully flat. Use `raised` there only on the send button (`PromptInput raised`), a primary Confirmation action, or a hero artifact card.
6. **Never raise** `ghost` and `link` buttons, Tabs `variant="line"`, Alert, Sheet, Drawer, HoverCard, Tooltip, menus, Command, NavigationMenu, Sidebar, Accordion, Table, Chart, Combobox, Attachment (Bubble only has raised reaction chips). These are flat-only and have no `raised` prop.
7. **Be consistent inside a page.** Either the page is a "raised surface" (marketing, showcase dashboards: raised cards + CTA + nav pills, flat tables/forms inside) or it is selective (flat everywhere, one raised CTA). Do not sprinkle raised on random controls.
8. **Do not stack lips.** A raised element has face plus one lip. Do not put a raised card inside a raised card, and inside a raised card raise at most the single primary button.
9. **Decide per element, not with a global switch.** Never wrap the app in a "raised everything" flag, never add shadows or gradients yourself to imitate it, and never set `raised` from a loop over many items.

## Quick matrix

| Place | Raised? |
| --- | --- |
| Hero / pricing / marketing CTA button | yes |
| Primary submit in a form or dialog | yes, only that one |
| Secondary, cancel, ghost, link buttons | no (ghost and link never) |
| Cards: key summaries, pricing plans, feature rows, stat tiles | yes, selectively |
| Cards in a dense grid or list of many items | no |
| Tabs / segmented control that is the primary view switcher (pills, default) | yes (`TabsList raised`) |
| Tabs `line`, in-page small toggles, filters | no |
| Header nav pills (`app-header`), ticker strip, layout picker choice cards | yes (pattern forwards it) |
| Table, data table (container), toolbar, filters, pagination in dense tables | no |
| Inputs, textarea, field rows | no (Select trigger, Checkbox, Switch, Slider are raised only on marketing-like forms or settings that need tactility) |
| Dialog, Popover | optional: `raised` gives the hard 4px lip; use for the main confirm dialog, leave menus flat |
| Toasts | `<Toaster raised />` if the app is a raised surface, otherwise flat |
| Chat: messages, bubbles, conversation | no |
| Chat: send button, primary tool approval | yes, optional |

## Do and don't

Do: one raised CTA, the rest flat.

```tsx
<Card>
  <CardHeader><CardTitle>Create index</CardTitle></CardHeader>
  <CardContent>{/* flat fields */}</CardContent>
  <CardFooter className="gap-2">
    <Button variant="ghost">Cancel</Button>
    <Button raised>Create</Button>
  </CardFooter>
</Card>
```

Don't: raise every control in a form or toolbar.

```tsx
{/* noisy: five lips compete, nothing is primary */}
<Button raised variant="outline">Filter</Button>
<Button raised variant="outline">Sort</Button>
<Button raised variant="outline">Export</Button>
<Button raised variant="secondary">Cancel</Button>
<Button raised>Save</Button>
```

Do: a raised hero and raised key cards on a marketing page, flat copy and tables.

```tsx
<Button raised size="lg">Get started</Button>
<Card raised>{/* pricing plan */}</Card>
```

Don't: raise ghost or link buttons, or fake it with classes.

```tsx
<Button raised variant="ghost">Skip</Button>          {/* ignored by design: ghost is never raised */}
<div className="shadow-[0_2px_0_#999]">...</div>      {/* hand-made lip: use raised, tokens, no hex */}
```

Do: let a container pass `raised` down; override a child only when needed.

```tsx
<TabsList variant="pills" raised>      {/* every trigger inherits */}
<ToggleGroup raised>                   {/* items inherit */}
<Pagination raised>                    {/* active link */}
<Questionnaire raised>                 {/* every option */}
```

## Containers pass `raised` down

`child.raised ?? container.raised`: set it once on the parent, and a child can still opt out with `raised={false}`. Containers: Toggle Group (also `segmented` track items), Tabs (on `TabsList`, passed to triggers; `line` ignores it), Pagination (active link), Questionnaire (all options), Calendar / RangeCalendar (selected day), Select (trigger only, popup stays flat), Menubar (the bar only), Toaster (toasts), PromptInput (submit button only; the composer shell stays flat), Card / InsetPanel (container; body highlight). Patterns never hard-code lips: they accept `raised` and forward it to the Card or Button they render.

## Pressed and states

- Raised pressed: `translateY(2px)` and the lip goes to 0.
- Flat pressed: slightly darker fill.
- Selected states that show a ring (checked choice cards, selected day) drop the lip: ring only.
- Dark mode: the primary is white with a gray lip; all lips are visible grays, never black.

## Components that accept `raised` (generated from the source)

<!-- BEGIN GENERATED: raised-list -->
UI and patterns (50): `agent-card`, `alert-dialog`, `app-header`, `badge`, `bubble`, `button`, `button-group`, `calendar`, `card`, `checkbox`, `code-block`, `context-menu`, `data-table`, `date-picker`, `dialog`, `dropdown-menu`, `empty`, `feature-row`, `feed-post`, `footer`, `input`, `input-group`, `input-otp`, `inset-panel`, `join-panel`, `kanban-column`, `kbd`, `layout-picker`, `leaderboard-podium`, `menubar`, `native-select`, `pagination`, `popover`, `pricing-plan`, `questionnaire`, `radio-group`, `select`, `site-header`, `slider`, `sonner`, `stat-tile`, `step-card`, `switch`, `tabs`, `task-list`, `textarea`, `ticker-strip`, `toggle`, `toggle-group`, `watchlist-item`

AI (11): `ai-agent`, `ai-artifact`, `ai-artifact-card`, `ai-confirmation`, `ai-node`, `ai-plan`, `ai-prompt-input`, `ai-prompt-input-agent`, `ai-speech-input`, `ai-suggestion`, `ai-tool`
<!-- END GENERATED: raised-list -->

Per framework syntax is the same boolean: React `<Button raised>`, Vue `<Button raised>`, Svelte `<Button raised>`; compound components pass it on the root (`<Card.Root raised>` in Svelte, `<Tabs.List raised>`). Each component docs page has a **Raised** demo.
