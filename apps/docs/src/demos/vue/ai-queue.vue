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

const queued = [
  { id: "1", title: "Summarize Q3 filings", description: "For NVDAx, MSFTx" },
  { id: "2", title: "Draft a feed post about MAG4" },
  { id: "3", title: "Compare fees with SPYx" },
];
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
              <QueueItemIndicator />
              <QueueItemContent>{{ todo.title }}</QueueItemContent>
              <QueueItemActions>
                <QueueItemAction aria-label="Edit"><PencilIcon /></QueueItemAction>
                <QueueItemAction aria-label="Remove"><Trash2Icon /></QueueItemAction>
              </QueueItemActions>
            </div>
            <QueueItemDescription v-if="todo.description">{{ todo.description }}</QueueItemDescription>
          </QueueItem>
        </QueueList>
      </QueueSectionContent>
    </QueueSection>
    <QueueSection :default-open="false">
      <QueueSectionTrigger>
        <QueueSectionLabel label="Completed" :count="2" />
      </QueueSectionTrigger>
      <QueueSectionContent>
        <QueueList>
          <QueueItem>
            <div class="flex items-start gap-2">
              <QueueItemIndicator completed />
              <QueueItemContent completed>Quote MAG4 legs</QueueItemContent>
            </div>
            <QueueItemAttachment>
              <QueueItemFile>quotes.csv</QueueItemFile>
            </QueueItemAttachment>
          </QueueItem>
          <QueueItem>
            <div class="flex items-start gap-2">
              <QueueItemIndicator completed />
              <QueueItemContent completed>Check keeper limits</QueueItemContent>
            </div>
          </QueueItem>
        </QueueList>
      </QueueSectionContent>
    </QueueSection>
  </Queue>
</template>
