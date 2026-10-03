<script setup lang="ts">
import { SparklesIcon } from "@lucide/vue";
import { KanbanColumn, KanbanItem } from "@edmi-vue/ui/kanban-column";
</script>

<template>
  <div class="flex flex-wrap items-start gap-3">
    <KanbanColumn raised title="Thesis stage" meta="1/1">
      <KanbanItem title="Initial thesis" description="User task">
        <template #icon><SparklesIcon /></template>
      </KanbanItem>
    </KanbanColumn>
    <KanbanColumn raised title="Mandate stage" meta="0/3">
      <KanbanItem disabled title="Pick tokens + weights" description="Agent task">
        <template #icon><SparklesIcon /></template>
      </KanbanItem>
      <KanbanItem disabled title="Review mandate" description="Agent requests approval">
        <template #icon><SparklesIcon /></template>
      </KanbanItem>
    </KanbanColumn>
  </div>
</template>
