<script setup lang="ts">
import { AgentAvatar } from "@edmi-vue/components/ai/agent-avatar";
import { Message, MessageContent, MessageHeader } from "@edmi-vue/components/ai/message";
import { Suggestion, Suggestions } from "@edmi-vue/components/ai/suggestion";
import { Button } from "@edmi-vue/ui/button";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@edmi-vue/ui/item";
import { type ChatMessage, org, plantHead, suggested, type TaskRow, thread } from "../data";
import Icon from "./Icon.vue";
import Pixels from "./Pixels.vue";
import Status from "./Status.vue";

defineProps<{ view: "chat" | "home" | "thread"; messages: ChatMessage[]; tasks: TaskRow[] }>();
const emit = defineEmits<{
  (e: "view", v: "chat" | "home" | "thread"): void;
  (e: "send", text: string): void;
  (e: "reset"): void;
}>();
</script>

<template>
  <div v-if="view === 'home'" class="flex min-h-0 flex-1 flex-col px-5 pb-3">
    <div class="mt-3 [mask-image:linear-gradient(to_bottom,black,transparent)]">
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon"><Icon name="map" /></ItemMedia>
        <ItemContent>
          <ItemTitle>Open the company roadmap</ItemTitle>
          <ItemDescription>General</ItemDescription>
        </ItemContent>
      </Item>
    </div>
    <div class="flex justify-center py-3">
      <Button type="button" variant="ghost" size="xs" @click="emit('view', 'chat')">
        <Icon name="arrowUp" />
        Back to chat
      </Button>
    </div>
    <div class="flex flex-1 flex-col items-center justify-center gap-2 text-center">
      <h2 class="text-2xl font-normal">Good evening, {{ org.user }}</h2>
      <Button type="button" variant="ghost" size="xs">
        <Icon name="map" />
        Roadmap
      </Button>
    </div>
    <div class="mb-2 text-xs text-muted-foreground">Tasks</div>
    <div class="flex flex-col">
      <div v-for="t in tasks" :key="t.id" class="flex items-center gap-3 border-b border-border py-3 last:border-b-0">
        <AgentAvatar :seed="t.agent" :color="t.color" :size="20" :tile="false" />
        <span class="text-[15px]">{{ t.name }}</span>
        <span class="ml-auto font-mono text-xs text-muted-foreground">{{ t.age }}</span>
        <Status :status="t.status" />
      </div>
    </div>
    <div class="mt-3 flex items-center gap-2">
      <span class="text-xs text-muted-foreground">Suggested</span>
      <Suggestions class="min-w-0">
        <Suggestion v-for="s in suggested" :key="s" :suggestion="s" @click="emit('send', $event)" />
      </Suggestions>
    </div>
  </div>

  <div v-else class="flex min-h-0 flex-1 flex-col">
    <div class="flex justify-end px-3 pt-3">
      <Button type="button" variant="ghost" size="icon-xs" aria-label="Toggle thread" @click="emit('view', view === 'thread' ? 'chat' : 'thread')">
        <Icon name="more" />
      </Button>
    </div>
    <div v-if="view === 'thread'" class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-3">
      <Message from="assistant">
        <MessageContent>
          <p>{{ thread.intro[0] }}</p>
          <ol class="my-2 list-decimal pl-5">
            <li>{{ thread.intro[1] }}</li>
            <li>{{ thread.intro[2] }}</li>
          </ol>
          <p>{{ thread.intro[3] }}</p>
        </MessageContent>
      </Message>
      <Message from="user"><MessageContent>{{ thread.question }}</MessageContent></Message>
      <Message from="assistant">
        <MessageHeader>
          <Pixels :w="plantHead.w" :h="plantHead.h" :rects="plantHead.rects" class="h-3 w-3.5" />
          Atlas
        </MessageHeader>
        <MessageContent>{{ thread.answer }}</MessageContent>
      </Message>
      <div class="flex flex-col gap-2">
        <Item v-for="a in thread.actions" :key="a.id" variant="outline" size="sm">
          <ItemMedia><AgentAvatar :seed="a.agent" :color="a.color" :size="20" :tile="false" /></ItemMedia>
          <ItemContent>
            <ItemTitle>{{ a.title }}</ItemTitle>
            <ItemDescription>{{ a.dept }}</ItemDescription>
          </ItemContent>
        </Item>
      </div>
      <div class="flex justify-center">
        <Button type="button" variant="outline" size="icon-xs" aria-label="Scroll to latest"><Icon name="chevronDown" /></Button>
      </div>
    </div>
    <div v-else-if="messages.length === 0" class="flex flex-1 flex-col items-center justify-center gap-2 px-10 text-center">
      <svg viewBox="0 0 24 24" class="mb-2 size-7 text-muted-foreground" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="1.4" />
        <circle cx="12" cy="6" r="1" />
        <circle cx="12" cy="18" r="1" />
        <circle cx="6" cy="12" r="1" />
        <circle cx="18" cy="12" r="1" />
      </svg>
      <h2 class="text-[15px] font-semibold">What should we work on?</h2>
      <p class="text-sm text-muted-foreground">
        Bring me an idea, a problem, or a goal. I'll help turn it into the next useful step.
      </p>
    </div>
    <div v-else class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-3">
      <Message v-for="m in messages" :key="m.id" :from="m.from">
        <MessageContent>{{ m.text }}</MessageContent>
      </Message>
      <div>
        <Button type="button" variant="ghost" size="xs" @click="emit('reset')">
          <Icon name="home" />
          Back to home
        </Button>
      </div>
    </div>
  </div>
</template>
