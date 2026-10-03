<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Badge } from '@/registry/edmi/ui/badge'
import { Card } from '@/registry/edmi/ui/card'
import { cn } from '@/registry/edmi/lib/utils'
import AgentIdenticon from './AgentIdenticon.vue'
import type { AgentCardStat } from './types'

const props = defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  class?: HTMLAttributes['class']
  name: string
  /** Mono sub line, usually a shortened address. */
  address?: string
  /** Secondary badge next to the name (e.g. "AI"). */
  tag?: string
  /** Shows the brand "Autopilot" badge. */
  autopilot?: boolean
  stats?: AgentCardStat[]
  /** Identicon seed; defaults to `name`. */
  seed?: string
}>()
</script>

<template>
  <Card :raised="raised" data-slot="agent-card" :class="cn('gap-0 p-5', props.class)">
    <div class="flex items-center gap-3.5">
      <AgentIdenticon :seed="seed ?? name" />
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-base font-semibold">{{ name }}</span>
          <Badge v-if="tag" variant="secondary">{{ tag }}</Badge>
          <Badge v-if="autopilot" variant="brand">
            <span class="size-1.5 rounded-full bg-current" />
            Autopilot
          </Badge>
        </div>
        <div v-if="address" class="mt-1 font-mono text-xs text-muted-foreground">
          {{ address }}
        </div>
      </div>
    </div>
    <div v-if="stats?.length" class="mt-4 flex justify-between border-t border-border pt-3.5">
      <div v-for="s in stats" :key="s.label">
        <div class="text-xs text-muted-foreground">{{ s.label }}</div>
        <div class="mt-1 font-mono text-[19px]">{{ s.value }}</div>
      </div>
    </div>
    <!-- ✦ default slot: footer under the stats (a note, an action row) -->
    <div v-if="$slots.default" data-slot="agent-card-footer" class="mt-4 border-t border-border pt-3.5 text-[13px] text-muted-foreground">
      <slot />
    </div>
  </Card>
</template>
