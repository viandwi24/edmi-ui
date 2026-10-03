<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="field-description"
    :class="cn(
      'text-left text-[13px] leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance [[data-variant=legend]+&]:-mt-1.5',
      'last:mt-0 nth-last-2:-mt-1',
      '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-foreground',
      props.class,
    )"
  >
    <slot />
  </p>
</template>
