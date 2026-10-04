<script setup lang="ts">
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
    data-slot="ai-confirmation-title"
    :class="cn(
      state === 'approval-requested' ? 'col-start-2 font-medium text-foreground' : 'flex items-center gap-2',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
