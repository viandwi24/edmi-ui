<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PodiumEntry } from '.'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/edmi/ui/avatar'
import { Badge } from '@/registry/edmi/ui/badge'
import { Card } from '@/registry/edmi/ui/card'

const props = defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  entries: PodiumEntry[]
  class?: HTMLAttributes['class']
}>()

// Top three: #1 raised in the middle (warning badge), #2 left and #3 right sit lower.
const ordered = computed(() => {
  const by = (r: number) => props.entries.find(e => e.rank === r)
  return [by(2), by(1), by(3)].filter((e): e is PodiumEntry => !!e)
})
</script>

<template>
  <ol data-slot="leaderboard-podium" :class="cn('flex items-start gap-3', props.class)">
    <li v-for="e in ordered" :key="e.rank" :class="cn('w-[200px]', e.rank !== 1 && 'mt-6')">
      <Card :raised="raised" size="sm" class="items-center gap-0 p-[18px] text-center">
        <Badge shape="number" :variant="e.rank === 1 ? 'warning' : 'secondary'" class="rounded-full">
          #{{ e.rank }}
        </Badge>
        <Avatar class="mt-3 size-11">
          <AvatarImage v-if="e.image" :src="e.image" alt="" />
          <AvatarFallback class="bg-linear-to-br from-info to-brand text-sm text-white">
            {{ (e.initials ?? e.name.slice(0, 2)).toUpperCase() }}
          </AvatarFallback>
        </Avatar>
        <a v-if="e.href" :href="e.href" class="mt-2.5 font-semibold hover:underline">{{ e.name }}</a>
        <div v-else class="mt-2.5 font-semibold">
          {{ e.name }}
        </div>
        <div class="mt-0.5 font-mono text-xs text-muted-foreground">
          {{ e.meta }}
        </div>
      </Card>
    </li>
  </ol>
</template>
