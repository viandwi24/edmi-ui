<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="sidebar-menu-badge"
    data-sidebar="menu-badge"
    :class="cn(
      `pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md border border-brand/30 bg-brand-soft px-1.5 font-mono text-[11px] font-medium text-brand-text tabular-nums select-none group-data-[collapsible=icon]:hidden peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1`,
      props.class,
    )"
  >
    <slot />
  </div>
</template>
