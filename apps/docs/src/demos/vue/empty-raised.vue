<script setup lang="ts">
import { Building2Icon } from "@lucide/vue";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@edmi-vue/ui/empty";

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<template>
  <div class="grid w-full max-w-3xl gap-5 sm:grid-cols-3">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" :elevation="level.value"><Building2Icon /></EmptyMedia>
          <EmptyTitle>No positions yet</EmptyTitle>
          <EmptyDescription>Your holdings will show up here.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  </div>
</template>
