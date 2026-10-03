<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { EmptyMediaVariants } from '.'
import { cn } from '@/lib/utils'
import { emptyMediaVariants } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  variant?: EmptyMediaVariants['variant']
  /** ✦ one-step 3D look (icon variant) */
  raised?: boolean
}>(), { raised: false })
</script>

<template>
  <div
    data-slot="empty-icon"
    :data-variant="variant"
    :class="cn(emptyMediaVariants({ variant, raised }), props.class)"
  >
    <slot />
  </div>
</template>
