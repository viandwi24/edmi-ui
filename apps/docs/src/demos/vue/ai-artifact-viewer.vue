<script setup lang="ts">
import {
  ArtifactViewer,
  ArtifactViewerClose,
  ArtifactViewerContent,
  ArtifactViewerDownload,
  ArtifactViewerExpand,
  ArtifactViewerHeader,
  ArtifactViewerOpenIn,
  ArtifactViewerPaper,
  ArtifactViewerTitle,
} from "@edmi-vue/components/ai/artifact-viewer";
</script>

<template>
  <ArtifactViewer class="w-full max-w-xl">
    <ArtifactViewerHeader>
      <ArtifactViewerTitle format="PDF">Rebalance report</ArtifactViewerTitle>
      <ArtifactViewerOpenIn />
      <ArtifactViewerDownload />
      <ArtifactViewerExpand />
      <ArtifactViewerClose />
    </ArtifactViewerHeader>
    <ArtifactViewerContent>
      <ArtifactViewerPaper>
        <div class="font-mono text-[11px] tracking-[2px] text-[#7a7974]">
          RESEARCH · MAG4 · OCT 2026
        </div>
        <div class="mt-2.5 font-serif text-[26px] leading-[1.15] font-bold">
          Drift stays inside the band
        </div>
        <p class="mt-3 text-[13px] leading-[1.7] text-[#3d3c38]">
          The keeper checks weights every hour and trades only when a sleeve
          drifts past 2%. Slippage stays under 1% at current depth.
          <b>No manual step is needed before the next rebalance.</b>
        </p>
        <div class="my-4 h-0.5 bg-[#22406b]" />
        <div class="font-serif text-[17px] font-bold text-[#22406b]">
          What changed this week
        </div>
      </ArtifactViewerPaper>
    </ArtifactViewerContent>
  </ArtifactViewer>
</template>
