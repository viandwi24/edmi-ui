<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AppHeaderItem } from '.'
import { PhChartLine, PhMagnifyingGlass, PhWallet } from '@phosphor-icons/vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { controlLevel, type Elevation, surfaceElevation, useElevation } from '@/components/ui/elevation'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import AppHeaderNavItem from './AppHeaderNavItem.vue'

const props = withDefaults(defineProps<{
  /** Brand text (or use the `name` slot). */
  name?: string
  href?: string
  items?: AppHeaderItem[]
  /** `href` of the active item. */
  active?: string
  /** `false` hides the search field. */
  search?: boolean
  searchPlaceholder?: string
  shortcut?: string
  /** Secondary button label (e.g. a network or workspace; or use the `network` slot); omit to hide it. */
  network?: string
  /** Primary button label (or use the `connect-label` slot). */
  connectLabel?: string
  /** ✦ depth of the bar; raised +1 / floating +2 also raise the mark, active pill and buttons */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}>(), {
  href: '/',
  items: () => [],
  search: true,
  searchPlaceholder: 'Search',
  shortcut: '⌘K',
  connectLabel: 'Connect',
  elevation: undefined,
})

const level = useElevation(() => props.elevation, 'surface')
// Controls follow an explicit bar level: raised/floating raise them, flat/sunken keep them flat; auto leaves them to their own role.
const control = computed(() => controlLevel(props.elevation))
const markLevel = useElevation(() => control.value, 'handle')
const markRaised = computed(() => markLevel.value === 'raised' || markLevel.value === 'floating')

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
      '@container/app-header flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-3 text-sm text-card-foreground',
      surfaceElevation[level],
      props.class,
    )"
  >
    <div class="flex items-center gap-[18px]">
      <a :href="href" class="flex items-center gap-2.5 whitespace-nowrap">
        <slot name="logo">
          <span :class="cn('inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground', markRaised && '[background-image:var(--r1-p-face)] shadow-btn-raised-primary [background-origin:border-box]')">
            <PhChartLine class="size-[15px]" />
          </span>
        </slot>
        <span v-if="name || $slots.name" class="font-brand text-xl font-semibold tracking-[-0.4px]"><slot name="name">{{ name }}</slot></span>
      </a>
      <nav class="flex items-center gap-0.5 max-lg:hidden" aria-label="App">
        <AppHeaderNavItem
          v-for="item in items"
          :key="item.href"
          :href="item.href"
          :active="item.href === active"
          :elevation="control"
        >
          {{ item.label }}
        </AppHeaderNavItem>
      </nav>
    </div>
    <div class="flex items-center gap-2">
      <InputGroup v-if="search" class="w-[180px] @max-[960px]/app-header:hidden">
        <InputGroupAddon>
          <PhMagnifyingGlass />
        </InputGroupAddon>
        <InputGroupInput
          :placeholder="searchPlaceholder"
          :aria-label="searchPlaceholder"
          class="text-[13px]"
        />
        <InputGroupAddon align="inline-end">
          <Kbd :elevation="control">{{ shortcut }}</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <Button v-if="network || $slots.network" variant="secondary" :elevation="control" @click="emit('network-click')">
        <slot name="network">{{ network }}</slot>
      </Button>
      <Button :elevation="control" @click="emit('connect')">
        <PhWallet />
        <slot name="connect-label">{{ connectLabel }}</slot>
      </Button>
    </div>
  </header>
</template>
