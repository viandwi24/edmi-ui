<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { SparklesIcon, ChevronDownIcon } from "@lucide/vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"
import { Shimmer } from "@/registry/edmi/components/ai/shimmer"
import { useReasoningContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Custom label; return a string. The shimmer is used while streaming either way. */
  getThinkingMessage?: (isStreaming: boolean, duration?: number) => string
}>()

const { isStreaming, isOpen, duration } = useReasoningContext()

const label = computed(() => {
  if (props.getThinkingMessage)
    return props.getThinkingMessage(isStreaming.value, duration.value)
  if (isStreaming.value || duration.value === 0)
    return "Thinking…"
  if (duration.value === undefined)
    return "Thought for a few seconds"
  return `Thought for ${duration.value} seconds`
})
const shimmering = computed(() => isStreaming.value || duration.value === 0)
</script>

<template>
  <CollapsibleTrigger
    data-slot="ai-reasoning-trigger"
    :class="cn(
      'flex w-full items-center gap-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      props.class,
    )"
  >
    <slot :is-streaming="isStreaming" :is-open="isOpen" :duration="duration">
      <SparklesIcon class="size-4" />
      <Shimmer v-if="shimmering" as="span" :duration="1">
        {{ label }}
      </Shimmer>
      <span v-else>{{ label }}</span>
      <ChevronDownIcon
        :class="cn('ml-auto size-4 transition-transform', isOpen ? 'rotate-180' : 'rotate-0')"
      />
    </slot>
  </CollapsibleTrigger>
</template>
