<script setup lang="ts">
import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInCursor,
  OpenInLabel,
  OpenInSeparator,
  OpenInTrigger,
  OpenInv0,
} from "@edmi-vue/components/ai/open-in-chat";
</script>

<template>
  <OpenIn query="Rebalance MAG4 so NVDAx is back at its 32% target">
    <OpenInTrigger />
    <OpenInContent>
      <OpenInLabel>Open in chat</OpenInLabel>
      <OpenInSeparator />
      <OpenInClaude />
      <OpenInChatGPT />
      <OpenInv0 />
      <OpenInCursor />
    </OpenInContent>
  </OpenIn>
</template>
