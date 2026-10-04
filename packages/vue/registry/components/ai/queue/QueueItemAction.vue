<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Button
    data-slot="ai-queue-item-action"
    type="button"
    variant="ghost"
    size="icon-xs"
    :class="cn(
      'text-muted-foreground opacity-0 transition-opacity group-focus-within/queue-item:opacity-100 group-hover/queue-item:opacity-100 hover:text-foreground focus-visible:opacity-100',
      props.class,
    )"
  >
    <slot />
  </Button>
</template>
