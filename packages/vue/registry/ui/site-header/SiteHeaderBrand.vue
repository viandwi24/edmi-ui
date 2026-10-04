<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import type { Elevation } from '@/registry/edmi/ui/elevation'
import SiteHeaderMark from './SiteHeaderMark.vue'

const props = withDefaults(defineProps<{
  name?: string
  href?: string
  /** ✦ depth of the default mark */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}>(), {
  name: 'Stockbreak',
  href: '/',
  elevation: undefined,
})
</script>

<template>
  <a
    data-slot="site-header-brand"
    :href="href"
    :class="cn('flex items-center gap-2.5 whitespace-nowrap', props.class)"
  >
    <slot name="logo">
      <SiteHeaderMark :elevation="elevation" />
    </slot>
    <span class="font-brand text-xl font-semibold tracking-[-0.4px]">
      <slot name="name">{{ name }}</slot>
    </span>
  </a>
</template>
