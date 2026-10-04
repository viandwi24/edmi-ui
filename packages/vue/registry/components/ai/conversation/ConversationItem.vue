<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { MessageScrollerItem } from "@/registry/edmi/ui/message-scroller"

// One turn inside the conversation (pass `messageId`; `scrollAnchor` pins a user turn to the top).
const props = defineProps<{
  messageId?: string
  scrollAnchor?: boolean
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <MessageScrollerItem
    data-slot="ai-conversation-item"
    :message-id="props.messageId"
    :scroll-anchor="props.scrollAnchor"
    :class="props.class"
  >
    <slot />
  </MessageScrollerItem>
</template>
