<script setup lang="ts">
import type { UIMessage } from "ai"
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Message as UiMessage } from "@/registry/edmi/ui/message"
import { MessageKey } from "./context"

// Thin layer on ui/message + ui/bubble (DESIGN §5b). Assistant turns have NO avatar by default: the response
// is full width on the left; a user turn is a secondary bubble on the right. `MessageAvatar` + `MessageHeader`
// are opt-in for multi-agent chats (the avatar then aligns to the name line). Status / shimmer text goes inside
// `MessageContent` (a ghost bubble) so its first line aligns like any message.

const props = defineProps<{
  from: UIMessage["role"]
  class?: HTMLAttributes["class"]
}>()

provide(MessageKey, { from: computed(() => props.from) })
</script>

<template>
  <UiMessage
    data-slot="ai-message"
    :data-from="from"
    :align="from === 'user' ? 'end' : 'start'"
    :class="cn(
      'max-w-full flex-col items-stretch gap-1.5 data-[align=end]:flex-col',
      // opt-in avatar: two columns, avatar spans the rows, everything else stacks in column 2
      'has-[>[data-slot=message-avatar]]:grid has-[>[data-slot=message-avatar]]:grid-cols-[auto_minmax(0,1fr)] has-[>[data-slot=message-avatar]]:items-start has-[>[data-slot=message-avatar]]:gap-x-2.5 has-[>[data-slot=message-avatar]]:gap-y-1.5 [&>[data-slot=message-avatar]]:row-span-full has-[>[data-slot=message-avatar]]:[&>:not([data-slot=message-avatar])]:col-start-2',
      props.class,
    )"
  >
    <slot />
  </UiMessage>
</template>
