<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  size?: 'default' | 'sm'
  /** ✦ one-step 3D look: hard lip + top highlight */
  raised?: boolean
}>(), {
  size: 'default',
  raised: false,
})
</script>

<template>
  <div
    data-slot="card"
    :data-size="size"
    :class="cn('group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-border bg-card py-(--card-spacing) text-sm text-card-foreground [--card-spacing:22px] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:16px] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl', props.raised && 'border-b-lip shadow-card', props.class)"
  >
    <slot />
  </div>
</template>
