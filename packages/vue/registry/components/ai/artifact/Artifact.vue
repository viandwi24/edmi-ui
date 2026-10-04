<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"
import type { Elevation } from "@/registry/edmi/ui/elevation"

// Container for generated output. Built on the ui card; `elevation` ✦ is forwarded to the card.
const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** ✦ depth: sunken -1, flat 0, raised +1, floating +2. */
  elevation?: Elevation
}>(), {
  elevation: undefined,
})
</script>

<template>
  <Card
    data-slot="ai-artifact"
    :elevation="props.elevation"
    :class="cn('w-full gap-0 py-0', props.class)"
  >
    <slot />
  </Card>
</template>
