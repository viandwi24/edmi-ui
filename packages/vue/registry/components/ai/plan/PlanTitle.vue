<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Shimmer } from "@/registry/edmi/components/ai/shimmer"
import { CardTitle } from "@/registry/edmi/ui/card"
import { slotText, usePlanContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { isStreaming } = usePlanContext()
const slots = useSlots()
const text = computed(() => slotText(slots.default?.()))
</script>

<template>
  <CardTitle data-slot="ai-plan-title" :class="cn('text-[15px]', props.class)">
    <Shimmer v-if="isStreaming" as="span">
      {{ text }}
    </Shimmer>
    <slot v-else />
  </CardTitle>
</template>
