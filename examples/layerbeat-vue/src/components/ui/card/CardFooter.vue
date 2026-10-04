<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card-footer"
    :class="cn('flex items-center gap-2 rounded-b-xl border-t border-border bg-[color-mix(in_srgb,var(--muted)_60%,var(--card))] p-(--card-spacing)', props.class)"
  >
    <slot />
  </div>
</template>
