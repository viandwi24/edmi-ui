<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  ratio: number
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="aspect-ratio"
    :style="{ '--ratio': props.ratio }"
    :class="cn('relative aspect-(--ratio)', props.class)"
  >
    <slot />
  </div>
</template>
