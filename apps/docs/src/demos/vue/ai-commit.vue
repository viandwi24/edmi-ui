<script setup lang="ts">
import {
  Commit,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitContent,
  CommitCopyButton,
  CommitFile,
  CommitFileAdditions,
  CommitFileChanges,
  CommitFileDeletions,
  CommitFileInfo,
  CommitFilePath,
  CommitFiles,
  CommitFilesToggle,
  CommitFileStatus,
  CommitHash,
  CommitHeader,
  CommitInfo,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitTimestamp,
} from "@edmi-vue/components/ai/commit";

const files = [
  { path: "lib/keeper.ts", status: "modified", add: 12, del: 3 },
  { path: "lib/drift.ts", status: "added", add: 28, del: 0 },
  { path: "tests/keeper.test.ts", status: "renamed", add: 4, del: 4 },
  { path: "lib/old-keeper.ts", status: "deleted", add: 0, del: 41 },
] as const;

const date = new Date(Date.now() - 12 * 60 * 1000);
</script>

<template>
  <Commit class="max-w-lg" default-open>
    <CommitHeader>
      <CommitAuthor>
        <CommitAuthorAvatar initials="DL" />
      </CommitAuthor>
      <CommitInfo>
        <CommitMessage>feat(keeper): skip rebalance under 2% drift</CommitMessage>
        <CommitMetadata>
          <span>Dewi Lestari</span>
          <CommitSeparator />
          <CommitTimestamp :date="date" />
        </CommitMetadata>
      </CommitInfo>
      <CommitHash>
        a3f9c21
        <CommitCopyButton hash="a3f9c21" />
      </CommitHash>
    </CommitHeader>
    <CommitFilesToggle :count="files.length" />
    <CommitContent>
      <CommitFiles>
        <CommitFile v-for="f in files" :key="f.path">
          <CommitFileInfo>
            <CommitFileStatus :status="f.status" />
            <CommitFilePath>{{ f.path }}</CommitFilePath>
          </CommitFileInfo>
          <CommitFileChanges>
            <CommitFileAdditions :count="f.add" />
            <CommitFileDeletions :count="f.del" />
          </CommitFileChanges>
        </CommitFile>
      </CommitFiles>
    </CommitContent>
  </Commit>
</template>
