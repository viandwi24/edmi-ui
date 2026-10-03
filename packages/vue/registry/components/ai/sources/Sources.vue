<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { CollapsibleRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible } from "@/registry/edmi/ui/collapsible"

interface SourcesProps extends /* @vue-ignore */ CollapsibleRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<SourcesProps>()
</script>

<template>
  <!-- Collapsible props (open, defaultOpen, update:open) fall through as attrs. -->
  <Collapsible data-slot="ai-sources" :class="cn('not-prose text-[13.5px]', props.class)">
    <slot />
  </Collapsible>
</template>
