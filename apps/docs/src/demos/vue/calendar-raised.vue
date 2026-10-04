<script setup lang="ts">
import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar } from "@edmi-vue/ui/calendar";
import { ref } from "vue";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];

const date = ref(today(getLocalTimeZone()));
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <Calendar v-model="date" :elevation="level.value" />
    </div>
  </div>
</template>
