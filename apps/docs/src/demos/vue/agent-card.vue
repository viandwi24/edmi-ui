<script setup lang="ts">
import { AgentCard } from "@edmi-vue/ui/agent-card";
</script>

<template>
  <AgentCard
    class="w-[380px] max-w-full"
    name="XSD"
    tag="AI"
    autopilot
    address="dG6r…4mSr"
    :stats="[
      { label: 'Indexes', value: '3' },
      { label: 'AUM', value: '$12.4K' },
      { label: 'Best 7d', value: '+4.1%' },
    ]"
  />
</template>
