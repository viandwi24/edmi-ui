---
"@edmi-ui/registry-vue": patch
"@edmi-ui/registry-svelte": patch
---

`ai-persona` (Vue, Svelte): load `@rive-app/webgl2` on the client only, so server rendering under Node (Nuxt, SvelteKit, Astro) no longer fails with "Named export 'Rive' not found".
