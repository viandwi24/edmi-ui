<script setup lang="ts">
import { FileCodeIcon, PlayIcon, PlusIcon } from "@lucide/vue";
import { computed, ref } from "vue";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@edmi-vue/components/ai/code-block";
import {
  Conversation,
  ConversationContent,
  ConversationItem,
  ConversationScrollButton,
} from "@edmi-vue/components/ai/conversation";
import { FileTree, FileTreeFile, FileTreeFolder } from "@edmi-vue/components/ai/file-tree";
import { Message, MessageContent, MessageResponse } from "@edmi-vue/components/ai/message";
import {
  Plan,
  PlanAction,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from "@edmi-vue/components/ai/plan";
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
  QueueItemContent,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from "@edmi-vue/components/ai/queue";
import {
  Terminal,
  TerminalActions,
  TerminalClearButton,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalStatus,
  TerminalTitle,
} from "@edmi-vue/components/ai/terminal";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import {
  agent,
  expandedFolders,
  files,
  initialPath,
  plan,
  queue,
  reply,
  request,
  terminalOutput,
} from "./data";

const selected = ref(initialPath);
const expanded = ref(new Set(expandedFolders));
const output = ref(terminalOutput);
const file = computed(() => files[selected.value] ?? files[initialPath]);
</script>

<template>
  <div class="flex min-h-svh flex-col gap-2 bg-background p-2 text-foreground lg:h-svh">
    <header class="flex h-10 shrink-0 items-center justify-between gap-2 px-2">
      <div class="flex items-center gap-2 text-sm font-medium">
        keeper
        <Badge variant="secondary" shape="pill">main</Badge>
      </div>
      <Button size="sm" variant="outline">
        <PlayIcon class="size-3.5" />
        Run tests
      </Button>
    </header>

    <div class="grid min-h-0 flex-1 gap-2 lg:grid-cols-[220px_minmax(0,1fr)_380px]">
      <aside class="rounded-xl border border-border bg-card p-2">
        <FileTree v-model:expanded="expanded" :selected-path="selected" @select="selected = $event">
          <FileTreeFolder name="src" path="src">
            <FileTreeFolder name="lib" path="src/lib">
              <FileTreeFile name="keeper.ts" path="src/lib/keeper.ts" />
              <FileTreeFile name="drift.ts" path="src/lib/drift.ts" />
            </FileTreeFolder>
            <FileTreeFile name="app.tsx" path="src/app.tsx" />
          </FileTreeFolder>
          <FileTreeFolder name="tests" path="tests">
            <FileTreeFile name="keeper.test.ts" path="tests/keeper.test.ts" />
          </FileTreeFolder>
          <FileTreeFile name="package.json" path="package.json" />
        </FileTree>
      </aside>

      <section class="flex min-h-0 min-w-0 flex-col gap-2">
        <div class="min-h-0 flex-1 overflow-auto">
          <CodeBlock :code="file.code" :language="file.language" show-line-numbers>
            <CodeBlockHeader>
              <CodeBlockTitle>
                <FileCodeIcon class="size-3.5" />
                <CodeBlockFilename>{{ file.name }}</CodeBlockFilename>
              </CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton />
              </CodeBlockActions>
            </CodeBlockHeader>
          </CodeBlock>
        </div>
        <Terminal class="shrink-0" :output="output" @clear="output = ''">
          <TerminalHeader>
            <div class="flex items-center">
              <TerminalTitle />
              <TerminalStatus />
            </div>
            <TerminalActions>
              <TerminalCopyButton />
              <TerminalClearButton />
            </TerminalActions>
          </TerminalHeader>
          <TerminalContent class="max-h-40" />
        </Terminal>
      </section>

      <aside class="flex h-[34rem] min-h-0 flex-col gap-2 rounded-xl border border-border bg-card p-2 lg:h-auto">
        <Conversation class="min-h-0">
          <ConversationContent class="gap-5 p-2">
            <ConversationItem message-id="u1">
              <Message from="user">
                <MessageContent>{{ request }}</MessageContent>
              </Message>
            </ConversationItem>
            <ConversationItem message-id="a1">
              <Message from="assistant">
                <MessageContent class="gap-3">
                  <MessageResponse :content="reply" />
                  <Plan default-open class="w-full">
                    <PlanHeader>
                      <div>
                        <PlanTitle>{{ plan.title }}</PlanTitle>
                        <PlanDescription>{{ plan.description }}</PlanDescription>
                      </div>
                      <PlanAction>
                        <PlanTrigger />
                      </PlanAction>
                    </PlanHeader>
                    <PlanContent>
                      <p v-for="s in plan.steps" :key="s">{{ s }}</p>
                    </PlanContent>
                    <PlanFooter>
                      <Button size="sm">Start</Button>
                      <Button size="sm" variant="ghost">Edit plan</Button>
                    </PlanFooter>
                  </Plan>
                  <Queue class="w-full">
                    <QueueSection>
                      <QueueSectionTrigger>
                        <QueueSectionLabel label="Queued" :count="queue.queued.length" />
                      </QueueSectionTrigger>
                      <QueueSectionContent>
                        <QueueList>
                          <QueueItem v-for="t in queue.queued" :key="t.id">
                            <div class="flex items-start gap-2">
                              <QueueItemIndicator />
                              <QueueItemContent>{{ t.title }}</QueueItemContent>
                            </div>
                          </QueueItem>
                        </QueueList>
                      </QueueSectionContent>
                    </QueueSection>
                    <QueueSection :default-open="false">
                      <QueueSectionTrigger>
                        <QueueSectionLabel label="Completed" :count="queue.completed.length" />
                      </QueueSectionTrigger>
                      <QueueSectionContent>
                        <QueueList>
                          <QueueItem v-for="t in queue.completed" :key="t.id">
                            <div class="flex items-start gap-2">
                              <QueueItemIndicator completed />
                              <QueueItemContent completed>{{ t.title }}</QueueItemContent>
                            </div>
                          </QueueItem>
                        </QueueList>
                      </QueueSectionContent>
                    </QueueSection>
                  </Queue>
                </MessageContent>
              </Message>
            </ConversationItem>
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput>
          <PromptInputHeader>
            <PromptInputAgent :agent="agent" />
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea :placeholder="`Ask ${agent.name} to change the code…`" class="min-h-16" />
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
      </aside>
    </div>
  </div>
</template>
