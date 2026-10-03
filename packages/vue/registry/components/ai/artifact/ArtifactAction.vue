<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/edmi/ui/tooltip"

// The icon goes in the default slot (an icon component), e.g. `<ArtifactAction tooltip="Copy"><CopyIcon /></ArtifactAction>`.
const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  tooltip?: string
  label?: string
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>(), {
  variant: "ghost",
  size: "icon-sm",
})
</script>

<template>
  <TooltipProvider v-if="props.tooltip">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          type="button"
          :variant="props.variant"
          :size="props.size"
          :class="cn('text-muted-foreground hover:text-foreground', props.class)"
        >
          <slot />
          <span class="sr-only">{{ props.label || props.tooltip }}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button
    v-else
    type="button"
    :variant="props.variant"
    :size="props.size"
    :class="cn('text-muted-foreground hover:text-foreground', props.class)"
  >
    <slot />
    <span class="sr-only">{{ props.label }}</span>
  </Button>
</template>
