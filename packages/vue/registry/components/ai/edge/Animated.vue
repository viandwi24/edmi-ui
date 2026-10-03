<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { EdgeProps } from "@vue-flow/core"
import { BaseEdge, getBezierPath } from "@vue-flow/core"
import { computed } from "vue"

/** Active data flow: brand dashes that move toward the target. */
const props = defineProps<EdgeProps>()

const path = computed(() => getBezierPath({
  sourceX: props.sourceX,
  sourceY: props.sourceY,
  sourcePosition: props.sourcePosition,
  targetX: props.targetX,
  targetY: props.targetY,
  targetPosition: props.targetPosition,
})[0])
</script>

<template>
  <BaseEdge
    :id="props.id"
    :marker-end="props.markerEnd"
    :path="path"
    :style="{
      stroke: 'var(--brand)',
      strokeDasharray: '6 5',
      strokeLinecap: 'round',
      animation: 'dashdraw 0.6s linear infinite',
      ...(props.style as Record<string, string>),
    }"
  />
</template>
