<script setup lang="ts">
import { CopyIcon, RefreshCwIcon, CircleCheckIcon } from "@lucide/vue";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from "@edmi-vue/components/ai/message";

const markdown = `### Rebalance plan

1. Sell **0.42 NVDAx** ($79)
2. Buy **0.18 MSFTx** and **0.21 AAPLx**

Estimated slippage \`0.08%\`.

> Slippage stays under 1% at current depth.

Sources: [Jupiter quote API](https://example.com).`;
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-6">
    <Message from="user">
      <MessageContent>Rebalance if drift is above 2%.</MessageContent>
    </Message>
    <Message from="assistant">
      <MessageContent>
        <MessageResponse :content="markdown" />
      </MessageContent>
      <MessageToolbar>
        <MessageActions>
          <MessageAction tooltip="Copy"><CopyIcon /></MessageAction>
          <MessageAction tooltip="Regenerate"><RefreshCwIcon /></MessageAction>
          <MessageAction tooltip="Good response"><CircleCheckIcon /></MessageAction>
        </MessageActions>
      </MessageToolbar>
    </Message>
  </div>
</template>
