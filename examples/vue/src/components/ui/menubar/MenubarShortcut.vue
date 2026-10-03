<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="menubar-shortcut"
    :class="cn(
      `ml-auto font-mono text-[11.5px] tracking-wide text-muted-foreground`, props.class)"
  >
    <slot />
  </span>
</template>
