<script setup lang="ts">
import { Button } from "@/registry/edmi/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/edmi/ui/tooltip"

// Listeners and classes (`@click`, `class`) land on the button, not on the tooltip root.
defineOptions({ inheritAttrs: false })

defineProps<{
  /** Tooltip and accessible name. */
  label: string
}>()
</script>

<template>
  <!-- Own provider so the viewer works without a global TooltipProvider. -->
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button v-bind="$attrs" :aria-label="label" size="icon-sm" type="button" variant="ghost">
          <slot />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{{ label }}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
