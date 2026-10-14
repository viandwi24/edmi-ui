<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PodiumEntry } from '.'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { AllocationBar } from '@/registry/edmi/ui/allocation-bar'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/edmi/ui/avatar'
import { Badge } from '@/registry/edmi/ui/badge'
import { Card } from '@/registry/edmi/ui/card'
import type { Elevation } from '@/registry/edmi/ui/elevation'
import { Sparkline } from '@/registry/edmi/ui/index-row'

const props = withDefaults(defineProps<{
  /** ✦ depth of the cards, forwarded to each Card */
  elevation?: Elevation
  /** ✦ `podium` (default) or `cards` */
  variant?: 'podium' | 'cards'
  /** ✦ `cards`: label of the footer `value` stat */
  valueLabel?: string
  /** ✦ `cards`: label of the footer `count` stat */
  countLabel?: string
  entries: PodiumEntry[]
  class?: HTMLAttributes['class']
}>(), {
  variant: 'podium',
  valueLabel: 'Value',
  countLabel: 'Count',
})

const isDown = (s: string) => /^[-−–]/.test(s.trim())

// `podium` (default): #1 raised in the middle (warning badge), #2 left and #3 right sit lower.
// `cards` ✦: three equal stat cards in rank order (leaderboard board).
const ordered = computed(() => {
  const by = (r: number) => props.entries.find(e => e.rank === r)
  const order = props.variant === 'cards' ? [1, 2, 3] : [2, 1, 3]
  return order.map(by).filter((e): e is PodiumEntry => !!e)
})
</script>

<template>
  <ol
    v-if="variant === 'cards'"
    data-slot="leaderboard-podium"
    data-variant="cards"
    :class="cn('grid gap-4 lg:grid-cols-3', props.class)"
  >
    <li v-for="e in ordered" :key="e.rank">
      <Card :elevation="elevation" class="h-full gap-0 p-6">
        <div class="flex items-center justify-between text-[13px]">
          <span class="font-medium">No. {{ e.rank }}</span>
          <span v-if="e.owner" class="font-mono text-xs text-muted-foreground">{{ e.owner }}</span>
        </div>
        <div class="mt-3 flex items-center gap-3">
          <Avatar class="size-11 rounded-xl after:rounded-xl">
            <AvatarImage v-if="e.image" :src="e.image" alt="" class="rounded-xl" />
            <AvatarFallback class="rounded-xl bg-muted font-mono text-sm text-foreground-2">
              {{ (e.initials ?? e.name.slice(0, 2)).toUpperCase() }}
            </AvatarFallback>
          </Avatar>
          <div>
            <a v-if="e.href" :href="e.href" class="text-lg font-medium hover:underline">{{ e.name }}</a>
            <div v-else class="text-lg font-medium">
              {{ e.name }}
            </div>
            <div v-if="e.symbol" class="font-mono text-xs text-muted-foreground">
              {{ e.symbol }}
            </div>
          </div>
        </div>
        <div v-if="e.change" class="mt-4 flex items-end justify-between gap-3">
          <span :class="cn('text-[30px] leading-none tracking-[-0.8px]', isDown(e.change) ? 'text-destructive-text' : 'text-brand-text')">
            {{ e.change }}
          </span>
          <Sparkline
            v-if="e.spark"
            :data="e.spark"
            :tone="isDown(e.change) ? 'down' : 'up'"
            :width="150"
            :height="34"
            class="max-w-[45%]"
          />
        </div>
        <AllocationBar v-if="e.allocation?.length" :segments="e.allocation" size="sm" class="mt-4" />
        <div
          v-if="e.value !== undefined || e.count !== undefined"
          class="mt-4 flex items-center gap-4 border-t border-border-2 pt-3.5 text-[13px] text-muted-foreground"
        >
          <span v-if="e.value !== undefined">{{ valueLabel }} <b class="font-mono font-medium text-foreground">{{ e.value }}</b></span>
          <span v-if="e.count !== undefined">{{ countLabel }} <b class="font-mono font-medium text-foreground">{{ e.count }}</b></span>
        </div>
      </Card>
    </li>
  </ol>
  <ol v-else data-slot="leaderboard-podium" :class="cn('flex items-start gap-3', props.class)">
    <li v-for="e in ordered" :key="e.rank" :class="cn('w-[200px]', e.rank !== 1 && 'mt-6')">
      <Card :elevation="elevation" size="sm" class="items-center gap-0 p-[18px] text-center">
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
        <div v-if="e.meta" class="mt-0.5 font-mono text-xs text-muted-foreground">
          {{ e.meta }}
        </div>
      </Card>
    </li>
  </ol>
</template>
