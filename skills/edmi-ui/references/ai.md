# Edmi AI pack

Components for AI product UIs: chat, agent output, code, runtime, voice and workflows, in the same style as the UI kit and in all three frameworks. They are presentation only: streaming, tool state and model calls come from your code or the Vercel AI SDK. Items are named `ai-<name>` and install into `components/ai/`, next to (never into) `components/ui/`.

## Install

```bash
npx shadcn@latest add @edmi-ui/ai-all                   # React (everything)
npx shadcn-vue@latest add @edmi-ui/ai-all               # Vue
npx shadcn-svelte@latest add https://viandwi24.github.io/edmi-ui/r/svelte/ai-all.json   # Svelte
npx shadcn@latest add @edmi-ui/ai-conversation @edmi-ui/ai-message @edmi-ui/ai-chat-composer   # or pick items
```

Install `theme` first ([install.md](install.md)). `all` does not include AI items and `ai-all` does not include `all`. Item list: [components.md](components.md) (categories AI · Chat, Agent, Code, Runtime, Voice, Workflow, Patterns, Utilities).

React only: the message markdown renderer ships Tailwind classes in its dist; add `@source "../node_modules/streamdown/dist/*.js";` to the global CSS if message text is unstyled.

## Naming and imports

Parts keep short names without a prefix: `Message`, `MessageContent`, `MessageResponse`, `Conversation`, `PromptInput`, `Tool`, `Reasoning`. `data-slot` is `ai-<name>`. If one file needs both the UI and the AI part of the same name, alias on import: `import { Message as UiMessage } from "@/components/ui/message"`.

| Framework | Import |
| --- | --- |
| React | `@/components/ai/message` |
| Vue | `@/components/ai/message` (folder with `index.ts`) |
| Svelte | `$lib/components/ai/message` |

## Compose a chat (start here)

Fast path: `ai-chat-header` + `ai-conversation` + `ai-message` + `ai-chat-composer`. `ChatComposer` is a prompt input with attach, speech, disclaimer, model and effort selects and mode, all optional props (`models`, `efforts`, `modes`, `onAttach`, `onSpeech`, `disclaimer`, `status`, `onStop`, `onSubmit`).

React with the Vercel AI SDK (`@ai-sdk/react`; confirm names against the version installed in the project):

```tsx
"use client";
import { useChat } from "@ai-sdk/react";
import { ChatComposer } from "@/components/ai/chat-composer";
import { Conversation, ConversationContent, ConversationItem, ConversationScrollButton } from "@/components/ai/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai/message";

export function Chat() {
  const { messages, sendMessage, status, stop } = useChat();
  return (
    <div className="flex h-svh flex-col gap-2 bg-background p-3">
      <Conversation className="min-h-0">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6">
          {messages.map((m) => (
            <ConversationItem key={m.id} messageId={m.id}>
              <Message from={m.role}>
                <MessageContent>
                  {m.parts.map((part, i) =>
                    part.type === "text" ? (
                      m.role === "user" ? part.text : <MessageResponse key={i}>{part.text}</MessageResponse>
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            </ConversationItem>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <ChatComposer
        className="mx-auto w-full max-w-3xl"
        status={status}
        onStop={stop}
        onSubmit={(message) => sendMessage({ text: message.text })}
      />
    </div>
  );
}
```

Rules that make it look right:

