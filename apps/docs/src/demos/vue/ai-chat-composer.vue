<script setup lang="ts">
import { ChatComposer } from "@edmi-vue/components/ai/chat-composer";

const models = [
  { id: "opus", label: "Opus" },
  { id: "sonnet", label: "Sonnet" },
];
const efforts = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
];
const modes = [
  { id: "auto", label: "Auto" },
  { id: "ask", label: "Ask first" },
];
</script>

<template>
  <ChatComposer
    class="max-w-2xl"
    disclaimer="Edmi is AI and can make mistakes."
    :models="models"
    :efforts="efforts"
    default-effort="medium"
    :modes="modes"
    @attach="() => {}"
    @speech="() => {}"
  />
</template>
