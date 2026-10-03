<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="feed-post-footer"
    :class="cn('mt-3 flex items-center gap-[18px] text-[13px] text-muted-foreground', props.class)"
  >
    <slot />
  </div>
</template>
