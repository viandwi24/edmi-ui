<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { MessageScroller, MessageScrollerProvider } from "@/registry/edmi/ui/message-scroller"

// Thin layer on ui/message-scroller (DESIGN §5b): the scroller already follows streaming replies and
// owns the scroll state; this adds the AI Elements anatomy, EmptyState (+ home variant) and Download.

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** Follow new content while the user is at the bottom. */
  autoScroll?: boolean
}>(), {
  autoScroll: true,
})
</script>

<template>
  <MessageScrollerProvider :auto-scroll="props.autoScroll">
    <MessageScroller
      v-bind="$attrs"
      data-slot="ai-conversation"
      role="log"
      :class="cn('flex-1', props.class)"
    >
      <slot />
    </MessageScroller>
  </MessageScrollerProvider>
</template>
