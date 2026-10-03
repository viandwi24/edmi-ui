<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Card data-slot="ai-session-panel" :class="cn('w-full max-w-[380px] gap-0 px-4 py-3.5', props.class)">
    <slot />
  </Card>
</template>
