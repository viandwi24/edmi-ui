<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { computed } from "vue"
import { formatCompact } from "./context"

const props = defineProps<{
  tokens?: number
  costText?: string
}>()

const formattedTokens = computed(() => (props.tokens === undefined ? "—" : formatCompact(props.tokens)))
</script>

<template>
  <span class="font-mono">
    {{ formattedTokens }}
    <span v-if="costText" class="ml-2 text-muted-foreground">• {{ costText }}</span>
  </span>
</template>
