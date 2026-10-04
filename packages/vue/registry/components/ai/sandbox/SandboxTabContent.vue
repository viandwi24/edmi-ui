<script setup lang="ts">
import type { TabsContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/registry/edmi/lib/utils"
import { TabsContent } from "@/registry/edmi/ui/tabs"

const props = defineProps<TabsContentProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <TabsContent
    data-slot="ai-sandbox-tab-content"
    v-bind="delegatedProps"
    :class="cn('px-3 pt-2.5 pb-3 text-sm', props.class)"
  >
    <slot />
  </TabsContent>
</template>
