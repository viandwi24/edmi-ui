---
"@edmi-ui/tokens": minor
"@edmi-ui/registry-react": minor
"@edmi-ui/registry-vue": minor
"@edmi-ui/registry-svelte": minor
---

Dark mode chart colours are now validated global tokens: `--chart-1…5` in `.dark` are re-stepped to one lightness (green `#3eab5e`, blue `#5a8ff3`, amber `#c0851f`, violet `#957ee5`, rose `#e75e6a`) so series stay distinct and readable on dark surfaces, including for colour-blind readers. The Ocean theme gets its own validated dark set (`#5a8ff3`, `#00aaab`, `#c0851f`, `#957ee5`, `#e75e6a`). Theme items (`theme`, `theme-<base>-<accent>`) carry the new values; re-run `add @edmi-ui/theme --overwrite` (and your theme item) to pick them up. Anything else using `--chart-N` in dark (sparklines, avatar colours, code highlighting) uses the new colours too.
