<script setup lang="ts">
import type { TabsListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { TabsList } from "@/registry/edmi/ui/tabs"

const props = defineProps<TabsListProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <TabsList v-bind="props">
    <slot />
  </TabsList>
</template>
