<script setup lang="ts">
import { Kbd, KbdGroup } from "@edmi-vue/ui/kbd";

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex flex-wrap items-center gap-6">
        <Kbd :elevation="level.value">K</Kbd>
        <KbdGroup>
          <Kbd :elevation="level.value">⌘</Kbd>
          <Kbd :elevation="level.value">K</Kbd>
        </KbdGroup>
        <Kbd :elevation="level.value">Enter</Kbd>
      </div>
    </div>
  </div>
</template>
