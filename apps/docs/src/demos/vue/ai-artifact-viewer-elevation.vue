<script setup lang="ts">
import {
  ArtifactViewer,
  ArtifactViewerContent,
  ArtifactViewerDownload,
  ArtifactViewerHeader,
  ArtifactViewerPaper,
  ArtifactViewerTitle,
} from "@edmi-vue/components/ai/artifact-viewer";

const levels = [
  { value: "sunken", label: "Sunken (-1)" },
  { value: "flat", label: "Flat (0)" },
  { value: "raised", label: "Raised (+1)" },
  { value: "floating", label: "Floating (+2)" },
];
</script>

<template>
  <div class="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <ArtifactViewer :elevation="level.value">
        <ArtifactViewerHeader>
          <ArtifactViewerTitle format="PDF">Rebalance report</ArtifactViewerTitle>
          <ArtifactViewerDownload />
        </ArtifactViewerHeader>
        <ArtifactViewerContent>
          <ArtifactViewerPaper class="px-6 py-5 text-[13px]">
            Drift stays inside the band.
          </ArtifactViewerPaper>
        </ArtifactViewerContent>
      </ArtifactViewer>
    </div>
  </div>
</template>
