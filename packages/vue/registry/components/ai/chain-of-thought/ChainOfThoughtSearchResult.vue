<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Badge
    data-slot="ai-chain-of-thought-search-result"
    shape="pill"
    variant="secondary"
    :class="cn('h-5 gap-1 px-[7px] text-[11.5px] font-normal text-foreground-2', props.class)"
  >
    <slot />
  </Badge>
</template>
