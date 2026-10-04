<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <p :class="cn('mt-1.5 text-xs text-muted-foreground', props.class)">
    <slot />
  </p>
</template>
