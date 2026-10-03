<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Card data-slot="ai-artifact-viewer" :class="cn('gap-0 py-0 text-card-foreground', props.class)">
    <slot />
  </Card>
</template>
