<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="inset-panel-footer"
    :class="cn('border-t border-border bg-muted px-4 py-3 text-center text-[13px] text-foreground-2', props.class)"
  >
    <slot />
  </div>
</template>
