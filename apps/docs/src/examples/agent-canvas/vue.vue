<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@edmi-vue/ui/button";
import { ElevationProvider } from "@edmi-vue/ui/elevation";
import { type ChatMessage, type TabId, type TaskRow, tasks as seed } from "./data";
import Canvas from "./vue/Canvas.vue";
import Icon from "./vue/Icon.vue";
import Panel from "./vue/Panel.vue";

const tab = ref<TabId>("atlas");
const messages = ref<ChatMessage[]>([]);
const tasks = ref<TaskRow[]>(seed);
const open = ref(false);

function newTask(name: string) {
  tasks.value = [
    { id: `t${tasks.value.length + 1}-${name}`, name, agent: "atlas", color: "var(--warning)", age: "now", status: "running" },
    ...tasks.value,
  ];
  tab.value = "tasks";
  open.value = true;
}
</script>

<template>
  <ElevationProvider mode="layered">
    <div class="relative h-svh min-h-[560px] overflow-hidden bg-background text-foreground">
      <Canvas @new-task="newTask" @open-panel="open = true" />
      <aside
        :class="`absolute top-2 right-2 bottom-2 z-20 w-[460px] max-w-[calc(100%-1rem)] lg:block ${open ? 'block' : 'hidden'}`"
      >
        <Panel v-model:tab="tab" v-model:messages="messages" :tasks="tasks" />
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Close panel"
          class="absolute top-3 right-3 z-30 lg:hidden"
          @click="open = false"
        >
          <Icon name="close" />
        </Button>
      </aside>
    </div>
  </ElevationProvider>
</template>
