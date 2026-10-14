<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { PromptInputAgentOption } from "./types"
import { AgentAvatar } from "@/registry/edmi/components/ai/agent-avatar"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import type { Elevation } from "@/registry/edmi/ui/elevation"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  agent: PromptInputAgentOption
  /** ✦ depth of the chip: sunken -1, flat 0, raised +1, floating +2. */
  elevation?: Elevation
}>(), {
  elevation: undefined,
})
</script>

<template>
  <!-- Chip in the composer header: who you are talking to. -->
  <Button
    data-slot="ai-prompt-input-agent"
    variant="outline"
    size="sm"
    :elevation="elevation"
    type="button"
    :class="cn('gap-[7px] bg-card', props.class)"
  >
    <AgentAvatar :seed="agent.id" :color="agent.color" :size="19" :tile="false" />
    {{ agent.name }}
  </Button>
</template>
