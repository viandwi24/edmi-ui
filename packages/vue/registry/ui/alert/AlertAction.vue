<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="alert-action"
    :class="cn('col-start-2 row-span-2 row-start-1 self-center group-has-[>svg]/alert:col-start-3', props.class)"
  >
    <slot />
  </div>
</template>
