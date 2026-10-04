<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="ai-voice-selector-attributes"
    :class="cn('flex items-center gap-1 text-xs', props.class)"
  >
    <slot />
  </div>
</template>
