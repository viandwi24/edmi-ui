<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span
    data-slot="ai-voice-selector-description"
    :class="cn('text-[12.5px] text-muted-foreground', props.class)"
  >
    <slot />
  </span>
</template>
