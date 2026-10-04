<script setup lang="ts">
import { Textarea } from "@edmi-vue/ui/textarea";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <Textarea :elevation="level.value" placeholder="Why this mandate?" class="max-w-sm" />
    </div>
  </div>
</template>
