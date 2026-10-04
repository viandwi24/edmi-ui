<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PodiumEntry } from '.'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/edmi/ui/avatar'
import { Badge } from '@/registry/edmi/ui/badge'
import { Card } from '@/registry/edmi/ui/card'
import type { Elevation } from '@/registry/edmi/ui/elevation'

const props = withDefaults(defineProps<{
  /** ✦ depth of the cards, forwarded to each Card */
  elevation?: Elevation
  /** ✦ `podium` (default) or `cards` */
  variant?: 'podium' | 'cards'
  entries: PodiumEntry[]
  class?: HTMLAttributes['class']
}>(), {
  variant: 'podium',
})

const isDown = (s: string) => /^[-−–]/.test(s.trim())
const color = (c: string | undefined, i: number) => c ?? `var(--chart-${(i % 5) + 1})`

// `podium` (default): #1 raised in the middle (warning badge), #2 left and #3 right sit lower.
// `cards` ✦: three equal stat cards in rank order (leaderboard board).
const ordered = computed(() => {
  const by = (r: number) => props.entries.find(e => e.rank === r)
  const order = props.variant === 'cards' ? [1, 2, 3] : [2, 1, 3]
  return order.map(by).filter((e): e is PodiumEntry => !!e)
})

function sparkPoints(data: number[], width = 150, height = 34) {
  const min = Math.min(...data)
  const span = Math.max(...data) - min || 1
  const pad = 2
  return data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (width - pad * 2)
      const y = pad + (1 - (v - min) / span) * (height - pad * 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}
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
          <span v-if="e.creator" class="font-mono text-xs text-muted-foreground">{{ e.creator }}</span>
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
          <svg
            v-if="e.spark && e.spark.length > 1"
            width="150"
            height="34"
            viewBox="0 0 150 34"
            fill="none"
            aria-hidden="true"
            :class="cn('max-w-[45%]', isDown(e.change) ? 'text-destructive-text' : 'text-success-text')"
          >
            <polyline
              :points="sparkPoints(e.spark)"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div v-if="e.allocation?.length" class="mt-4">
          <div class="flex h-2 gap-[3px]" role="img" :aria-label="e.allocation.map(s => `${s.label} ${s.value}%`).join(', ')">
            <span
              v-for="(s, i) in e.allocation"
              :key="s.label"
              class="rounded-[3px]"
              :style="{ flex: s.value, background: color(s.color, i) }"
            />
          </div>
          <ul class="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-foreground-2">
            <li v-for="(s, i) in e.allocation" :key="s.label" class="flex items-center gap-1.5">
              <span class="size-2 rounded-[2px]" :style="{ background: color(s.color, i) }" />
              <span class="font-mono">{{ s.label }}</span>
              <b class="font-semibold text-foreground">{{ s.value }}%</b>
            </li>
          </ul>
        </div>
        <div
          v-if="e.aum !== undefined || e.holders !== undefined"
          class="mt-4 flex items-center gap-4 border-t border-border-2 pt-3.5 text-[13px] text-muted-foreground"
        >
          <span v-if="e.aum !== undefined">AUM <b class="font-mono font-medium text-foreground">{{ e.aum }}</b></span>
          <span v-if="e.holders !== undefined">Holders <b class="font-mono font-medium text-foreground">{{ e.holders }}</b></span>
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
