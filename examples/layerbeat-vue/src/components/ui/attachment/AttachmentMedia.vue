<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AttachmentMediaVariants } from '.'
import { cn } from '@/lib/utils'
import { attachmentMediaVariants } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  variant?: AttachmentMediaVariants['variant']
}>(), {
  variant: 'icon',
})
</script>

<template>
  <div
    data-slot="attachment-media"
    :data-variant="variant"
    :class="cn(attachmentMediaVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>
