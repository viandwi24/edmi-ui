<script setup lang="ts">
import {
  Attachment,
  AttachmentHoverCard,
  AttachmentHoverCardContent,
  AttachmentHoverCardTrigger,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@edmi-vue/components/ai/attachments";

const chart =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='120'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%2362b36f'/><stop offset='1' stop-color='%23386fd6'/></linearGradient></defs><rect width='220' height='120' fill='url(%23g)'/></svg>";

const files = [
  { id: "1", type: "file" as const, filename: "weights.csv", mediaType: "text/csv", url: "", size: 2048 },
  { id: "2", type: "file" as const, filename: "chart.png", mediaType: "image/png", url: chart, size: 188416 },
];
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <Attachments variant="grid">
      <Attachment v-for="f in files" :key="f.id" :data="f" @remove="() => {}">
        <AttachmentPreview />
        <AttachmentInfo />
        <AttachmentRemove />
      </Attachment>
    </Attachments>
    <Attachments variant="list">
      <Attachment v-for="f in files" :key="f.id" :data="f" @remove="() => {}">
        <AttachmentPreview />
        <AttachmentInfo show-media-type />
        <AttachmentRemove />
      </Attachment>
    </Attachments>
    <Attachments variant="inline">
      <AttachmentHoverCard v-for="f in files" :key="f.id">
        <AttachmentHoverCardTrigger as-child>
          <Attachment :data="f" @remove="() => {}">
            <AttachmentPreview />
            <AttachmentInfo />
            <AttachmentRemove />
          </Attachment>
        </AttachmentHoverCardTrigger>
        <AttachmentHoverCardContent>
          <img v-if="f.mediaType.startsWith('image/')" :alt="f.filename" :src="f.url" class="h-24 rounded-lg object-cover">
          <span v-else class="px-1 text-xs">{{ f.filename }}</span>
        </AttachmentHoverCardContent>
      </AttachmentHoverCard>
    </Attachments>
  </div>
</template>
