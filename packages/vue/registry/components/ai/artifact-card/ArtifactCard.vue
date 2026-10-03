<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ArtifactCardState } from "./context"
import { computed, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"
import { ARTIFACT_CARD_KEY } from "./context"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** `generating`: the title shimmers and the actions are hidden. */
  state?: ArtifactCardState
  /** ✦ one-step 3D look. */
  raised?: boolean
}>(), {
  state: "ready",
  raised: false,
})

provide(ARTIFACT_CARD_KEY, computed(() => props.state))
</script>

<template>
  <Card
    data-slot="ai-artifact-card"
    :data-state="state"
    :raised="raised"
    :class="cn('w-full flex-row items-center gap-3.5 px-3.5 py-3 text-card-foreground', props.class)"
  >
    <slot />
  </Card>
</template>
