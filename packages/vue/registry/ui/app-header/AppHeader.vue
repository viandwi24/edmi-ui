<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AppHeaderItem } from '.'
import { ChartLineIcon, Search, WalletIcon } from '@lucide/vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Button } from '@/registry/edmi/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/edmi/ui/input-group'
import { Kbd } from '@/registry/edmi/ui/kbd'
import AppHeaderNavItem from './AppHeaderNavItem.vue'

const props = withDefaults(defineProps<{
  name?: string
  href?: string
  items?: AppHeaderItem[]
  /** `href` of the active item. */
  active?: string
  /** `false` hides the search field. */
  search?: boolean
  searchPlaceholder?: string
  shortcut?: string
  /** Network label; empty string hides the button. */
  network?: string
  connectLabel?: string
  /** ✦ one-step 3D look: bar, mark, active pill and buttons */
  raised?: boolean
  class?: HTMLAttributes['class']
}>(), {
  name: 'Stockbreak',
  href: '/',
  items: () => [],
  search: true,
  searchPlaceholder: 'Search',
  shortcut: '⌘K',
  network: 'Devnet',
  connectLabel: 'Connect',
})

const emit = defineEmits<{
  (e: 'connect'): void
  (e: 'network-click'): void
}>()
</script>

<template>
  <!-- App top bar (navbar layout): brand + nav pills, then search, network and wallet. -->
  <header
    data-slot="app-header"
    :class="cn(
      'flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-3 text-sm text-card-foreground',
      props.raised && 'border-b-lip shadow-card',
      props.class,
    )"
  >
    <div class="flex items-center gap-[18px]">
      <a :href="href" class="flex items-center gap-2.5 whitespace-nowrap">
        <slot name="logo">
          <span :class="cn('inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground', raised && 'border-primary-edge border-b-primary-lip bg-linear-to-b from-primary-hi to-primary shadow-btn-primary [background-origin:border-box]')">
            <ChartLineIcon class="size-[15px]" />
          </span>
        </slot>
        <span class="font-brand text-xl font-semibold tracking-[-0.4px]">{{ name }}</span>
      </a>
      <nav class="flex items-center gap-0.5 max-lg:hidden" aria-label="App">
        <AppHeaderNavItem
          v-for="item in items"
          :key="item.href"
          :href="item.href"
          :active="item.href === active"
          :raised="raised"
        >
          {{ item.label }}
        </AppHeaderNavItem>
      </nav>
    </div>
    <div class="flex items-center gap-2">
      <InputGroup v-if="search" class="h-9 w-[180px] max-md:hidden">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          :placeholder="searchPlaceholder"
          :aria-label="searchPlaceholder"
          class="text-[13px]"
        />
        <InputGroupAddon align="inline-end">
          <Kbd :raised="raised">{{ shortcut }}</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <Button v-if="network" variant="secondary" :raised="raised" @click="emit('network-click')">
        {{ network }}
      </Button>
      <Button :raised="raised" @click="emit('connect')">
        <WalletIcon />
        {{ connectLabel }}
      </Button>
    </div>
  </header>
</template>
