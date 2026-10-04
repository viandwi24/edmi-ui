<script setup lang="ts">
import { CopyIcon, CheckIcon, DownloadIcon, ArrowUpRightIcon } from "@lucide/vue";
import { ref } from "vue";
import { Button } from "@edmi-vue/ui/button";
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

const open = ref(true);
const copied = ref(false);
function copy() {
  navigator.clipboard?.writeText(code).catch(() => {});
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
}
</script>

<template>
  <Button v-if="!open" variant="outline" size="sm" @click="open = true">Reopen rebalance.ts</Button>
  <Artifact v-else class="max-w-xl">
    <ArtifactHeader>
      <div>
        <ArtifactTitle>rebalance.ts</ArtifactTitle>
        <ArtifactDescription>Generated · 8 lines</ArtifactDescription>
      </div>
      <ArtifactActions>
        <ArtifactAction tooltip="Copy" @click="copy">
          <CheckIcon v-if="copied" class="size-4" />
          <CopyIcon v-else class="size-4" />
        </ArtifactAction>
        <ArtifactAction tooltip="Download"><DownloadIcon class="size-4" /></ArtifactAction>
        <ArtifactAction tooltip="Open"><ArrowUpRightIcon class="size-4" /></ArtifactAction>
        <ArtifactClose @click="open = false" />
      </ArtifactActions>
    </ArtifactHeader>
    <ArtifactContent>
      <CodeBlock class="rounded-none border-0" :code="code" language="typescript" show-line-numbers />
    </ArtifactContent>
  </Artifact>
</template>
