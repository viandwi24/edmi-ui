<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { XIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"

// Close button; a 1px divider separates it from the actions before it.
const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>(), {
  variant: "ghost",
  size: "icon-sm",
})
</script>

<template>
  <Button
    type="button"
    :variant="props.variant"
    :size="props.size"
    :class="cn(
      'relative ml-2 text-muted-foreground before:absolute before:top-1/2 before:-left-1.5 before:h-[18px] before:w-px before:-translate-y-1/2 before:bg-border hover:text-foreground',
      props.class,
    )"
  >
    <slot>
      <XIcon />
    </slot>
    <span class="sr-only">Close</span>
  </Button>
</template>
