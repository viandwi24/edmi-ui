<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { ArrowDownIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { MessageScrollerButton } from "@/registry/edmi/ui/message-scroller"

// Round "scroll to latest" button; only visible when the user scrolled up.
const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  size?: ButtonVariants["size"]
}>(), {
  size: "icon",
})
</script>

<template>
  <MessageScrollerButton
    aria-label="Scroll to latest"
    :size="props.size"
    :class="cn('rounded-full', props.class)"
  >
    <slot>
      <ArrowDownIcon class="size-4" />
    </slot>
  </MessageScrollerButton>
</template>
