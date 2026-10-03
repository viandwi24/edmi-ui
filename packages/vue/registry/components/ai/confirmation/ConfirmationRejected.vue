<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { useConfirmationContext } from "./context"

const { approval, state } = useConfirmationContext()
</script>

<template>
  <span
    v-if="approval?.approved === false
      && (state === 'approval-responded' || state === 'output-denied' || state === 'output-available')"
    class="inline-flex items-center gap-2 text-muted-foreground"
  >
    <slot />
  </span>
</template>
