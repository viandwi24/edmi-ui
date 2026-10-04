<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Progress } from "@/registry/edmi/ui/progress"
import { formatCompact, formatPercent, useContextValue } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const PERCENT_MAX = 100
const { usedTokens, maxTokens } = useContextValue()

const usedPercent = computed(() => (maxTokens.value === 0 ? 0 : usedTokens.value / maxTokens.value))
const displayPct = computed(() => formatPercent(usedPercent.value))
const used = computed(() => formatCompact(usedTokens.value))
const total = computed(() => formatCompact(maxTokens.value))
</script>

<template>
  <div :class="cn('w-full space-y-2 p-3', props.class)">
    <slot v-if="$slots.default" />
    <template v-else>
      <div class="flex items-center justify-between gap-3 text-xs">
        <p class="font-semibold">
          {{ displayPct }}
        </p>
        <p class="font-mono text-muted-foreground">
          {{ used }} / {{ total }}
        </p>
      </div>
      <div class="space-y-2">
        <Progress variant="brand" :model-value="usedPercent * PERCENT_MAX" />
      </div>
    </template>
  </div>
</template>
