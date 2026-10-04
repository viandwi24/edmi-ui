<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { getUsage } from "tokenlens"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { formatUsd, useContextValue } from "./context"
import TokensWithCost from "./TokensWithCost.vue"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { usage, modelId } = useContextValue()

const tokens = computed(() => usage.value?.inputTokens ?? 0)

const costText = computed(() => {
  if (!tokens.value)
    return undefined
  const cost = modelId.value
    ? getUsage({
        modelId: modelId.value,
        usage: { input: tokens.value, output: 0 },
      }).costUSD?.totalUSD
    : undefined
  return formatUsd(cost ?? 0)
})
</script>

<template>
  <slot v-if="$slots.default" />
  <div
    v-else-if="tokens > 0"
    :class="cn('flex items-center justify-between text-xs', props.class)"
  >
    <span class="text-muted-foreground">Input</span>
    <TokensWithCost :cost-text="costText" :tokens="tokens" />
  </div>
</template>
