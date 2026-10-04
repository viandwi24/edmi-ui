<script setup lang="ts">
import type { EdgeProps } from "@vue-flow/core"
import { BaseEdge, getBezierPath } from "@vue-flow/core"
import { computed } from "vue"

/** Conditional or error path: dotted, muted. */
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
    :path="path"
    :style="{
      stroke: 'var(--muted-foreground-2)',
      strokeDasharray: '2 5',
      strokeLinecap: 'round',
    }"
  />
</template>
