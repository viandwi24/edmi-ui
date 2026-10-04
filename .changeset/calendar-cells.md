---
"@edmi-ui/registry-react": patch
"@edmi-ui/registry-vue": patch
"@edmi-ui/registry-svelte": patch
---

Calendar: the "today" highlight is painted on the day button itself (same square and radius as the selected day) instead of the table cell, so it can no longer mismatch when a surrounding table style stretches or pads the cells.
