<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { provide } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  /** ✦ one-step 3D look on every `KanbanItem` (items may override) */
  raised?: boolean
  class?: HTMLAttributes['class']
  title: string
  /** Right header meta, e.g. "1/3". */
  meta?: string
}>()

provide('kanbanColumn', {
  get raised() { return props.raised },
})
</script>

<template>
  <!-- Sunken stage column holding `KanbanItem` cards. -->
  <div
    data-slot="kanban-column"
    :class="cn('flex w-[282px] flex-col gap-2 rounded-lg border border-border-2 bg-muted p-2.5 shadow-sunk', props.class)"
  >
    <div class="flex items-center justify-between px-1 pt-0.5 pb-1 font-mono text-[11px] text-muted-foreground">
      <span>{{ title }}</span>
      <span v-if="meta">{{ meta }}</span>
    </div>
    <slot />
  </div>
</template>
