<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { EmptyMediaVariants } from '.'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'
import { emptyMediaVariants } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  variant?: EmptyMediaVariants['variant']
  /** ✦ depth for variant="icon": raised +1 / floating +2 make the media tile rise */
  elevation?: Elevation
}>(), { elevation: undefined })

const level = useElevation(() => props.elevation, 'handle')
</script>

<template>
  <div
    data-slot="empty-icon"
    :data-variant="variant"
    :class="cn(emptyMediaVariants({ variant, elevation: level === 'sunken' ? 'flat' : level }), props.class)"
  >
    <slot />
  </div>
</template>
