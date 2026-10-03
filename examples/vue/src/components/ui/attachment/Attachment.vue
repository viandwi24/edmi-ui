<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AttachmentVariants } from '.'
import { cn } from '@/lib/utils'
import { attachmentVariants } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  state?: 'idle' | 'uploading' | 'processing' | 'error' | 'done'
  size?: AttachmentVariants['size']
  orientation?: AttachmentVariants['orientation']
}>(), {
  state: 'done',
  size: 'default',
  orientation: 'horizontal',
})
</script>

<template>
  <div
    data-slot="attachment"
    :data-state="state"
    :data-size="size"
    :data-orientation="orientation"
    :class="cn(attachmentVariants({ size, orientation }), props.class)"
  >
    <slot />
  </div>
</template>
