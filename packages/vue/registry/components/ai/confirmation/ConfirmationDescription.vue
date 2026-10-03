<script setup lang="ts">
// ✦ Edmi addition: muted second line under the request title (only while the request is open).
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
    data-slot="ai-confirmation-description"
    :class="cn('col-start-2 text-[13px] text-foreground-2', props.class)"
  >
    <slot />
  </div>
</template>
