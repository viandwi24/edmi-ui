<script setup lang="ts">
import type { TabsListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TabsListVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { provide } from 'vue'
import { TabsList } from 'reka-ui'
import { cn } from '@/lib/utils'
import { tabsListVariants } from '.'

const props = withDefaults(defineProps<TabsListProps & {
  class?: HTMLAttributes['class']
  variant?: TabsListVariants['variant']
  /** ✦ one-step 3D active trigger (default / pills). Triggers may override. */
  raised?: boolean
}>(), {
  variant: 'default',
  raised: false,
})

provide('tabsList', {
  get variant() { return props.variant },
  get raised() { return props.raised },
})

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'raised')
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    :data-variant="variant"
    v-bind="delegatedProps"
    :class="cn(tabsListVariants({ variant }), props.class)"
  >
    <slot />
  </TabsList>
</template>
