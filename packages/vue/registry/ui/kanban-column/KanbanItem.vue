<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ArrowUpRightIcon } from '@lucide/vue'
import { inject } from 'vue'
import { Card } from '@/registry/edmi/ui/card'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<{
  /** ✦ one-step 3D look; defaults to the column's `raised` */
  raised?: boolean
  class?: HTMLAttributes['class']
  title: string
  description?: string
  /** Dims the card (not yet reachable). */
  disabled?: boolean
}>(), { raised: undefined })

const column = inject<{ raised?: boolean } | null>('kanbanColumn', null)
// Slots: `icon` (leading), `action` (trailing; defaults to an arrow up-right).
</script>

<template>
  <Card
    :elevation="(props.raised ?? column?.raised ?? false) ? 'raised' : undefined"
    data-slot="kanban-item"
    :data-disabled="disabled ? '' : undefined"
    :class="cn('flex-row items-center gap-2.5 px-3 py-2.5 data-[disabled]:opacity-60', props.class)"
  >
    <span
      v-if="$slots.icon"
      class="grid size-7 shrink-0 place-items-center rounded-lg border border-border bg-muted [&_svg]:size-3.5"
    >
      <slot name="icon" />
    </span>
    <div class="min-w-0 flex-1">
      <div class="text-[13px] font-medium">{{ title }}</div>
      <div v-if="description" class="text-[11px] text-muted-foreground">{{ description }}</div>
    </div>
    <span class="text-muted-foreground">
      <slot name="action"><ArrowUpRightIcon class="size-[13px]" /></slot>
    </span>
  </Card>
</template>