- `Message from="user" | "assistant"`. The user turn is a secondary bubble on the right (plain text child); the assistant turn is full width on the left and renders markdown with `MessageResponse` (children string in React, `:content` in Vue, `content` in Svelte).
- **No assistant avatar by default.** Add `MessageAvatar` + `MessageHeader` only for multi-agent chats; then the avatar aligns to the name line.
- **Status and streaming text** (`Shimmer`, "Checking limits...") goes inside a ghost bubble (`MessageContent`) so its first line aligns like any message. Notes between turns are muted text, no bubble.
- Wrap every turn in `ConversationItem messageId=...` so the scroller can anchor it; put `ConversationScrollButton` inside `Conversation`.
- Give the chat a bounded height (`h-svh`, `min-h-0` on the scroller's parent chain), otherwise it will not scroll.
- Response typography (15px/1.65, ~68ch) comes with `MessageResponse`; do not restyle it.
- The terminal (`ai-terminal`) is always dark in every mode, by design. Code colors come from the chart tokens. Documents (artifact viewer, thumbnails) render as white paper in dark mode too.
- AI chat screens are flat by default. For depth, wrap the chat in `<ElevationProvider mode="layered">` (the composer then floats, artifact cards and tool cards rise) or set `elevation` on the composer (`<PromptInput elevation="floating">` / `ChatComposer`). See [raised.md](raised.md).
- Use `ai-code-block` (not the `code-block` pattern) for code inside chat.

Vue and Svelte follow the same anatomy:

```vue
<Conversation class="min-h-0">
  <ConversationContent class="mx-auto w-full max-w-3xl gap-6 px-4 py-6">
    <ConversationItem v-for="m in messages" :key="m.id" :message-id="m.id">
      <Message :from="m.role">
        <MessageContent>
          <template v-if="m.role === 'user'">{{ m.text }}</template>
          <MessageResponse v-else :content="m.text" />
        </MessageContent>
      </Message>
    </ConversationItem>
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>
<ChatComposer class="mx-auto max-w-3xl" :status="status" @submit="send" @stop="stop" />
```

```svelte
<Conversation class="min-h-0">
  <ConversationContent class="mx-auto w-full max-w-3xl gap-6 px-4 py-6">
    {#each messages as m (m.id)}
      <ConversationItem messageId={m.id}>
        <Message from={m.role}>
          <MessageContent>
            {#if m.role === "user"}{m.text}{:else}<MessageResponse content={m.text} />{/if}
          </MessageContent>
        </Message>
      </ConversationItem>
    {/each}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>
<ChatComposer class="mx-auto max-w-3xl" {status} onSubmit={send} onStop={stop} />
```

Vue and Svelte chat state can come from `@ai-sdk/vue` and `@ai-sdk/svelte` or your own store; check the SDK docs for the current API. Vue emits `@submit` / `@stop`; Svelte takes `onSubmit` / `onStop` props. Without a stop listener the submit button never turns into a stop button.

## Building blocks by task

| Task | Items |
| --- | --- |
| Custom composer | `ai-prompt-input` (`PromptInput`, `PromptInputBody`, `PromptInputTextarea`, `PromptInputFooter`, `PromptInputTools`, `PromptInputSubmit status=...`), `ai-model-selector`, `ai-attachments` |
| Home / empty state | `ConversationEmptyState` (variant `home`), `ai-suggestion variant="card"` |
| Reasoning and tools | `ai-reasoning` (`isStreaming`), `ai-chain-of-thought`, `ai-tool` (`ToolHeader state=...`, `ToolInput`, `ToolOutput`), `ai-confirmation` (approval), `ai-plan`, `ai-task`, `ai-queue` |
| Sources | `ai-sources`, `ai-inline-citation` |
| Generated output | `ai-artifact-card`, `ai-artifact-stack`, `ai-artifact-viewer` (side panel), `ai-session-panel`, `ai-code-block`, `ai-file-tree`, `ai-commit` |
| Code agent / IDE | `ai-sandbox`, `ai-terminal`, `ai-test-results`, `ai-stack-trace`, `ai-web-preview`, `ai-jsx-preview`, `ai-environment-variables` |
| Voice | `ai-speech-input`, `ai-transcription`, `ai-audio-player`, `ai-voice-selector`, `ai-mic-selector`, `ai-persona` |
| Workflow editor | `ai-canvas`, `ai-node`, `ai-edge`, `ai-connection`, `ai-controls`, `ai-panel`, `ai-toolbar` |
| Multi-agent chat | `ai-agent-avatar`, `ai-prompt-input-agent` (@ mentions), `MessageAvatar` + `MessageHeader` |

Tool parts: pass the tool UI part's `state` straight through (`input-streaming`, `input-available`, `output-available`, `output-error`, plus approval states for `ai-confirmation`); the header badge follows it. `ai-reasoning` closes itself when `isStreaming` turns false.

## Gotchas

- `ai-persona` loads its artwork from the network; its colors do not follow tokens.
- `ai-jsx-preview` renders a safe subset of tags and props; it does not execute arbitrary code.
- Workflow canvases need a sized container.
- `ai-use-controllable-state` is React only and is installed automatically as a dependency.
- Do not edit stock-looking colors inside AI items; they use tokens and follow mode, base, theme and radius.
