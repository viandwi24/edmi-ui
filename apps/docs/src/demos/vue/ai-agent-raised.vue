<script setup lang="ts">
import {
  Agent,
  AgentContent,
  AgentHeader,
  AgentInstructions,
} from "@edmi-vue/components/ai/agent";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex w-full max-w-2xl flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <Agent :elevation="level.value" class="max-w-lg">
        <AgentHeader name="Keeper agent" model="claude-opus" />
        <AgentContent>
          <AgentInstructions>
            Keep every index within its drift limit. Never trade without approval
            when the order is above <b>$500</b>.
          </AgentInstructions>
        </AgentContent>
      </Agent>
    </div>
  </div>
</template>
