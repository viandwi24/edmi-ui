<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'
import { kbdVariants } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** ✦ depth: flat 0, raised +1, floating +2 */
  elevation?: Elevation
}>(), { elevation: undefined })

const level = useElevation(() => props.elevation, 'handle')
</script>

<template>
  <kbd
    data-slot="kbd"
    :class="cn(kbdVariants({ elevation: level }), props.class)"
  >
    <slot />
  </kbd>
</template>
