<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'

const props = withDefaults(defineProps<{
  active?: boolean
  /** ✦ raised +1 / floating +2 raise the active pill */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}>(), { elevation: undefined })

const level = useElevation(() => props.elevation, 'control')
const raised = computed(() => level.value === 'raised' || level.value === 'floating')
</script>

<template>
  <!-- Nav pills stand alone (no track): the pills look of Tabs; `elevation` raises the active one. -->
  <a
    data-slot="app-header-nav-item"
    :data-active="active ? '' : undefined"
    :aria-current="active ? 'page' : undefined"
    :class="cn(
      'inline-flex h-8 items-center rounded-[7px] border border-transparent px-[11px] text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      'data-[active]:border-border data-[active]:bg-tab-active data-[active]:text-foreground',
      raised && 'data-[active]:border-transparent data-[active]:[background-image:var(--r1-s-face)] data-[active]:shadow-btn-raised-neutral data-[active]:[background-origin:border-box]',
      props.class,
    )"
  >
    <slot />
  </a>
</template>
