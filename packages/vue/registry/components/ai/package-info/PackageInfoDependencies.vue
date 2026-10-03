<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div :class="cn('flex flex-col gap-2', props.class)">
    <span class="font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase">Dependencies</span>
    <div class="flex flex-col gap-1">
      <slot />
    </div>
  </div>
</template>
