<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ArtifactCardState } from "./context"
import { computed, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"
import type { Elevation } from "@/registry/edmi/ui/elevation"
import { ARTIFACT_CARD_KEY } from "./context"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** `generating`: the title shimmers and the actions are hidden. */
  state?: ArtifactCardState
  /** ✦ depth: sunken -1, flat 0, raised +1, floating +2. */
  elevation?: Elevation
}>(), {
  state: "ready",
  elevation: undefined,
})

provide(ARTIFACT_CARD_KEY, computed(() => props.state))
</script>

<template>
  <Card
    data-slot="ai-artifact-card"
    :data-state="state"
    :elevation="elevation"
    :class="cn('w-full flex-row items-center gap-3.5 px-3.5 py-3 text-card-foreground', props.class)"
  >
    <slot />
  </Card>
</template>
