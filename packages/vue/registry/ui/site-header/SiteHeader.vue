<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SiteHeaderLink } from '.'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { controlLevel, type Elevation, surfaceElevation, useElevation } from '@/registry/edmi/ui/elevation'
import SiteHeaderBrand from './SiteHeaderBrand.vue'

const props = withDefaults(defineProps<{
  /** Brand text (or use the `name` slot). */
  name?: string
  href?: string
  /** Muted lead-in before the stepped list, e.g. "How to" (or use the `lead` slot). */
  lead?: string
  steps?: SiteHeaderLink[]
  links?: SiteHeaderLink[]
  /** ✦ depth of the bar; raised +1 / floating +2 also raise the mark (pass `elevation` to the CTA Button yourself) */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}>(), {
  steps: () => [],
  links: () => [],
  elevation: undefined,
})

const level = useElevation(() => props.elevation, 'surface')
const mark = computed(() => controlLevel(props.elevation))
</script>

<template>
  <!-- Marketing top bar (navbar layout): brand, a muted lead-in with a stepped list, plain links, one CTA (`action` slot). -->
  <header
    data-slot="site-header"
    :class="cn(
      'flex w-full items-center justify-between gap-6 rounded-xl border border-border bg-card px-5 py-3.5 text-sm text-card-foreground',
      surfaceElevation[level],
      props.class,
    )"
  >
    <SiteHeaderBrand :name="name" :href="href" :elevation="mark">
      <template v-if="$slots.logo" #logo>
        <slot name="logo" />
      </template>
      <template v-if="$slots.name" #name>
        <slot name="name" />
      </template>
    </SiteHeaderBrand>
    <nav class="flex items-center gap-1 whitespace-nowrap max-md:hidden" aria-label="Main">
      <span v-if="lead || $slots.lead" class="text-muted-foreground-2">
        <slot name="lead">{{ lead }}</slot>
      </span>
      <span v-for="s in steps" :key="s.href" class="flex items-center">
        <span class="mx-2.5 h-3 w-px bg-border" aria-hidden="true" />
        <a :href="s.href" class="hover:text-muted-foreground">{{ s.label }}</a>
      </span>
      <a
        v-for="(l, i) in links"
        :key="l.href"
        :href="l.href"
        :class="cn('hover:text-muted-foreground', i === 0 ? 'ml-7' : 'ml-[18px]')"
      >{{ l.label }}</a>
    </nav>
    <div v-if="$slots.action" class="ml-4 flex shrink-0 items-center">
      <slot name="action" />
    </div>
  </header>
</template>
