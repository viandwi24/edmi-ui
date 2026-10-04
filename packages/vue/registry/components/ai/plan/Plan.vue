<script setup lang="ts">
import type { CollapsibleRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"
import { Collapsible } from "@/registry/edmi/ui/collapsible"
import type { Elevation } from "@/registry/edmi/ui/elevation"
import { PlanKey } from "./context"

interface PlanProps extends /* @vue-ignore */ CollapsibleRootProps {
  class?: HTMLAttributes["class"]
  isStreaming?: boolean
  /** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2. */
  elevation?: Elevation
}

const props = withDefaults(defineProps<PlanProps>(), {
  isStreaming: false,
  elevation: undefined,
})

provide(PlanKey, { isStreaming: computed(() => props.isStreaming) })
</script>

<template>
  <!-- Collapsible props (open, defaultOpen, update:open) fall through as attrs. -->
  <Collapsible as-child data-slot="ai-plan">
    <Card
      :elevation="props.elevation"
      :class="cn('gap-0 py-0 [--card-spacing:16px]', props.class)"
    >
      <slot />
    </Card>
  </Collapsible>
</template>
