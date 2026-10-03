<script setup lang="ts">
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
import { DropdownMenuItem } from "@edmi-vue/ui/dropdown-menu";
</script>

<template>
  <ArtifactStack class="max-w-lg">
    <ArtifactCard>
      <ArtifactCardThumbnail />
      <ArtifactCardBody>
        <ArtifactCardTitle>Rebalance report</ArtifactCardTitle>
        <ArtifactCardMeta>Document · PDF</ArtifactCardMeta>
      </ArtifactCardBody>
      <ArtifactCardActions>
        <DropdownMenuItem>Copy link</DropdownMenuItem>
      </ArtifactCardActions>
    </ArtifactCard>
    <ArtifactCard>
      <ArtifactCardIcon kind="document" />
      <ArtifactCardBody>
        <ArtifactCardTitle>Rebalance report</ArtifactCardTitle>
        <ArtifactCardMeta>Document · MD</ArtifactCardMeta>
      </ArtifactCardBody>
      <ArtifactCardActions>
        <DropdownMenuItem>Copy link</DropdownMenuItem>
      </ArtifactCardActions>
    </ArtifactCard>
    <ArtifactStackDownloadAll />
  </ArtifactStack>
</template>
