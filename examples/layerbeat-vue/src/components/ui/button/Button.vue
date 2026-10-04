<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { Primitive } from 'reka-ui'
import { computed, inject } from 'vue'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'
import { BUTTON_ELEVATION_KEY, buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  /** ✦ depth: sunken -1, flat 0, raised +1, floating +2. `auto` follows the group / provider. */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  elevation: undefined,
})

const group = inject<{ readonly value: Elevation | undefined } | undefined>(BUTTON_ELEVATION_KEY, undefined)
const own = computed(() =>
  props.elevation && props.elevation !== 'auto' ? props.elevation : group?.value,
)
const filledLevel = useElevation(() => own.value, 'button-filled')
const quietLevel = useElevation(() => own.value, 'button-quiet')
const level = computed(() =>
  ['default', 'secondary', 'destructive', 'brand'].includes(props.variant ?? 'default')
    ? filledLevel.value
    : quietLevel.value,
)
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant ?? 'default'"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size, elevation: level }), props.class)"
  >
    <slot />
  </Primitive>
</template>
