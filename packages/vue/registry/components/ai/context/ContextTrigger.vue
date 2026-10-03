<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { HoverCardTrigger } from "@/registry/edmi/ui/hover-card"
import { formatPercent, useContextValue } from "./context"
import ContextIcon from "./ContextIcon.vue"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { usedTokens, maxTokens } = useContextValue()

const usedPercent = computed(() => (maxTokens.value === 0 ? 0 : usedTokens.value / maxTokens.value))
const renderedPercent = computed(() => formatPercent(usedPercent.value))
</script>

<template>
  <HoverCardTrigger as-child>
    <slot v-if="$slots.default" />
    <Button v-else type="button" variant="ghost" :class="props.class">
      <ContextIcon />
      <span
        :class="cn(
          'font-mono text-xs font-medium',
          usedPercent >= 0.9 ? 'text-warning-text' : 'text-foreground',
        )"
      >
        {{ renderedPercent }}
      </span>
    </Button>
  </HoverCardTrigger>
</template>
