<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { ButtonGroup } from "@/registry/edmi/ui/button-group"
import { useMessageBranchContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { totalBranches } = useMessageBranchContext()
</script>

<template>
  <!-- Nothing to switch between with a single branch. -->
  <ButtonGroup
    v-if="totalBranches > 1"
    data-slot="ai-message-branch-selector"
    orientation="horizontal"
    :class="cn('items-center gap-0.5 [&>*]:rounded-md', props.class)"
  >
    <slot />
  </ButtonGroup>
</template>
