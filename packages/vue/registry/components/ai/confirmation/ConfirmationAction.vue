<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { inject } from "vue"
import { Button } from "@/registry/edmi/ui/button"
import type { Elevation } from "@/registry/edmi/ui/elevation"
import { ConfirmationKey } from "./context"

// `elevation` falls back to the Confirmation's (an explicit value here wins).
const props = withDefaults(defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  elevation?: Elevation
  class?: HTMLAttributes["class"]
}>(), {
  size: "sm",
  elevation: undefined,
})

const ctx = inject(ConfirmationKey, null)
</script>

<template>
  <Button
    data-slot="ai-confirmation-action"
    type="button"
    :variant="props.variant"
    :size="props.size"
    :elevation="props.elevation ?? ctx?.elevation.value"
    :class="props.class"
  >
    <slot />
  </Button>
</template>
