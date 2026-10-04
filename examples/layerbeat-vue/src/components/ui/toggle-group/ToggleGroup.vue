<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { toggleVariants } from '@/components/ui/toggle'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, provide } from 'vue'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const props = withDefaults(defineProps<ToggleGroupRootProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
  spacing?: number
  /** ✦ depth passed to every item (items may override); segmented: only the ON item rises */
  elevation?: Elevation
}>(), {
  spacing: 2,
  elevation: undefined,
  orientation: 'horizontal',
})

const emits = defineEmits<ToggleGroupRootEmits>()

const level = useElevation(() => props.elevation, 'control')

provide('toggleGroup', {
  get variant() { return props.variant },
  get size() { return props.size },
  get spacing() { return props.spacing },
  get orientation() { return props.orientation },
  get elevation() { return level.value },
})

// ✦ `variant="segmented"` renders a flat track (DESIGN §4.5); gap is fixed at 2px.
const segmented = computed(() => props.variant === 'segmented')

const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant', 'spacing', 'elevation')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToggleGroupRoot
    v-slot="slotProps"
    data-slot="toggle-group"
    :data-size="size"
    :data-variant="variant"
    :data-spacing="segmented ? 0.5 : spacing"
    :style="{
      '--gap': segmented ? 0.5 : spacing,
    }"
    v-bind="forwarded"
    :class="cn(
      'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
      segmented && 'rounded-[10px] border border-border bg-muted p-[3px] shadow-[inset_0_1px_2px_rgb(0_0_0/0.04)]',
      props.class,
    )"
  >
    <slot v-bind="slotProps" />
  </ToggleGroupRoot>
</template>
