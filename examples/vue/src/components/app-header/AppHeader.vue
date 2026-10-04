<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AppHeaderItem } from '.'
import { PhChartLine, PhMagnifyingGlass, PhWallet } from '@phosphor-icons/vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { type Elevation, useElevation } from '@/components/ui/elevation'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
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
  /** ✦ depth of the bar; raised +1 / floating +2 also raise the mark, active pill and buttons */
  elevation?: Elevation
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
  elevation: undefined,
})

const level = useElevation(() => props.elevation, 'surface')
const raised = computed(() => level.value === 'raised' || level.value === 'floating')
// Controls follow an explicit bar level: raised/floating raise them, flat/sunken keep them flat; auto leaves them to their own role.
const control = computed(() =>
  props.elevation && props.elevation !== 'auto' ? (raised.value ? 'raised' : 'flat') : undefined,
)
const markLevel = useElevation(() => control.value, 'handle')
const markRaised = computed(() => markLevel.value === 'raised' || markLevel.value === 'floating')

const surfaceElevation = {
  sunken: 'border-sk-bd bg-sk-bg shadow-sunken',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}

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
        <span class="font-brand text-xl font-semibold tracking-[-0.4px]">{{ name }}</span>
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
      <InputGroup v-if="search" class="h-9 w-[180px] @max-[960px]/app-header:hidden">
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
      <Button v-if="network" variant="secondary" :elevation="control" @click="emit('network-click')">
        {{ network }}
      </Button>
      <Button :elevation="control" @click="emit('connect')">
        <PhWallet />
        {{ connectLabel }}
      </Button>
    </div>
  </header>
</template>
