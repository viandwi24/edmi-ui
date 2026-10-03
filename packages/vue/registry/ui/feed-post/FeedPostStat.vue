<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <span data-slot="feed-post-stat" :class="cn('inline-flex items-center gap-1.5 [&_svg]:size-[15px]', props.class)">
    <slot />
  </span>
</template>
