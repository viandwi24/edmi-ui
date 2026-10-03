<script setup lang="ts">
import { CopyIcon } from "@lucide/vue";
import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationItem,
  ConversationScrollButton,
} from "@edmi-vue/components/ai/conversation";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from "@edmi-vue/components/ai/message";
import { Shimmer } from "@edmi-vue/components/ai/shimmer";

const turns = [
  { role: "user", text: "Which megacaps drift the most this month?" },
  {
    role: "assistant",
    text: "NVDAx moved most: **+2.4%** over its 32% target. MSFTx and AAPLx are within 0.5%.",
  },
  { role: "user", text: "Rebalance if drift is above 2%." },
] as const;

const messages = turns.map((t, i) => ({
  id: `m${i}`,
  role: t.role,
  parts: [{ type: "text" as const, text: t.text }],
}));
</script>

<template>
  <div class="relative flex h-96 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card">
    <Conversation class="size-full">
      <ConversationContent>
        <ConversationItem v-for="(t, i) in turns" :key="t.text" :message-id="`m${i}`">
          <Message :from="t.role">
            <MessageContent>
              <MessageResponse v-if="t.role === 'assistant'" :content="t.text" />
              <template v-else>{{ t.text }}</template>
            </MessageContent>
            <MessageToolbar v-if="t.role === 'assistant'">
              <MessageActions>
                <MessageAction tooltip="Copy">
                  <CopyIcon />
                </MessageAction>
              </MessageActions>
            </MessageToolbar>
          </Message>
        </ConversationItem>
        <ConversationItem message-id="status">
          <Message from="assistant">
            <MessageContent>
              <Shimmer>Checking keeper limits...</Shimmer>
            </MessageContent>
          </Message>
        </ConversationItem>
      </ConversationContent>
      <ConversationScrollButton />
      <ConversationDownload :messages="messages" />
    </Conversation>
  </div>
</template>
