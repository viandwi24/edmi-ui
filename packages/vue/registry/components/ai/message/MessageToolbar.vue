<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div data-slot="ai-message-toolbar" :class="cn('flex w-full items-center justify-between gap-4', props.class)">
    <slot />
  </div>
</template>
