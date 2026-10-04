<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'
import { type Elevation, useElevation } from '@/registry/edmi/ui/elevation'

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'], size?: 'sm' | 'default', elevation?: Elevation }>(),
  { size: 'default', elevation: undefined },
)

const delegatedProps = reactiveOmit(props, 'class', 'size', 'elevation')
// ✦ depth (v4): fields sink (-1) in layered mode; focus swaps the edge for the ring
const fieldElevation = {
  sunken: 'border-sk-bd bg-sk-bg shadow-sunken data-[state=open]:bg-card focus-visible:bg-card',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}

const level = useElevation(() => props.elevation, 'field')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwardedProps"
    :class="cn(
      `flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-card pr-2.5 pl-3 text-sm whitespace-nowrap text-foreground outline-none select-none focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[state=open]:border-ring data-[state=open]:shadow-ring data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 data-[size=sm]:rounded-[7px] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
      fieldElevation[level],
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="pointer-events-none size-4 text-muted-foreground" />
    </SelectIcon>
  </SelectTrigger>
</template>
