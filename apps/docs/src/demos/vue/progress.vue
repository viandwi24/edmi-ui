<script setup lang="ts">
import { Progress, ProgressLabel, ProgressValue } from "@edmi-vue/ui/progress";
import { onBeforeUnmount, onMounted, ref } from "vue";

const value = ref(20);
let id: ReturnType<typeof setInterval> | undefined;
onMounted(() => {
  id = setInterval(() => {
    value.value = value.value >= 100 ? 10 : value.value + 10;
  }, 1200);
});
onBeforeUnmount(() => clearInterval(id));
</script>

<template>
  <div class="flex w-80 flex-col gap-6">
    <Progress :model-value="value" />
    <Progress :model-value="value" variant="brand">
      <ProgressLabel>Raising for launch</ProgressLabel>
      <ProgressValue />
    </Progress>
  </div>
</template>
