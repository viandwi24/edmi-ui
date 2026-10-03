<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorShortcut,
  ModelSelectorTrigger,
} from "@edmi-vue/components/ai/model-selector";
import { Button } from "@edmi-vue/ui/button";

const models = [
  { provider: "anthropic", label: "Anthropic", items: ["Claude Opus", "Claude Sonnet"] },
  { provider: "openai", label: "OpenAI", items: ["GPT-5"] },
  { provider: "google", label: "Google", items: ["Gemini 2.5 Pro"] },
];

const selected = ref("Claude Opus");
const open = ref(false);
const current = computed(() => models.find((g) => g.items.includes(selected.value)));

// Running ⌘1..⌘n shortcut index across groups.
const shortcut = (provider: string, item: string) => {
  let n = 0;
  for (const g of models) {
    for (const i of g.items) {
      n++;
      if (g.provider === provider && i === item) return `⌘${n}`;
    }
  }
  return "";
};

function pick(item: string) {
  selected.value = item;
  open.value = false;
}
</script>

<template>
  <ModelSelector v-model:open="open">
    <ModelSelectorTrigger as-child>
      <Button variant="outline">
        <ModelSelectorLogo v-if="current" :provider="current.provider" />
        <ModelSelectorName>{{ selected }}</ModelSelectorName>
      </Button>
    </ModelSelectorTrigger>
    <ModelSelectorContent>
      <ModelSelectorInput placeholder="Search models..." />
      <ModelSelectorList>
        <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
        <ModelSelectorGroup v-for="group in models" :key="group.provider" :heading="group.label">
          <ModelSelectorItem
            v-for="item in group.items"
            :key="item"
            :value="item"
            @select="pick(item)"
          >
            <ModelSelectorLogo :provider="group.provider" />
            <ModelSelectorName>{{ item }}</ModelSelectorName>
            <ModelSelectorShortcut>{{ shortcut(group.provider, item) }}</ModelSelectorShortcut>
          </ModelSelectorItem>
        </ModelSelectorGroup>
      </ModelSelectorList>
    </ModelSelectorContent>
  </ModelSelector>
</template>
