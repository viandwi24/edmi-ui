<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { InputGroupButtonVariants } from "@/registry/edmi/ui/input-group"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { Comment, computed, Text, useSlots } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { InputGroupButton } from "@/registry/edmi/ui/input-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/edmi/ui/tooltip"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  variant?: ButtonVariants["variant"]
  size?: InputGroupButtonVariants["size"]
  /** Tooltip text; `shortcut` and `side` refine it. */
  tooltip?: string
  shortcut?: string
  side?: "top" | "right" | "bottom" | "left"
}>(), {
  variant: "ghost",
  side: "top",
})

const slots = useSlots()

// An icon alone is a square button; an icon plus a label is a small text button.
const computedSize = computed(() => {
  if (props.size)
    return props.size
  const nodes = (slots.default?.() ?? []).filter((node) => {
    if (node.type === Comment)
      return false
    if (node.type === Text && !node.children?.toString().trim())
      return false
    return true
  })
  return nodes.length > 1 ? "sm" : "icon-sm"
})
</script>

<template>
  <TooltipProvider v-if="props.tooltip">
  <Tooltip>
    <TooltipTrigger as-child>
      <InputGroupButton
        v-bind="$attrs"
        type="button"
        :size="computedSize"
        :variant="props.variant"
        :class="cn('text-[13px] text-foreground', computedSize === 'sm' && 'h-8 gap-1.5 px-2.5', props.class)"
      >
        <slot />
      </InputGroupButton>
    </TooltipTrigger>
    <TooltipContent :side="props.side">
      {{ props.tooltip }}
      <span v-if="props.shortcut" class="ml-2 text-muted-foreground">{{ props.shortcut }}</span>
    </TooltipContent>
  </Tooltip>
  </TooltipProvider>
  <InputGroupButton
    v-else
    v-bind="$attrs"
    type="button"
    :size="computedSize"
    :variant="props.variant"
    :class="cn('text-[13px] text-foreground', computedSize === 'sm' && 'h-8 gap-1.5 px-2.5', props.class)"
  >
    <slot />
  </InputGroupButton>
</template>
