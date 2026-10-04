<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonGroupVariants } from '.'
import { provide } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { BUTTON_ELEVATION_KEY } from '@/registry/edmi/ui/button'
import { type Elevation, useElevation } from '@/registry/edmi/ui/elevation'
import { buttonGroupVariants } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  orientation?: ButtonGroupVariants['orientation']
  /** ✦ raised: each item is raised; floating: the whole group floats as one plate (items stay raised) */
  elevation?: Elevation
}>(), { elevation: undefined })

const level = useElevation(() => props.elevation, 'button-filled')

// items follow the group only when it has an explicit level (floating group => raised items)
provide(BUTTON_ELEVATION_KEY, {
  get value() {
    if (!props.elevation || props.elevation === 'auto') return undefined
    return level.value === 'floating' ? 'raised' : level.value
  },
})
</script>

<template>
  <div
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    :class="cn(buttonGroupVariants({ orientation: props.orientation }), level === 'floating' && 'rounded-lg shadow-group-float', props.class)"
  >
    <slot />
  </div>
</template>
