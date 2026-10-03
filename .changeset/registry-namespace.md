---
"@edmi-ui/tokens": minor
---

The shadcn registry namespace is now `@edmi-ui` (was `@edmi`), matching the npm scope: `shadcn add @edmi-ui/button`, `registries: { "@edmi-ui": "…/r/react/{name}.json" }`. Breaking for existing installs: rename the `@edmi` key in your `components.json` registries to `@edmi-ui`.
