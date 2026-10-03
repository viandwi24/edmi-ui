<script setup lang="ts">
import type { ChatStatus } from "ai";
import { GlobeIcon } from "@lucide/vue";
import { ref } from "vue";
import {
  Attachment,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@edmi-vue/components/ai/attachments";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@edmi-vue/components/ai/prompt-input";

const status = ref<ChatStatus>("ready");

function submit() {
  status.value = "submitted";
  setTimeout(() => {
    status.value = "streaming";
  }, 600);
  setTimeout(() => {
    status.value = "ready";
  }, 2400);
}
</script>

<template>
  <PromptInput v-slot="{ files, remove }" class="max-w-xl" multiple @submit="submit">
    <PromptInputHeader>
      <Attachments variant="inline">
        <Attachment v-for="f in files" :key="f.id" :data="f" @remove="remove(f.id)">
          <AttachmentPreview />
          <AttachmentInfo />
          <AttachmentRemove />
        </Attachment>
      </Attachments>
    </PromptInputHeader>
    <PromptInputBody>
      <PromptInputTextarea placeholder="Ask anything..." />
    </PromptInputBody>
    <PromptInputFooter>
      <PromptInputTools>
        <PromptInputActionMenu>
          <PromptInputActionMenuTrigger />
          <PromptInputActionMenuContent>
            <PromptInputActionAddAttachments />
            <PromptInputActionAddScreenshot />
          </PromptInputActionMenuContent>
        </PromptInputActionMenu>
        <PromptInputButton>
          <GlobeIcon />
          <span>Search</span>
        </PromptInputButton>
      </PromptInputTools>
      <PromptInputSubmit :status="status" @stop="status = 'ready'" />
    </PromptInputFooter>
  </PromptInput>
</template>
