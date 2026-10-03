<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CardFooter } from "@/registry/edmi/ui/card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CardFooter
    data-slot="ai-node-footer"
    :class="cn('rounded-b-[inherit] border-t border-border-2 bg-transparent px-3 py-2 text-[11.5px] text-muted-foreground', props.class)"
  >
    <slot />
  </CardFooter>
</template>
