<script setup lang="ts">
import { CopyIcon, DownloadIcon, ExternalLinkIcon } from "@lucide/vue";
import {
  Artifact,
  ArtifactAction,
  ArtifactActions,
  ArtifactClose,
  ArtifactContent,
  ArtifactDescription,
  ArtifactHeader,
  ArtifactTitle,
} from "@edmi-vue/components/ai/artifact";
import { CodeBlock } from "@edmi-vue/components/ai/code-block";

const code = `import { rebalance } from "@/lib/keeper"

export async function run(index: string) {
  // only when drift is above the limit
  const drift = await getDrift(index)
  if (drift < 0.02) return
  return rebalance(index, { slippage: 0.01 })
}`;
</script>

<template>
  <Artifact class="max-w-xl" raised>
    <ArtifactHeader>
      <div>
        <ArtifactTitle>rebalance.ts</ArtifactTitle>
        <ArtifactDescription>Generated · 8 lines</ArtifactDescription>
      </div>
      <ArtifactActions>
        <ArtifactAction tooltip="Copy"><CopyIcon class="size-4" /></ArtifactAction>
        <ArtifactAction tooltip="Download"><DownloadIcon class="size-4" /></ArtifactAction>
        <ArtifactAction tooltip="Open"><ExternalLinkIcon class="size-4" /></ArtifactAction>
        <ArtifactClose />
      </ArtifactActions>
    </ArtifactHeader>
    <ArtifactContent>
      <CodeBlock class="rounded-none border-0" :code="code" language="typescript" show-line-numbers />
    </ArtifactContent>
  </Artifact>
</template>
