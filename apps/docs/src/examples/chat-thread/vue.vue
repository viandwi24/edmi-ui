<script setup lang="ts">
import { FileTextIcon, GlobeIcon } from "@lucide/vue";
import {
  ArtifactCard,
  ArtifactCardActions,
  ArtifactCardBody,
  ArtifactCardIcon,
  ArtifactCardMeta,
  ArtifactCardTitle,
} from "@edmi-vue/components/ai/artifact-card";
import { ChatComposer } from "@edmi-vue/components/ai/chat-composer";
import {
  ChatHeader,
  ChatHeaderActions,
  ChatHeaderMenu,
  ChatHeaderProject,
  ChatHeaderShare,
  ChatHeaderTitle,
} from "@edmi-vue/components/ai/chat-header";
import { CodeBlock } from "@edmi-vue/components/ai/code-block";
import {
  Conversation,
  ConversationContent,
  ConversationItem,
  ConversationScrollButton,
} from "@edmi-vue/components/ai/conversation";
import { Message, MessageContent, MessageResponse } from "@edmi-vue/components/ai/message";
import { Button } from "@edmi-vue/ui/button";
import { DropdownMenuItem } from "@edmi-vue/ui/dropdown-menu";
import { composer, thread, title } from "./data";
</script>

<template>
  <div class="flex h-svh flex-col gap-2 bg-background p-3 text-foreground">
    <ChatHeader>
      <ChatHeaderTitle>
        <span class="truncate">{{ title }}</span>
        <ChatHeaderProject status="connected" />
        <ChatHeaderMenu>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem>Move to project</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </ChatHeaderMenu>
      </ChatHeaderTitle>
      <ChatHeaderActions>
        <Button aria-label="Web access" size="icon-sm" type="button" variant="ghost">
          <GlobeIcon class="size-4" />
        </Button>
        <Button size="sm" type="button" variant="ghost">
          <FileTextIcon class="size-3.5" />
          1
        </Button>
        <ChatHeaderShare />
      </ChatHeaderActions>
    </ChatHeader>

    <Conversation class="min-h-0">
      <ConversationContent class="mx-auto w-full max-w-3xl gap-6 px-4 py-6">
        <ConversationItem v-for="turn in thread" :key="turn.id" :message-id="turn.id">
          <Message :from="turn.role">
            <MessageContent class="gap-4">
              <template v-for="block in turn.blocks" :key="block.type === 'artifact' ? block.title : block.type === 'code' ? block.code : block.text">
                <template v-if="block.type === 'markdown'">
                  <template v-if="turn.role === 'user'">{{ block.text }}</template>
                  <MessageResponse v-else :content="block.text" />
                </template>
                <CodeBlock v-else-if="block.type === 'code'" :code="block.code" :language="block.language" />
                <ArtifactCard v-else>
                  <ArtifactCardIcon :kind="block.kind" />
                  <ArtifactCardBody>
                    <ArtifactCardTitle>{{ block.title }}</ArtifactCardTitle>
                    <ArtifactCardMeta>{{ block.meta }}</ArtifactCardMeta>
                  </ArtifactCardBody>
                  <ArtifactCardActions>
                    <DropdownMenuItem>Copy link</DropdownMenuItem>
                    <DropdownMenuItem>Open</DropdownMenuItem>
                  </ArtifactCardActions>
                </ArtifactCard>
              </template>
            </MessageContent>
          </Message>
        </ConversationItem>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>

    <ChatComposer
      class="mx-auto max-w-3xl"
      :disclaimer="composer.disclaimer"
      :models="composer.models"
      :efforts="composer.efforts"
      default-effort="medium"
      :modes="composer.modes"
      @attach="() => {}"
      @speech="() => {}"
    />
  </div>
</template>
