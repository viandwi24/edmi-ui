<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  active?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  active: false,
})
</script>

<template>
  <button
    type="button"
    data-slot="chart-stat-well"
    :data-active="active ? '' : undefined"
    :aria-pressed="active"
    :class="cn(
      'flex min-w-36 flex-col justify-center gap-0.5 border-border border-l px-6 py-4 text-left text-muted-foreground text-xs outline-none first:border-l-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [&_b]:font-semibold [&_b]:text-[26px] [&_b]:text-foreground [&_b]:leading-[1.1] [&_b]:tracking-[-0.6px]',
      active && 'bg-sk-bg shadow-sunken',
      props.class,
    )"
  >
    <slot />
  </button>
</template>
