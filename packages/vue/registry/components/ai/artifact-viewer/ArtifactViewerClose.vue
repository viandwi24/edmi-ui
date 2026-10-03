<script setup lang="ts">
import { X } from "@lucide/vue"
import ArtifactViewerAction from "./ArtifactViewerAction.vue"

withDefaults(defineProps<{
  label?: string
}>(), {
  label: "Close",
})
</script>

<template>
  <ArtifactViewerAction :label="label">
    <X class="size-4" />
  </ArtifactViewerAction>
</template>
