<script setup lang="ts">
import type { CollapsibleRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible } from "@/registry/edmi/ui/collapsible"
import { type Elevation, provideSurface, useElevation } from "@/registry/edmi/ui/elevation"

interface ToolProps extends /* @vue-ignore */ CollapsibleRootProps {
  class?: HTMLAttributes["class"]
  /** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2. */
  elevation?: Elevation
}

const props = withDefaults(defineProps<ToolProps>(), {
  elevation: undefined,
})

// surface role: same faces as the ui card
const toolElevation = {
  sunken: 'border-sk-bd bg-sk-bg shadow-sunken',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}

const level = useElevation(() => props.elevation, 'surface')
provideSurface(() => level.value)
</script>

<template>
  <!-- Collapsible props (open, defaultOpen, update:open) fall through as attrs. -->
  <Collapsible
    data-slot="ai-tool"
    :class="cn(
      'group/tool not-prose w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground',
      toolElevation[level],
      props.class,
    )"
  >
    <slot />
  </Collapsible>
</template>
