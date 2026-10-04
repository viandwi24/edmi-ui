<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ToggleVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Toggle, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'
import { toggleVariants } from '.'

const props = withDefaults(defineProps<ToggleProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
  /** ✦ depth: flat 0, raised +1, floating +2 (default toggles only show it when ON) */
  elevation?: Elevation
}>(), {
  variant: 'default',
  size: 'default',
  elevation: undefined,
  disabled: false,
})

const emits = defineEmits<ToggleEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant', 'elevation')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
const controlLevel = useElevation(() => props.elevation, 'control')
const quietLevel = useElevation(() => props.elevation, 'button-quiet')
const level = computed(() => (props.variant === 'outline' ? quietLevel.value : controlLevel.value))
</script>

<template>
  <Toggle
    v-slot="slotProps"
    data-slot="toggle"
    v-bind="forwarded"
    :class="cn(toggleVariants({ variant, size, elevation: level }), props.class)"
  >
    <slot v-bind="slotProps" />
  </Toggle>
</template>
