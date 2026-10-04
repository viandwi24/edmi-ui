<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span :class="cn('inline-flex shrink-0 text-muted-foreground', props.class)">
    <slot />
  </span>
</template>
