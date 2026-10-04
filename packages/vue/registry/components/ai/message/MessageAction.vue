<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { Button } from "@/registry/edmi/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/edmi/ui/tooltip"

const props = withDefaults(defineProps<{
  tooltip?: string
  label?: string
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}>(), {
  variant: "ghost",
  size: "icon-xs",
})
</script>

<template>
  <TooltipProvider v-if="props.tooltip">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button type="button" :variant="props.variant" :size="props.size" :class="props.class">
          <slot />
          <span class="sr-only">{{ props.label || props.tooltip }}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button v-else type="button" :variant="props.variant" :size="props.size" :class="props.class">
    <slot />
    <span class="sr-only">{{ props.label }}</span>
  </Button>
</template>
