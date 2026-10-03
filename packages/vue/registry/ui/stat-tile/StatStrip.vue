<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Card } from '@/registry/edmi/ui/card'

const props = defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!-- Row of numbers in one card; cells are divided by 1px borders. -->
  <Card :raised="raised" data-slot="stat-strip" :class="cn('flex-row gap-0 overflow-x-auto p-0', props.class)">
    <slot />
  </Card>
</template>
