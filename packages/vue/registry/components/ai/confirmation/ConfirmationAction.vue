<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { inject } from "vue"
import { Button } from "@/registry/edmi/ui/button"
import { ConfirmationKey } from "./context"

// `raised` falls back to the Confirmation's (an explicit `false` here wins).
const props = withDefaults(defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  raised?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  size: "sm",
  raised: undefined,
})

const ctx = inject(ConfirmationKey, null)
</script>

<template>
  <Button
    data-slot="ai-confirmation-action"
    type="button"
    :variant="props.variant"
    :size="props.size"
    :raised="props.raised ?? ctx?.raised.value ?? false"
    :class="props.class"
  >
    <slot />
  </Button>
</template>
