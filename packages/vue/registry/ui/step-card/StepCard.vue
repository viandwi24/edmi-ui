<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ArrowUpRightIcon } from '@lucide/vue'
import { Card } from '@/registry/edmi/ui/card'
import type { Elevation } from '@/registry/edmi/ui/elevation'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  /** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2 */
  elevation?: Elevation
  class?: HTMLAttributes['class']
  /** Mono step number, e.g. "01". */
  index: string | number
  title: string
  description?: string
}>()
// Slot `icon` = corner icon (defaults to an arrow up-right).
</script>

<template>
  <Card :elevation="elevation" data-slot="step-card" :class="cn('gap-0 p-[18px]', props.class)">
    <div class="flex items-center justify-between">
      <span class="font-mono text-xs text-muted-foreground">{{ index }}</span>
      <span class="text-muted-foreground">
        <slot name="icon"><ArrowUpRightIcon class="size-3.5" /></slot>
      </span>
    </div>
    <div class="mt-[18px] text-base font-semibold">{{ title }}</div>
    <div v-if="description" class="mt-1.5 text-[13px] text-muted-foreground">{{ description }}</div>
  </Card>
</template>
