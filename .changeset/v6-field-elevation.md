---
"@edmi-ui/registry-react": minor
"@edmi-ui/registry-vue": minor
"@edmi-ui/registry-svelte": minor
---

Fields now accept `elevation="raised"` and `"floating"` with a bevel face: Input, Textarea, Input Group, Input OTP (the group becomes one plate with 1px slot separators), Select trigger and Native Select. Input Group addons (e.g. a trailing `USDC` text) turn transparent at sunken, raised and floating, so the whole group reads as one plate. Focus swaps the bevel for the ring and invalid fields keep their destructive border at every level.
