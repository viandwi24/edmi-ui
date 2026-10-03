<script setup lang="ts">
import { AgentAvatar } from "@edmi-vue/components/ai/agent-avatar";

const agents = ["Keeper", "Writer", "Analyst", "Engineer", "Designer"];
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-5">
      <div v-for="name in agents" :key="name" class="flex flex-col items-center gap-1.5">
        <AgentAvatar :seed="name.toLowerCase()" :label="name" />
        <span class="text-xs text-muted-foreground">{{ name }}</span>
      </div>
    </div>
    <div class="flex items-center gap-3.5">
      <AgentAvatar seed="keeper" :size="20" />
      <AgentAvatar seed="keeper" :size="28" />
      <AgentAvatar seed="keeper" :size="40" />
      <AgentAvatar seed="keeper" :size="56" />
      <AgentAvatar seed="keeper" :size="28" :tile="false" color="chart-2" />
    </div>
  </div>
</template>
