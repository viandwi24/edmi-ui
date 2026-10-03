<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"

// Container for generated output. Built on the ui card; `raised` ✦ gives the one-step 3D look.
const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  raised?: boolean
}>(), {
  raised: false,
})
</script>

<template>
  <Card
    data-slot="ai-artifact"
    :raised="props.raised"
    :class="cn('w-full gap-0 py-0', props.class)"
  >
    <slot />
  </Card>
</template>
