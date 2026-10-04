<script setup lang="ts">
import { ElevationProvider } from "@edmi-vue/ui/elevation"
import { MapIcon, PlusIcon } from "@lucide/vue";
import { AgentAvatar } from "@edmi-vue/components/ai/agent-avatar";
import { ConversationEmptyState } from "@edmi-vue/components/ai/conversation";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@edmi-vue/components/ai/prompt-input";
import { PromptInputAgent } from "@edmi-vue/components/ai/prompt-input-agent";
import {
  Queue,
  QueueItem,
  QueueItemAvatar,
  QueueItemContent,
  QueueItemStatus,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from "@edmi-vue/components/ai/queue";
import { Suggestion, Suggestions } from "@edmi-vue/components/ai/suggestion";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Spinner } from "@edmi-vue/ui/spinner";
import { agent, greeting, project, suggestions, tasks } from "./data";
</script>

<template>
  <ElevationProvider mode="layered">
  <div class="mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-4 bg-background p-4 text-foreground">
    <ConversationEmptyState variant="home" :title="greeting" description="" class="flex-1 gap-8 p-2">
      <Badge variant="secondary" class="-mt-5 gap-1.5">
        <MapIcon class="size-3" />
        {{ project }}
      </Badge>
      <Queue variant="flat" class="w-full text-left">
        <QueueSection>
          <QueueSectionTrigger class="font-normal text-muted-foreground">
            <QueueSectionLabel label="Tasks" :chevron="false" />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              <QueueItem v-for="task in tasks" :key="task.id">
                <div class="flex items-center gap-2">
                  <QueueItemAvatar>
                    <AgentAvatar :seed="task.agent.id" :color="task.agent.color" :size="22" :tile="false" />
                  </QueueItemAvatar>
                  <QueueItemContent>{{ task.title }}</QueueItemContent>
                  <QueueItemStatus>
                    <span class="font-mono">{{ task.age }}</span>
                    <Spinner v-if="task.status === 'running'" class="size-3.5" />
                    <span v-else class="size-1.5 rounded-full bg-success" />
                  </QueueItemStatus>
                </div>
              </QueueItem>
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
      </Queue>
      <div class="flex w-full items-center gap-2">
        <span class="shrink-0 text-xs text-muted-foreground">Suggested</span>
        <Suggestions>
          <Suggestion v-for="s in suggestions" :key="s" :suggestion="s" />
        </Suggestions>
      </div>
    </ConversationEmptyState>

    <PromptInput>
      <PromptInputHeader>
        <PromptInputAgent :agent="agent" />
      </PromptInputHeader>
      <PromptInputBody>
        <PromptInputTextarea :placeholder="`Ask ${agent.name} anything about your index…`" class="min-h-20" />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <Button aria-label="Attach" size="icon-sm" type="button" variant="ghost">
            <PlusIcon class="size-4" />
          </Button>
        </PromptInputTools>
        <PromptInputSubmit class="size-10" size="icon-sm" variant="secondary" />
      </PromptInputFooter>
    </PromptInput>
  </div>
  </ElevationProvider>
</template>
