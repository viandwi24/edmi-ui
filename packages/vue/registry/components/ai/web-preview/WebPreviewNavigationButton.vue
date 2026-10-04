<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { Button } from "@/registry/edmi/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/edmi/ui/tooltip"

const props = withDefaults(defineProps<{
  size?: ButtonVariants["size"]
  variant?: ButtonVariants["variant"]
  tooltip?: string
  disabled?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  tooltip: "",
  disabled: false,
  size: "icon-sm",
  variant: "ghost",
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
          :disabled="props.disabled"
          :class="props.class"
        >
          <slot />
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
    :disabled="props.disabled"
    :class="props.class"
  >
    <slot />
  </Button>
</template>
