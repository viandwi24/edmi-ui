<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { CollapsibleRootEmits, CollapsibleRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { useForwardPropsEmits } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible } from "@/registry/edmi/ui/collapsible"

const props = withDefaults(defineProps<CollapsibleRootProps & { class?: HTMLAttributes["class"] }>(), {
  defaultOpen: true,
})
const emits = defineEmits<CollapsibleRootEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Collapsible
    data-slot="ai-sandbox"
    v-bind="forwarded"
    :class="cn(
      'not-prose group/ai-sandbox w-full overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-border bg-card',
      props.class,
    )"
  >
    <slot />
  </Collapsible>
</template>
