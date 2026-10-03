<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<{
  symbol: string
  price: string
  /** Signed percentage, e.g. `+2.38%`. */
  change: string
  /** Tile background: any CSS color, default `var(--chart-1)`. */
  color?: string
  letter?: string
  active?: boolean
  /** ✦ the active row gets a one-step lip. */
  raised?: boolean
  class?: HTMLAttributes['class']
}>(), {
  color: 'var(--chart-1)',
  raised: false,
})

const down = computed(() => /^[-−–]/.test(props.change.trim()))
</script>

<template>
  <!-- Compact sidebar row: colored letter tile, symbol, mono price and change. -->
  <a
    data-slot="watchlist-item"
    :data-active="active ? '' : undefined"
    :class="cn(
      'flex h-10 items-center gap-2.5 rounded-lg px-2.5 text-[13.5px] text-sidebar-foreground outline-none hover:bg-sidebar-accent focus-visible:outline-2 focus-visible:outline-ring',
      'data-[active]:bg-sidebar-accent data-[active]:font-medium data-[active]:shadow-[inset_0_0_0_1px_var(--sidebar-border)]',
      raised && 'border border-transparent data-[active]:border-sidebar-border data-[active]:border-b-lip data-[active]:shadow-btn-outline',
      props.class,
    )"
  >
    <span
      class="inline-flex size-[26px] items-center justify-center rounded-[7px] text-xs font-semibold text-primary-foreground"
      :style="{ background: color }"
    >{{ letter ?? symbol.charAt(0) }}</span>
    <span class="min-w-0 flex-1 truncate">{{ symbol }}</span>
    <span class="font-mono text-[11.5px] text-muted-foreground">{{ price }}</span>
    <span :class="cn('font-mono text-[11.5px]', down ? 'text-destructive-text' : 'text-brand-text')">{{ change }}</span>
  </a>
</template>
