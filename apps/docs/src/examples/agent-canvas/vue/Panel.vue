<script setup lang="ts">
import { ref } from "vue";
import { InsetPanel, InsetPanelBody, InsetPanelHeader } from "@edmi-vue/ui/inset-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import { type ChatMessage, reply, type TabId, type TaskRow, tabs } from "../data";
import HomeTab from "./HomeTab.vue";
import CompanyTab from "./CompanyTab.vue";
import Composer from "./Composer.vue";
import LibraryTab from "./LibraryTab.vue";
import TasksTab from "./TasksTab.vue";

const tab = defineModel<TabId>("tab", { required: true });
const messages = defineModel<ChatMessage[]>("messages", { required: true });
defineProps<{ tasks: TaskRow[] }>();

const view = ref<"chat" | "home" | "thread">("chat");
function send(text: string) {
  const id = messages.value.length + 1;
  messages.value = [...messages.value, { id, from: "user", text }, { id: id + 1, from: "assistant", text: reply }];
  view.value = "chat";
  tab.value = "atlas";
}
function reset() {
  messages.value = [];
  view.value = "home";
}
</script>

<template>
  <Tabs v-model="tab" class="size-full gap-0">
    <InsetPanel elevation="floating" class="h-full">
      <InsetPanelHeader class="px-5 py-3">
        <TabsList variant="pills">
          <TabsTrigger v-for="t in tabs" :key="t.id" :value="t.id">{{ t.label }}</TabsTrigger>
        </TabsList>
      </InsetPanelHeader>
      <InsetPanelBody class="flex flex-col">
        <TabsContent value="atlas" class="flex min-h-0 flex-1 flex-col">
          <HomeTab :view="view" :messages="messages" :tasks="tasks" @view="view = $event" @send="send" @reset="reset" />
        </TabsContent>
        <TabsContent value="tasks" class="flex min-h-0 flex-1 flex-col"><TasksTab :tasks="tasks" /></TabsContent>
        <TabsContent value="company" class="flex min-h-0 flex-1 flex-col"><CompanyTab /></TabsContent>
        <TabsContent value="library" class="flex min-h-0 flex-1 flex-col"><LibraryTab /></TabsContent>
        <Composer v-if="tab !== 'library'" @send="send" @clear="reset" />
      </InsetPanelBody>
    </InsetPanel>
  </Tabs>
</template>
