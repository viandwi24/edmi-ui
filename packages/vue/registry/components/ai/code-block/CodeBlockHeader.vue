<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-code-block-header"
    :class="cn(
      'flex h-[38px] items-center justify-between gap-2 border-b border-border bg-muted pr-1.5 pl-3 text-[12.5px] text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
