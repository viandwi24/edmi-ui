<script setup lang="ts">
import { TaskList, type Task } from "@edmi-vue/ui/task-list";

const tasks: Task[] = [
  { title: "ICP analysis", agent: "Research agent", status: "review" },
  { title: "Q1 analyst report", agent: "Vault agent", status: "running" },
  { title: "Q4 drift review", agent: "Keeper agent", status: "completed" },
  { title: "Rebalance playbook v2", agent: "Research agent", status: "completed" },
];

const levels = [
	{ value: "flat", label: "Flat (0)" } as const,
	{ value: "raised", label: "Raised (+1)" } as const,
	{ value: "floating", label: "Floating (+2)" } as const,
];
</script>

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
  <TaskList :elevation="l.value" class="w-[300px] max-w-full" :tasks="tasks" />
		</div>
	</div>
</template>
