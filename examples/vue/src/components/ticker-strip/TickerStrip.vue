<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TickerItem } from '.'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import type { Elevation } from '@/components/ui/elevation'

const props = defineProps<{
  /** ✦ depth of the card (sunken -1, flat 0, raised +1, floating +2) */
  elevation?: Elevation
  items: TickerItem[]
  class?: HTMLAttributes['class']
}>()

const isDown = (s: string) => /^[-−–]/.test(s.trim())
const cell = 'block min-w-[150px] flex-1 px-[18px] py-3.5 not-first:border-l not-first:border-border'
</script>

<template>
  <!-- Horizontal row of price cells (avatar + symbol, mono price, up/down change). -->
  <Card :elevation="elevation" data-slot="ticker-strip" :class="cn('flex-row gap-0 overflow-x-auto p-0', props.class)">
    <component
      :is="item.href ? 'a' : 'div'"
      v-for="item in items"
      :key="item.symbol"
      :href="item.href"
      :class="item.href ? cn(cell, 'hover:bg-[color-mix(in_srgb,var(--accent)_50%,var(--background))]') : cell"
    >
      <div class="flex items-center gap-2">
        <Avatar class="size-[22px]">
          <AvatarImage v-if="item.image" :src="item.image" alt="" />
          <AvatarFallback class="text-[9px]">
            {{ item.symbol.charAt(0) }}
          </AvatarFallback>
        </Avatar>
        <span class="font-mono text-xs text-muted-foreground">{{ item.symbol }}</span>
      </div>
      <div class="mt-2.5 font-mono text-[17px]">
        {{ item.price }}
      </div>
      <div :class="cn('mt-1 font-mono text-xs', isDown(item.change) ? 'text-destructive-text' : 'text-success-text')">
        {{ item.change }}
      </div>
    </component>
  </Card>
</template>
