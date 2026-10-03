<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="drawer-header"
    :class="cn('flex flex-col gap-1 text-center group-data-[swipe-direction=left]/drawer-content:text-left group-data-[swipe-direction=right]/drawer-content:text-left', props.class)"
  >
    <slot />
  </div>
</template>
