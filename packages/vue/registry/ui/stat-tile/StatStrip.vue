<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Card } from '@/registry/edmi/ui/card'
import type { Elevation } from '@/registry/edmi/ui/elevation'

const props = defineProps<{
  /** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2 */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!-- Row of numbers in one card; cells are divided by 1px borders. -->
  <Card :elevation="elevation" data-slot="stat-strip" :class="cn('flex-row gap-0 overflow-x-auto p-0', props.class)">
    <slot />
  </Card>
</template>
