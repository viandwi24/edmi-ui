<script setup lang="ts">
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@edmi-vue/components/ai/message";

const agents = [
  {
    name: "Keeper",
    text: "Drift is 2.4%, above the 2% limit. Rebalance is allowed.",
    tone: "bg-success-soft text-success-text",
  },
  {
    name: "Writer",
    text: "Drafted a feed post about the rebalance.",
    tone: "bg-info-soft text-info-text",
  },
];
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <Message v-for="a in agents" :key="a.name" from="assistant">
      <MessageAvatar>
        <span
          class="flex size-6 items-center justify-center rounded-full border border-border text-xs font-medium"
          :class="a.tone"
        >
          {{ a.name[0] }}
        </span>
      </MessageAvatar>
      <MessageHeader>
        <span class="font-semibold text-foreground">{{ a.name }}</span>
        agent
      </MessageHeader>
      <MessageContent>{{ a.text }}</MessageContent>
    </Message>
  </div>
</template>
