<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-attachment-empty"
    :class="cn('flex items-center justify-center p-4 text-sm text-muted-foreground', props.class)"
  >
    <slot>No attachments</slot>
  </div>
</template>
