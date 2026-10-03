<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useConfirmationContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { state } = useConfirmationContext()
</script>

<template>
  <div
    v-if="state === 'approval-requested'"
    data-slot="ai-confirmation-actions"
    :class="cn('col-start-2 mt-2.5 flex items-center gap-2', props.class)"
  >
    <slot />
  </div>
</template>
