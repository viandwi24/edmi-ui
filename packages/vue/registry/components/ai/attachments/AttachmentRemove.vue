<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { XIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { useAttachmentContext } from "./context"

const props = withDefaults(defineProps<{
  label?: string
  class?: HTMLAttributes["class"]
}>(), {
  label: "Remove",
})

const { remove, variant } = useAttachmentContext()

function handleClick(e: Event) {
  e.stopPropagation()
  remove?.()
}
</script>

<template>
  <Button
    v-if="remove"
    data-slot="ai-attachment-remove"
    :aria-label="props.label"
    :class="cn(
      // solid chip over the tile (DESIGN §4.7): --popover + 1px border, no transparency
      variant === 'grid'
        && 'absolute top-1.5 right-1.5 size-[22px] rounded-md border border-border bg-popover p-0 hover:bg-accent [&>svg]:size-3',
      variant === 'inline' && 'size-5 rounded-md p-0 [&>svg]:size-3',
      variant === 'list' && 'size-8 shrink-0 rounded-md p-0 [&>svg]:size-4',
      props.class,
    )"
    type="button"
    variant="ghost"
    @click="handleClick"
  >
    <slot>
      <XIcon />
    </slot>
    <span class="sr-only">{{ props.label }}</span>
  </Button>
</template>
