<script setup lang="ts">
import { ElevationProvider } from "@edmi-vue/ui/elevation"
import {
  CreditCardIcon,
  GlobeIcon,
  MailIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ServerIcon,
  ChevronRightIcon,
} from "@lucide/vue";
import { AgentAvatar } from "@edmi-vue/components/ai/agent-avatar";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@edmi-vue/components/ai/message";
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
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@edmi-vue/components/ai/reasoning";
import { Suggestion } from "@edmi-vue/components/ai/suggestion";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { InsetPanel, InsetPanelBody, InsetPanelHeader } from "@edmi-vue/ui/inset-panel";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@edmi-vue/ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import {
  agent,
  agentReply,
  composerPlaceholder,
  index,
  reasoning,
  reply,
  suggestions,
  tabs,
  userMessage,
} from "./data";

const setupIcon = { domain: GlobeIcon, email: MailIcon, fees: CreditCardIcon, rpc: ServerIcon };
const sectionLabel = "mt-[22px] mb-2.5 text-[15px] text-foreground-2";
const panels = ["agent", "index"];
</script>

<template>
  <ElevationProvider mode="layered">
  <div class="flex min-h-svh items-start justify-center gap-6 bg-background p-6 text-foreground">
    <div
      v-for="(value, n) in panels"
      :key="value"
      :class="
        n === 0
          ? 'w-full max-w-[440px]'
          : 'hidden w-full max-w-[440px] min-[960px]:block'
      "
    >
      <Tabs
        :default-value="value"
        class="h-[calc(100svh-3rem)] max-h-[900px] w-full max-w-[440px] gap-0"
      >
        <InsetPanel class="h-full">
          <InsetPanelHeader class="px-3.5">
            <TabsList variant="pills">
              <TabsTrigger v-for="t in tabs" :key="t" :value="t.toLowerCase()">{{ t }}</TabsTrigger>
            </TabsList>
          </InsetPanelHeader>
          <InsetPanelBody class="flex flex-col">
            <TabsContent value="agent" class="flex min-h-0 flex-1 flex-col">
              <div class="min-h-0 flex-1 overflow-y-auto px-5 py-4">
                <div class="flex items-center justify-between gap-2">
                  <Reasoning :default-open="false" :duration="4" class="min-w-0 flex-1">
                    <ReasoningTrigger :get-thinking-message="() => reasoning.label" />
                    <ReasoningContent :content="reasoning.text" />
                  </Reasoning>
                  <Button aria-label="More" size="icon-xs" type="button" variant="ghost">
                    <MoreHorizontalIcon class="size-4" />
                  </Button>
                </div>
                <div class="mt-3 flex flex-col gap-[18px]">
                  <Message from="assistant">
                    <MessageContent>
                      <MessageResponse :content="reply" />
                    </MessageContent>
                  </Message>
                  <Message from="user">
                    <MessageContent>{{ userMessage }}</MessageContent>
                  </Message>
                  <Message from="assistant">
                    <div class="flex items-center gap-2 text-sm text-muted-foreground">
                      <AgentAvatar :seed="agent.id" :color="agent.color" :size="19" :tile="false" />
                      {{ agent.name }}
                    </div>
                    <MessageContent>{{ agentReply }}</MessageContent>
                  </Message>
                  <div class="flex flex-col gap-2">
                    <Suggestion
                      v-for="s in suggestions"
                      :key="s.title"
                      :suggestion="s.title"
                      variant="card"
                      class="w-full bg-card"
                    >
                      {{ s.note }}
                    </Suggestion>
                  </div>
                </div>
              </div>
              <div class="px-2.5 pb-2.5">
                <PromptInput class="[&_[data-slot=input-group]]:bg-muted">
                  <PromptInputHeader>
                    <PromptInputAgent :agent="agent" />
                  </PromptInputHeader>
                  <PromptInputBody>
                    <PromptInputTextarea :placeholder="composerPlaceholder" />
                  </PromptInputBody>
                  <PromptInputFooter>
                    <PromptInputTools />
                    <PromptInputSubmit class="size-10" size="icon-sm" variant="secondary" />
                  </PromptInputFooter>
                </PromptInput>
              </div>
            </TabsContent>

            <TabsContent value="index" class="flex min-h-0 flex-1 flex-col">
              <div class="min-h-0 flex-1 overflow-y-auto px-[18px] pt-[18px] pb-6">
                <div class="flex items-center justify-between">
                  <span class="text-xl font-medium">{{ index.name }}</span>
                  <Button
                    aria-label="Edit"
                    size="icon-sm"
                    type="button"
                    variant="outline"
                    class="rounded-full"
                  >
                    <PencilIcon class="size-4" />
                  </Button>
                </div>

                <div :class="sectionLabel">Stack</div>
                <Card class="gap-0 py-0">
                  <ItemGroup>
                    <div v-for="(row, i) in index.stack" :key="row.title">
                      <ItemSeparator v-if="i > 0" class="my-0" />
                      <Item>
                        <ItemMedia variant="icon"><component :is="setupIcon[row.icon]" /></ItemMedia>
                        <ItemContent>
                          <ItemTitle>{{ row.title }}</ItemTitle>
                          <ItemDescription>{{ row.note }}</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <Button elevation="raised" size="sm" type="button" variant="outline">
                            {{ row.action }}
                          </Button>
                        </ItemActions>
                      </Item>
                    </div>
                  </ItemGroup>
                </Card>

                <div :class="sectionLabel">Important links</div>
                <Card class="gap-0 py-0">
                  <ItemGroup>
                    <div v-for="(row, i) in index.links" :key="row.title">
                      <ItemSeparator v-if="i > 0" class="my-0" />
                      <Item size="sm">
                        <ItemContent>
                          <ItemTitle>{{ row.title }}</ItemTitle>
                          <ItemDescription>{{ row.note }}</ItemDescription>
                        </ItemContent>
                        <ChevronRightIcon class="size-4 text-muted-foreground" />
                      </Item>
                    </div>
                  </ItemGroup>
                </Card>

                <div :class="sectionLabel">Agents</div>
                <Card class="gap-0 py-0">
                  <ItemGroup>
                    <div v-for="(row, i) in index.agents" :key="row.id">
                      <ItemSeparator v-if="i > 0" class="my-0" />
                      <Item>
                        <ItemMedia>
                          <AgentAvatar :seed="row.id" :color="row.color" :size="40" />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{{ row.name }}</ItemTitle>
                          <ItemDescription>{{ row.note }}</ItemDescription>
                        </ItemContent>
                      </Item>
                    </div>
                  </ItemGroup>
                </Card>
              </div>
            </TabsContent>

            <TabsContent
              v-for="v in ['tasks', 'library']"
              :key="v"
              :value="v"
              class="p-5 text-sm text-muted-foreground"
            >
              Nothing here yet.
            </TabsContent>
          </InsetPanelBody>
        </InsetPanel>
      </Tabs>
    </div>
  </div>
  </ElevationProvider>
</template>
