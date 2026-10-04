<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"

// An agent's configuration at a glance. Built on the ui card; `raised` ✦ gives the one-step 3D look.
const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  raised?: boolean
}>(), {
  raised: false,
})
</script>

<template>
  <Card
    data-slot="ai-agent"
    :raised="props.raised"
    :class="cn('not-prose w-full gap-0 py-0', props.class)"
  >
    <slot />
  </Card>
</template>
