<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { ButtonGroupText } from "@/registry/edmi/ui/button-group"
import { useMessageBranchContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { currentBranch, totalBranches } = useMessageBranchContext()
</script>

<template>
  <ButtonGroupText
    :class="cn(
      'border-none bg-transparent px-1 font-mono text-xs text-muted-foreground tabular-nums shadow-none',
      props.class,
    )"
  >
    {{ currentBranch + 1 }} / {{ totalBranches }}
  </ButtonGroupText>
</template>
