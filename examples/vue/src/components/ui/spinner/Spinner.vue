<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PhCircleNotch } from '@phosphor-icons/vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <PhCircleNotch data-slot="spinner" role="status" aria-label="Loading" :class="cn('size-4 animate-spin', props.class)" />
</template>
