<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-artifact-card-meta"
    :class="cn('mt-[3px] font-mono text-[12.5px] text-muted-foreground', props.class)"
  >
    <slot />
  </div>
</template>
