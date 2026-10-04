<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span
    data-slot="ai-voice-selector-name"
    :class="cn('truncate text-left font-medium', props.class)"
  >
    <slot />
  </span>
</template>
