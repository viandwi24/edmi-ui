<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { MessageScrollerContent, MessageScrollerViewport } from "@/registry/edmi/ui/message-scroller"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Viewport + content column. Wrap each turn in ConversationItem so the scroller can anchor it. -->
  <MessageScrollerViewport>
    <MessageScrollerContent
      v-bind="$attrs"
      data-slot="ai-conversation-content"
      :class="cn('gap-6 p-4', props.class)"
    >
      <slot />
    </MessageScrollerContent>
  </MessageScrollerViewport>
</template>
