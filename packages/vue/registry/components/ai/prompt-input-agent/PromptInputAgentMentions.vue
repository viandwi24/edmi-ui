<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { PromptInputAgentOption } from "./types"
import { AgentAvatar } from "@/registry/edmi/components/ai/agent-avatar"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  agents: PromptInputAgentOption[]
  activeIndex?: number
  label?: string
}>(), {
  activeIndex: 0,
  label: "Agents",
})

const emit = defineEmits<{
  (e: "select", agent: PromptInputAgentOption): void
}>()
</script>

<template>
  <!--
    The @ mention list. It positions itself above the nearest `relative` ancestor, so render it next to
    (not inside) `PromptInput`, whose group clips overflow.
  -->
  <div
    data-slot="ai-prompt-input-agent-mentions"
    role="listbox"
    :aria-label="label"
    :class="cn('absolute bottom-full left-0 z-50 mb-2 w-70 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground', props.class)"
  >
    <div class="px-2 pt-1.5 pb-1 text-xs font-semibold text-muted-foreground">
      {{ label }}
    </div>
    <!-- keep focus in the textarea while picking -->
    <div
      v-for="(agent, i) in agents"
      :key="agent.id"
      role="option"
      :aria-selected="i === activeIndex"
      tabindex="-1"
      :data-active="i === activeIndex ? '' : undefined"
      class="flex h-8 cursor-default items-center gap-[9px] rounded-[7px] px-2 text-[13.5px] whitespace-nowrap data-[active]:bg-accent data-[active]:text-accent-foreground"
      @mousedown.prevent
      @click="emit('select', agent)"
      @keydown.enter="emit('select', agent)"
    >
      <AgentAvatar :seed="agent.id" :color="agent.color" :size="19" :tile="false" />
      <span>{{ agent.name }}</span>
      <span v-if="agent.scope" class="ml-auto font-mono text-[11.5px] tracking-wide text-muted-foreground">
        {{ agent.scope }}
      </span>
    </div>
  </div>
</template>
