<script setup lang="ts">
import { FileCodeIcon } from "@lucide/vue";
import { ref } from "vue";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockLanguageSelector,
  CodeBlockLanguageSelectorContent,
  CodeBlockLanguageSelectorItem,
  CodeBlockLanguageSelectorTrigger,
  CodeBlockLanguageSelectorValue,
  CodeBlockTitle,
} from "@edmi-vue/components/ai/code-block";

const code = `import { rebalance } from "@/lib/keeper"

export async function run(index: string) {
  // only when drift is above the limit
  const drift = await getDrift(index)
  if (drift < 0.02) return
  return rebalance(index, { slippage: 0.01 })
}`;

const languages = [
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "json", label: "JSON" },
] as const;

const language = ref<"typescript" | "javascript" | "json">("typescript");
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-6">
    <div class="flex flex-col gap-2">
      <span class="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">With header + line numbers</span>
      <CodeBlock :code="code" :language="language" show-line-numbers>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <FileCodeIcon class="size-3.5" />
            <CodeBlockFilename>keeper.ts</CodeBlockFilename>
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockLanguageSelector v-model="language">
              <CodeBlockLanguageSelectorTrigger>
                <CodeBlockLanguageSelectorValue />
              </CodeBlockLanguageSelectorTrigger>
              <CodeBlockLanguageSelectorContent>
                <CodeBlockLanguageSelectorItem v-for="l in languages" :key="l.value" :value="l.value">
                  {{ l.label }}
                </CodeBlockLanguageSelectorItem>
              </CodeBlockLanguageSelectorContent>
            </CodeBlockLanguageSelector>
            <CodeBlockCopyButton />
          </CodeBlockActions>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
    <div class="flex flex-col gap-2">
      <span class="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">No header</span>
      <CodeBlock class="max-w-md" code="const w = { NVDAx: 0.32, MSFTx: 0.28 }" language="typescript" />
    </div>
  </div>
</template>
