<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { onMounted, ref, watch } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  date: Date
  class?: HTMLAttributes["class"]
}>()

const relativeTimeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

function formatRelativeDate(date: Date) {
  const seconds = Math.round((date.getTime() - Date.now()) / 1000)
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ["day", 86_400],
    ["hour", 3600],
    ["minute", 60],
  ]
  for (const [unit, size] of steps) {
    if (Math.abs(seconds) >= size) {
      return relativeTimeFormat.format(Math.round(seconds / size), unit)
    }
  }
  return relativeTimeFormat.format(0, "second")
}

// Formatted after mount so server and client markup match.
const formatted = ref("")
onMounted(() => {
  formatted.value = formatRelativeDate(props.date)
})
watch(() => props.date, (date) => {
  formatted.value = formatRelativeDate(date)
})
</script>

<template>
  <time :class="cn('text-xs', props.class)" :datetime="props.date.toISOString()">
    <slot>{{ formatted }}</slot>
  </time>
</template>
