<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** ✦ one-step 3D look */
  raised?: boolean
}>(), { raised: false })
</script>

<template>
  <kbd
    data-slot="kbd"
    :class="cn(
      'pointer-events-none inline-flex h-[22px] w-fit min-w-[22px] items-center justify-center gap-1 rounded-[5px] border border-input bg-muted px-1.5 font-mono text-[11.5px] font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:border-background/20 in-data-[slot=tooltip-content]:bg-background/15 in-data-[slot=tooltip-content]:bg-none in-data-[slot=tooltip-content]:text-background in-data-[slot=tooltip-content]:shadow-none [&_svg:not([class*=\'size-\'])]:size-3',
      props.raised && 'border-b-secondary-lip bg-linear-to-b from-secondary-hi to-muted shadow-[0_1px_0_var(--secondary-lip)] [background-origin:border-box]',
      props.class,
    )"
  >
    <slot />
  </kbd>
</template>
