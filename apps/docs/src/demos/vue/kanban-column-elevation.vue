<script setup lang="ts">
import { SparklesIcon } from "@lucide/vue";
import { KanbanColumn, KanbanItem } from "@edmi-vue/ui/kanban-column";

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
  <div class="flex flex-wrap items-start gap-3">
    <KanbanColumn :elevation="l.value" title="Thesis stage" meta="1/1">
      <KanbanItem title="Initial thesis" description="User task">
        <template #icon><SparklesIcon /></template>
      </KanbanItem>
    </KanbanColumn>
    <KanbanColumn :elevation="l.value" title="Mandate stage" meta="0/3">
      <KanbanItem disabled title="Pick tokens + weights" description="Agent task">
        <template #icon><SparklesIcon /></template>
      </KanbanItem>
      <KanbanItem disabled title="Review mandate" description="Agent requests approval">
        <template #icon><SparklesIcon /></template>
      </KanbanItem>
    </KanbanColumn>
  </div>
		</div>
	</div>
</template>
