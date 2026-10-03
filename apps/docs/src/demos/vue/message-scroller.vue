<script setup lang="ts">
import { Bubble, BubbleContent } from "@edmi-vue/ui/bubble";
import { Marker, MarkerContent } from "@edmi-vue/ui/marker";
import { Message, MessageContent } from "@edmi-vue/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@edmi-vue/ui/message-scroller";

const turns = Array.from({ length: 12 }, (_, i) => i);
</script>

<template>
  <div class="h-72 w-full max-w-md rounded-xl border border-border bg-card p-3">
    <MessageScrollerProvider auto-scroll>
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent class="gap-4 pr-2">
            <Marker variant="separator">
              <MarkerContent>Yesterday</MarkerContent>
            </Marker>
            <MessageScrollerItem v-for="i in turns" :key="i" :message-id="`m${i}`">
              <Message :align="i % 2 ? 'end' : 'start'">
                <MessageContent>
                  <Bubble :align="i % 2 ? 'end' : 'start'" :variant="i % 2 ? 'default' : 'secondary'">
                    <BubbleContent>{{ i % 2 ? "Any drift?" : `NVDAx is at ${30 + i}%.` }}</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  </div>
</template>
