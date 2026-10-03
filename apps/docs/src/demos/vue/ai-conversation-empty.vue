<script setup lang="ts">
import { MessageSquareIcon } from "@lucide/vue";
import { ConversationEmptyState } from "@edmi-vue/components/ai/conversation";
import { Suggestion } from "@edmi-vue/components/ai/suggestion";
</script>

<template>
  <div class="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
    <div class="flex h-72 rounded-xl border border-border bg-card">
      <ConversationEmptyState
        title="Start a conversation"
        description="Ask about an index, a token or your portfolio."
      >
        <template #icon>
          <MessageSquareIcon />
        </template>
      </ConversationEmptyState>
    </div>
    <div class="flex h-72 rounded-xl border border-border bg-card">
      <ConversationEmptyState
        variant="home"
        title="Good evening, Dwi"
        description="What should the keeper look at?"
      >
        <div class="flex flex-wrap justify-center gap-2">
          <Suggestion suggestion="Check drift" />
          <Suggestion suggestion="Show my fees" />
        </div>
      </ConversationEmptyState>
    </div>
  </div>
</template>
