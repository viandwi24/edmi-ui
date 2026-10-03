<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div data-slot="ai-chat-header-actions" :class="cn('flex shrink-0 items-center gap-1', props.class)">
    <slot />
  </div>
</template>
