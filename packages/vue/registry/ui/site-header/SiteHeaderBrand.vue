<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import SiteHeaderMark from './SiteHeaderMark.vue'

const props = withDefaults(defineProps<{
  name?: string
  href?: string
  /** ✦ one-step 3D look on the default mark */
  raised?: boolean
  class?: HTMLAttributes['class']
}>(), {
  name: 'Stockbreak',
  href: '/',
})
</script>

<template>
  <a
    data-slot="site-header-brand"
    :href="href"
    :class="cn('flex items-center gap-2.5 whitespace-nowrap', props.class)"
  >
    <slot name="logo">
      <SiteHeaderMark :raised="raised" />
    </slot>
    <span class="font-brand text-xl font-semibold tracking-[-0.4px]">
      <slot name="name">{{ name }}</slot>
    </span>
  </a>
</template>
