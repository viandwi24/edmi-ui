<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="inset-panel-header"
    :class="cn('flex items-center gap-2 px-4 py-3 text-sm font-medium', props.class)"
  >
    <slot />
  </div>
</template>
