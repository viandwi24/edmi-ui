<script setup lang="ts">
import {
  ArtifactCard,
  ArtifactCardActions,
  ArtifactCardBody,
  ArtifactCardIcon,
  ArtifactCardMeta,
  ArtifactCardTitle,
} from "@edmi-vue/components/ai/artifact-card";
import { DropdownMenuItem } from "@edmi-vue/ui/dropdown-menu";
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-3">
    <ArtifactCard raised>
      <ArtifactCardIcon kind="archive" />
      <ArtifactCardBody>
        <ArtifactCardTitle>Keeper starter</ArtifactCardTitle>
        <ArtifactCardMeta>ZIP</ArtifactCardMeta>
      </ArtifactCardBody>
      <ArtifactCardActions>
        <DropdownMenuItem>Copy link</DropdownMenuItem>
        <DropdownMenuItem>Open</DropdownMenuItem>
      </ArtifactCardActions>
    </ArtifactCard>
  </div>
</template>
