<script setup lang="ts">
import { Bubble, BubbleContent } from "@edmi-vue/ui/bubble";
import { Button } from "@edmi-vue/ui/button";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@edmi-vue/ui/message";
import { CopyIcon, SparklesIcon, HeartIcon } from "@lucide/vue";
</script>

<template>
  <MessageGroup class="w-full max-w-lg gap-5">
    <Message>
      <MessageAvatar class="size-6 border border-border bg-brand-soft text-brand-text">
        <SparklesIcon class="size-3" />
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>
          <span class="font-semibold text-foreground">Research agent</span>
          <span class="font-mono">09:41</span>
        </MessageHeader>
        <Bubble variant="ghost">
          <BubbleContent>
            I screened the megacaps against your mandate. A rebalance would cost about 0.08% in slippage.
          </BubbleContent>
        </Bubble>
        <MessageFooter>
          <Button variant="ghost" size="icon-xs" aria-label="Copy"><CopyIcon /></Button>
          <Button variant="ghost" size="icon-xs" aria-label="Like"><HeartIcon /></Button>
        </MessageFooter>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageAvatar class="size-6 bg-secondary font-mono text-[10px]">DL</MessageAvatar>
      <MessageContent>
        <Bubble align="end">
          <BubbleContent>Run it and send me the transaction to sign.</BubbleContent>
        </Bubble>
        <MessageFooter>Read</MessageFooter>
      </MessageContent>
    </Message>
  </MessageGroup>
</template>
