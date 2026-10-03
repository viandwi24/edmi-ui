<script setup lang="ts">
import { Kbd, KbdGroup } from "@edmi-vue/ui/kbd";
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Kbd>K</Kbd>
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
    <Kbd>Enter</Kbd>
    <span class="text-sm">
      Press
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>J</Kbd>
      </KbdGroup>
      to ask the agent
    </span>
  </div>
</template>
