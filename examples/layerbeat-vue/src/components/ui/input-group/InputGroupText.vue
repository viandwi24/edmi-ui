<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="input-group-text"
    :class="cn(
      `flex items-center gap-2 self-stretch bg-muted px-2.5 text-[13px] text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4`,
      props.class,
    )"
  >
    <slot />
  </span>
</template>
