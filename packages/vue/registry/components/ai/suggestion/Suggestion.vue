<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"

const props = withDefaults(defineProps<{
  suggestion: string
  class?: HTMLAttributes["class"]
  /**
   * `chip` (default): pill. `card` ✦: a larger tile with a lead-in line, for the home state
   * (slot = description).
   */
  variant?: "chip" | "card" | NonNullable<ButtonVariants["variant"]>
  size?: ButtonVariants["size"]
  /** ✦ one-step 3D look. */
  raised?: boolean
}>(), {
  variant: "chip",
  size: "sm",
  raised: false,
})

const emit = defineEmits<{
  (e: "click", suggestion: string): void
}>()

const isCard = computed(() => props.variant === "card")
const buttonVariant = computed(() =>
  props.variant === "chip" || props.variant === "card" ? "outline" : props.variant)
</script>

<template>
  <Button
    data-slot="ai-suggestion"
    :data-variant="isCard ? 'card' : 'chip'"
    type="button"
    :variant="buttonVariant"
    :size="isCard ? undefined : size"
    :raised="raised"
    :class="cn(
      isCard
        ? 'h-auto min-w-44 flex-col items-start gap-1 rounded-xl px-4 py-3 text-left whitespace-normal'
        : 'rounded-full px-4',
      props.class,
    )"
    @click="emit('click', suggestion)"
  >
    <template v-if="isCard">
      <span class="text-[13.5px] font-medium">{{ suggestion }}</span>
      <span v-if="$slots.default" class="text-xs font-normal text-muted-foreground"><slot /></span>
    </template>
    <slot v-else>{{ suggestion }}</slot>
  </Button>
</template>
