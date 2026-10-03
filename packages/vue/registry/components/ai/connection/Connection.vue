<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { ConnectionLineProps } from "@vue-flow/core"
import { computed } from "vue"

/** Line drawn while dragging from a handle: ring-colored bezier with an end dot. */
const props = defineProps<ConnectionLineProps>()

const HALF = 0.5

const pathD = computed(() => {
  const { sourceX, sourceY, targetX, targetY } = props
  const controlX = sourceX + (targetX - sourceX) * HALF
  return `M${sourceX},${sourceY} C ${controlX},${sourceY} ${controlX},${targetY} ${targetX},${targetY}`
})
</script>

<template>
  <g data-slot="ai-connection">
    <path
      class="animated"
      fill="none"
      stroke="var(--ring)"
      stroke-linecap="round"
      :stroke-width="1.6"
      :d="pathD"
    />
    <circle :cx="sourceX" :cy="sourceY" fill="var(--card)" :r="4.5" stroke="var(--ring)" :stroke-width="1.6" />
    <circle :cx="targetX" :cy="targetY" fill="var(--ring)" :r="3" />
  </g>
</template>
