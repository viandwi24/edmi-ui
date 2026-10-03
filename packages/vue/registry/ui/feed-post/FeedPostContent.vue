<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <p data-slot="feed-post-content" :class="cn('mt-3 text-sm leading-[1.55]', props.class)">
    <slot />
  </p>
</template>
