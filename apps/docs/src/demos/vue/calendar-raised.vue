<script setup lang="ts">
import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar } from "@edmi-vue/ui/calendar";
import { ref } from "vue";

const date = ref(today(getLocalTimeZone()));
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Calendar v-model="date" class="rounded-xl border border-border" />
    <Calendar v-model="date" raised class="rounded-xl border border-border" />
  </div>
</template>
