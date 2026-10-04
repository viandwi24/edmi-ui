<script setup lang="ts">
import type { CollapsibleRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible } from "@/registry/edmi/ui/collapsible"

interface ToolProps extends /* @vue-ignore */ CollapsibleRootProps {
  class?: HTMLAttributes["class"]
  /** ✦ one-step 3D look on the card. */
  raised?: boolean
}

const props = withDefaults(defineProps<ToolProps>(), {
  raised: false,
})
</script>

<template>
  <!-- Collapsible props (open, defaultOpen, update:open) fall through as attrs. -->
  <Collapsible
    data-slot="ai-tool"
    :class="cn(
      'group/tool not-prose w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground',
      props.raised && 'border-b-lip shadow-card',
      props.class,
    )"
  >
    <slot />
  </Collapsible>
</template>
