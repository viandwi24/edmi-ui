<script setup lang="ts">
import { MaximizeIcon } from "@lucide/vue"
import ArtifactViewerAction from "./ArtifactViewerAction.vue"

withDefaults(defineProps<{
  label?: string
}>(), {
  label: "Expand",
})
</script>

<template>
  <ArtifactViewerAction :label="label">
    <MaximizeIcon class="size-4" />
  </ArtifactViewerAction>
</template>
