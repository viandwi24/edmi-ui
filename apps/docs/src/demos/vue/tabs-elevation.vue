<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1): only the active tab rises" }] as const;
const variants = ["default", "pills"] as const;
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex flex-wrap items-start gap-6">
        <Tabs v-for="variant in variants" :key="variant" default-value="overview">
          <TabsList :variant="variant" :elevation="level.value">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  </div>
</template>
