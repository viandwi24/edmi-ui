<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { agentAvatarCells } from "./identicon"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** Agent id: the same seed always draws the same mark. */
  seed: string
  /** `chart-1` to `chart-5`, or any CSS color. Defaults to a chart token picked from the seed. */
  color?: string
  /** Pixel size of the square. */
  size?: number
  /** Muted rounded tile behind the mark (default). `false` draws the bare mark. */
  tile?: boolean
  /** Accessible name; the mark is decorative when omitted. */
  label?: string
}>(), {
  size: 40,
  tile: true,
})

const data = computed(() => agentAvatarCells(props.seed))
const fill = computed(() => {
  if (props.color)
    return /^chart-[1-5]$/.test(props.color) ? `var(--${props.color})` : props.color
  return `var(--chart-${data.value.chart})`
})
const inner = computed(() => (props.tile ? props.size * 0.62 : props.size))
const offset = computed(() => (props.tile ? props.size * 0.19 : 0))
const cell = computed(() => inner.value * 0.17)
const step = computed(() => (inner.value - cell.value) / 4)
</script>

<template>
  <svg
    data-slot="ai-agent-avatar"
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : true"
    :class="cn('shrink-0', props.class)"
  >
    <rect
      v-if="tile"
      :x="0.5"
      :y="0.5"
      :width="size - 1"
      :height="size - 1"
      :rx="size * 0.28"
      fill="var(--muted)"
      stroke="var(--border)"
    />
    <rect
      v-for="c in data.cells"
      :key="`${c.x}-${c.y}`"
      :x="offset + c.x * step"
      :y="offset + c.y * step"
      :width="cell"
      :height="cell"
      :rx="cell * 0.17"
      :fill="fill"
      :opacity="c.opacity"
    />
  </svg>
</template>
