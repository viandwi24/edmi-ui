---
"@edmi-ui/registry-react": patch
"@edmi-ui/registry-vue": minor
"@edmi-ui/registry-svelte": patch
---

AI pack QA fixes: inline citation trigger is an inline element in Vue, environment variable columns stay aligned without a Required badge, folder labels in file tree toggle on click, Vue message response renders without the fade by default, code block and JSX preview no longer trigger React hydration and render-phase warnings, artifact action forwards click handlers in Vue.

Vue `MessageResponse` gains a `mode` prop (`"static"` default, `"streaming"` restores the word fade-in): pass `mode="streaming"` when you stream responses.
