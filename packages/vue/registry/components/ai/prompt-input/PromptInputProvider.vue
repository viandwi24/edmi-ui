<script setup lang="ts">
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
