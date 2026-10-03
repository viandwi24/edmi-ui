<script setup lang="ts">
import { CheckIcon, AlertCircle, FileTextIcon, XIcon } from "@lucide/vue";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@edmi-vue/ui/attachment";
import { Spinner } from "@edmi-vue/ui/spinner";
</script>

<template>
  <div class="flex flex-wrap items-start gap-3">
    <Attachment>
      <AttachmentMedia><FileTextIcon /></AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>thesis.pdf</AttachmentTitle>
        <AttachmentDescription>PDF, 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove"><XIcon /></AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="uploading">
      <AttachmentMedia><Spinner /></AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>weights.csv</AttachmentTitle>
        <AttachmentDescription>Uploading 64%</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
    <Attachment state="processing">
      <AttachmentMedia><Spinner /></AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>report.pdf</AttachmentTitle>
        <AttachmentDescription>Processing</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
    <Attachment state="error">
      <AttachmentMedia><AlertCircle /></AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>backtest.xlsx</AttachmentTitle>
        <AttachmentDescription>Upload failed</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction variant="outline" size="xs">Retry</AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment size="sm">
      <AttachmentMedia><FileTextIcon /></AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>mandate.pdf</AttachmentTitle>
        <AttachmentDescription>PDF, 540 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <CheckIcon class="size-4 text-brand-text" />
      </AttachmentActions>
    </Attachment>
  </div>
</template>
