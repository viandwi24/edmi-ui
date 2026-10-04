<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-sandbox-tabs-bar"
    :class="cn('flex w-full items-center px-3 pt-2.5', props.class)"
  >
    <slot />
  </div>
</template>
