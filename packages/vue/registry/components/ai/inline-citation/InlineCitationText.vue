<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span data-slot="ai-inline-citation-text" :class="cn('transition-colors group-hover/citation:bg-accent', props.class)">
    <slot />
  </span>
</template>
