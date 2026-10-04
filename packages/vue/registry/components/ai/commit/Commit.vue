<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { useForwardPropsEmits } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible } from "@/registry/edmi/ui/collapsible"

// A git commit: author, message, time, short hash and the changed files.
const props = defineProps<CollapsibleRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CollapsibleRootEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Collapsible
    v-bind="forwarded"
    data-slot="ai-commit"
    :class="cn('overflow-hidden rounded-xl border border-border bg-card text-card-foreground', props.class)"
  >
    <slot />
  </Collapsible>
</template>
