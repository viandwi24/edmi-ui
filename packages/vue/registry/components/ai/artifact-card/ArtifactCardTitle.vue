<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Shimmer } from "@/registry/edmi/components/ai/shimmer"
import { useArtifactCardState } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const state = useArtifactCardState()
const slots = useSlots()

// Shimmer reads its text from the slot, so hand it the plain text of ours.
const text = computed(() =>
  (slots.default?.() ?? [])
    .map(v => (typeof v.children === "string" ? v.children : ""))
    .join(""),
)
</script>

<template>
  <div data-slot="ai-artifact-card-title" :class="cn('truncate text-[14.5px] font-medium', props.class)">
    <Shimmer v-if="state === 'generating'" as="span">
      {{ text }}
    </Shimmer>
    <slot v-else />
  </div>
</template>
