<script setup lang="ts">
import { Toggle } from "@edmi-vue/ui/toggle";

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex flex-wrap items-center gap-3">
        <Toggle :elevation="level.value" aria-label="Bold" :default-value="true"><b>B</b></Toggle>
        <Toggle :elevation="level.value" variant="outline" aria-label="Italic"><i>I</i></Toggle>
        <Toggle :elevation="level.value" variant="outline" aria-label="Underline" :default-value="true"><u>U</u></Toggle>
      </div>
    </div>
  </div>
</template>
