<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { FileIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-task-item-file"
    :class="cn(
      'inline-flex h-5 items-center gap-1 rounded-md border border-border bg-secondary px-1.5 font-mono text-[11px] text-secondary-foreground [&_svg]:size-3 [&_svg]:shrink-0',
      props.class,
    )"
  >
    <FileIcon />
    <slot />
  </div>
</template>
