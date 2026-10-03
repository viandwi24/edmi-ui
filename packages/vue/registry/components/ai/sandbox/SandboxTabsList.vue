<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
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
