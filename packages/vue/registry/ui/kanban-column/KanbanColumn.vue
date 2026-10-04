<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { provide } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import type { Elevation } from '@/registry/edmi/ui/elevation'

const props = defineProps<{
  /** ✦ depth of every `KanbanItem` (items may override) */
  elevation?: Elevation
  class?: HTMLAttributes['class']
  title: string
  /** Right header meta, e.g. "1/3". */
  meta?: string
}>()

provide('kanbanColumn', {
  get elevation() { return props.elevation },
})
</script>

<template>
  <!-- Sunken stage column holding `KanbanItem` cards. -->
  <div
    data-slot="kanban-column"
    :class="cn('flex w-[282px] flex-col gap-2 rounded-lg border border-sk-bd bg-sk-bg p-2.5 shadow-sunken', props.class)"
  >
    <div class="flex items-center justify-between px-1 pt-0.5 pb-1 font-mono text-[11px] text-muted-foreground">
      <span>{{ title }}</span>
      <span v-if="meta">{{ meta }}</span>
    </div>
    <slot />
  </div>
</template>
