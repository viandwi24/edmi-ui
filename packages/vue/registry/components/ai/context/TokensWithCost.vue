<script setup lang="ts">
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
