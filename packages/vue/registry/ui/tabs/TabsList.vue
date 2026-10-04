<script setup lang="ts">
import type { TabsListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TabsListVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { computed, provide } from 'vue'
import { TabsList } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'
import { type Elevation, useElevation } from '@/registry/edmi/ui/elevation'
import { tabsListVariants } from '.'

const props = withDefaults(defineProps<TabsListProps & {
  class?: HTMLAttributes['class']
  variant?: TabsListVariants['variant']
  /** ✦ depth: raised +1 / floating +2 make the active trigger rise (default / pills). Triggers may override. */
  elevation?: Elevation
}>(), {
  variant: 'default',
  elevation: undefined,
})

const level = useElevation(() => props.elevation, 'control')
const raised = computed(() => level.value === 'raised' || level.value === 'floating')

provide('tabsList', {
  get variant() { return props.variant },
  get raised() { return raised.value },
})

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'elevation')
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
