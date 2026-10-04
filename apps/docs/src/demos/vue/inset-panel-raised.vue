<script setup lang="ts">
import { InsetPanel, InsetPanelBody, InsetPanelFooter, InsetPanelHeader } from "@edmi-vue/ui/inset-panel";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<template>
  <div class="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <InsetPanel :elevation="level.value">
        <InsetPanelHeader>Live joiners</InsetPanelHeader>
        <InsetPanelBody fade class="h-32 p-4 text-sm">The body plate is inset 2px from the shell.</InsetPanelBody>
        <InsetPanelFooter>2,846 people joined this week</InsetPanelFooter>
      </InsetPanel>
    </div>
  </div>
</template>
