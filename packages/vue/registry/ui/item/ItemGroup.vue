<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    role="list"
    data-slot="item-group"
    :class="cn('group/item-group flex w-full flex-col gap-3 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2', props.class)"
  >
    <slot />
  </div>
</template>
