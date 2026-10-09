<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, onMounted, ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { chartColor, useChart } from "."

const props = withDefaults(defineProps<{
  hideIcon?: boolean
  nameKey?: string
  verticalAlign?: "bottom" | "top"
  /** ✦ `line` draws the 14x2 swatch used by line charts. */
  swatch?: "square" | "line"
  // payload?: any[]
  class?: HTMLAttributes["class"]
}>(), {
  verticalAlign: "bottom",
  swatch: "square",
})

const { id, config } = useChart()

const payload = computed(() => Object.entries(config.value).map(([key, value]) => {
  return {
    key: props.nameKey || key,
    itemConfig: value,
    color: chartColor(config.value, props.nameKey || key),
  }
}))

const containerSelector = ref("")
onMounted(() => {
  containerSelector.value = `[data-chart="chart-${id}"]>[data-vis-xy-container]`
})
</script>

<template>
  <div
    v-if="containerSelector"
    data-slot="chart-legend"
    :class="cn(
      'flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12.5px] text-foreground-2',
      verticalAlign === 'top' ? 'pb-2.5' : 'pt-2.5',
      props.class,
    )"
  >
    <div
      v-for="{ key, itemConfig, color } in payload"
      :key="key"
      :class="cn(
        '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:size-3',
      )"
    >
      <component :is="itemConfig.icon" v-if="itemConfig.icon" />
      <div
        v-else
        :class="cn('shrink-0', swatch === 'line' ? 'h-0.5 w-3.5 rounded-[1px]' : 'size-2 rounded-[2px]')"
        :style="{
          backgroundColor: color,
        }"
      />

      {{ itemConfig.label }}
    </div>
  </div>
</template>
