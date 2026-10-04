---
"@edmi-ui/registry-react": patch
"@edmi-ui/registry-vue": patch
"@edmi-ui/registry-svelte": patch
---

Fix button group divider (uses the neighbouring variant's lip colour instead of a harsh `--input` line, Button now exposes `data-variant`) and input group controls (the control's own focus ring no longer paints a stray line over the inner divider; the outer group border and ring still change on focus).
