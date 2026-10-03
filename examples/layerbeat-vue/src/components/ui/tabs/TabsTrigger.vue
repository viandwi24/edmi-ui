<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsTrigger, useForwardProps } from 'reka-ui'
import { inject } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<TabsTriggerProps & {
  class?: HTMLAttributes['class']
  /** ✦ overrides the TabsList `raised` for this trigger */
  raised?: boolean
}>(), { raised: undefined })

const context = inject<{ raised?: boolean } | null>('tabsList', null)

const delegatedProps = reactiveOmit(props, 'class', 'raised')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    :class="cn(
      'relative inline-flex items-center justify-center gap-1.5 text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      // default (in a track)
      'group-data-[variant=default]/tabs-list:h-[30px] group-data-[variant=default]/tabs-list:flex-1 group-data-[variant=default]/tabs-list:rounded-[7px] group-data-[variant=default]/tabs-list:border group-data-[variant=default]/tabs-list:border-transparent group-data-[variant=default]/tabs-list:px-3.5 group-data-[variant=default]/tabs-list:data-[state=active]:border-border group-data-[variant=default]/tabs-list:data-[state=active]:bg-tab-active group-data-[variant=default]/tabs-list:data-[state=active]:text-foreground',
      // pills (✦ no track)
      'group-data-[variant=pills]/tabs-list:h-8 group-data-[variant=pills]/tabs-list:rounded-[7px] group-data-[variant=pills]/tabs-list:border group-data-[variant=pills]/tabs-list:border-transparent group-data-[variant=pills]/tabs-list:px-3 group-data-[variant=pills]/tabs-list:data-[state=active]:border-border group-data-[variant=pills]/tabs-list:data-[state=active]:bg-tab-active group-data-[variant=pills]/tabs-list:data-[state=active]:text-foreground',
      // line
      'group-data-[variant=line]/tabs-list:-mb-px group-data-[variant=line]/tabs-list:border-b-2 group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:px-0.5 group-data-[variant=line]/tabs-list:pb-[11px] group-data-[variant=line]/tabs-list:data-[state=active]:border-foreground group-data-[variant=line]/tabs-list:data-[state=active]:text-foreground group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:mb-0 group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:-ml-px group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:border-b-0 group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:border-l-2 group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:py-1 group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:pr-0 group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:pl-3',
      // raised ✦ (default + pills only; line ignores it)
      (props.raised ?? context?.raised) && 'group-data-[variant=default]/tabs-list:data-[state=active]:bg-linear-to-b group-data-[variant=default]/tabs-list:data-[state=active]:[background-origin:border-box] group-data-[variant=default]/tabs-list:data-[state=active]:from-secondary-hi group-data-[variant=default]/tabs-list:data-[state=active]:to-secondary group-data-[variant=default]/tabs-list:data-[state=active]:border-input group-data-[variant=default]/tabs-list:data-[state=active]:border-b-secondary-lip group-data-[variant=default]/tabs-list:data-[state=active]:shadow-btn-secondary group-data-[variant=pills]/tabs-list:data-[state=active]:bg-linear-to-b group-data-[variant=pills]/tabs-list:data-[state=active]:[background-origin:border-box] group-data-[variant=pills]/tabs-list:data-[state=active]:from-secondary-hi group-data-[variant=pills]/tabs-list:data-[state=active]:to-secondary group-data-[variant=pills]/tabs-list:data-[state=active]:border-input group-data-[variant=pills]/tabs-list:data-[state=active]:border-b-secondary-lip group-data-[variant=pills]/tabs-list:data-[state=active]:shadow-btn-secondary',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </TabsTrigger>
</template>
