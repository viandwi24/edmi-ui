<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="skeleton"
    :class="cn('animate-pulse rounded-[7px] bg-accent', props.class)"
  >
    <slot />
  </div>
</template>
