<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ChartConfig } from "."
import { computed } from "vue"
import { chartColor } from "."
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "line" | "dot" | "dashed" | "none"
  nameKey?: string
  labelKey?: string
  labelFormatter?: (d: number | Date) => string
  /** Custom row text: receives the series value, key and config. */
  formatter?: (value: unknown, key: string, itemConfig: ChartConfig[string] | undefined) => string
  payload?: Record<string, any>
  config?: ChartConfig
  class?: HTMLAttributes["class"]
  color?: string
  x?: number | Date
}>(), {
  payload: () => ({}),
  config: () => ({}),
  indicator: "dot",
})

// TODO: currently we use `createElement` and `render` to render the
// const chartContext = useChart(null)

const payload = computed(() => {
  return Object.entries(props.payload).map(([key, value]) => {
    // const key = `${props.nameKey || item.name || item.dataKey || "value"}`
    const itemConfig = props.config[key]
    const indicatorColor = props.color ?? chartColor(props.config, key) ?? props.payload.fill

    return { key, value, itemConfig, indicatorColor }
  }).filter(i => i.itemConfig)
})

const showIndicator = computed(() => !props.hideIndicator && props.indicator !== "none")
const tooltipLabel = computed(() => {
  if (props.hideLabel)
    return null
  if (props.labelFormatter && props.x !== undefined) {
    return props.labelFormatter(props.x)
  }
  return props.labelKey ? props.config[props.labelKey]?.label || props.payload[props.labelKey] : props.x
})
</script>

<template>
  <div
    data-slot="chart-tooltip"
    :class="cn(
      'grid min-w-36 gap-1.5 rounded-lg border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-floating',
      props.class,
    )"
  >
    <slot>
      <div v-if="tooltipLabel" class="font-medium text-foreground">
        {{ tooltipLabel }}
      </div>
      <div class="grid gap-1.5">
        <div
          v-for="{ value, itemConfig, indicatorColor, key } in payload"
          :key="key"
          class="[&>svg]:text-muted-foreground flex w-full items-center gap-2 [&>svg]:size-3"
        >
          <component :is="itemConfig.icon" v-if="itemConfig?.icon" />
          <template v-else-if="showIndicator">
            <div
              :class="cn('shrink-0', {
                'size-2 rounded-[2px] bg-(--color-bg)': indicator === 'dot',
                'min-h-3.5 w-1 self-stretch rounded-[2px] bg-(--color-bg)': indicator === 'line',
                'min-h-3.5 w-0 self-stretch border-l-2 border-dashed border-(--color-bg)': indicator === 'dashed',
              })"
              :style="{ '--color-bg': indicatorColor }"
            />
          </template>
          <template v-if="formatter">
            <span class="flex-1 text-muted-foreground">{{ formatter(value, key, itemConfig) }}</span>
          </template>
          <template v-else>
            <span class="flex-1 text-muted-foreground">
              {{ itemConfig?.label || value }}
            </span>
            <span v-if="value" class="ml-3 whitespace-nowrap font-semibold text-foreground tabular-nums">
              {{ value.toLocaleString() }}
            </span>
          </template>
        </div>
      </div>
    </slot>
  </div>
</template>
