<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ChartLineIcon } from '@lucide/vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<{
  /** ✦ one-step 3D look */
  raised?: boolean
  class?: HTMLAttributes['class']
}>(), { raised: false })
</script>

<template>
  <!-- Dark tile with a chart glyph: the Stockbreak mark. Use the `logo` slot of the brand/header to replace it. -->
  <span
    data-slot="site-header-mark"
    :class="cn(
      'inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground',
      props.raised && 'border-primary-edge border-b-primary-lip bg-linear-to-b from-primary-hi to-primary shadow-btn-primary [background-origin:border-box]',
      props.class,
    )"
  >
    <ChartLineIcon class="size-[15px]" />
  </span>
</template>
