<script setup lang="ts">
import { Bold, Italic } from "@lucide/vue";
import { Toggle } from "@edmi-vue/ui/toggle";
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <Toggle aria-label="Bold" :default-value="true"><Bold /></Toggle>
      <Toggle variant="outline" aria-label="Italic" :default-value="true"><Italic /></Toggle>
    </div>
    <div class="flex items-center gap-2">
      <Toggle raised aria-label="Bold" :default-value="true"><Bold /></Toggle>
      <Toggle raised variant="outline" aria-label="Italic" :default-value="true"><Italic /></Toggle>
    </div>
  </div>
</template>
