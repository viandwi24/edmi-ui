---
"@edmi-ui/registry-react": minor
"@edmi-ui/registry-vue": minor
"@edmi-ui/registry-svelte": minor
---

Additive ✦ features found while building the docs examples, in all three ports:

- Queue: `variant="flat"`, `chevron={false}` on `QueueSectionLabel`, and the `QueueItemAvatar` / `QueueItemStatus` slots.
- IndexRow: optional `rank` column (with `IndexRowHeader rank`) and `delta="pill"` for a soft tinted 7d delta.
- LeaderboardPodium: `variant="cards"` (the Stockbreak top three) with optional `symbol`, `creator`, `change`, `spark`, `allocation`, `aum` and `holders` entry fields.
- JoinPanel: Join / Redeem `tabs`, `quickAmounts` chips, `footnote`, `amountSize="lg"` and `maxLabel`; now depends on `tabs`.
- AgentCard: footer content (React children, Vue default slot, Svelte `children` snippet).
- PricingPlan: `featuresLead` row, and rich feature rows (Vue scoped slot `feature`, Svelte `feature` snippet).
