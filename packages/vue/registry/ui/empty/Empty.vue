<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="empty"
    :class="cn('flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-[14px] border-dashed p-10 text-center text-balance', props.class)"
  >
    <slot />
  </div>
</template>
