<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"
import type { Elevation } from "@/registry/edmi/ui/elevation"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** ✦ depth: sunken -1, flat 0, raised +1, floating +2. */
  elevation?: Elevation
}>(), {
  elevation: undefined,
})
</script>

<template>
  <Card data-slot="ai-session-panel" :elevation="elevation" :class="cn('w-full max-w-[380px] gap-0 px-4 py-3.5', props.class)">
    <slot />
  </Card>
</template>
