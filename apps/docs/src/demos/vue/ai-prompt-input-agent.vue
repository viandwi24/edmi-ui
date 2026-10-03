<script setup lang="ts">
import { PlusIcon } from "@lucide/vue";
import { ref } from "vue";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  createPromptInputState,
  providePromptInput,
} from "@edmi-vue/components/ai/prompt-input";
import {
  PromptInputAgent,
  PromptInputAgentMentions,
  type PromptInputAgentOption,
  useAgentMention,
} from "@edmi-vue/components/ai/prompt-input-agent";
import { Button } from "@edmi-vue/ui/button";

const agents: PromptInputAgentOption[] = [
  { id: "keeper", name: "Keeper", scope: "trading", color: "chart-3" },
  { id: "writer", name: "Writer", scope: "feed", color: "chart-4" },
  { id: "analyst", name: "Analyst", scope: "research", color: "chart-2" },
];

const agent = ref<PromptInputAgentOption>(agents[0] as PromptInputAgentOption);
// Lift the composer state so the mention list can read the text.
const state = providePromptInput(createPromptInputState("@"));
const mention = useAgentMention({
  agents,
  value: state.textInput,
  onValueChange: state.setTextInput,
  onAgentSelect: (a) => {
    agent.value = a;
  },
});
</script>

<template>
  <div class="w-full max-w-xl pt-36">
    <div class="relative">
      <PromptInputAgentMentions
        v-if="mention.open.value"
        :agents="mention.items.value"
        :active-index="mention.activeIndex.value"
        @select="mention.select"
      />
      <PromptInput class="[&_[data-slot=input-group]]:bg-muted">
        <PromptInputHeader>
          <PromptInputAgent :agent="agent" />
        </PromptInputHeader>
        <PromptInputBody>
          <PromptInputTextarea
            :placeholder="`Ask ${agent.name} anything about your index… (type @ to switch)`"
            class="min-h-20"
            @keydown.capture="mention.onKeydown"
          />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <Button aria-label="Attach" size="icon-sm" type="button" variant="ghost">
              <PlusIcon class="size-4" />
            </Button>
          </PromptInputTools>
          <PromptInputSubmit class="size-10" size="icon-sm" variant="secondary" />
        </PromptInputFooter>
      </PromptInput>
    </div>
  </div>
</template>
