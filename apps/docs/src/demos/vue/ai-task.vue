<script setup lang="ts">
import { Task, TaskContent, TaskItem, TaskItemFile, TaskTrigger } from "@edmi-vue/components/ai/task";
</script>

<template>
  <Task class="w-full max-w-lg">
    <TaskTrigger title="Update the weights file · 2 of 4" />
    <TaskContent>
      <TaskItem status="completed">Read <TaskItemFile>weights.ts</TaskItemFile></TaskItem>
      <TaskItem status="completed">Validate total = 100%</TaskItem>
      <TaskItem status="in-progress">Write <TaskItemFile>weights.ts</TaskItemFile></TaskItem>
      <TaskItem status="pending">Run tests</TaskItem>
      <TaskItem status="error">Deploy preview failed</TaskItem>
    </TaskContent>
  </Task>
</template>
