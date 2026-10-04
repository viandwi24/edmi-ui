<script setup lang="ts">
import type { TabsTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/registry/edmi/lib/utils"
import { TabsTrigger } from "@/registry/edmi/ui/tabs"

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <TabsTrigger
    v-bind="delegatedProps"
    :class="cn('h-[26px] px-3.5 text-[12.5px]', props.class)"
  >
    <slot />
  </TabsTrigger>
</template>
