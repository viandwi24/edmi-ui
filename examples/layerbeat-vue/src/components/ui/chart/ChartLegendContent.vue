<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, onMounted, ref } from "vue"
import { cn } from '@/lib/utils'
import { chartColor, useChart } from "."

const props = withDefaults(defineProps<{
  hideIcon?: boolean
  nameKey?: string
  verticalAlign?: "bottom" | "top"
  // payload?: any[]
  class?: HTMLAttributes["class"]
}>(), {
  verticalAlign: "bottom",
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
    :class="cn(
      'flex items-center justify-center gap-4 text-[12.5px]',
      verticalAlign === 'top' ? 'pb-3' : 'pt-3',
      props.class,
    )"
  >
    <div
      v-for="{ key, itemConfig, color } in payload"
      :key="key"
      :class="cn(
        '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3',
      )"
    >
      <component :is="itemConfig.icon" v-if="itemConfig.icon" />
      <div
        v-else
        class="size-2.5 shrink-0 rounded-[3px]"
        :style="{
          backgroundColor: color,
        }"
      />

      {{ itemConfig.label }}
    </div>
  </div>
</template>
