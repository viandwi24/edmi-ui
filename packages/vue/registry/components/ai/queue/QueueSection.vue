<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { CollapsibleRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible } from "@/registry/edmi/ui/collapsible"

interface QueueSectionProps extends /* @vue-ignore */ CollapsibleRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<QueueSectionProps>()
</script>

<template>
  <!-- Collapsible props (open, update:open) fall through as attrs; defaultOpen is true unless overridden.
       A section that follows another gets the divider. -->
  <Collapsible
    :default-open="true"
    data-slot="ai-queue-section"
    :class="cn('not-first:mt-1.5 not-first:border-t not-first:border-border-2 not-first:pt-1.5', props.class)"
  >
    <slot />
  </Collapsible>
</template>
