<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-terminal-header"
    :class="cn(
      'flex h-9 items-center justify-between gap-2 border-b border-[oklch(0.27_0.007_286)] pr-1.5 pl-3 text-[12.5px] text-[oklch(0.72_0.01_286)]',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
