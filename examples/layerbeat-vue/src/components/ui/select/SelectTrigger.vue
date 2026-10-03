<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PhCaretDown } from '@phosphor-icons/vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'], size?: 'sm' | 'default', raised?: boolean }>(),
  { size: 'default', raised: false },
)

const delegatedProps = reactiveOmit(props, 'class', 'size', 'raised')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwardedProps"
    :class="cn(
      `flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-card pr-2.5 pl-3 text-sm whitespace-nowrap text-foreground outline-none select-none focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[state=open]:border-ring data-[state=open]:shadow-ring data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 data-[size=sm]:rounded-[7px] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
      props.raised && 'border-b-lip shadow-[0_2px_0_var(--lip)] data-[state=open]:border-b-ring',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <PhCaretDown class="pointer-events-none size-4 text-muted-foreground" />
    </SelectIcon>
  </SelectTrigger>
</template>
