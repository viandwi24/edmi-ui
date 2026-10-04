<script setup lang="ts">
import { Checkbox } from "@edmi-vue/ui/checkbox";
import { ref } from "vue";

const some = ref<boolean | "indeterminate">("indeterminate");
</script>

<template>
  <div class="flex flex-col gap-4">
    <label class="flex items-start gap-2.5 text-sm">
      <Checkbox id="mandate" default-value />
      <span class="grid gap-0.5">
        <span class="font-medium">Accept the mandate</span>
        <span class="text-[12.5px] text-muted-foreground">Weights and fees lock after launch.</span>
      </span>
    </label>
    <label class="flex items-center gap-2.5 text-sm">
      <Checkbox v-model="some" /> Some selected
    </label>
    <label class="flex items-center gap-2.5 text-sm">
      <Checkbox disabled /> Disabled
    </label>
  </div>
</template>
