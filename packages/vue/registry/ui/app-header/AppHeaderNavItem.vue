<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<{
  active?: boolean
  /** ✦ one-step 3D active pill */
  raised?: boolean
  class?: HTMLAttributes['class']
}>(), { raised: false })
</script>

<template>
  <!-- Nav pills stand alone (no track): the pills look of Tabs; `raised` makes the active one 3D. -->
  <a
    data-slot="app-header-nav-item"
    :data-active="active ? '' : undefined"
    :aria-current="active ? 'page' : undefined"
    :class="cn(
      'inline-flex h-8 items-center rounded-[7px] border border-transparent px-[11px] text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      'data-[active]:border-border data-[active]:bg-tab-active data-[active]:text-foreground',
      props.raised && 'data-[active]:border-input data-[active]:border-b-secondary-lip data-[active]:bg-linear-to-b data-[active]:from-secondary-hi data-[active]:to-secondary data-[active]:shadow-btn-secondary data-[active]:[background-origin:border-box]',
      props.class,
    )"
  >
    <slot />
  </a>
</template>
