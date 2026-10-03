<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="progress-label"
    :class="cn('text-sm font-medium', props.class)"
  >
    <slot />
  </span>
</template>
