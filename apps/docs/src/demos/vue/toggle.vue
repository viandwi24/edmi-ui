<script setup lang="ts">
import { Bold, Italic, StarIcon } from "@lucide/vue";
import { Toggle } from "@edmi-vue/ui/toggle";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Toggle aria-label="Bold"><Bold /></Toggle>
    <Toggle aria-label="Bold" default-value><Bold /></Toggle>
    <Toggle variant="outline" aria-label="Italic"><Italic /></Toggle>
    <Toggle variant="outline">
      <StarIcon />
      Watch
    </Toggle>
    <Toggle size="sm" aria-label="Bold"><Bold /></Toggle>
    <Toggle size="lg" aria-label="Bold"><Bold /></Toggle>
    <Toggle disabled aria-label="Bold"><Bold /></Toggle>
  </div>
</template>
