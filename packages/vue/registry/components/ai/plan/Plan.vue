<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { CollapsibleRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"
import { Collapsible } from "@/registry/edmi/ui/collapsible"
import { PlanKey } from "./context"

interface PlanProps extends /* @vue-ignore */ CollapsibleRootProps {
  class?: HTMLAttributes["class"]
  isStreaming?: boolean
  /** ✦ one-step 3D look on the card. */
  raised?: boolean
}

const props = withDefaults(defineProps<PlanProps>(), {
  isStreaming: false,
  raised: false,
})

provide(PlanKey, { isStreaming: computed(() => props.isStreaming) })
</script>

<template>
  <!-- Collapsible props (open, defaultOpen, update:open) fall through as attrs. -->
  <Collapsible as-child data-slot="ai-plan">
    <Card
      :raised="props.raised"
      :class="cn('gap-0 py-0 [--card-spacing:16px]', props.class)"
    >
      <slot />
    </Card>
  </Collapsible>
</template>
