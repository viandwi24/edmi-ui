<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Shimmer } from "@/registry/edmi/components/ai/shimmer"
import { CardDescription } from "@/registry/edmi/ui/card"
import { slotText, usePlanContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { isStreaming } = usePlanContext()
const slots = useSlots()
const text = computed(() => slotText(slots.default?.()))
</script>

<template>
  <CardDescription data-slot="ai-plan-description" :class="cn('text-xs text-balance', props.class)">
    <Shimmer v-if="isStreaming" as="span">
      {{ text }}
    </Shimmer>
    <slot v-else />
  </CardDescription>
</template>
