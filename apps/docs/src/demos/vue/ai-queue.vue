<script setup lang="ts">
import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemAttachment,
  QueueItemContent,
  QueueItemDescription,
  QueueItemFile,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from "@edmi-vue/components/ai/queue";
import { PencilIcon, Trash2Icon } from "@lucide/vue";
import { ref } from "vue";

type Todo = { id: string; title: string; description?: string };

const queued = ref<Todo[]>([
  { id: "1", title: "Summarize Q3 filings", description: "For NVDAx, MSFTx" },
  { id: "2", title: "Draft a feed post about MAG4" },
  { id: "3", title: "Compare fees with SPYx" },
]);
const done = ref<Todo[]>([
  { id: "d1", title: "Quote MAG4 legs" },
  { id: "d2", title: "Check keeper limits" },
]);

function complete(todo: Todo) {
  queued.value = queued.value.filter((t) => t.id !== todo.id);
  done.value = [todo, ...done.value];
}
function uncomplete(todo: Todo) {
  done.value = done.value.filter((t) => t.id !== todo.id);
  queued.value = [...queued.value, todo];
}
function remove(todo: Todo) {
  queued.value = queued.value.filter((t) => t.id !== todo.id);
}
function edit(todo: Todo) {
  const title = window.prompt("Edit task", todo.title)?.trim();
  if (title) queued.value = queued.value.map((t) => (t.id === todo.id ? { ...t, title } : t));
}
</script>

<template>
  <Queue class="w-full max-w-md">
    <QueueSection>
      <QueueSectionTrigger>
        <QueueSectionLabel label="Queued" :count="queued.length" />
      </QueueSectionTrigger>
      <QueueSectionContent>
        <QueueList>
          <QueueItem v-for="todo in queued" :key="todo.id">
            <div class="flex items-start gap-2">
              <QueueItemIndicator
                role="button"
                tabindex="0"
                aria-label="Mark completed"
                class="cursor-pointer"
                @click="complete(todo)"
                @keydown.enter="complete(todo)"
              />
              <QueueItemContent>{{ todo.title }}</QueueItemContent>
              <QueueItemActions>
                <QueueItemAction aria-label="Edit" @click="edit(todo)"><PencilIcon /></QueueItemAction>
                <QueueItemAction aria-label="Remove" @click="remove(todo)"><Trash2Icon /></QueueItemAction>
              </QueueItemActions>
            </div>
            <QueueItemDescription v-if="todo.description">{{ todo.description }}</QueueItemDescription>
          </QueueItem>
        </QueueList>
      </QueueSectionContent>
    </QueueSection>
    <QueueSection :default-open="false">
      <QueueSectionTrigger>
        <QueueSectionLabel label="Completed" :count="done.length" />
      </QueueSectionTrigger>
      <QueueSectionContent>
        <QueueList>
          <QueueItem v-for="todo in done" :key="todo.id">
            <div class="flex items-start gap-2">
              <QueueItemIndicator
                completed
                role="button"
                tabindex="0"
                aria-label="Mark not completed"
                class="cursor-pointer"
                @click="uncomplete(todo)"
                @keydown.enter="uncomplete(todo)"
              />
              <QueueItemContent completed>{{ todo.title }}</QueueItemContent>
            </div>
            <QueueItemAttachment v-if="todo.id === 'd1'">
              <QueueItemFile>quotes.csv</QueueItemFile>
            </QueueItemAttachment>
          </QueueItem>
        </QueueList>
      </QueueSectionContent>
    </QueueSection>
  </Queue>
</template>
