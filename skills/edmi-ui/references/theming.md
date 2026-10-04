# Theming Edmi UI

Edmi is themed with CSS variables (OKLCH with hex fallback; names shared with shadcn, plus Edmi extras). Components only use tokens, never a theme name. Load them through the `theme` item, or `@edmi-ui/tokens`.

## Four knobs, all on `<html>`

| Knob | How | Values | Changes |
| --- | --- | --- | --- |
| Mode | `class="dark"` | light (default), dark | every token |
| Base color | `data-base="..."` | `stone` (default), `slate` | neutrals: surfaces, text, borders, bevel colours, neutral "ink" primary |
| Accent theme | `data-theme="..."` | `green` (default), `ocean` | brand, ring, charts, sidebar-primary; Ocean also recolors primary |
| Radius | `style="--radius: ..."` | `0.625rem` default (0.3rem sharp to 1rem round) | every radius |

```html
<html class="dark" data-base="slate" data-theme="ocean" style="--radius: 0.625rem">
```

Stone and Green is the default and needs no attributes. Status colors (destructive, warning, success, info) never change with base or accent.

## Pick one: install a theme item, or switch at runtime

**A. Fixed theme (shadcn-style).** Install a `registry:theme` item. It replaces the color variables in `:root` and `.dark`, and leaves the app's radius alone. Run it after `theme`.

| Item | Base | Accent |
| --- | --- | --- |
| `theme-stone-green` | Stone | Green (same as default) |
| `theme-stone-ocean` | Stone | Ocean |
| `theme-slate-green` | Slate | Green |
| `theme-slate-ocean` | Slate | Ocean |

```bash
npx shadcn@latest add @edmi-ui/theme-slate-ocean          # React
npx shadcn-vue@latest add @edmi-ui/theme-slate-ocean      # Vue
npx shadcn-svelte@latest add https://viandwi24.github.io/edmi-ui/r/svelte/theme-slate-ocean.json   # Svelte
```

The Themes page (https://viandwi24.github.io/edmi-ui/themes/) previews every combination and has **Copy CSS** (plain CSS or Tailwind v4) if the user prefers pasting variables.

**B. Runtime switching (users pick base, accent, radius, mode).** Import the CSS files in this order (themes must win over bases for `primary`), then set attributes on `<html>`:

```css
@import "tailwindcss";
@import "@edmi-ui/tokens/tokens.css";
@import "@edmi-ui/tokens/base/slate.css";
@import "@edmi-ui/tokens/themes/ocean.css";
@import "@edmi-ui/tokens/theme.css";
```

Persist the choice in cookies (`edmi-mode`, `edmi-base`, `edmi-accent`, `edmi-radius`) and render the attributes on the server so the first paint is already themed (SvelteKit `hooks.server.ts` + `app.html` placeholders, Nuxt `useCookie` + `useHead({ htmlAttrs })`, or an inline `<script>` in `index.html` for client-only Vite apps). Full snippets: https://viandwi24.github.io/edmi-ui/getting-started/theming/

**Scoped theming.** Any subtree can carry its own attributes, e.g. an always-dark navy sidebar inside a light app: `class="dark" data-base="slate"` on that element. To switch a scope back to defaults inside a Slate/Ocean app use `data-base="stone" data-theme="green"` with `base/stone.css` and `themes/green.css` loaded.

## Create a custom accent or base

Copy `themes/ocean.css` (or `base/slate.css`) from `@edmi-ui/tokens` into the project, change the values, keep both selectors (`[data-theme="mine"]` and `.dark[data-theme="mine"]`), import it after `tokens.css`, and set `data-theme="mine"`. Provide light and dark. For an accent change the accent keys only: `brand`, `brand-hi`, `brand-edge`, `brand-lip`, `brand-soft`, `brand-text`, `ring`, `chart-1..5`, `sidebar-primary`. Never override status colors.

## Semantic tokens to use in your own code

Tailwind utilities map to these (`bg-card`, `text-muted-foreground`, `border-border`, `ring-ring`, ...):

| Role | Tokens |
| --- | --- |
| Surfaces | `background` (warm page), `card` (white in light), `popover`, `muted`, `accent`, `stage` |
| Text | `foreground`, `foreground-2` (softer body), `muted-foreground`, `muted-foreground-2` (captions) |
| Lines | `border`, `border-2` (lighter divider inside cards), `input` |
| Actions | `primary`, `secondary`, `destructive`, `brand` (+ `-foreground`) |
| Soft status fills (solid) | `brand-soft`, `success-soft`, `warning-soft`, `info-soft`, `destructive-soft` |
| Status text | `brand-text`, `success-text`, `warning-text`, `info-text`, `destructive-text` |
| Depth (elevation) | `--bv-ring`, `--bv-top`, `--bv-out`, `--bv-float` (bevel), `--sk-bg`, `--sk-bd`, `--sk-sh` (sunken), `--r1-*` / `--fl-*` (button faces); utilities `shadow-raised`, `shadow-floating`, `shadow-sunken`, `shadow-btn-raised-*`, `shadow-btn-float-*`, `shadow-pressed`. Legacy `lip*` tokens are not used by components |
| Charts | `chart-1` ... `chart-5` |
| Fonts | `font-sans` (Instrument Sans), `font-mono` (JetBrains Mono, every number), `font-brand` (Sora 600, wordmarks only) |

Usage rules:

- `brand` is the theme accent (turns blue in Ocean): brand button/badge, live state, switch, slider, progress, ring. **Positive values (up deltas, done, success) use `success` / `success-text`**, which stay green.
- Down or error: `destructive` / `destructive-text`.
- **No transparent fills.** `*-soft` tokens are solid colors. Tinted borders are `border-[color-mix(in_srgb,var(--brand)_30%,var(--popover))]` (over a card: `...,var(--card))`); solid hovers `hover:bg-[color-mix(in_srgb,var(--primary)_90%,var(--background))]`. Never `bg-primary/10`, `border-border/50` or `color-mix(..., transparent)` on a surface. Only focus halos, overlays and decorative glows or gridlines may be transparent.
- Depth tokens exist for light, dark and every base. In dark, depth is a bevel hairline and a faint top highlight on a clearer surface ladder (background, card, popover, border, input), never black blocks: use the tokens, do not hard-code shadows. Layered mode and levels: [elevation.md](elevation.md).
- Do not hard-code hex colors; read tokens (`var(--brand)`) or use utilities.
