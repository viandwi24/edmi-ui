<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="attachment-title"
    :class="cn('block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:bg-linear-to-r group-data-[state=processing]/attachment:from-muted-foreground group-data-[state=processing]/attachment:via-foreground group-data-[state=processing]/attachment:to-muted-foreground group-data-[state=processing]/attachment:bg-clip-text group-data-[state=processing]/attachment:text-transparent group-data-[state=processing]/attachment:animate-pulse group-data-[state=uploading]/attachment:bg-linear-to-r group-data-[state=uploading]/attachment:from-muted-foreground group-data-[state=uploading]/attachment:via-foreground group-data-[state=uploading]/attachment:to-muted-foreground group-data-[state=uploading]/attachment:bg-clip-text group-data-[state=uploading]/attachment:text-transparent group-data-[state=uploading]/attachment:animate-pulse', props.class)"
  >
    <slot />
  </span>
</template>
