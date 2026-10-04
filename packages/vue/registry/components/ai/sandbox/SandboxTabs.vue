<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { useForwardPropsEmits } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"
import { Tabs } from "@/registry/edmi/ui/tabs"

const props = defineProps<TabsRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<TabsRootEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Tabs
    data-slot="ai-sandbox-tabs"
    v-bind="forwarded"
    :class="cn('w-full gap-0', props.class)"
  >
    <slot />
  </Tabs>
</template>
