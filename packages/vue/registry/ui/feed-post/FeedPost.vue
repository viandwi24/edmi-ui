<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Card } from '@/registry/edmi/ui/card'
import type { Elevation } from '@/registry/edmi/ui/elevation'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  /** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2 */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Card :elevation="elevation" data-slot="feed-post" :class="cn('gap-0 px-[18px] py-[18px]', props.class)">
    <slot />
  </Card>
</template>
