<script setup lang="ts">
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
    :elevation="props.raised ? 'raised' : undefined"
    :class="cn('w-full gap-0 py-0', props.class)"
  >
    <slot />
  </Card>
</template>
