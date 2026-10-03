<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { CollapsibleRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible } from "@/registry/edmi/ui/collapsible"

interface TaskProps extends /* @vue-ignore */ CollapsibleRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<TaskProps>()
</script>

<template>
  <!-- Collapsible props (open, update:open) fall through as attrs; defaultOpen is true unless overridden. -->
  <Collapsible :default-open="true" data-slot="ai-task" :class="cn('not-prose', props.class)">
    <slot />
  </Collapsible>
</template>
