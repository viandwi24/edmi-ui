<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { useConfirmationContext } from "./context"

const { state } = useConfirmationContext()
</script>

<template>
  <template v-if="state === 'approval-requested'">
    <slot />
  </template>
</template>
