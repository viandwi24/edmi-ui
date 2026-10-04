<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-1.5', props.class)">
    <span class="font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase">Instructions</span>
    <div class="text-[13.5px] leading-[1.6] text-foreground-2">
      <slot />
    </div>
  </div>
</template>
