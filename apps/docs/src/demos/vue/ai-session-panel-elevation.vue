<script setup lang="ts">
import {
  SessionFile,
  SessionOutputTitle,
  SessionPanel,
  SessionPanelDivider,
  SessionProgress,
  SessionSection,
} from "@edmi-vue/components/ai/session-panel";

const levels = [
  { value: "sunken", label: "Sunken (-1)" },
  { value: "flat", label: "Flat (0)" },
  { value: "raised", label: "Raised (+1)" },
  { value: "floating", label: "Floating (+2)" },
];
</script>

<template>
  <div class="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <SessionPanel :elevation="level.value">
        <SessionProgress :value="60">Drafting the report.</SessionProgress>
        <SessionPanelDivider />
        <SessionSection title="Outputs">
          <SessionOutputTitle meta="Artifact">Rebalance report</SessionOutputTitle>
          <SessionFile name="Rebalance report" format="PDF" />
        </SessionSection>
      </SessionPanel>
    </div>
  </div>
</template>
