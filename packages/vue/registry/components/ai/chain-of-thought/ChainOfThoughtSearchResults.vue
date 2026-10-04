<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div data-slot="ai-chain-of-thought-search-results" :class="cn('flex flex-wrap items-center gap-1.5', props.class)">
    <slot />
  </div>
</template>
