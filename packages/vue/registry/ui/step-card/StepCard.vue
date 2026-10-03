<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ArrowUpRightIcon } from '@lucide/vue'
import { Card } from '@/registry/edmi/ui/card'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  class?: HTMLAttributes['class']
  /** Mono step number, e.g. "01". */
  index: string | number
  title: string
  description?: string
}>()
// Slot `icon` = corner icon (defaults to an arrow up-right).
</script>

<template>
  <Card :raised="raised" data-slot="step-card" :class="cn('gap-0 p-[18px]', props.class)">
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
