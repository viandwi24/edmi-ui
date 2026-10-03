<script setup lang="ts">
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from "@edmi-vue/components/ai/message";

const variants = [
  "Sell **0.42 NVDAx** and buy the other two.",
  "Skip the rebalance: drift is **1.9%**, under your limit.",
  "Rebalance in two steps to keep slippage under `0.05%`.",
];
</script>

<template>
  <MessageBranch class="max-w-xl">
    <MessageBranchContent>
      <Message v-for="text in variants" :key="text" from="assistant">
        <MessageContent>
          <MessageResponse :content="text" />
        </MessageContent>
      </Message>
    </MessageBranchContent>
    <MessageToolbar>
      <MessageBranchSelector>
        <MessageBranchPrevious />
        <MessageBranchPage />
        <MessageBranchNext />
      </MessageBranchSelector>
    </MessageToolbar>
  </MessageBranch>
</template>
