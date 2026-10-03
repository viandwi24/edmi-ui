<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { BubbleVariants } from "@/registry/edmi/ui/bubble"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Bubble, BubbleContent } from "@/registry/edmi/ui/bubble"
import { MessageContent as UiMessageContent } from "@/registry/edmi/ui/message"
import { useMessageContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Defaults to `secondary` for the user and `ghost` (no fill, keeps vertical padding) for the assistant. */
  variant?: BubbleVariants["variant"]
}>()

const ctx = useMessageContext()
const user = computed(() => ctx?.from.value === "user")
</script>

<template>
  <UiMessageContent data-slot="ai-message-content">
    <Bubble
      :variant="props.variant ?? (user ? 'secondary' : 'ghost')"
      :align="user ? 'end' : 'start'"
      :class="cn(!user && 'w-full')"
    >
      <BubbleContent :class="cn(!user && 'w-full', props.class)">
        <slot />
      </BubbleContent>
    </Bubble>
  </UiMessageContent>
</template>
