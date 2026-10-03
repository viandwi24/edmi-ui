<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { computed } from "vue"
import { chartColor, THEMES, useChart } from "."

defineProps<{
  id?: HTMLAttributes["id"]
}>()

const { config } = useChart()

const colorConfig = computed(() => {
  // ✦ Series without a color fall back to --chart-1…5 by order.
  return Object.entries(config.value).map(([key, item]) => [
    key,
    item.theme || item.color ? item : { ...item, color: chartColor(config.value, key) },
  ] as const)
})
</script>

<template>
  <Primitive
    v-if="colorConfig.length"
    as="style"
  >
    {{ Object.entries(THEMES)
      .map(
        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color
      = itemConfig.theme?.[theme as keyof typeof itemConfig.theme]
      || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
        .join("\n")}
}
`,
      )
      .join("\n") }}
  </Primitive>
</template>
