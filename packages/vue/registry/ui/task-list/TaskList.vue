<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Badge } from '@/registry/edmi/ui/badge'
import { Card } from '@/registry/edmi/ui/card'
import { Separator } from '@/registry/edmi/ui/separator'
import { cn } from '@/registry/edmi/lib/utils'
import type { Task, TaskStatus } from './types'

const STATUS: Record<TaskStatus, { label: string; variant: 'warning' | 'info' | 'success' }> = {
  review: { label: 'Ready to review', variant: 'warning' },
  running: { label: 'Running', variant: 'info' },
  completed: { label: 'Completed', variant: 'success' },
}

const props = defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  class?: HTMLAttributes['class']
  tasks: Task[]
  /** Override the status badge labels. */
  labels?: Partial<Record<TaskStatus, string>>
}>()

// Tasks grouped by status (first-appearance order), one badge per group.
const groups = computed(() => {
  const out: { status: TaskStatus; items: Task[] }[] = []
  for (const t of props.tasks) {
    const g = out.find((x) => x.status === t.status)
    if (g) g.items.push(t)
    else out.push({ status: t.status, items: [t] })
  }
  return out
})
</script>

<template>
  <Card :raised="raised" data-slot="task-list" :class="cn('gap-0 px-[18px] py-4', props.class)">
    <template v-for="(g, gi) in groups" :key="g.status">
      <Separator v-if="gi > 0" class="my-3" />
      <div data-slot="task-group" :data-status="g.status">
        <Badge :variant="STATUS[g.status].variant" class="font-mono text-[10.5px]">
          {{ labels?.[g.status] ?? STATUS[g.status].label }}
        </Badge>
        <div
          v-for="(t, i) in g.items"
          :key="t.id ?? i"
          data-slot="task-item"
          class="mt-2 flex items-center justify-between gap-2.5 text-[13px]"
        >
          <span>{{ t.title }}</span>
          <span v-if="t.agent" class="text-[10px] whitespace-nowrap text-muted-foreground uppercase">
            {{ t.agent }}
          </span>
        </div>
      </div>
    </template>
  </Card>
</template>
