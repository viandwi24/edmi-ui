<script setup lang="ts">
import { DownloadIcon } from "@lucide/vue"
import ArtifactViewerAction from "./ArtifactViewerAction.vue"

withDefaults(defineProps<{
  label?: string
}>(), {
  label: "Download",
})
</script>

<template>
  <ArtifactViewerAction :label="label">
    <DownloadIcon class="size-4" />
  </ArtifactViewerAction>
</template>
