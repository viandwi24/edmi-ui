# @edmi-ui/tokens

Design tokens for [Edmi UI](https://viandwi24.github.io/edmi-ui/): OKLCH color tokens (light and dark), the Tailwind v4
theme map, fonts, base colors, accent themes, chart colors and the class recipes the components are built from.
Components themselves are installed with the shadcn CLIs; this package is only needed when you want the tokens directly.

## Install

```bash
npm install @edmi-ui/tokens
pnpm add @edmi-ui/tokens
yarn add @edmi-ui/tokens
bun add @edmi-ui/tokens
```

## Usage

```css
@import "tailwindcss";
@import "@edmi-ui/tokens/tokens.css";
@import "@edmi-ui/tokens/theme.css";
@import "@edmi-ui/tokens/fonts.css";
/* optional: @import "@edmi-ui/tokens/base/slate.css"; @import "@edmi-ui/tokens/themes/ocean.css"; */
```

Switch base color, accent and mode with `data-base`, `data-theme` and `class="dark"` on `<html>`. See
[Theming](https://viandwi24.github.io/edmi-ui/getting-started/theming/).

## Exports

| Export | What it is |
| --- | --- |
| `@edmi-ui/tokens/tokens.css` | color, radius, elevation and status tokens for `:root` and `.dark` |
| `@edmi-ui/tokens/theme.css` | Tailwind v4 `@theme` map (colors, shadows, radii) |
| `@edmi-ui/tokens/fonts.css` | Instrument Sans, JetBrains Mono and Sora |
| `@edmi-ui/tokens/kit.css` | plain-CSS reference styles for the kit |
| `@edmi-ui/tokens/ai.css` | plain-CSS reference styles for the AI components |
| `@edmi-ui/tokens/chart.css` | chart styles |
| `@edmi-ui/tokens/base/stone.css`, `base/slate.css` | base colors (`data-base`) |
| `@edmi-ui/tokens/themes/green.css`, `themes/ocean.css` | accent themes (`data-theme`) |
| `@edmi-ui/tokens/tokens.json` | the tokens as JSON |
| `@edmi-ui/tokens/recipes` | class recipes (TypeScript) |
| `@edmi-ui/tokens/css-vars` | helpers that compose base and theme variables (`listBases`, `listThemes`, `composeCssVars`) |

## Links

- Docs: <https://viandwi24.github.io/edmi-ui/>
- Source: <https://github.com/viandwi24/edmi-ui/tree/main/packages/tokens>
- License: MIT
