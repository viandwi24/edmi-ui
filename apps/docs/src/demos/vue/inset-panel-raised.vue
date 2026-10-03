<script setup lang="ts">
import { InsetPanel, InsetPanelBody, InsetPanelFooter, InsetPanelHeader } from "@edmi-vue/ui/inset-panel";
</script>

<template>
  <div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
    <InsetPanel>
      <InsetPanelHeader>Flat</InsetPanelHeader>
      <InsetPanelBody class="h-32 p-4 text-sm">Default panel.</InsetPanelBody>
      <InsetPanelFooter>2,846 joined this week</InsetPanelFooter>
    </InsetPanel>
    <InsetPanel raised>
      <InsetPanelHeader>Raised</InsetPanelHeader>
      <InsetPanelBody class="h-32 p-4 text-sm">Strong lip, highlighted body.</InsetPanelBody>
      <InsetPanelFooter>2,846 joined this week</InsetPanelFooter>
    </InsetPanel>
  </div>
</template>
