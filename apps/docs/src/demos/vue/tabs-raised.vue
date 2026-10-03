<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
</script>

<template>
  <div class="flex flex-col gap-4">
    <Tabs default-value="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="holdings">Holdings</TabsTrigger>
      </TabsList>
    </Tabs>
    <Tabs default-value="overview">
      <TabsList raised>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="holdings">Holdings</TabsTrigger>
      </TabsList>
    </Tabs>
    <Tabs default-value="overview">
      <TabsList variant="pills">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="holdings">Holdings</TabsTrigger>
      </TabsList>
    </Tabs>
    <Tabs default-value="overview">
      <TabsList variant="pills" raised>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="holdings">Holdings</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
