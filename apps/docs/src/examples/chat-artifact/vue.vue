<script setup lang="ts">
import { ElevationProvider } from "@edmi-vue/ui/elevation"
import {
  ArtifactCard,
  ArtifactCardActions,
  ArtifactCardBody,
  ArtifactCardIcon,
  ArtifactCardMeta,
  ArtifactCardThumbnail,
  ArtifactCardTitle,
} from "@edmi-vue/components/ai/artifact-card";
import { ArtifactStack, ArtifactStackDownloadAll } from "@edmi-vue/components/ai/artifact-stack";
import {
  ArtifactViewer,
  ArtifactViewerClose,
  ArtifactViewerContent,
  ArtifactViewerDownload,
  ArtifactViewerExpand,
  ArtifactViewerHeader,
  ArtifactViewerOpenIn,
  ArtifactViewerPaper,
  ArtifactViewerTitle,
} from "@edmi-vue/components/ai/artifact-viewer";
import { ChatComposer } from "@edmi-vue/components/ai/chat-composer";
import {
  Conversation,
  ConversationContent,
  ConversationItem,
} from "@edmi-vue/components/ai/conversation";
import { Message, MessageContent, MessageResponse } from "@edmi-vue/components/ai/message";
import { DropdownMenuItem } from "@edmi-vue/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@edmi-vue/ui/resizable";
import { computed, onMounted, ref } from "vue";
import { composer, docs, notes, processNote, question } from "./data";

const openId = ref<string | null>(docs[0]?.id ?? null);
const expanded = ref(false);
const doc = computed(() => docs.find((d) => d.id === openId.value));

// Narrow screens start with the viewer closed; a card click opens it.
onMounted(() => {
  if (window.matchMedia("(max-width: 767px)").matches) openId.value = null;
});

function close() {
  expanded.value = false;
  openId.value = null;
}
</script>

<template>
  <ElevationProvider mode="layered">
  <ResizablePanelGroup
    id="example-chat-artifact"
    direction="horizontal"
    class="h-svh bg-background text-foreground"
  >
    <ResizablePanel id="chat" :order="1" :default-size="doc ? 42 : 100" :min-size="30">
      <div class="flex h-full min-w-0 flex-col">
        <Conversation class="min-h-0">
          <ConversationContent class="mx-auto w-full max-w-3xl gap-4 px-[18px] py-[14px]">
            <ConversationItem message-id="a1">
              <Message from="assistant">
                <MessageContent class="gap-4">
                  <MessageResponse :content="notes" />
                  <ArtifactStack>
                    <ArtifactCard
                      v-for="d in docs"
                      :key="d.id"
                      class="cursor-pointer"
                      @click="openId = d.id"
                    >
                      <ArtifactCardThumbnail v-if="d.thumbnail" />
                      <ArtifactCardIcon v-else :kind="d.kind" />
                      <ArtifactCardBody>
                        <ArtifactCardTitle>{{ d.title }}</ArtifactCardTitle>
                        <ArtifactCardMeta>{{ d.meta }}</ArtifactCardMeta>
                      </ArtifactCardBody>
                      <ArtifactCardActions>
                        <DropdownMenuItem>Copy link</DropdownMenuItem>
                        <DropdownMenuItem>Open</DropdownMenuItem>
                      </ArtifactCardActions>
                    </ArtifactCard>
                    <ArtifactStackDownloadAll />
                  </ArtifactStack>
                </MessageContent>
              </Message>
            </ConversationItem>
            <ConversationItem message-id="u1">
              <Message from="user">
                <MessageContent>{{ question }}</MessageContent>
              </Message>
            </ConversationItem>
            <ConversationItem message-id="a2">
              <Message from="assistant">
                <MessageContent class="text-[13.5px] text-muted-foreground">
                  {{ processNote }}
                </MessageContent>
              </Message>
            </ConversationItem>
          </ConversationContent>
        </Conversation>
        <div class="px-3.5 pt-2 pb-3">
          <ChatComposer
            :disclaimer="composer.disclaimer"
            :models="composer.models"
            :efforts="composer.efforts"
            default-effort="medium"
            :modes="composer.modes"
            @attach="() => {}"
            @speech="() => {}"
          />
        </div>
      </div>
    </ResizablePanel>
    <template v-if="doc">
      <ResizableHandle with-handle />
      <ResizablePanel id="viewer" :order="2" :default-size="58" :min-size="30">
        <ArtifactViewer
          :class="
            expanded
              ? 'fixed inset-0 z-50 h-svh rounded-none border-0'
              : 'h-full rounded-none border-0'
          "
        >
          <ArtifactViewerHeader>
            <ArtifactViewerTitle :format="doc.format">{{ doc.title }}</ArtifactViewerTitle>
            <ArtifactViewerOpenIn />
            <ArtifactViewerDownload />
            <ArtifactViewerExpand @click="expanded = !expanded" />
            <ArtifactViewerClose @click="close" />
          </ArtifactViewerHeader>
          <ArtifactViewerContent>
            <ArtifactViewerPaper class="px-8 py-[30px]">
              <div class="font-mono text-[10.5px] tracking-[2px] text-[#7a7974]">
                {{ doc.paper.kicker }}
              </div>
              <div class="mt-2.5 font-serif text-2xl leading-[1.15] font-bold">
                {{ doc.paper.headline }}
              </div>
              <p class="mt-3 text-[12.5px] leading-[1.7] text-[#3d3c38]">
                <template v-for="s in doc.paper.lead" :key="s.t">
                  <b v-if="s.b">{{ s.t }}</b>
                  <span v-else-if="s.link" class="text-[#3b6fd6]">{{ s.t }}</span>
                  <template v-else>{{ s.t }}</template>
                </template>
              </p>
              <div class="mt-4 mb-2.5 h-0.5 bg-[#22406b]" />
              <div class="font-serif text-base font-bold text-[#22406b]">
                {{ doc.paper.heading }}
              </div>
              <p class="mt-3 text-[12.5px] leading-[1.7] text-[#3d3c38]">
                <template v-for="s in doc.paper.body" :key="s.t">
                  <b v-if="s.b">{{ s.t }}</b>
                  <template v-else>{{ s.t }}</template>
                </template>
              </p>
            </ArtifactViewerPaper>
          </ArtifactViewerContent>
        </ArtifactViewer>
      </ResizablePanel>
    </template>
  </ResizablePanelGroup>
  </ElevationProvider>
</template>
