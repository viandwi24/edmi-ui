<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { getUsage } from "tokenlens"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { formatUsd, useContextValue } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { modelId, usage } = useContextValue()

const totalCost = computed(() => {
  const costUSD = modelId.value
    ? getUsage({
        modelId: modelId.value,
        usage: {
          input: usage.value?.inputTokens ?? 0,
          output: usage.value?.outputTokens ?? 0,
        },
      }).costUSD?.totalUSD
    : undefined
  return formatUsd(costUSD ?? 0)
})
</script>

<template>
  <div :class="cn('flex w-full items-center justify-between gap-3 bg-muted p-3 text-xs', props.class)">
    <slot v-if="$slots.default" />
    <template v-else>
      <span class="text-muted-foreground">Total cost</span>
      <span class="font-mono font-semibold">{{ totalCost }}</span>
    </template>
  </div>
</template>
