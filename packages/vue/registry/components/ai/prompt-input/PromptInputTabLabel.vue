<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <h3 :class="cn('mb-2 px-3 text-xs font-medium text-muted-foreground', props.class)">
    <slot />
  </h3>
</template>
