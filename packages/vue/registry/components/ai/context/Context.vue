<script setup lang="ts">
import type { LanguageModelUsage } from "ai"
import type { HoverCardRootProps } from "reka-ui"
import type { ModelId } from "./context"
import { computed, provide } from "vue"
import { HoverCard } from "@/registry/edmi/ui/hover-card"
import { ContextKey } from "./context"

interface ContextProps extends /* @vue-ignore */ HoverCardRootProps {
  usedTokens: number
  maxTokens: number
  usage?: LanguageModelUsage
  modelId?: ModelId
}

const props = defineProps<ContextProps>()

provide(ContextKey, {
  usedTokens: computed(() => props.usedTokens),
  maxTokens: computed(() => props.maxTokens),
  usage: computed(() => props.usage),
  modelId: computed(() => props.modelId),
})
</script>

<template>
  <!-- HoverCard props (open, delays) fall through as attrs and win over the 0 defaults. -->
  <HoverCard :open-delay="0" :close-delay="0">
    <slot />
  </HoverCard>
</template>
