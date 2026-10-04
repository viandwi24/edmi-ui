# Design rules for UI written around Edmi

Use these when composing pages or writing a custom component next to Edmi items. They are the same decisions the components follow. Do not "improve" them.

## Layout and sizing

- Control height: `h-9` (36px) default, `sm` 32px, `lg` 42px. Button, Input, Input Group, Select, Toggle share it. Textarea `min-h-24`. Use the component's `size` prop rather than overriding the height.
- One height per group: controls side by side share a height; option rows in one group (questionnaire choices, choice cards) share one height.
- Inputs inside a Button Group: `rounded-r-none shadow-none` so the group reads as one control.
- Radius comes from `--radius` (buttons and inputs `md`, cards `xl`, dialogs `2xl`). Use `rounded-md/lg/xl/2xl` utilities; never hard-code pixel radii.
- Cards: `--card` is white on the warm `--background` in light mode so cards lift off the page. Do not put `bg-background` or `bg-muted` on card-like panels, including code bodies (code body = `card`, header = `muted`).

## Typography

- Fonts: Instrument Sans for UI (`font-sans`), JetBrains Mono for **every number** (`font-mono`: prices, deltas, counts, addresses, shortcuts, caps captions), Sora 600 for wordmarks only (`font-brand`).
- Headings 500-600 with slight negative tracking in the app. Marketing headings use soft ink (`text-foreground-2`-ish, never pure black) at weight 400-500, not bold.
- Numbers in tables are mono and right-aligned (`Table` has `numeric` and `trend` helpers).

## Color and status

- Up / positive / done / success: `success`, `success-soft`, `success-text`. Down / error: `destructive-text`. Never use `brand` for positive values (brand follows the theme and may be blue).
- Brand badges, alerts and toasts: soft fill plus tinted 30-40% border, never solid fills (except the primary Badge).
- No transparent fills: no `bg-x/10`, `border-x/40`, `from-x/20`, `color-mix(..., transparent)` on surfaces. Use the solid `*-soft` tokens and `color-mix(in srgb, var(--x) 30%, var(--popover))` for tinted borders.
- Floating chips (reactions, badges over a card edge) are solid `--popover` with a 1px border; no outer ring, no see-through.
- Only focus halos (`ring-soft`), the modal `overlay` and decorative glows or grid lines may be transparent.

## Depth

- Depth is the elevation system: `elevation="sunken | flat | raised | floating"` or an `ElevationProvider`. Raised is a bevel (rim, top highlight, hairline); floating adds ONE soft drop; sunken is a soft inset. No hard lips, no stacked drops.
- Levels are relative to the parent: no bevel on bevel. Only the active part of tabs, toggle groups, pagination, calendars, switches and sliders rises.
- Do not write your own lips, gradients or shadows; use the `elevation` prop or the shadow tokens. See [elevation.md](elevation.md).

## Composition

- Message rows: avatar top-aligned with the sender line (or the first bubble line). Assistant messages have no avatar by default.
- Inset panel: header on the muted shell, body a card plate inset 2px from the shell, footer back on the shell.
- Prefer the Edmi item over hand-built markup: forms with `Field`, rows with `Item`, empty states with `Empty`, stat numbers with `stat-tile`, headers with `site-header` / `app-header`.
- Responsive: Edmi components are fluid; use Tailwind breakpoints on your layout wrappers, keep a 16px page gutter on mobile.
- Accessibility: keep the labels, `aria-*` and focus rings the components ship; `aria-invalid` drives the error state of inputs.

## Do not

- Do not import from a theme name or branch on `data-theme` inside components.
- Do not mix in another component library's visual style on top (extra shadows, gradients, glass blur).
- Do not raise everything or set `elevation` from a loop; wrap a page in a layered `ElevationProvider` instead. `link` and Tabs `line` never take depth.
- Do not pull stock shadcn files over Edmi files after install without `--overwrite` intent: it reverts the restyle.
