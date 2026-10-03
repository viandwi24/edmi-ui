<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { Button } from "@/registry/edmi/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/edmi/ui/tooltip"

const props = withDefaults(defineProps<{
  tooltip?: string
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}>(), {
  variant: "ghost",
  size: "xs",
})
</script>

<template>
  <TooltipProvider v-if="props.tooltip">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button data-slot="ai-checkpoint-trigger" type="button" :variant="props.variant" :size="props.size" :class="props.class">
          <slot />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="start" side="bottom">
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button v-else data-slot="ai-checkpoint-trigger" type="button" :variant="props.variant" :size="props.size" :class="props.class">
    <slot />
  </Button>
</template>
