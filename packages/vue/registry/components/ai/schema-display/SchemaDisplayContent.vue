<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-schema-display-content"
    :class="cn('divide-y divide-border-2 border-t border-border-2', props.class)"
  >
    <slot />
  </div>
</template>
