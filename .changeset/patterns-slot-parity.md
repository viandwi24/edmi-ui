---
"@edmi-ui/registry-react": minor
"@edmi-ui/registry-vue": minor
"@edmi-ui/registry-svelte": minor
---

Vue/Svelte parity: `StepCard` (`index`, `title`, `description`), `FeatureRow` (`index`, `title`) and `PricingPlan` (`name`, `tagline`, `price`, `priceNote`, `features`) accept rich content (Vue slots of the same name, `price-note` for `priceNote`; Svelte `string | Snippet`). String props keep working.
