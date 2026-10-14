---
"@edmi-ui/registry-react": minor
"@edmi-ui/registry-vue": minor
"@edmi-ui/registry-svelte": minor
---

AI patterns consistency pass (`ai-artifact-card`, `ai-artifact-stack`, `ai-artifact-viewer`, `ai-session-panel`, `ai-agent-avatar`, `ai-prompt-input-agent`, `ai-chat-composer`, `ai-chat-header`).

- `ArtifactViewer` and `SessionPanel` declare `elevation` in their own props in all ports (they were Card pass-through; Vue ignored it). `PromptInputAgent` declares `elevation` for the chip in all ports. New `-elevation` demos for both panels.
- Prop parity: text props that React types as `ReactNode` are now slots in Vue (`ChatComposer` `disclaimer`, `ArtifactViewerTitle` `format`, `SessionProgress` / `SessionSection` `title`, `SessionOutputTitle` `meta`, `SessionFile` `name` / `format`, `SessionSource` `label`, `ArtifactCardActions` `label`; the string prop stays as the fallback, so `name`, `title` and `label` are now optional) and `string | Snippet` in Svelte.
- Svelte: `ChatComposer` gets `onModelChange`, `onEffortChange` and `onModeChange` next to `bind:model|effort|mode`; every part that renders an element exposes `ref = $bindable(null)`.
- Documents render as paper in every mode, so the paper and thumbnail colours stay fixed literals by design (now noted in the docs).

Migration: no breaking changes; Vue code that passed `elevation` to `ArtifactViewer` / `SessionPanel` as a fall-through attribute keeps working and now behaves like the other ports.
