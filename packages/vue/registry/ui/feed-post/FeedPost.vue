<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Card } from '@/registry/edmi/ui/card'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Card :elevation="raised ? 'raised' : undefined" data-slot="feed-post" :class="cn('gap-0 px-[18px] py-[18px]', props.class)">
    <slot />
  </Card>
</template>
