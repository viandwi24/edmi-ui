<script setup lang="ts">
import { TaskList, type Task } from "@edmi-vue/ui/task-list";

const tasks: Task[] = [
  { title: "ICP analysis", agent: "Research agent", status: "review" },
  { title: "Q1 analyst report", agent: "Vault agent", status: "running" },
  { title: "Q4 drift review", agent: "Keeper agent", status: "completed" },
  { title: "Rebalance playbook v2", agent: "Research agent", status: "completed" },
];
</script>

<template>
  <TaskList class="w-[300px] max-w-full" :tasks="tasks" />
</template>
