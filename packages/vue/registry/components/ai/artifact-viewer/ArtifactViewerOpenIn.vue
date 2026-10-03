<script setup lang="ts">
import { ArrowUpRightIcon } from "@lucide/vue"
import ArtifactViewerAction from "./ArtifactViewerAction.vue"

withDefaults(defineProps<{
  label?: string
}>(), {
  label: "Open in",
})
</script>

<template>
  <ArtifactViewerAction :label="label">
    <ArrowUpRightIcon class="size-4" />
  </ArtifactViewerAction>
</template>
