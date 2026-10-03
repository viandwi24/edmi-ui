<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { createPromptInputState, providePromptInput } from "./context"

// Optional global provider that lifts PromptInput state outside of PromptInput.
// If you don't use it, PromptInput stays fully self-managed.
const props = defineProps<{
  initialInput?: string
}>()

providePromptInput(createPromptInputState(props.initialInput))
</script>

<template>
  <slot />
</template>
