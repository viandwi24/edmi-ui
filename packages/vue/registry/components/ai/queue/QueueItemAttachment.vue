<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div data-slot="ai-queue-item-attachment" :class="cn('mt-1 ml-[22px] flex flex-wrap gap-2', props.class)">
    <slot />
  </div>
</template>
